import ModType from './ModType'

export default class Sound2Ctl extends ModType {

  static isSound2Ctl(val) {
    return val && val instanceof Sound2Ctl
  }

  static name() {
    return 'Sound2Ctl'
  }

}
