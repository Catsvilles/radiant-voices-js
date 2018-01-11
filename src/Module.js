import { List, Map } from 'extendable-immutable'
import Color from './Color'
import Links from './Links'
import ModuleFlags from './ModuleFlags'
import m from './modtypes'

export default class Module extends Map {

  constructor(...props) {
    super({
      color: new Color({ r: 255, g: 255, b: 255 }),
      finetune: 0,
      flags: ModuleFlags.fromUint32(0),
      layer: 0,
      links: new Links(),
      midiInBank: -1,
      midiInChannel: 0,
      midiInProgram: -1,
      midiOutName: null,
      name: '',
      relativeNote: 0,
      scale: 256,
      type: null,
      visualization: 0xc0101,
      x: 512,
      y: 512,
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

  get ctlValues() {
    return (this.type && this.type.ctls) ? this.type.ctls.data : new List()
  }

  pushCtlValue(uint32) {
    return this.set('type', this.type.setCtls(this.type.ctls.setData(this.ctlValues.push(uint32))))
  }

  get midiMappings() {
    return this.type && this.type.ctls && this.type.ctls.midiMappings
  }

  pushCtlMidiMappings(allBytes) {
    let newMappings = this.midiMappings
    allBytes = new List(allBytes)
    for (let i = 0; i < allBytes.size / 8; ++i) {
      newMappings = newMappings.push(allBytes.slice(i * 8, (i + 1) * 8))
    }
    return this.set('type', this.type.setCtls(this.type.ctls.setMidiMappings(newMappings)))
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

  get midiOutName() {
    return this.get('midiOutName')
  }

  setMidiOutName(cstring) {
    return this.set('midiOutName', cstring)
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
    let updated = this.set('type', new Type())
    if (Type.initialFlags) {
      updated.setFlags(ModuleFlags.fromUint32(Type.initialFlags()))
    }
    return updated
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

  get layer() {
    return this.get('layer')
  }

  setLayer(uint32) {
    return this.set('layer', uint32)
  }

  get scale() {
    return this.get('scale')
  }

  setScale(uint32) {
    return this.set('scale', uint32)
  }

  get visualization() {
    return this.get('visualization')
  }

  setVisualization(uint32) {
    return this.set('visualization', uint32)
  }

  prepareForCvals() {
    return this.type.ctls ? this.set('type', this.type.setCtls(this.type.ctls.prepareForCvals())) : this
  }

  finalizeCvals() {
    return (this.type && this.type.ctls) ? this.set('type', this.type.setCtls(this.type.ctls.finalizeCvals())) : this
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
