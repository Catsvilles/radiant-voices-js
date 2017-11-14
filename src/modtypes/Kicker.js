import ModType from './ModType'

export default class Kicker extends ModType {

  static isKicker(val) {
    return val && val instanceof Kicker
  }

  static name() {
    return 'Kicker'
  }

}
