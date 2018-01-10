import Pattern from '../Pattern'

const handlers = {
  PCHN: (p, { uint32 }) => p.setTracks(uint32),
  PLIN: (p, { uint32 }) => p.setLines(uint32),
  PYSZ: (p, { uint32 }) => p.setHeight(uint32),
  PICO: (p, { bytes }) => p.setIcon(bytes),
  PFLG: (p, { patternAppearanceFlags }) => p.setAppearanceFlags(patternAppearanceFlags),
  PFGC: (p, { color }) => p.setForegroundColor(color),
  PBGC: (p, { color }) => p.setBackgroundColor(color),
  PFFF: (p, { patternFlags }) => p.setFlags(patternFlags),
  PXXX: (p, { int32 }) => p.setX(int32),
  PYYY: (p, { int32 }) => p.setY(int32),
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
      pattern = handler(pattern, data)
    } else {
      console.log(`readPattern: no handler for "${type}"`)
    }
  }
}
