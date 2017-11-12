import Modules from '../Modules'
import Project from '../Project'
import readPattern from './readPattern'
import readModule from './readModule'

const handlers = {
  VERS: (p, _, { version }) => p.setSunvoxVersion(version),
  'BPM ': (p, _, { uint32 }) => p.setInitialBpm(uint32),
  SPED: (p, _, { uint32 }) => p.setInitialTpl(uint32),
  GVOL: (p, _, { uint32 }) => p.setGlobalVolume(uint32),
  NAME: (p, _, { cstring }) => p.setName(cstring),
  PDTA: (p, chunks, data) => p.pushPattern(readPattern(chunks, data)),
  PEND: p => p.pushPattern(null),
  SFFF: (p, chunks, data) => p.pushModule(readModule(chunks, data)),
  SEND: p => p.pushModule(null),
}

export default chunks => {
  let project = Project.empty().set('modules', Modules.empty())
  for (const chunk of chunks) {
    const { type, data } = chunk
    const { [type]: handler } = handlers
    if (handler) {
      project = handler(project, chunks, data)
    } else {
      console.log(`readProject: no handler for "${type}"`)
    }
  }
  return project
}
