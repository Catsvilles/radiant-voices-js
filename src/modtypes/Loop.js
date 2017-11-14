import ModType from './ModType'

export default class Loop extends ModType {

  static isLoop(val) {
    return val && val instanceof Loop
  }

  static name() {
    return 'Loop'
  }

}
