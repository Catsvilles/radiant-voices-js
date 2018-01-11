import Pattern from '../Pattern'
import PatternClone from '../PatternClone'

export default function *patternChunks(pattern) {
  if (Pattern.isPattern(pattern)) {
    yield { type: 'PDTA', data: { bytes: pattern.data } }
    if (pattern.name) {
      yield { type: 'PNME', data: { cstring: pattern.name } }
    }
    yield { type: 'PCHN', data: { uint32: pattern.tracks } }
    yield { type: 'PLIN', data: { uint32: pattern.lines } }
    yield { type: 'PYSZ', data: { uint32: pattern.height } }
    yield { type: 'PFLG', data: { patternAppearanceFlags: pattern.appearanceFlags } }
    yield { type: 'PICO', data: { bytes: pattern.icon } }
    yield { type: 'PFGC', data: { color: pattern.foregroundColor } }
    yield { type: 'PBGC', data: { color: pattern.backgroundColor } }
  }
  if (PatternClone.isPatternClone(pattern)) {
    yield { type: 'PPAR', data: { uint32: pattern.index } }
  }
  if (pattern) {
    yield { type: 'PFFF', data: { patternFlags: pattern.flags } }
    yield { type: 'PXXX', data: { int32: pattern.x } }
    yield { type: 'PYYY', data: { int32: pattern.y } }
  }
}
