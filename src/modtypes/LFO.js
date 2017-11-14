import ModType from './ModType'

export default class LFO extends ModType {

  static isLFO(val) {
    return val && val instanceof LFO
  }

  static name() {
    return 'LFO'
  }

}
