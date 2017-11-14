import ModType from './ModType'

export default class Sampler extends ModType {

  static isSampler(val) {
    return val && val instanceof Sampler
  }

  static name() {
    return 'Sampler'
  }

}
