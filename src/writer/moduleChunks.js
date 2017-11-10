export default function *moduleChunks(module) {
}
        // if in_project is None:
        //     in_project = self.parent is not None
        // yield (b'SFFF', pack('<I', self.flags))
        // yield (b'SNAM', self.name.encode(ENCODING)[:32].ljust(32, b'\0'))
        // if self.mtype is not None and self.mtype != 'Output':
        //     yield (b'STYP', self.mtype.encode(ENCODING) + b'\0')
        // yield (b'SFIN', pack('<i', self.finetune))
        // yield (b'SREL', pack('<i', self.relative_note))
        // if in_project:
        //     yield (b'SXXX', pack('<i', self.x))
        //     yield (b'SYYY', pack('<i', self.y))
        //     yield (b'SZZZ', pack('<i', self.layer))
        // yield (b'SSCL', pack('<I', self.scale))
        // if in_project:
        //     yield (b'SVPR', pack('<I', self.visualization))
        // yield (b'SCOL', pack('BBB', *self.color))
        // yield (b'SMIC', pack('<i', self.midi_out_channel))
        // yield (b'SMIB', pack('<i', self.midi_out_bank))
        // yield (b'SMIP', pack('<i', self.midi_out_program))
