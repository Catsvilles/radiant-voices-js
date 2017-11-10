import DataStream from 'datastream-js'
import encoding from './encoding'

const writers = {
  bytes: (ds, value) => {
    ds.writeUint32(value.length)
    ds.writeUint8Array(value)
  },
  color: (ds, { r, g, b }) => {
    ds.writeUint32(3)
    ds.writeUint8(r)
    ds.writeUint8(g)
    ds.writeUint8(b)
  },
  cstring: (ds, value) => {
    ds.writeUint32(value.length + 1) // TODO - encode to utf8 first, then get length
    ds.writeString(value, encoding, value.length)
    ds.writeUint8(0)
  },
  empty: (ds, value) => {
    ds.writeUint32(0)
  },
  fixedString: (ds, value) => {
    ds.writeUint32(32)
    ds.writeString(value, encoding, 32)
  },
  int32: (ds, value) => {
    ds.writeUint32(4)
    ds.writeInt32(value)
  },
  links: (ds, value) => {
    ds.writeUint32(value.length * 4)
    for (const x of value) {
      ds.writeInt32(x)
    }
  },
  uint32: (ds, value) => {
    ds.writeUint32(4)
    ds.writeUint32(value)
  },
  version: (ds, { major, minor, point, patch }) => {
    ds.writeUint32(4)
    ds.writeUint8(patch)
    ds.writeUint8(point)
    ds.writeUint8(minor)
    ds.writeUint8(major)
  },
}
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
