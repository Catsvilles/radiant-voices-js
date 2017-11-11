export default function *patternChunks(pattern) {
  yield { type: 'PDTA', data: { bytes: pattern.data } }
  yield { type: 'PCHN', data: { uint32: pattern.tracks } }
  yield { type: 'PLIN', data: { uint32: pattern.lines } }
  yield { type: 'PYSZ', data: { uint32: pattern.height } }
  yield { type: 'PICO', data: { bytes: pattern.icon } }
  yield { type: 'PFLG', data: { patternAppearanceFlags: pattern.appearanceFlags.toJS() } }
  yield { type: 'PFGC', data: { color: pattern.foregroundColor.toJS() } }
  yield { type: 'PBGC', data: { color: pattern.backgroundColor.toJS() } }
  yield { type: 'PFFF', data: { patternFlags: pattern.flags.toJS() } }
  yield { type: 'PXXX', data: { int32: pattern.x } }
  yield { type: 'PYYY', data: { int32: pattern.y } }
}
