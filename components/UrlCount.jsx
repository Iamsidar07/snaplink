import config from "@/config";

const getShortenUrlCount = async () => {
  try {
    const res = await fetch(`${config.domain}/api/countLinks`, {
      cache: "no-cache",
    });
    if (res.status === 500) {
      return 0;
    }

    return await res.json();
  } catch (error) {
    console.log(error?.message);
    return 0;
  }
};

const UrlCount = async () => {
  const count = await getShortenUrlCount();
  return (
    <div className={"relative pt-12 md:pt-24"}>
      <div className="w-52 h-52 absolute left-1/2 top-1/2 filter blur-[12rem] bg-gradient-to-r from-teal-950 to-transparent" />
      <h4
        className={
          "headline text-center text-3xl !leading-normal  md:text-6xl md:leading-tight capitalize"
        }
      >
        Over{" "}
        <span
          className={
            "inline-block text-[#ECA23E] px-1 mx-1.5 sm:px-4 relative font-bold border-b border-dashed"
          }
        >
          {count?.toLocaleString() ?? 0}
        </span>{" "}
        URL&apos;s Shortened <br /> and Counting!
      </h4>
    </div>
  );
};

export default UrlCount;
