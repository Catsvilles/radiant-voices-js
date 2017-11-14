import ModType from './ModType'

export default class MultiSynth extends ModType {

  static isMultiSynth(val) {
    return val && val instanceof MultiSynth
  }

  static name() {
    return 'MultiSynth'
  }

}
