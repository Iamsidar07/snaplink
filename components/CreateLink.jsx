"use client";
import React, { useEffect, useState } from "react";
import { Link, Image as ImageIcon, Loader, Globe } from "lucide-react";
import { Button, buttonVariants } from "./ui/button";
import { Input } from "./ui/input";
import Image from "next/image";
import { Label } from "./ui/label";
import axios from "axios";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useToast } from "./ui/use-toast";
import { Drawer, DrawerContent, DrawerTrigger } from "./ui/drawer";
import config from "@/config";
import { Skeleton } from "./ui/skeleton";
import generateUniqueId from "generate-unique-id";
import { FacebookIcon, LinkedInIcon, TwitterIcon } from "@/lib/svg";

const CreateLink = () => {
  const router = useRouter();
  const { toast } = useToast();
  const [designationURL, setDesignationURL] = useState("");
  const [shortLinkId, setShortLinkId] = useState("");
  const [host, setHost] = useState("");
  // metatagEndpoint

  const metatagEndpoint = new URL(config.dubMetatagEndpointUrl);
  const params = new URLSearchParams({
    url: designationURL,
  });
  metatagEndpoint.search = params;

  const {
    data: metadata,
    isLoading: isMetadataLoading,
    refetch: refetchMetadata,
  } = useQuery({
    queryKey: ["metadata", designationURL],
    queryFn: async () => {
      const res = await axios.get(metatagEndpoint.href);
      return res.data;
    },
  });
  const { mutate, isPending } = useMutation({
    mutationKey: ["createLink", designationURL],
    mutationFn: async (url) => {
      if (designationURL === "") return null;
      const res = await axios.post("/api/shortUrls", {
        originalUrl: url,
        shortUrlId: shortLinkId,
      });
      return res.data;
    },
    onSuccess: async (data) => {
      router.push("/dashboard/links");
    },
    onError: (error) => {
      return toast({
        title: error.response.data || "Something went wrong!",
        description: "Please try again after some time.",
        variant: "destructive",
      });
    },
  });
  const handleCreateLink = (e) => {
    e.preventDefault();
    mutate(designationURL);
  };

  useEffect(() => {
    if (designationURL === "") return;
    const url = new URL(designationURL);
    const id = generateUniqueId({
      length: 8,
      useLetters: true,
    });
    setShortLinkId(id);
    setHost(url.host);
    refetchMetadata();
  }, [designationURL, refetchMetadata]);

  return (
    <div>
      <Drawer>
        <DrawerTrigger asChild>
          <button
            className={buttonVariants({
              variant: "default",
            })}
          >
            Create link <Link className="hidden lg:block w-4 h-4 ml-1.5" />
          </button>
        </DrawerTrigger>
        <DrawerContent className="w-full md:max-h-[95vh] h-full max-w-screen-lg mx-auto p-0 sm:rounded-t-2xl shadow-2xl bg-background">
          <div className="grid grid-cols-1 md:grid-cols-2 divide-x md:max-h-[95vh] overflow-y-scroll md:overflow-hidden rounded-2xl">
            <div className="space-y-4 relative">
              <div className=" flex items-center justify-center h-14 sm:h-24 gap-3 rounded-tl-2xl border-b md:sticky md:top-0 z-10">
                {metadata?.image ? (
                  <Image
                    src={`https://www.google.com/s2/favicons?sz=64&domain_url=${designationURL}`}
                    alt="favicon"
                    width={30}
                    height={30}
                    className="rounded-full overflow-hidden"
                  />
                ) : (
                  <div className="w-8 h-8 rounded-full bg-zinc-900 grid place-content-center">
                    <Globe className="text-orange-400 w-5 h-5" />
                  </div>
                )}
                <h2 className="text-lg">Create a new link</h2>
              </div>
              <form onSubmit={handleCreateLink} className="space-y-3">
                <div className="space-y-3 px-4">
                  <Label htmlFor="url" className="text-sm">
                    Destination URL
                  </Label>
                  <Input
                    name="url"
                    id="url"
                    value={designationURL}
                    onChange={(e) => setDesignationURL(e.target.value)}
                    placeholder="https://ui.shadcn.com/docs/components/alert-dialog"
                  />
                </div>
                <div className="space-y-3 px-4">
                  <Label htmlFor="shortLinkId" className="text-sm">
                    Short Link
                  </Label>
                  <div className="flex items-stretch gap-1 5 border px-2 rounded text-sm">
                    <div className="flex items-center px-2 text-muted-foreground">
                      {config.domain.split("//")[1]}
                    </div>
                    <input
                      name="shortLinkId"
                      id="ShortLinkId"
                      value={shortLinkId}
                      onChange={(e) => setShortLinkId(e.target.value)}
                      className="border-0 border-l rounded-none outline-none bg-transparent px-2 py-2"
                    />
                  </div>
                </div>
                <div className="flex flex-col items-center justify-center h-14 sm:h-24  md:rounded-bl-2xl md:rounded-br-2xl z-10 mt-12 md:mt-0 md:absolute md:bottom-0 w-full border-t shadow">
                  <Button
                    disabled={isPending || designationURL.length === 0}
                    type="submit"
                    className="w-full md:max-w-sm"
                  >
                    {isPending && (
                      <Loader className="mr-2 w-4 h-4 animate-spin" />
                    )}
                    Create Link
                  </Button>
                </div>
              </form>
            </div>
            <div className="md:overflow-auto no-scrollbar bg-background">
              <div className="flex items-center justify-center h-14 sm:h-24 gap-3 rounded-tr-2xl border-b sticky  top-0 z-10 bg-background">
                <h2 className="text-lg">Social Previews</h2>
              </div>
              {metadata?.title || metadata?.description || metadata?.image ? (
                <div className="p-4 space-y-4">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <div className="border-b h-1 w-full" />
                      <div className="flex items-center ">
                        <TwitterIcon />
                        <p>Twitter</p>
                      </div>
                      <div className="border-b h-1 w-full" />
                    </div>
                    <div className="rounded-2xl overflow-hidden border relative">
                      <Image
                        src={metadata.image}
                        alt=""
                        width={1920}
                        height={720}
                        className="w-full h-full max-h-[250px] object-cover object-top"
                      />
                      <p className="truncate bg-black/75 text-white absolute bottom-4 inset-x-2 px-3 py-1 rounded-xl text-sm w-fit max-w-sm">
                        {metadata.title}
                      </p>
                    </div>
                    <p className="text-sm text-gray-500">{host}</p>
                  </div>
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <div className="border-b h-1 w-full" />
                      <div className="flex items-center ">
                        <FacebookIcon />
                        <p>Facebook</p>
                      </div>
                      <div className="border-b h-1 w-full" />
                    </div>
                    <div className="overflow-hidden border">
                      <div className="h-[250px] overflow-hidden w-full flex items-center justify-center flex-col space-y-4 text-sm">
                        <Image
                          src={metadata.image}
                          alt=""
                          width={1920}
                          height={720}
                          className="object-cover object-top"
                        />
                      </div>
                      <div className="space-y-1 w-full border-t p-2">
                        <p className="text-sm text-muted-foreground">{host}</p>
                        <h3 className="truncate">{metadata.title}</h3>
                        <p className="text-sm opacity-90">
                          {metadata.description}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <div className="border-b h-1 w-full" />
                      <div className="flex items-center ">
                        <LinkedInIcon />
                        <p>Linkedin</p>
                      </div>
                      <div className="border-b h-1 w-full" />
                    </div>
                    <div className="overflow-hidden border">
                      <div className="h-[250px] overflow-hidden w-full flex items-center justify-center flex-col space-y-4 text-sm">
                        <Image
                          src={metadata.image}
                          alt=""
                          width={1920}
                          height={720}
                          className="object-cover object-top"
                        />
                      </div>
                      <div className="space-y-1 w-full border-t p-2">
                        <h3 className="truncate">{metadata.title}</h3>
                        <p className="text-sm text-muted-foreground">{host}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="p-4 space-y-4">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <div className="border-b h-1 w-full" />
                      <div className="flex items-center gap-1 ">
                        <TwitterIcon />
                        <p>Twitter</p>
                      </div>
                      <div className="border-b h-1 w-full" />
                    </div>
                    <div className="rounded-2xl overflow-hidden border">
                      <div className="h-[250px] w-full flex items-center justify-center flex-col  space-y-4  text-sm">
                        {isMetadataLoading ? (
                          <Loader className="w-4 h-4 animate-spin" />
                        ) : (
                          <>
                            <ImageIcon />
                            <p>Enter a link to view preview</p>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <div className="border-b h-1 w-full" />
                      <div className="flex items-center gap-1 ">
                        <FacebookIcon />
                        <p>Facebook</p>
                      </div>
                      <div className="border-b h-1 w-full" />
                    </div>
                    <div className="overflow-hidden border">
                      <div className="h-[250px] w-full flex items-center justify-center flex-col  space-y-4  text-sm">
                        {isMetadataLoading ? (
                          <Loader className="w-4 h-4 animate-spin" />
                        ) : (
                          <>
                            <ImageIcon />
                            <p>Enter a link to view preview</p>
                          </>
                        )}
                      </div>
                      <div className="space-y-2 w-full border-t p-2">
                        <Skeleton className="w-1/4 py-2 rounded-lg" />
                        <Skeleton className="w-full py-2 rounded-lg" />
                        <Skeleton className="w-full py-2 rounded-lg" />
                        <Skeleton className="w-3/4 py-2 rounded-lg" />
                      </div>
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <div className="border-b h-1 w-full" />
                      <div className="flex items-center ">
                        <LinkedInIcon />
                        <p>Linkedin</p>
                      </div>
                      <div className="border-b h-1 w-full" />
                    </div>
                    <div className="overflow-hidden border">
                      <div className="h-[250px] w-full flex items-center justify-center flex-col space-y-4 text-sm">
                        {isMetadataLoading ? (
                          <Loader className="w-4 h-4 animate-spin" />
                        ) : (
                          <>
                            <ImageIcon />
                            <p>Enter a link to view preview</p>
                          </>
                        )}
                      </div>
                      <div className="space-y-2 w-full border-t p-2">
                        <Skeleton className="w-full py-2 rounded-lg" />
                        <Skeleton className="w-3/4 py-2 rounded-lg" />
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </DrawerContent>
      </Drawer>
    </div>
  );
};

export default CreateLink;
