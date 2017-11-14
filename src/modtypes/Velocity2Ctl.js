import ModType from './ModType'

export default class Velocity2Ctl extends ModType {

  static isVelocity2Ctl(val) {
    return val && val instanceof Velocity2Ctl
  }

  static name() {
    return 'Velocity2Ctl'
  }

}
