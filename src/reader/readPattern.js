import Pattern from '../Pattern'

const handlers = {
  PBGC: (p, { color }) => p.setBackgroundColor(color),
  PCHN: (p, { uint32 }) => p.setTracks(uint32),
  PEND: true,
  PFFF: (p, { patternFlags }) => p.setFlags(patternFlags),
  PFGC: (p, { color }) => p.setForegroundColor(color),
  PFLG: (p, { patternAppearanceFlags }) => p.setAppearanceFlags(patternAppearanceFlags),
  PICO: (p, { bytes }) => p.setIcon(bytes),
  PLIN: (p, { uint32 }) => p.setLines(uint32),
  PXXX: (p, { int32 }) => p.setX(int32),
  PYSZ: (p, { uint32 }) => p.setHeight(uint32),
  PYYY: (p, { int32 }) => p.setY(int32),
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
