const bytes = 'bytes'
const color = 'color'
const cstring = 'cstring'
const empty = 'empty'
const fixedString = 'fixedString'
const int32 = 'int32'
const links = 'links'
const moduleFlags = 'moduleFlags'
const uint32 = 'uint32'
const version = 'version'
export default {
  'BPM ': uint32,
  BVER: version,
  CHDT: bytes,
  CHFF: bytes,
  CHFR: uint32,
  CHNK: uint32,
  CHNM: uint32,
  CMID: bytes,
  CURL: uint32,
  CVAL: uint32,
  GVOL: uint32,
  LGEN: uint32,
  LMSK: uint32,
  MSCL: uint32,
  MXOF: int32,
  MYOF: int32,
  MZOO: uint32,
  NAME: cstring,
  PATL: uint32,
  PATN: uint32,
  PATT: uint32,
  PBGC: color,
  PCHN: uint32,
  PDTA: bytes,
  PEND: empty,
  PFFF: bytes,
  PFGC: color,
  PFLG: bytes,
  PICO: bytes,
  PLIN: uint32,
  PNME: cstring,
  PPAR: uint32,
  PXXX: int32,
  PYSZ: uint32,
  PYYY: int32,
  SCOL: color,
  SELS: uint32,
  SEND: empty,
  SFFF: moduleFlags,
  SFIN: int32,
  SLNK: links,
  SMIB: int32,
  SMIC: uint32,
  SMII: uint32,
  SMIN: cstring,
  SMIP: int32,
  SNAM: fixedString,
  SPED: uint32,
  SREL: int32,
  SSCL: uint32,
  SSYN: empty,
  STYP: cstring,
  SVOX: empty,
  SVPR: bytes,
  SXXX: int32,
  SYYY: int32,
  SZZZ: int32,
  TGD2: uint32,
  TGRD: uint32,
  TIME: int32,
  VERS: version,
}
