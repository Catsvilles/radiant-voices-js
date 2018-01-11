import Links from '../Links'
import Module from '../Module'

const handlers = {
  CHDT: (m, { bytes }) => m.withChunkData(bytes),
  CHFF: (m, { bytes }) => m.withChunkFlags(bytes),
  CHFR: (m, { uint32 }) => m.withChunkRate(uint32),
  CHNK: m => m,
  CHNM: (m, { uint32 }) => m.withChunkNumber(uint32),
  CMID: (m, { bytes }) => m.pushCtlMidiMappings(bytes),
  CVAL: (m, { uint32 }) => m.pushCtlValue(uint32),
  SCOL: (m, { color }) => m.setColor(color),
  SEND: true,
  SFIN: (m, { int32 }) => m.setFinetune(int32),
  SLNK: (m, { links }) => m.setLinks(new Links(links)),
  SMIB: (m, { int32 }) => m.setMidiInBank(int32),
  SMIC: (m, { uint32 }) => m.setMidiInChannel(uint32),
  SMIN: (m, { cstring }) => m.setMidiOutName(cstring),
  SMIP: (m, { int32 }) => m.setMidiInProgram(int32),
  SNAM: (m, { fixedString }) => m.setName(fixedString),
  SREL: (m, { int32 }) => m.setRelativeNote(int32),
  SSCL: (m, { uint32 }) => m.setScale(uint32),
  STYP: (m, { cstring }) => m.setType(cstring).setFlags(m.flags).prepareForCvals(),
  SVPR: (m, { uint32 }) => m.setVisualization(uint32),
  SXXX: (m, { int32 }) => m.setX(int32),
  SYYY: (m, { int32 }) => m.setY(int32),
  SZZZ: (m, { uint32 }) => m.setLayer(uint32),
}

export default (chunks, { moduleFlags }) => {
  let module = new Module().setFlags(moduleFlags)
  while (true) {
    const chunk = chunks.next()
    const { value, done } = chunk
    if (done) {
      return
    }
    const { type, data } = value
    const { [type]: handler } = handlers
    if (handler) {
      if (handler === true) {
        return module.finalizeCvals()
      }
      module = handler(module, data)
    } else {
      console.log(`readModule: no handler for "${type}"`)
    }
  }
}
