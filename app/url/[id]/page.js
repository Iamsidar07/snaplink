import UrlInsights from "@/components/UrlInsights";
import { constructMetadata } from "@/utils";
export const metadata = constructMetadata({
  title: "Insights | Snaplink"
});

const Page = ({ params }) => {
  const id = params.id;

  return <UrlInsights id={id} />;
};
export default Page;
