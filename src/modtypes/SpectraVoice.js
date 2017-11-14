import ModType from './ModType'

export default class SpectraVoice extends ModType {

  static isSpectraVoice(val) {
    return val && val instanceof SpectraVoice
  }

  static name() {
    return 'SpectraVoice'
  }

}
