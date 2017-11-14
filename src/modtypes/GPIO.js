import ModType from './ModType'

export default class GPIO extends ModType {

  static isGPIO(val) {
    return val && val instanceof GPIO
  }

  static name() {
    return 'GPIO'
  }

}
