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

  get midiMappings() {
    return this.get('midiMappings')
  }

  setMidiMappings(list) {
    return this.set('midiMappings', list)
  }

  prepareForCvals() {
    return this
      .set('_data', this.data)
      .set('data', new List())
      .set('_midiMappings', this.midiMappings)
      .set('midiMappings', new List())
  }

  finalizeCvals() {
    const _data = this.get('_data')
    let data = this.data
    while (data.size < _data.size) {
      data = data.push(_data.get(data.size))
    }
    const _midiMappings = this.get('_midiMappings')
    let midiMappings = this.midiMappings
    while (midiMappings.size < _midiMappings.size) {
      midiMappings = midiMappings.push(_midiMappings.get(midiMappings.size))
    }
    return this
      .setData(data)
      .setMidiMappings(midiMappings)
      .remove('_data')
      .remove('_midiMappings')
  }

}

export default class Controllers {

  constructor(spec) {
    this.defaultData = new List()
    this.defaultMidiMappings = new List()
    this.offsets = {}
    this.types = {}
    this.onChangeCallbacks = {}
    for (let offset = 0; offset < spec.length; ++offset) {
      const item = spec[offset]
      for (const key in item) {
        const { initial, type, onChange } = item[key]
        this.offsets[key] = offset
        this.types[key] = type
        this.onChangeCallbacks[key] = onChange
        this.defaultData = this.defaultData.push(initial)
        this.defaultMidiMappings = this.defaultMidiMappings.push(new List([0, 0, 0, 0, 0, 0, 0, 0xff]))
      }
    }
  }

  instance(existing) {
    let i = existing || new ControllersInstance({
      data: this.defaultData,
      midiMappings: this.defaultMidiMappings,
    })
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
            return val => {
              let type = this.types[toSet]
              if ((typeof type) === 'function') {
                type = type(this.instance(target))
              }
              if (type instanceof Array) {
                const [min, max] = type
                val = Math.max(val, min)
                val = Math.min(val, max)
              }
              i = this.instance(target.setData(target.data.set(toSetOffset, val)))
              const cb = this.onChangeCallbacks[toSet]
              if (cb) {
                i = cb(i)
              }
              return i
            }
          }
        }
        return target[name]
      },
    })
  }

}
