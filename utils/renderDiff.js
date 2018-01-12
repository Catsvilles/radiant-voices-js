'use strict'

const fs = require('fs')
const rv = require('../lib/radiant-voices')
const { fork } = require('child_process')

const origFile = process.argv[process.argv.length - 1]
const f = fs.readFileSync(origFile)

let project
try {
  const chunks = rv.fromIffBuffer(f)
  project = rv.readSunvoxFile(chunks)
} catch (e) {
  process.exit(1)
}

let tmpPath, tmpFile, tmpOrigFile
try {
  const chunks2 = rv.chunks(project)
  const buffer = rv.toIffBuffer(chunks2)
  tmpPath = fs.mkdtempSync('/tmp/renderDiff')
  tmpOrigFile = `${tmpPath}/orig.sunvox`
  tmpFile = `${tmpPath}/rv.sunvox`
  console.log({ tmpFile })
  fs.writeFileSync(tmpFile, new Buffer(buffer.buffer))
  fs.symlinkSync(origFile, tmpOrigFile)
} catch (e) {
  process.exit(2)
}

const origFork = fork(`${__dirname}/renderDiffProcess.js`)
const rvFork = fork(`${__dirname}/renderDiffProcess.js`)

const start = () => {
  origFork.send({ open: origFile })
  rvFork.send({ open: tmpFile })
}

const kill = () => {
  origFork.kill('SIGKILL')
  rvFork.kill('SIGKILL')
}

let frameLengths = []

origFork.on('message', msg => {
  const {
    error,
    frames,
    digest,
  } = msg
  if (error) {
    kill()
    process.exit(3)
  }
  if (frames) {
    addFrameLength(frames)
  }
  if (digest) {
    addOrigDigest(digest)
  }
})
rvFork.on('message', msg => {
  const {
    error,
    frames,
    digest,
  } = msg
  if (error) {
    kill()
    process.exit(4)
  }
  if (frames) {
    addFrameLength(frames)
  }
  if (digest) {
    addRvDigest(digest)
  }
})

const addFrameLength = frames => {
  frameLengths.push(frames)
  if (frameLengths.length === 2) {
    compareFrameLengths()
  }
}

const compareFrameLengths = () => {
  if (frameLengths[0] !== frameLengths[1]) {
    console.log({ frameLengths })
    kill()
    process.exit(5)
  }
}

const origDigests = [], rvDigests = []
let block = 0

const addOrigDigest = digest => {
  origDigests.push(digest)
  compareIfPossible()
}

const addRvDigest = digest => {
  rvDigests.push(digest)
  compareIfPossible()
}

const compareIfPossible = () => {
  if (origDigests.length && rvDigests.length) {
    const orig = origDigests.shift()
    const rv = rvDigests.shift()
    if (orig !== rv) {
      console.log({ block, orig, rv })
      kill()
      process.exit(5)
    }
    block += 1
  }
}

let exited = []
const onExit = () => {
  exited.push(1)
  if (exited.length === 2) {
    if (block > 0) {
      success()
    } else {
      kill()
      process.exit(7)
    }
  }
}
origFork.on('exit', onExit)
rvFork.on('exit', onExit)

const success = () => {
  kill()
  fs.unlinkSync(tmpFile)
  fs.unlinkSync(tmpOrigFile)
  fs.rmdirSync(tmpPath)
  console.log({ block })
  process.exit(0)
}

start()

setInterval(() => true, 250)
