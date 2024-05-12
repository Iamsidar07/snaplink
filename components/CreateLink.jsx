"use client";
import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "./ui/dialog";
import {
  Images,
  Link,
  Twitter,
  Image as ImageIcon,
  Facebook,
  Linkedin,
  Loader,
  Globe,
} from "lucide-react";
import { Button, buttonVariants } from "./ui/button";
import { Input } from "./ui/input";
import Image from "next/image";
import { Label } from "./ui/label";
import axios from "axios";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useToast } from "./ui/use-toast";
import { Drawer, DrawerContent, DrawerTrigger } from "./ui/drawer";

const CreateLink = () => {
  const router = useRouter();
  const { toast } = useToast();
  const [designationURL, setDesignationURL] = useState("");
  const [host, setHost] = useState("");
  const {
    data: metadata,
    isLoading: isMetadataLoading,
    refetch: refetchMetadata,
  } = useQuery({
    queryKey: ["metadata", designationURL],
    queryFn: async () => {
      const res = await axios.get(
        `https://app.dub.co/api/metatags?url=${designationURL}`,
      );
      return res.data;
    },
  });
  const { mutate, isPending } = useMutation({
    mutationKey: ["createLink", designationURL],
    mutationFn: async (url) => {
      const res = await axios.post("/api/shortUrl", {
        url,
      });
      return res.data;
    },
    onSuccess: async (data) => {
      console.log("success:", data);
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
    if (!designationURL) return;
    const url = new URL(designationURL);
    setHost(url.host);
    console.log("Host:", url.host);

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
        <DrawerContent className="w-full md:max-h-[95vh] h-full max-w-screen-lg mx-auto p-0 sm:rounded-t-2xl shadow-2xl">
          <div className="grid grid-cols-1 md:grid-cols-2 divide-x divide-gray-100 md:max-h-[95vh] overflow-y-scroll md:overflow-hidden rounded-2xl">
            <div className="space-y-4 relative">
              <div className="bg-white flex items-center justify-center h-14 sm:h-24 gap-3 rounded-tl-2xl border-b border-gray-200 md:sticky md:top-0 z-10">
                {metadata?.image ? (
                  <Image
                    src={`https://www.google.com/s2/favicons?sz=64&domain_url=${designationURL}`}
                    alt="favicon"
                    width={30}
                    height={30}
                    className="rounded-full overflow-hidden"
                  />
                ) : (
                  <div className="w-8 h-8 rounded-full bg-gray-100 grid place-content-center">
                    <Globe className="text-gray-800 w-5 h-5" />
                  </div>
                )}
                <h2 className="text-lg">Create a new link</h2>
              </div>
              <form onSubmit={handleCreateLink}>
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
                <div className="flex flex-col items-center justify-center h-14 sm:h-24 bg-white md:rounded-bl-2xl md:rounded-br-2xl z-10 mt-12 md:mt-0 md:absolute md:bottom-0 w-full border-t border-gray-200 shadow">
                  <Button
                    disabled={isPending}
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
            <div className="md:overflow-auto no-scrollbar">
              <div className="flex items-center justify-center h-14 sm:h-24 gap-3 rounded-tr-2xl border-b sticky bg-white top-0 z-10">
                <h2 className="text-lg">Social Previews</h2>
              </div>
              {metadata?.title || metadata?.description || metadata?.image ? (
                <div className="p-4 space-y-4">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <div className="border-b h-1 w-full" />
                      <div className="flex items-center ">
                        <Twitter className="w-4 h-4 gap-1 " />
                        <p>Twitter</p>
                      </div>
                      <div className="border-b h-1 w-full" />
                    </div>
                    <div className="rounded-2xl overflow-hidden border border-gray-300 relative">
                      <img
                        src={metadata.image}
                        alt=""
                        width={1920}
                        height={720}
                        className="w-full h-full"
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
                        <Facebook className="w-4 h-4 gap-1 " />
                        <p>Facebook</p>
                      </div>
                      <div className="border-b h-1 w-full" />
                    </div>
                    <div className="overflow-hidden border border-gray-300 bg-gray-100">
                      <div className="h-[250px] w-full flex items-center justify-center flex-col bg-gray-100 space-y-4 text-gray-400 text-sm">
                        <img src={metadata.image} alt="" />
                      </div>
                      <div className="space-y-1 w-full border-t border-gray-300 p-2">
                        <p className="text-sm text-gray-500">{host}</p>
                        <h3 className="truncate">{metadata.title}</h3>
                        <p className="text-gray-500 text-sm">
                          {metadata.description}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <div className="border-b h-1 w-full" />
                      <div className="flex items-center ">
                        <Linkedin className="w-4 h-4 gap-1 " />
                        <p>Linkedin</p>
                      </div>
                      <div className="border-b h-1 w-full" />
                    </div>
                    <div className="overflow-hidden border border-gray-300 bg-gray-100">
                      <div className="h-[250px] w-full flex items-center justify-center flex-col bg-gray-100 space-y-4 text-gray-400 text-sm">
                        <img src={metadata.image} alt="" />
                      </div>
                      <div className="space-y-1 w-full border-t border-gray-300 p-2">
                        <h3 className="truncate">{metadata.title}</h3>
                        <p className="text-sm text-gray-500">{host}</p>
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
                        <Twitter className="w-4 h-4 " />
                        <p>Twitter</p>
                      </div>
                      <div className="border-b h-1 w-full" />
                    </div>
                    <div className="rounded-2xl overflow-hidden border border-gray-300">
                      <div className="h-[250px] w-full flex items-center justify-center flex-col bg-gray-100 space-y-4 text-gray-400 text-sm">
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
                        <Facebook className="w-4 h-4 " />
                        <p>Facebook</p>
                      </div>
                      <div className="border-b h-1 w-full" />
                    </div>
                    <div className="overflow-hidden border border-gray-300 bg-gray-100">
                      <div className="h-[250px] w-full flex items-center justify-center flex-col bg-gray-100 space-y-4 text-gray-400 text-sm">
                        {isMetadataLoading ? (
                          <Loader className="w-4 h-4 animate-spin" />
                        ) : (
                          <>
                            <ImageIcon />
                            <p>Enter a link to view preview</p>
                          </>
                        )}
                      </div>
                      <div className="space-y-2 w-full border-t border-gray-300 p-2">
                        <div className="bg-gray-200 w-1/4 py-2 rounded-lg" />
                        <div className="bg-gray-200 w-full py-2 rounded-lg" />
                        <div className="bg-gray-200 w-full py-2 rounded-lg" />
                        <div className="bg-gray-200 w-3/4 py-2 rounded-lg" />
                      </div>
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <div className="border-b h-1 w-full" />
                      <div className="flex items-center ">
                        <Linkedin className="w-4 h-4 gap-1 " />
                        <p>Linkedin</p>
                      </div>
                      <div className="border-b h-1 w-full" />
                    </div>
                    <div className="overflow-hidden border border-gray-300 bg-gray-100">
                      <div className="h-[250px] w-full flex items-center justify-center flex-col bg-gray-100 space-y-4 text-gray-400 text-sm">
                        {isMetadataLoading ? (
                          <Loader className="w-4 h-4 animate-spin" />
                        ) : (
                          <>
                            <ImageIcon />
                            <p>Enter a link to view preview</p>
                          </>
                        )}
                      </div>
                      <div className="space-y-2 w-full border-t border-gray-300 p-2">
                        <div className="bg-gray-200 w-full py-2 rounded-lg" />
                        <div className="bg-gray-200 w-3/4 py-2 rounded-lg" />
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