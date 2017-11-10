import { chunks } from './index'

export default function *synthChunks(project) {
  const {
    sunvoxVersion,
    module,
  } = project
  yield { type: 'SSYN', data: { empty: true } }
  yield { type: 'VERS', data: { version: sunvoxVersion.toJS() } }
  for (let chunk of chunks(module)) {
    yield chunk
  }
  yield { type: 'SEND', data: { empty: true } }
}
