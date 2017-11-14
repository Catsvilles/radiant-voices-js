import ModType from './ModType'

export default class Delay extends ModType {

  static isDelay(val) {
    return val && val instanceof Delay
  }

  static name() {
    return 'Delay'
  }

}
