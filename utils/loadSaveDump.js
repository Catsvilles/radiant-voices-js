const fs = require('fs')
const hexdump = require('hexdump-nodejs')
const rv = require('../lib/radiant-voices')

const path = process.argv[process.argv.length - 1]
const f = fs.readFileSync(path, null)
const chunks = rv.fromIffBuffer(f)
const project = rv.readSunvoxFile(chunks)
const chunks2 = rv.chunks(project)
const buffer = rv.toIffBuffer(chunks2)
const chunks3 = rv.fromIffBuffer(buffer)

for (const { type, data } of chunks3) {
  process.stdout.write(type + '    ')
  const { bytes, raw } = data
  if (bytes || raw) {
    const buffer = Buffer.from(bytes || raw)
    if (buffer.length > 0) {
      console.log(hexdump(buffer).replace(/\n/g, '\n        '))
    } else {
      console.log('(empty)')
    }
  } else {
    console.log(data)
  }
  console.log()
}
