import { List, Map } from 'extendable-immutable'

export const flag = Symbol('flag')
export const int = Symbol('int')
export const inverted = Symbol('inverted')

const PADDING_SIZE = 64

class OptionsChunk extends Map {

  constructor(length) {
    let data = new List()
    for (let i = 0; i < length; ++i) {
      data = data.push(0)
    }
    super({ data })
  }

  static isOptionsChunk(val) {
    return val && val instanceof OptionsChunk
  }

  get meta() {
    return this.get('meta')
  }

  get data() {
    return this.get('data')
  }

  setData(list) {
    return this.set('data', list)
  }

  get bytes() {
    let data = this.data
    while (data.size < PADDING_SIZE) {
      data = data.push(0)
    }
    return data.toJS()
  }

  setBytes(bytes) {
    let data = this.data
    for (let i = 0; i < data.size; ++i) {
      data = data.set(i, bytes[i])
    }
    return this.setData(data)
  }

}

export default class Options {

  constructor(spec) {
    this.spec = spec
  }

  chunk() {
    const chunk = new OptionsChunk(Object.keys(this.spec).length)
    for (const [key, { offset, type } = {}] of Object.entries(this.spec)) {
      Object.defineProperty(chunk, key, {
        get: function () {
          switch (type) {
            case flag:
              return !!this.data.get(offset)
            case inverted:
              return !this.data.get(offset)
            case int:
              return this.data.get(offset)
          }
        },
      })
      const setterName = `set${key[0].toUpperCase()}${key.substr(1)}`
      chunk[setterName] = function (value) {
        switch (type) {
          case flag:
            value = !!value
            break
          case inverted:
            value = !value
            break
        }
        return this.setData(this.data.set(offset, value))
      }
    }
    return chunk
  }

}
