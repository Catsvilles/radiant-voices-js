export default function *moduleChunks(module) {
  yield { type: 'SFFF', data: { moduleFlags: module.flags.toJS() } }
  yield { type: 'SNAM', data: { fixedString: module.name } }
  if (module.type) {
    yield { type: 'STYP', data: { cstring: module.type } }
  }
  yield { type: 'SFIN', data: { int32: module.finetune } }
  yield { type: 'SREL', data: { int32: module.relativeNote } }
  yield { type: 'SXXX', data: { int32: module.x } }
  yield { type: 'SYYY', data: { int32: module.y } }
  yield { type: 'SCOL', data: { color: module.color.toJS() } }
  yield { type: 'SMIC', data: { uint32: module.midiInChannel } }
  yield { type: 'SMIB', data: { int32: module.midiInBank } }
  yield { type: 'SMIP', data: { int32: module.midiInProgram } }
  yield { type: 'SLNK', data: { links: new Int32Array(module.links) } }
  for (const value of module.controllerValues) {
    yield { type: 'CVAL', data: { uint32: value } }
  }
}
