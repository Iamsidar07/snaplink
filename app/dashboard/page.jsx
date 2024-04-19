import { DataTable } from "./data-table";
import { columns } from "./columns";
import ShortUrlForm from "@/components/ShortUrlForm";
import RenderQrCode from "@/components/RenderQrCode";
async function getData() {
  // Fetch data from your API here.
  return [
    {
      id: "728ed52f",
      shortUrl: 100,
      originalUrl: "pending",
      date: "m@example.com",
      clicks: 1,
      qrCode: <RenderQrCode url="/" />,
    },
    // ...
  ];
}
export default async function Page() {
  const data = await getData();

  return (
    <div className="container">
      <div className="max-w-lg mx-auto mb-12">
        <ShortUrlForm />
      </div>
      <DataTable columns={columns} data={data} />
    </div>
  );
}
