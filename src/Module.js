import { Map } from 'extendable-immutable'
import Color from './Color'
import ControllerValues from './ControllerValues'
import Links from './Links'
import ModuleFlags from './ModuleFlags'
import m from './modtypes'

export default class Module extends Map {

  constructor(...props) {
    super({
      flags: ModuleFlags.fromUint32(0),
      name: '',
      type: null,
      finetune: 0,
      relativeNote: 0,
      x: 512,
      y: 512,
      color: new Color({ r: 255, g: 255, b: 255 }),
      midiInChannel: 0,
      midiInBank: -1,
      midiInProgram: -1,
      links: new Links(),
      controllerValues: new ControllerValues(),
      ...props,
    })
  }

  static isModule(val) {
    return val && val instanceof Module
  }

  get color() {
    return this.get('color')
  }

  setColor(color) {
    return this.mergeIn(['color'], color)
  }

  get controllerValues() {
    return this.get('controllerValues')
  }

  pushControllerValue(uint32) {
    return this.set('controllerValues', this.controllerValues.push(uint32))
  }

  get finetune() {
    return this.get('finetune')
  }

  setFinetune(int32) {
    return this.set('finetune', int32)
  }

  get flags() {
    return this.get('flags')
  }

  setFlags(moduleFlags) {
    return this.mergeIn(['flags'], moduleFlags)
  }

  get links() {
    return this.get('links')
  }

  setLinks(links) {
    return this.set('links', links)
  }

  get midiInChannel() {
    return this.get('midiInChannel')
  }

  setMidiInChannel(uint32) {
    return this.set('midiInChannel', uint32)
  }

  get midiInBank() {
    return this.get('midiInBank')
  }

  setMidiInBank(int32) {
    return this.set('midiInBank', int32)
  }

  get midiInProgram() {
    return this.get('midiInProgram')
  }

  setMidiInProgram(int32) {
    return this.set('midiInProgram', int32)
  }

  get name() {
    return this.get('name')
  }

  setName(val) {
    return this.set('name', val)
  }

  get ctls() {
    return this.type.ctls
  }

  setCtls(ctls) {
    return this.set('type', this.type.setCtls(ctls))
  }

  get options() {
    return this.type.options
  }

  setOptions(options) {
    return this.set('type', this.type.setOptions(options))
  }

  get relativeNote() {
    return this.get('relativeNote')
  }

  setRelativeNote(int32) {
    return this.set('relativeNote', int32)
  }

  get type() {
    return this.get('type')
  }

  setType(Type) {
    if (typeof Type === 'string') {
      Type = m.typeClassMap[Type]
    }
    return this.set('type', new Type())
  }

  get x() {
    return this.get('x')
  }

  setX(int32) {
    return this.set('x', int32)
  }

  get y() {
    return this.get('y')
  }

  setY(int32) {
    return this.set('y', int32)
  }

  withChunkNumber(uint32) {
    return this.type ? this.set('type', this.type.withChunkNumber(uint32)) : this
  }

  withChunkData(bytes) {
    return this.type ? this.set('type', this.type.withChunkData(bytes)) : this
  }

  withChunkFlags(bytes) {
    return this.type ? this.set('type', this.type.withChunkFlags(bytes)) : this
  }

  withChunkRate(uint32) {
    return this.type ? this.set('type', this.type.withChunkRate(uint32)) : this
  }

}
