import RedirectToDesignationURL from "@/components/RedirectToDesignationURL";
import { constructMetadata } from "@/lib/utils";
export const metadata = constructMetadata({
  title: "Redirecting to designation",
});
const RedirectionPage = async ({ params }) => {
  const { shortUrlId } = params;
  return <RedirectToDesignationURL id={shortUrlId} />;
};

export default RedirectionPage;
