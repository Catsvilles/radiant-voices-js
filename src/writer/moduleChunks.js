import { List } from 'extendable-immutable'

export default function *moduleChunks(module) {
  yield { type: 'SFFF', data: { moduleFlags: module.flags } }
  yield { type: 'SNAM', data: { fixedString: module.name } }
  if (module.type && module.type.name) {
    yield { type: 'STYP', data: { cstring: module.type.name } }
  }
  yield { type: 'SFIN', data: { int32: module.finetune } }
  yield { type: 'SREL', data: { int32: module.relativeNote } }
  yield { type: 'SXXX', data: { int32: module.x } }
  yield { type: 'SYYY', data: { int32: module.y } }
  yield { type: 'SZZZ', data: { uint32: module.layer } }
  yield { type: 'SSCL', data: { uint32: module.scale } }
  yield { type: 'SVPR', data: { uint32: module.visualization } }
  yield { type: 'SCOL', data: { color: module.color } }
  if (module.midiOutName) {
    yield { type: 'SMIN', data: { cstring: module.midiOutName } }
  }
  yield { type: 'SMIC', data: { uint32: module.midiInChannel } }
  yield { type: 'SMIB', data: { int32: module.midiInBank } }
  yield { type: 'SMIP', data: { int32: module.midiInProgram } }
  yield { type: 'SLNK', data: { links: new Int32Array(module.links) } }
  for (const value of module.ctlValues) {
    yield { type: 'CVAL', data: { uint32: value } }
  }
  if (module.midiMappings) {
    let cmidBytes = module.midiMappings.flatten().toJS()
    yield { type: 'CMID', data: { bytes: cmidBytes } }
  }
  if (module.type && module.type.dataChunks) {
    for (const chunk of module.type.dataChunks()) {
      yield chunk
    }
  }
}
