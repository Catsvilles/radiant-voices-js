import { Map } from 'extendable-immutable'

export default class ModType extends Map {

  static isModType(val) {
    return val && val instanceof ModType
  }

  static name() {
    return null
  }

  get name() {
    return this.constructor.name()
  }

  get ctls() {
    return this.get('ctls')
  }

  setCtls(ctls) {
    return this.set('ctls', ctls)
  }

  get options() {
    return this.get('options')
  }

  setOptions(options) {
    return this.set('options', options)
  }

  get _chnm() {
    return this.get('_chnm')
  }

  withChunkNumber(uint32) {
    return this.set('_chnm', uint32)
  }

  withChunkData(bytes) {
    return this
  }

  withChunkFlags(bytes) {
    return this
  }

  withChunkRate(uint32) {
    return this
  }

}
