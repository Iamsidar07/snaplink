import Dashboard from "@/components/Dashboard";
import { constructMetadata } from "@/utils";
export const metadata = constructMetadata({
  title: "Dashboard",
});
export default function Page() {
  return <Dashboard />;
}
