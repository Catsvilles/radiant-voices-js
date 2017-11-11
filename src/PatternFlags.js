import { Map } from 'extendable-immutable'

export default class PatternFlags extends Map {

  static isPatternAppearanceFlags(val) {
    return val && val instanceof PatternFlags
  }

  static fromUint32(value) {
    return new PatternFlags({
      clone: !!(value & 0x1),
      selected: !!(value & 0x2),
      mute: !!(value & 0x8),
      solo: !!(value & 0x10),
    })
  }

  toUint32() {
    return [
      !!this.get('clone') * 0x1,
      !!this.get('selected') * 0x2,
      !!this.get('mute') * 0x8,
      !!this.get('solo') * 0x10,
    ].reduce((x, y) => x + y)
  }

  get clone() {
    return this.get('clone')
  }

  setClone(value) {
    return this.set('clone', !!value)
  }

  get selected() {
    return this.get('selected')
  }

  setSelected(value) {
    return this.set('selected', !!value)
  }

  get mute() {
    return this.get('mute')
  }

  setMute(value) {
    return this.set('mute', !!value)
  }

  get solo() {
    return this.get('solo')
  }

  setSolo(value) {
    return this.set('solo', !!value)
  }

}
