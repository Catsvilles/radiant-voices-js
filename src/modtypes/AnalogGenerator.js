import ModType from './ModType'

export default class AnalogGenerator extends ModType {

  static isAnalogGenerator(val) {
    return val && val instanceof AnalogGenerator
  }

  static name() {
    return 'Analog generator'
  }

}
