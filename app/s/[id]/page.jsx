import RedirectToDesignationURL from "@/components/RedirectToDesignationURL";

const Page = async ({ params }) => {
  const { id } = params;
  return <RedirectToDesignationURL id={id} />;
};

export default Page;
