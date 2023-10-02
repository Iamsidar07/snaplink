"use client";
import { BsLink45Deg } from "react-icons/bs";
import Button from "./Button";
import { useEffect, useState } from "react";
import ToggleButton from "./ToggleButton";
const Form = () => {
  const [url, setUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [isAutoPaste, setIsAutoPaste] = useState(false);
  const [shortenUrl, setShortenUrl] = useState("");

  useEffect(() => {
    if (!isAutoPaste) return;
    const autoPaste = async () => {
      try {
        const url = await navigator.clipboard.readText();
        setUrl(url);
      } catch (error: any) {
        console.log("Something went wrong", error.message);
      }
    };
    autoPaste();
  }, [isAutoPaste]);

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isLoading || !url) return;
    setIsLoading(true);
    setErrorMsg("");
    setShortenUrl("");
    try {
      const res = await fetch("/api/shorturl", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ url }),
      });
      const data = await res.json();
      setShortenUrl(data.short_url);
    } catch (error: any) {
      console.log(error.message);
      setErrorMsg(error.message);
    } finally {
      setUrl("");
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center flex-col gap-2 sm:gap-6">
      <form
        onSubmit={handleFormSubmit}
        className="flex items-stretch py-2 pr-2 w-full   bg-[#181E29] rounded-full ring-2 mt-6 ring-[#353C4A] focus-within:brightness-125 duration-200"
      >
        <div className="flex items-center flex-1 px-4">
          <BsLink45Deg size={25} />
          <input
            value={shortenUrl ? shortenUrl : url}
            onChange={(e) => setUrl(e.target.value)}
            type="text"
            className="flex-1 rounded-full px-4 bg-transparent outline-none"
            placeholder="Shorten a link here..."
          />
        </div>
        <Button
          loading={isLoading}
          text={shortenUrl ? (isLoading ? "Copied" : "Copy url") : (isLoading ? "Shortening" : "Shoten Now!")}
          variant="primary"
          type="submit"
          onClick={() => {
            console.log("Hello", shortenUrl);
            if (shortenUrl) {
              setIsLoading(true);
              navigator.clipboard.writeText(shortenUrl);
              setTimeout(() => setIsLoading(false), 500)
            }
          }}
        />
      </form>
      {errorMsg && (
        <p className="text-red-400 text-xs text-center">{errorMsg}</p>
      )}
      <div className="flex items-center gap-2">
        <ToggleButton
          setIsAutoPaste={setIsAutoPaste}
          isAutoPaste={isAutoPaste}
        />
        <p>Auto paste from clipboard.</p>
      </div>
    </div>
  );
};

export default Form;
