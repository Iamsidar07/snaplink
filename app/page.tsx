import Hero from "@/components/Hero";
import { auth } from "@clerk/nextjs/server";
interface HomeProps {
  searchParams: { [key: string]: string };
}

export const revalidate = 900;

async function fetchHistory(userId: string, sortby: string) {
  let url = `${process.env.NEXT_PUBLIC_BASE_URL}/api/all?userId=${userId}`;
  if (sortby) url = url.concat(`&sortby=${sortby}`);
  const res = await fetch(url);
  return (await res.json()).result;
}

export default async function Home({ searchParams }: HomeProps) {
  const { userId } = auth();
  const { sortby } = searchParams;
  const history = await fetchHistory(userId as string, sortby);
  return (
    <>
      <Hero historyData={history} />
    </>
  );
}
