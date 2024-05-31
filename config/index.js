const config = {
  domain: process.env.NEXT_PUBLIC_DOMAIN,
  mongodbUri: process.env.DATABASE_URL,
  productHuntBadge: process.env.PRODUCT_HUNT_BADGE,
  dubMetatagEndpointUrl: process.env.DUB_METATAG_ENDPOINT,
  locationEndpoint: process.env.LOCATION_ENDPOINT,
  googleClientSecret: process.env.GOOGLE_SECRET,
  googleClientId: process.env.GOOGLE_ID,
  githubClientSecret: process.env.GITHUB_SECRET,
  githubClientId: process.env.GITHUB_ID,
};

export default config;
