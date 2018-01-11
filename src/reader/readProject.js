import Modules from '../Modules'
import Project from '../Project'
import readPattern from './readPattern'
import readPatternClone from './readPatternClone'
import readModule from './readModule'

const handlers = {
  'BPM ': (p, { uint32 }) => p.setInitialBpm(uint32),
  BVER: (p, { version }) => p.setBasedOnVersion(version),
  CURL: (p, { uint32 }) => p.setModulesCurrentLayer(uint32),
  GVOL: (p, { uint32 }) => p.setGlobalVolume(uint32),
  LGEN: (p, { uint32 }) => p.setLastSelectedGenerator(uint32),
  LMSK: (p, { uint32 }) => p.setModulesLayerMask(uint32),
  MSCL: (p, { uint32 }) => p.setModulesScale(uint32),
  MXOF: (p, { int32 }) => p.setModulesXOffset(int32),
  MYOF: (p, { int32 }) => p.setModulesYOffset(int32),
  MZOO: (p, { uint32 }) => p.setModulesZoom(uint32),
  NAME: (p, { cstring }) => p.setName(cstring),
  PATN: (p, { uint32 }) => p.setCurrentPattern(uint32),
  PATT: (p, { uint32 }) => p.setCurrentTrack(uint32),
  PATL: (p, { uint32 }) => p.setCurrentLine(uint32),
  SELS: (p, { uint32 }) => p.setSelectedModule(uint32),
  SPED: (p, { uint32 }) => p.setInitialTpl(uint32),
  TGRD: (p, { uint32 }) => p.setTimeGrid(uint32),
  TGD2: (p, { uint32 }) => p.setTimeGrid2(uint32),
  TIME: (p, { int32 }) => p.setTimelinePosition(int32),
  VERS: (p, { version }) => p.setSunvoxVersion(version),
  //
  PDTA: (p, data, chunks) => p.pushPattern(readPattern(chunks, data)),
  PPAR: (p, data, chunks) => p.pushPattern(readPatternClone(chunks, data)),
  PEND: p => p.pushPattern(null),
  //
  SFFF: (p, data, chunks) => p.pushModule(readModule(chunks, data)),
  SEND: p => p.pushModule(null),
}

export default chunks => {
  let project = new Project({ modules: new Modules() })
  for (const chunk of chunks) {
    const { type, data } = chunk
    const { [type]: handler } = handlers
    if (handler) {
      project = handler(project, data, chunks)
    } else {
      console.log(`readProject: no handler for "${type}"`)
    }
  }
  return project
}
