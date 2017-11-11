import Pattern from '../Pattern'

const handlers = {
  PCHN: (p, _, { uint32 }) => p.setTracks(uint32),
  PLIN: (p, _, { uint32 }) => p.setLines(uint32),
  PYSZ: (p, _, { uint32 }) => p.setHeight(uint32),
  PFLG: (p, _, { patternAppearanceFlags }) => p.setAppearanceFlags(patternAppearanceFlags),
  PFFF: (p, _, { patternFlags }) => p.setFlags(patternFlags),
  PEND: true,
}

export default (chunks, { bytes }) => {
  let pattern = Pattern.empty().setData(bytes)
  while (true) {
    const chunk = chunks.next()
    const { value, done } = chunk
    if (done) {
      return
    }
    const { type, data } = value
    const { [type]: handler } = handlers
    if (handler) {
      if (handler === true) {
        return pattern
      } else {
        pattern = handler(pattern, chunks, data)
      }
    } else {
      console.log(`readPattern: no handler for "${type}"`)
    }
  }
}
