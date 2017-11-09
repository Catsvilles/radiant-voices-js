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
  int32: ds => ds.readInt32(),
  uint32: ds => ds.readUint32(),
  color: ds => ({ r: ds.readUint8(), g: ds.readUint8(), b: ds.readUint8() }),
}
