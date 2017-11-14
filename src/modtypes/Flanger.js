import ModType from './ModType'

export default class Flanger extends ModType {

  static isFlanger(val) {
    return val && val instanceof Flanger
  }

  static name() {
    return 'Flanger'
  }

}
