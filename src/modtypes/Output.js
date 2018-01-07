import ModType from './ModType'

export default class Output extends ModType {

  static isOutput(val) {
    return val && val instanceof Output
  }

  static name() {
    return null
  }

  static initialFlags() {
    return 0x43
  }

}
