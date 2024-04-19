import { DataTable } from "./data-table";
import { columns } from "./columns";
async function getData() {
  // Fetch data from your API here.
  return [
    {
      id: "728ed52f",
      shortLink: 100,
      originalLink: "pending",
      date: "m@example.com",
      clicks: 1,
      qrCode: "QR",
    },
    // ...
  ];
}
export default async function Page() {
  const data = await getData();

  return (
    <div className="py-10 container">
      <DataTable columns={columns} data={data} />
    </div>
  );
}
