import PatternClone from '../PatternClone'

const handlers = {
  PEND: true,
  PFFF: (p, { patternFlags }) => p.setFlags(patternFlags),
  PXXX: (p, { int32 }) => p.setX(int32),
  PYYY: (p, { int32 }) => p.setY(int32),
}

export default (chunks, { uint32: index }) => {
  let clone = new PatternClone({ index })
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
        return clone
      }
      clone = handler(clone, data)
    } else {
      console.log(`readPatternClone: no handler for "${type}"`)
    }
  }
}
