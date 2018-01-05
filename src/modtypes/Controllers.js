import { List, Map } from 'extendable-immutable'

class ControllersInstance extends Map {

  static isControllersInstance(val) {
    return val && val instanceof ControllersInstance
  }

  get data() {
    return this.get('data')
  }

  setData(list) {
    return this.set('data', list)
  }

}

export default class Controllers {

  constructor(spec) {
    this.defaultData = new List()
    this.offsets = {}
    for (let offset = 0; offset < spec.length; ++offset) {
      const item = spec[offset]
      for (const key in item) {
        this.offsets[key] = offset
        const { initial } = item[key]
        this.defaultData = this.defaultData.push(initial)
      }
    }
  }

  instance(existing) {
    const i = existing || new ControllersInstance({ data: this.defaultData })
    return new Proxy(i, {
      get: (target, name) => {
        const offset = this.offsets[name]
        if (offset !== undefined) {
          return target.data.get(offset)
        } else if (name === 'set') {
          return (key, val) => this.instance(target.set(key, val))
        } else if (name.substr(0, 3) === 'set') {
          const toSet = name.substr(3, 1).toLowerCase() + name.substr(4)
          const toSetOffset = this.offsets[toSet]
          if (toSetOffset !== undefined) {
            return val => this.instance(target.setData(target.data.set(toSetOffset, val)))
          }
        }
        return target[name]
      },
    })
  }

}
