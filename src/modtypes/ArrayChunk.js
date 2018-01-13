import { List, Map } from 'extendable-immutable'
import { bytes, uint8, uint32 } from '../dataTypes'

class ArrayChunkInstance extends Map {

  static isArrayChunkInstance(val) {
    return val && val instanceof ArrayChunkInstance
  }

  get data() {
    return this.get('data')
  }

  setData(list) {
    return this.set('data', list)
  }

  get spec() {
    return this.get('spec')
  }

  *dataChunks() {
    yield { type: 'CHNM', data: { [uint32]: this.spec.chnm } }
    if (this.spec.type === uint8) {
      yield { type: 'CHDT', data: { [bytes]: this.data.toJS() } }
    }
  }

  setBytes(bytes) {
    if (this.spec.type === uint8) {
      return this.setData(this.data.merge(bytes))
    }
  }

}

export default class ArrayChunk {

  constructor({ chnm, length, type, initial, min, max }) {
    this.defaultData = new List()
    let push
    if (typeof initial === 'function') {
      push = (d, x) => d.push(initial(x))
    } else {
      push = (d) => d.push(initial)
    }
    for (let x = 0; x < length; ++x) {
      this.defaultData = push(this.defaultData, x)
    }
    this.chnm = chnm
    this.length = length
    this.type = type
    this.min = min
    this.max = max
  }

  instance() {
    return new ArrayChunkInstance({
      data: this.defaultData,
      spec: this,
    })
  }

}
