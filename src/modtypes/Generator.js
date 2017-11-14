import ModType from './ModType'

export default class Generator extends ModType {

  static isGenerator(val) {
    return val && val instanceof Generator
  }

  static name() {
    return 'Generator'
  }

}
