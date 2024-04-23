import Redirection from "@/components/Redirection";
import config from "@/config/config";
import { constructMetadata } from "@/utils";

export const generateMetadata = async ({ params }) => {
  const id = params.id;
  const res = await fetch(`${config.domain}/api/actualUrl?id=${id}`);
  const data = await res.json();
  return constructMetadata({
    title: data?.metadata?.title,
    description: data?.metadata?.description,
    image: data?.metadata?.ogCover ?? "/thumbnail.png",
  });
};

const Page = ({ params }) => {
  const id = params.id;

  return <Redirection id={id} />;
};

export default Page;
