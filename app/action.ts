"use server";

import { revalidateTag } from "next/cache";
import prisma from "./db";

export async function create(fromData: FormData) {
    "use server";
    const input = fromData.get("input") as string;
    await prisma.todo.create({ data: { input: input } });
    revalidateTag("todo");
  }

  export async function edit(fromData: FormData) {
    "use server";
    const input = fromData.get("input") as string;
    const inputId = fromData.get("inputId") as string;
    await prisma.todo.update({
      where: { id: inputId },
      data: { input: input },
    });
    revalidateTag("todo");
  }
  export async function deleteItem(fromData: FormData) {
    "use server";

    const inputId = fromData.get("inputId") as string;
    await prisma.todo.delete({
      where: { id: inputId },
    });

    revalidateTag("todo");;
  }