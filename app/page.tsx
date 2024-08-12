import { revalidatePath, revalidateTag } from "next/cache";
import prisma from "./db";

async function getData() {
  const data = await prisma.todo.findMany({
    select: { id: true, input: true },
    orderBy: { createdAt: "desc" },
  });

  return data;
}

export default async function Home() {
  const data = await getData();

  async function create(fromData: FormData) {
    "use server";
    const input = fromData.get("input") as string;
    await prisma.todo.create({ data: { input: input } });
    revalidateTag("todo");
  }

  async function edit(fromData: FormData) {
    "use server";
    const input = fromData.get("input") as string;
    const inputId = fromData.get("inputId") as string;
    await prisma.todo.update({
      where: { id: inputId },
      data: { input: input },
    });
    revalidateTag("todo");
  }
  async function deleteItem(fromData: FormData) {
    "use server";

    const inputId = fromData.get("inputId") as string;
    await prisma.todo.delete({
      where: { id: inputId },
    });

    revalidatePath("/");
  }

  return (
    <div className="h-screen w-screen flex justify-center items-center">
      <div className="border  shadow-xl p-10 w-[30vw]">
        <form className="flex flex-col" action={create}>
          <input
            className="border  p-1 border-gray-600"
            type="text"
            name="input"
          />
          <button className="bg-green-500  py-2 mt-2 text-white" type="submit">
            Submit
          </button>
        </form>
        <div className="mt-5 flex flex-col gap-y-2">
          {data.map((todo) => (
            <form key={todo.id} action={edit}>
              <input type="hidden" name="inputId" value={todo.id} />
              <input
                className="border p-1"
                type="text"
                name="input"
                defaultValue={todo.input}
              />
              <button
                type="submit"
                className="bg-green-500  p-1  mt-2 text-white"
              >
                Save
              </button>
              <button formAction={deleteItem} className="bg-red-500  p-1  mt-2 text-white">
                Delete
              </button>
            </form>
          ))}
        </div>
      </div>
    </div>
  );
}
