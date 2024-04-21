"use client";
import React, { useRef, useState } from "react";
import QRCode from "react-qr-code";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "./ui/use-toast";
import { ToastAction } from "./ui/toast";
import { Loader } from "lucide-react";

const RenderQrCode = ({ url, className, isCustom, fg, bg, id }) => {
  const queryClient = useQueryClient();
  const [fgColor, setFgColor] = useState(fg);
  const [bgColor, setBgColor] = useState(bg);
  const qrCodeRef = useRef();
  const { toast } = useToast();
  const { mutate, isPending } = useMutation({
    mutationKey: ["qrcode"],
    mutationFn: async () => {},
    onSuccess: async () => {
      await queryClient.invalidateQueries([id]);
    },
    onError: (err) => {
      console.error(err);
      toast({
        title: "Failed to save qr code colors.",
        action: (
          <ToastAction altText="retry" onClick={mutate}>
            Retry
          </ToastAction>
        ),
      });
    },
  });

  return (
    <div className="">
      <div className="w-full flex-1">
        <QRCode
          ref={qrCodeRef}
          size={50}
          fgColor={fgColor}
          bgColor={bgColor}
          style={{ height: "auto", maxWidth: "100%", width: "100%" }}
          value={url}
          viewBox={`0 0 100 100`}
          className={className}
        />
      </div>
      {isCustom ? (
        <div>
          {" "}
          <div className="mt-4 flex gap-3">
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-2">
                <Label
                  className="w-12 h-12 rounded-xl p-2 border cursor-pointer"
                  htmlFor="fgColor"
                >
                  <div
                    style={{ background: fgColor }}
                    className="w-full h-full rounded-lg"
                  />
                </Label>
                <Input
                  id="fgColor"
                  type="color"
                  value={fgColor}
                  onChange={(v) => setFgColor(v.target.value)}
                  className="w-16 h-16 rounded-xl p-2 hidden"
                />{" "}
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Label
                className="w-12 h-12 rounded-xl p-2 border cursor-pointer"
                htmlFor="bgColor"
              >
                <div
                  style={{ background: bgColor }}
                  className="w-full h-full rounded-lg"
                />
              </Label>
              <Input
                id="bgColor"
                type="color"
                value={bgColor}
                onChange={(v) => setBgColor(v.target.value)}
                className="w-16 h-16 rounded-xl p-2 hidden"
              />
            </div>
          </div>
          <Button disabled={isPending} onClick={mutate}>
            {isPending ? <Loader className="w-4 h-4 animate-spin" /> : null}
            Save
          </Button>
        </div>
      ) : null}
    </div>
  );
};

export default RenderQrCode;
