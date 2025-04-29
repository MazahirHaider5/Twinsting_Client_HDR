"use server";
import { cookies } from "next/headers";

export async function setLanguage(locale: string) {
  // @ts-expect-error ---
  cookies().set("locale", locale);
}
