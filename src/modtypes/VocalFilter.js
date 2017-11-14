import ModType from './ModType'

export default class VocalFilter extends ModType {

  static isVocalFilter(val) {
    return val && val instanceof VocalFilter
  }

  static name() {
    return 'Vocal filter'
  }

}
