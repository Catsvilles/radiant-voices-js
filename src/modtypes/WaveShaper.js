import ModType from './ModType'

export default class WaveShaper extends ModType {

  static isWaveShaper(val) {
    return val && val instanceof WaveShaper
  }

  static name() {
    return 'WaveShaper'
  }

}
