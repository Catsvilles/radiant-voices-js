import ModType from './ModType'

export default class MultiCtl extends ModType {

  static isMultiCtl(val) {
    return val && val instanceof MultiCtl
  }

  static name() {
    return 'MultiCtl'
  }

}
