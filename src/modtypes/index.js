import Amplifier from './Amplifier'
import AnalogGenerator from './AnalogGenerator'
import Compressor from './Compressor'
import DcBlocker from './DcBlocker'
import Delay from './Delay'
import Distortion from './Distortion'
import DrumSynth from './DrumSynth'
import Echo from './Echo'
import EQ from './EQ'
import Feedback from './Feedback'
import Filter from './Filter'
import FilterPro from './FilterPro'
import Flanger from './Flanger'
import FM from './FM'
import Generator from './Generator'
import Glide from './Glide'
import GPIO from './GPIO'
import Input from './Input'
import Kicker from './Kicker'
import LFO from './LFO'
import Loop from './Loop'
import MetaModule from './MetaModule'
import Modulator from './Modulator'
import MultiCtl from './MultiCtl'
import MultiSynth from './MultiSynth'
import Output from './Output'
import Pitch2Ctl from './Pitch2Ctl'
import PitchShifter from './PitchShifter'
import Reverb from './Reverb'
import Sampler from './Sampler'
import Sound2Ctl from './Sound2Ctl'
import SpectraVoice from './SpectraVoice'
import Velocity2Ctl from './Velocity2Ctl'
import Vibrato from './Vibrato'
import VocalFilter from './VocalFilter'
import VorbisPlayer from './VorbisPlayer'
import WaveShaper from './WaveShaper'

const typeClassMap = {
  [Amplifier.name()]: Amplifier,
  [AnalogGenerator.name()]: AnalogGenerator,
  [Compressor.name()]: Compressor,
  [DcBlocker.name()]: DcBlocker,
  [Delay.name()]: Delay,
  [Distortion.name()]: Distortion,
  [DrumSynth.name()]: DrumSynth,
  [Echo.name()]: Echo,
  [EQ.name()]: EQ,
  [Feedback.name()]: Feedback,
  [Filter.name()]: Filter,
  [FilterPro.name()]: FilterPro,
  [Flanger.name()]: Flanger,
  [FM.name()]: FM,
  [Generator.name()]: Generator,
  [Glide.name()]: Glide,
  [GPIO.name()]: GPIO,
  [Input.name()]: Input,
  [Kicker.name()]: Kicker,
  [LFO.name()]: LFO,
  [Loop.name()]: Loop,
  [MetaModule.name()]: MetaModule,
  [Modulator.name()]: Modulator,
  [MultiCtl.name()]: MultiCtl,
  [MultiSynth.name()]: MultiSynth,
  [Output.name()]: Output,
  [Pitch2Ctl.name()]: Pitch2Ctl,
  [PitchShifter.name()]: PitchShifter,
  [Reverb.name()]: Reverb,
  [Sampler.name()]: Sampler,
  [Sound2Ctl.name()]: Sound2Ctl,
  [SpectraVoice.name()]: SpectraVoice,
  [Velocity2Ctl.name()]: Velocity2Ctl,
  [Vibrato.name()]: Vibrato,
  [VocalFilter.name()]: VocalFilter,
  [VorbisPlayer.name()]: VorbisPlayer,
  [WaveShaper.name()]: WaveShaper,
}

export default {
  Amplifier,
  AnalogGenerator,
  Compressor,
  DcBlocker,
  Delay,
  Distortion,
  DrumSynth,
  Echo,
  EQ,
  Feedback,
  Filter,
  FilterPro,
  Flanger,
  FM,
  Generator,
  Glide,
  GPIO,
  Input,
  Kicker,
  LFO,
  Loop,
  MetaModule,
  Modulator,
  MultiCtl,
  MultiSynth,
  Output,
  Pitch2Ctl,
  PitchShifter,
  Reverb,
  Sampler,
  Sound2Ctl,
  SpectraVoice,
  Velocity2Ctl,
  Vibrato,
  VocalFilter,
  VorbisPlayer,
  WaveShaper,
  typeClassMap,
}
