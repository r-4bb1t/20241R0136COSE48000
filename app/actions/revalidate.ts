"use server";

import { revalidateTag } from "next/cache";

export const revalidateTags = async (tags: string[]) => {
  try {
    tags.forEach((tag) => revalidateTag(tag));
  } catch (e) {
    console.error(e);
  }
};
