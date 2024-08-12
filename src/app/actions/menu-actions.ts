"use server";

export async function createMenu() {
  try {
    return { message: `Sheet data` };
  } catch (e: any) {
    return { message: `ERROR` };
  }
}
