import ModType from './ModType'

export default class Input extends ModType {

  static isInput(val) {
    return val && val instanceof Input
  }

  static name() {
    return 'Input'
  }

}
