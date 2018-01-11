'use strict'

const crypto = require('crypto')
const sunvox = require('sunvox-dll-node')

const flags = sunvox.SV_INIT_FLAG_USER_AUDIO_CALLBACK | sunvox.SV_INIT_FLAG_ONE_THREAD | sunvox.SV_INIT_FLAG_AUDIO_INT16

const framesPerBlock = 4096
const bytesPerFrame = 2 * 2
const buffer = new Buffer(framesPerBlock * bytesPerFrame)

sunvox.sv_init(null, 44100, 2, flags)

process.on('message', msg => {
  const {
    open,
  } = msg
  if (open) {
    console.log({ open })
    sunvox.sv_open_slot(0)
    sunvox.sv_load(0, open)
    const frames = sunvox.sv_get_song_length_frames(0)
    process.send({ frames })
    let currentFrame = 0
    sunvox.sv_play_from_beginning(0)
    while (currentFrame < frames) {
      const ticks = sunvox.sv_get_ticks()
      sunvox.sv_audio_callback(buffer, framesPerBlock, 0, ticks)
      const hash = crypto.createHash('sha256')
      hash.update(buffer)
      const digest = hash.digest('hex')
      process.send({ digest })
      currentFrame += framesPerBlock
    }
    process.exit()
  }
})

setInterval(() => true, 250)
