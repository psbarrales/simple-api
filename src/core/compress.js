import compress from 'koa-compress'

function use() {
  console.debug('[core] requiring Compress')
  return compress({
    filter,
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

function filter(contentType) {
  return /text/i.test(contentType)
}

export default {
  use,
}

// For testing purpose
export { filter as __filter }
