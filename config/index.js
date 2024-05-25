const config = {
  domain: process.env.NEXT_PUBLIC_DOMAIN,
  mongodbUri: process.env.MONGODB_URI,
  productHuntBadge:
    "https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=453724&theme=light",
  dubMetatagEndpointUrl: "https://app.dub.co/api/metatags",
  locationEndpoint: "https://ipapi.co/json/",
};

export default config;
