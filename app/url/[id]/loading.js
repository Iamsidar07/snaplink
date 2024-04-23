export default function Loading() {
  return (
    <div className="w-full h-full max-w-[1440px] mx-auto pb-6">
      <div className="flex items-center gap-2 mb-4">
        <h3 className="md:text-lg">Insights</h3>
      </div>
      <div className="flex flex-col md:flex-row md:items-stretch gap-6 ">
        <div className="w-full border rounded-lg h-64 bg-gray-100 animate-pulse"></div>
        <div className="w-full md:max-w-sm border p-2 rounded-lg h-64 bg-gray-100 animate-pulse"></div>
      </div>
      <div className="flex items-center gap-2 my-3 md:my-6">
        <h3 className="md:text-lg">Customization</h3>
      </div>
      <div className="h-64 w-full bg-gray-100 animate-pulse" />
    </div>
  );
}
