import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { formatDistance } from "date-fns";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export const convertToTimeAgo = (date) => {
  return formatDistance(date, new Date(), {
    addSuffix: true,
  });
};
