import ModType from './ModType'

export default class Feedback extends ModType {

  static isFeedback(val) {
    return val && val instanceof Feedback
  }

  static name() {
    return 'Feedback'
  }

}
