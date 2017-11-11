export default function *patternChunks(pattern) {
  yield { type: 'PDTA', data: { bytes: pattern.data } }
  yield { type: 'PCHN', data: { uint32: pattern.tracks } }
  yield { type: 'PLIN', data: { uint32: pattern.lines } }
  yield { type: 'PYSZ', data: { uint32: pattern.height } }
  yield { type: 'PFLG', data: { patternAppearanceFlags: pattern.appearanceFlags.toJS() } }

  yield { type: 'PFFF', data: { patternFlags: pattern.flags.toJS() } }
}
