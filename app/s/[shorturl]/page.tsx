import RedirectingPage from "@/components/RedirectingPage";
import { Metadata } from "next";
interface RedirectPageProps {
  params: {
    shorturl: string;
  };
}
export const metadata: Metadata = {
  title: "Redirecting...",
  description: "Redirecting to your destination...",
}
const RedirectPage = ({ params }: RedirectPageProps) => {
  const { shorturl } = params;
 
  return (
    <RedirectingPage shorturl={ shorturl }  />
  );
};

export default RedirectPage;
