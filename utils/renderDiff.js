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

let tmpPath, tmpFile
try {
  const chunks2 = rv.chunks(project)
  const buffer = rv.toIffBuffer(chunks2)
  tmpPath = fs.mkdtempSync('/tmp/renderDiff')
  tmpFile = `${tmpPath}/rv.sunvox`
  console.log({ tmpFile })
  fs.writeFileSync(tmpFile, new Buffer(buffer.buffer))
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
  fs.rmdirSync(tmpPath)
  console.log({ block })
  process.exit(0)
}

start()

setInterval(() => true, 250)

// read the file using rv
  // exit 1 if RV can't read the file

// write the file back to a tmp file
  // exit 2 if RV can't write the file

// open sunvox rendering process for each file
  // exit 3 if sunvox can't load original file
  // exit 4 if sunvox can't load RV file

// each process:
// initialize int16, 44100, 2 channel
// load module
  // exit 1 if cannot load module
// write song length in frames as uint32 to stdout
// begin rendering the song to stdout, up to song length in frames
// exit 0

// compare song length
// if mismatch
  // log difference
  // kill subprocesses
  // exit 5

// compare each byte of song rendering
// if mismatch
  // log position of difference
  // kill subprocesses
  // exit 6

// when subprocesses are both done
  // exit 0
