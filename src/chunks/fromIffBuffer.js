import DataStream from 'datastream-js'
import chunkTypes from './chunkTypes'
import encoding from './encoding'

export default function *fromIffBuffer(buffer, { raw } = {}) {
  const ds = new DataStream(buffer)
  while (!ds.isEof()) {
    const startPos = ds.position
    const type = ds.readString(4, encoding)
    const length = ds.readUint32()
    const chunkLength = length + 8
    const endPos = startPos + chunkLength
    const { [type]: dataType } = chunkTypes
    if (dataType !== undefined) {
      yield { type, data: { [dataType]: transformers[dataType](ds, length) } }
    } else if (raw) {
      yield { type, data: { raw: ds.readUint8Array(length) } }
    }
    ds.position = endPos
  }
}

const transformers = {
  empty: () => true,
  bytes: (ds, length) => Array.from(ds.readUint8Array(length)),
  cstring: (ds, length) => ds.readCString(length),
  fixedString: (ds, length) => ds.readCString(length),
  int32: ds => ds.readInt32(),
  links: (ds, length) => trim(ds.readInt32Array(length / 4), -1),
  moduleFlags: (ds, length) => moduleFlags(ds.readUint32()),
  uint32: ds => ds.readUint32(),
  color: ds => ({ r: ds.readUint8(), g: ds.readUint8(), b: ds.readUint8() }),
}

const trim = (a, val) =>
  a.indexOf(-1) === -1 ? a : a.subarray(0, a.indexOf(-1))

const moduleFlags = flags => ({
  mute: !!(flags & 0x80),
  solo: !!(flags & 0x100),
  bypass: !!(flags & 0x4000),
  exists: !!(flags & 0x1),
  output: !!(flags & 0x2),
  generator: !!(flags & 0x8),
  effect: !!(flags & 0x10),
  initialized: !!(flags & 0x40),
  getSpeedChanges: !!(flags & 0x400),
  hidden: !!(flags & 0x800),
  multi: !!(flags & 0x1000),
  dontFillInput: !!(flags & 0x2000),
  useMutex: !!(flags & 0x8000),
  ignoreMute: !!(flags & 0x10000),
  noScopeBuffer: !!(flags & 0x20000),
  outputIsEmpty: !!(flags & 0x40000),
  open: !!(flags & 0x80000),
  getPlayCommands: !!(flags & 0x100000),
  getRenderSetupCommands: !!(flags & 0x200000),
  feedback: !!(flags & 0x400000),
  getStopCommands: !!(flags & 0x800000),
})
