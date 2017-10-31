import Module from '../Module'
import Pattern from '../Pattern'
import Project from '../Project'
import moduleChunks from './moduleChunks'
import patternChunks from './patternChunks'
import projectChunks from './projectChunks'
import fromIffBuffer from './fromIffBuffer'
import toIffBuffer from './toIffBuffer'

export function chunks(obj) {
  if (Module.isModule(obj)) {
    return moduleChunks(obj)
  } else if (Pattern.isPattern(obj)) {
    return patternChunks(obj)
  } else if (Project.isProject(obj)) {
    return projectChunks(obj)
  }
}

export { fromIffBuffer, toIffBuffer }
