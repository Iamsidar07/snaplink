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
import axios from "axios";

const RenderQrCode = ({
  shortUrl,
  className,
  isCustom,
  qrCodeFgColor,
  qrCodeBgColor,
  _id: id,
}) => {
  const queryClient = useQueryClient();
  const [fgColor, setFgColor] = useState(qrCodeFgColor);
  const [bgColor, setBgColor] = useState(qrCodeBgColor);
  const qrCodeRef = useRef();
  const { toast } = useToast();
  const { mutate, isPending } = useMutation({
    mutationKey: ["qrcode"],
    mutationFn: async (formdata) => {
      const res = await axios.patch(`/api/url/${id}`, formdata);
      return res.data;
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries([id]);
      toast({
        title: "Successfully saved!",
      });
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

  const handleSubmit = () => {
    const data = new FormData();
    data.append("qrCodeFgColor", fgColor);
    data.append("qrCodeBgColor", bgColor);
    mutate(data);
  };

  return (
    <div className="">
      <div className="w-full flex-1">
        <QRCode
          ref={qrCodeRef}
          size={50}
          fgColor={fgColor}
          bgColor={bgColor}
          style={{ height: "auto", maxWidth: "100%", width: "100%" }}
          value={shortUrl}
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
          <Button
            onClick={handleSubmit}
            disabled={isPending}
            className="w-full mt-2"
          >
            {isPending ? (
              <Loader className="w-4 h-4 animate-spin mr-2" />
            ) : null}
            Save
          </Button>
        </div>
      ) : null}
    </div>
  );
};

export default RenderQrCode;
