import ModType from './ModType'

export default class Reverb extends ModType {

  static isReverb(val) {
    return val && val instanceof Reverb
  }

  static name() {
    return 'Reverb'
  }

}
