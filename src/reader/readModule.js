import Links from '../Links'
import Module from '../Module'

const handlers = {
  SNAM: (m, { fixedString }) => m.setName(fixedString),
  STYP: (m, { cstring }) => m.setType(cstring).setFlags(m.flags).prepareForCvals(),
  SFIN: (m, { int32 }) => m.setFinetune(int32),
  SREL: (m, { int32 }) => m.setRelativeNote(int32),
  SXXX: (m, { int32 }) => m.setX(int32),
  SYYY: (m, { int32 }) => m.setY(int32),
  SCOL: (m, { color }) => m.setColor(color),
  SMIC: (m, { uint32 }) => m.setMidiInChannel(uint32),
  SMIB: (m, { int32 }) => m.setMidiInBank(int32),
  SMIP: (m, { int32 }) => m.setMidiInProgram(int32),
  SLNK: (m, { links }) => m.setLinks(new Links(links)),
  CVAL: (m, { uint32 }) => m.pushCtlValue(uint32),
  CHNK: m => m,
  CHNM: (m, { uint32 }) => m.withChunkNumber(uint32),
  CHDT: (m, { bytes }) => m.withChunkData(bytes),
  CHFF: (m, { bytes }) => m.withChunkFlags(bytes),
  CHFR: (m, { uint32 }) => m.withChunkRate(uint32),
  SEND: true,
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
