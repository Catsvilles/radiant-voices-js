import { Map } from 'extendable-immutable'

export default class PatternAppearanceFlags extends Map {

  static isPatternAppearanceFlags(val) {
    return val && val instanceof PatternAppearanceFlags
  }

  static fromUint32(value) {
    return new PatternAppearanceFlags({
      noIcon: !!(value & 0x1),
    })
  }

  toUint32() {
    return [
      !!this.get('noIcon') * 0x1,
    ].reduce((x, y) => x + y)
  }

  get noIcon() {
    return !!this.get('noIcon')
  }

  setNoIcon(value) {
    return this.set('noIcon', !!value)
  }
}
