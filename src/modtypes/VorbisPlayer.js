import ModType from './ModType'

export default class VorbisPlayer extends ModType {

  static isVorbisPlayer(val) {
    return val && val instanceof VorbisPlayer
  }

  static name() {
    return 'Vorbis player'
  }

}
