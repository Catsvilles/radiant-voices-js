import DataStream from 'datastream-js'
import chunkTypes from './chunkTypes'
import encoding from './encoding'
import Color from '../Color'
import ModuleFlags from '../ModuleFlags'
import PatternAppearanceFlags from '../PatternAppearanceFlags'
import PatternFlags from '../PatternFlags'

const trim = (a, val) =>
  a.indexOf(-1) === -1 ? a : a.subarray(0, a.indexOf(-1))

const transformers = {
  bytes: (ds, length) => Array.from(ds.readUint8Array(length)),
  color: ds => new Color({ r: ds.readUint8(), g: ds.readUint8(), b: ds.readUint8() }),
  cstring: (ds, length) => ds.readCString(length),
  empty: () => true,
  fixedString: (ds, length) => ds.readCString(length),
  int32: ds => ds.readInt32(),
  links: (ds, length) => trim(ds.readInt32Array(length / 4), -1),
  moduleFlags: ds => ModuleFlags.fromUint32(ds.readUint32()),
  patternAppearanceFlags: ds => PatternAppearanceFlags.fromUint32(ds.readUint32()),
  patternFlags: ds => PatternFlags.fromUint32(ds.readUint32()),
  uint32: ds => ds.readUint32(),
  version: ds => ({
    patch: ds.readUint8(),
    point: ds.readUint8(),
    minor: ds.readUint8(),
    major: ds.readUint8(),
  }),
}

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
      const value = transformers[dataType](ds, length)
      yield { type, data: { [dataType]: value } }
    } else if (raw) {
      yield { type, data: { raw: ds.readUint8Array(length) } }
    }
    ds.position = endPos
  }
}
