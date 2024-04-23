"use server";

import { revalidatePath, revalidateTag } from "next/cache";

export default async function revalidate({ tag, path }) {
  if (tag) {
    revalidateTag(tag);
  }
  if (path) {
    revalidatePath(path);
  }
}
