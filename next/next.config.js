/**
 * @type {import("next").NextConfig}
 */

const NextConfig = {
  basePath: '/apply',
  images: {
    domains: [
      "ucpbucket.s3.us-east-2.amazonaws.com",
      "www.countryflags.io",
      "cdn.kcak11.com",
      "flagcdn.com"
    ]
  },
  eslint: {
    dirs: ["frontend"],
  },
  reactStrictMode: true,
  poweredByHeader: false,
  webpack: (config, { dev, isServer }) => {
    if (!dev && !isServer) {
      Object.assign(config.resolve.alias, {
        "react": "preact/compat",
        "react-dom": "preact/compat",
        "react-dom/test-utils": "preact/test-utils",
      })
    }
    return config
  }
}

module.exports = NextConfig;
