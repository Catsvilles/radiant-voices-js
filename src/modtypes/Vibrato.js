import ModType from './ModType'

export default class Vibrato extends ModType {

  static isVibrato(val) {
    return val && val instanceof Vibrato
  }

  static name() {
    return 'Vibrato'
  }

}
