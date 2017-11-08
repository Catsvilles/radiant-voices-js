import DataStream from 'datastream-js'
import encoding from './encoding'

export default function toIffBuffer(chunks) {
  const ds = new DataStream()
  for (const { type, data } of chunks) {
    ds.writeString(type, encoding, 4)
    if (data !== undefined) {
      const {
        int32,
        uint32,
        bytes,
        cstring,
      } = data
      if (int32 !== undefined) {
        ds.writeUint32(4)
        ds.writeInt32(int32)
      } else if (uint32 !== undefined) {
        ds.writeUint32(4)
        ds.writeUint32(uint32)
      } else if (bytes !== undefined) {
        ds.writeUint32(bytes.length)
        ds.writeUint8Array(bytes)
      } else if (cstring !== undefined) {
        ds.writeUint32(cstring.length + 1)
        ds.writeString(cstring, encoding, cstring.length)
        ds.writeUint8(0)
      }
    } else {
      ds.writeUint32(0)
    }
  }
  return ds
}
