const {
  PHASE_DEVELOPMENT_SERVER,
  PHASE_PRODUCTION_BUILD,
} = require('next/constants')

module.exports = (phase) => {
  // when started in development mode `next dev` or `npm run dev` regardless of the value of STAGING environmental variable
  const isDev = phase === PHASE_DEVELOPMENT_SERVER
  // when `next build` or `npm run build` is used
  const isProd = phase === PHASE_PRODUCTION_BUILD && process.env.STAGING !== '1';

  const env = {
    POSTS_DIR: (() => {
      if (isDev) return process.env.LOCAL_POSTS_DIR;
      return 'tmp/posts';
    })()
  }

  console.log(env.POSTS_DIR)

  /**
   * The domains that are allowed when using next/image
   */
  const images = {
    domains: [`${IMG_S3_BUCKET}.s3.${S3_REGION}.amazonaws.com`],
  }

  return {
    env,
    images
  }
}
