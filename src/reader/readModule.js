import Module from '../Module'

const handlers = {
  SEND: true,
}

export default (chunks, { moduleFlags }) => {
  let module = Module.empty().setFlags(moduleFlags)
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
        return module
      } else {
        module = handler(module, chunks, data)
      }
    } else {
      console.log(`readModule: no handler for "${type}"`)
    }
  }
}
