import Pattern from '../Pattern'

const handlers = {
  PCHN: (p, _, { uint32 }) => p.setTracks(uint32),
  PLIN: (p, _, { uint32 }) => p.setLines(uint32),
  PYSZ: (p, _, { uint32 }) => p.setHeight(uint32),
  PICO: (p, _, { bytes }) => p.setIcon(bytes),
  PFLG: (p, _, { patternAppearanceFlags }) => p.setAppearanceFlags(patternAppearanceFlags),
  PFGC: (p, _, { color }) => p.setForegroundColor(color),
  PBGC: (p, _, { color }) => p.setBackgroundColor(color),
  PFFF: (p, _, { patternFlags }) => p.setFlags(patternFlags),
  PXXX: (p, _, { int32 }) => p.setX(int32),
  PYYY: (p, _, { int32 }) => p.setY(int32),
  PEND: true,
}

export default (chunks, { bytes }) => {
  let pattern = new Pattern().setData(bytes)
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
      }
      pattern = handler(pattern, chunks, data)
    } else {
      console.log(`readPattern: no handler for "${type}"`)
    }
  }
}
