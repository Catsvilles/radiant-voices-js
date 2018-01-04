import Links from '../Links'
import Module from '../Module'

const handlers = {
  SNAM: (m, _, { fixedString }) => m.setName(fixedString),
  STYP: (m, _, { cstring }) => m.setType(cstring),
  SFIN: (m, _, { int32 }) => m.setFinetune(int32),
  SREL: (m, _, { int32 }) => m.setRelativeNote(int32),
  SXXX: (m, _, { int32 }) => m.setX(int32),
  SYYY: (m, _, { int32 }) => m.setY(int32),
  SCOL: (m, _, { color }) => m.setColor(color),
  SMIC: (m, _, { uint32 }) => m.setMidiInChannel(uint32),
  SMIB: (m, _, { int32 }) => m.setMidiInBank(int32),
  SMIP: (m, _, { int32 }) => m.setMidiInProgram(int32),
  SLNK: (m, _, { links }) => m.setLinks(new Links(links)),
  CVAL: (m, _, { uint32 }) => m.pushControllerValue(uint32),
  CHNK: m => m,
  CHNM: (m, _, { uint32 }) => m.withChunkNumber(uint32),
  CHDT: (m, _, { bytes }) => m.withChunkData(bytes),
  CHFF: (m, _, { bytes }) => m.withChunkFlags(bytes),
  CHFR: (m, _, { uint32 }) => m.withChunkRate(uint32),
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
        return module
      }
      module = handler(module, chunks, data)
    } else {
      console.log(`readModule: no handler for "${type}"`)
    }
  }
}
