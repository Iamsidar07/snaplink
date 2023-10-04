"use client";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { ImSpinner2 } from "react-icons/im";
import useSWR from "swr";
interface Props {
  shorturl: string;
}

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const RedirectingPage = ({ shorturl }: Props) => {
  const router = useRouter();
  const { data, error, isLoading } = useSWR(
    `/api/shorturl/${shorturl}`,
    fetcher,
  );
  if (error) return toast.error(error.message);
  if (data) {
    router.push(data.result);
  }
  return (
    <main className="grid place-items-center min-h-[calc(100vh_-_91px)] ">
      <div className="flex flex-col items-center gap-2">
        <ImSpinner2 size={35} className={`${isLoading && "animate-spin"}`} />
        <h1 className="text-3xl font-bold">Redirecting...</h1>
      </div>
    </main>
  );
};

export default RedirectingPage;
