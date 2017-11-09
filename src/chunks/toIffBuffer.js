import DataStream from 'datastream-js'
import encoding from './encoding'

export default function toIffBuffer(chunks) {
  const ds = new DataStream()
  for (const { type, data } of chunks) {
    const dataType = Object.keys(data)[0]
    const { [dataType]: value } = data
    ds.writeString(type, encoding, 4)
    writers[dataType](ds, value)
  }
  return ds
}

const writers = {
  int32: (ds, value) => {
    ds.writeUint32(4)
    ds.writeInt32(value)
  },
  uint32: (ds, value) => {
    ds.writeUint32(4)
    ds.writeUint32(value)
  },
  bytes: (ds, value) => {
    ds.writeUint32(value.length)
    ds.writeUint8Array(value)
  },
  cstring: (ds, value) => {
    ds.writeUint32(value.length + 1)
    ds.writeString(value, encoding, value.length)
    ds.writeUint8(0)
  },
  color: (ds, value) => {
    ds.writeUint32(3)
    ds.writeUint8(value.r)
    ds.writeUint8(value.g)
    ds.writeUint8(value.b)
  },
  empty: (ds, value) => {
    ds.writeUint32(0)
  },
}
