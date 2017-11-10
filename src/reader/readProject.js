import Project from '../Project'

const handlers = {
  VERS: (project, chunks, { version }) => project.setSunvoxVersion(version),
}

export default chunks => {
  let project = Project.empty()
  for (const chunk of chunks) {
    const { type, data } = chunk
    const { [type]: handler } = handlers
    if (handler) {
      project = handler(project, chunks, data)
    }
  }
  return project
}
