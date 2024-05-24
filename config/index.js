const config = {
  domain: process.env.NEXT_PUBLIC_DOMAIN,
  mongodbUri: process.env.MONGODB_URI,
  cloudinaryApiKey: process.env.CLOUDINARY_API_KEY,
  cloudinarySecretKey: process.env.CLOUDINARY_SECRET_KEY,
  cloudinaryCloudName: process.env.CLOUDINARY_CLOUD_NAME,
  productHuntBadge:
    "https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=453724&theme=light",
  dubMetatagEndpointUrl: "https://app.dub.co/api/metatags",
  locationEndpoint: "https://ipapi.co/json/",
};

export default config;
