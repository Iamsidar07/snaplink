import Image from "next/image";

const UrlCount = () => {
  const { data: totalUrlCreated } = useQuery({
    queryKey: ["urlCount"],
    queryFn: async () => {
      const res = await axios.get("/api/urlCount");
      return res.data;
    },
    retry: true,
    retryDelay: 100,
  });
  return (
    <div className={"relative"}>
      <h4
        className={
          "headline text-center !leading-normal  md:text-6xl md:leading-tight"
        }
      >
        Over{" "}
        <span
          className={"inline-block text-[#ECA23E] px-1 mx-1.5 sm:px-4 relative"}
        >
          {totalUrlCreated?.toLocaleString() ?? 0}
          <Image
            src={"/underline.png"}
            alt="url count"
            width={797}
            height={78}
            className="absolute bottom-0 inset-x-0 w-full"
          />
        </span>{" "}
        URL&apos;s Shortened <br /> and Counting!
      </h4>
    </div>
  );
};
export default UrlCount;
