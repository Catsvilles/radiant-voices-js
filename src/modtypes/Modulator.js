import ModType from './ModType'

export default class Modulator extends ModType {

  static isModulator(val) {
    return val && val instanceof Modulator
  }

  static name() {
    return 'Modulator'
  }

}
