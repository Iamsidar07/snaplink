import Analytics from "@/components/dashboard/Analytics";
import BrowserAnalytics from "@/components/dashboard/BrowserAnalytics";
import DeviceAnalytics from "@/components/dashboard/DeviceAnalytics";
import LocationAnalytics from "@/components/dashboard/LocationAnalytics";

const page = async () => {
  return (
    <div className="p-5 grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-6">
      <Analytics />
      <LocationAnalytics />
      <DeviceAnalytics />
    </div>
  );
};

export default page;
