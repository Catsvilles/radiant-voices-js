import readProject from './readProject'
import readSynth from './readSynth'

export default chunks => {
  const { value: { type } = {} } = chunks.next()
  switch (type) {
    case 'SVOX':
      return readProject(chunks)
    case 'SSYN':
      return readSynth(chunks)
  }
}
