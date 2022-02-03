import compress from 'koa-compress'

function use() {
  console.debug('[core] requiring Compress')
  return compress({
    filter(contentType) {
      return /text/i.test(contentType)
    },
    threshold: 2048,
    gzip: {
      flush: require('zlib').constants.Z_SYNC_FLUSH,
    },
    deflate: {
      flush: require('zlib').constants.Z_SYNC_FLUSH,
    },
    br: false, // disable brotli
  })
}

export default {
  use,
}
