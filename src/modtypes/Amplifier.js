import ModType from './ModType'

export default class Amplifier extends ModType {

  static isAmplifier(val) {
    return val && val instanceof Amplifier
  }

  static name() {
    return 'Amplifier'
  }

}
