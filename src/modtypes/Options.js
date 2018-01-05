import { List, Map } from 'extendable-immutable'

export const flag = Symbol('flag')
export const int = Symbol('int')
export const inverted = Symbol('inverted')

const PADDING_SIZE = 64

class OptionsInstance extends Map {

  static isOptionsInstance(val) {
    return val && val instanceof OptionsInstance
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
    this.defaultData = new List()
    this.offsets = {}
    this.types = {}
    for (let offset = 0; offset < spec.length; ++offset) {
      const item = spec[offset]
      for (const key in item) {
        const type = item[key]
        this.offsets[key] = offset
        this.types[key] = type
        this.defaultData = this.defaultData.push(0)
      }
    }
  }

  instance(existing) {
    const i = existing || new OptionsInstance({ data: this.defaultData })
    return new Proxy(i, {
      get: (target, name) => {
        const offset = this.offsets[name]
        if (offset !== undefined) {
          const val = target.data.get(offset)
          switch (this.types[name]) {
            case flag:
              return !!val
            case inverted:
              return !val
            case int:
              return val
          }
        } else if (name === 'set') {
          return (key, val) => this.instance(target.set(key, val))
        } else if (name.substr(0, 3) === 'set') {
          const toSet = name.substr(3, 1).toLowerCase() + name.substr(4)
          const toSetOffset = this.offsets[toSet]
          if (toSetOffset !== undefined) {
            return val => {
              switch (this.types[toSet]) {
                case flag:
                  val = !!val
                  break
                case inverted:
                  val = !val
                  break
              }
              return this.instance(target.setData(target.data.set(toSetOffset, val)))
            }
          }
        }
        return target[name]
      },
    })
  }

}
