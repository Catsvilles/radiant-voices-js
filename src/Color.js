import { Map } from 'extendable-immutable'

export default class Color extends Map {

  static isColor(val) {
    return val && val instanceof Color
  }

  get r() {
    return this.get('r')
  }

  setR(uint8) {
    return this.set('r', uint8)
  }

  get g() {
    return this.get('g')
  }

  setG(uint8) {
    return this.set('g', uint8)
  }

  get b() {
    return this.get('b')
  }

  setB(uint8) {
    return this.set('b', uint8)
  }

}
