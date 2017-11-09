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
    switch (dataType) {
      case 'bytes':
        yield { type, data: { bytes: Array.from(ds.readUint8Array(length)) } }
        break
      case 'cstring':
        yield { type, data: { cstring: ds.readCString(length) } }
        break
      case 'int32':
        yield { type, data: { int32: ds.readInt32() } }
        break
      case 'uint32':
        yield { type, data: { uint32: ds.readUint32() } }
        break
      default:
        yield raw ? { type, data: { raw: ds.readUint8Array(length) } } : { type }
        break
    }
    ds.position = endPos
  }
}
