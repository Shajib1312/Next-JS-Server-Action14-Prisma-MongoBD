import { deleteItem, edit } from "../action";
import DeleteButton from "../components/DeleteButton";
import FromElement from "../components/From";
import SaveButtons from "../components/SaveButtons";
import prisma from "../db";

async function getData() {
  const data = await prisma.todo.findMany({
    select: { id: true, input: true },
    orderBy: { createdAt: "desc" },
  });

  return data;
}

export default async function Page() {
  const data = await getData();
  return (
    <div className="h-screen w-screen flex justify-center items-center">
      <div className="border  shadow-xl p-10 w-[30vw]">
        <FromElement />
        <div className="mt-5 flex flex-col gap-y-2">
          {data.map((todo) => (
            <div key={todo.id} className="flex w-full h-full">
              <form action={edit}>
                <input type="hidden" name="inputId" value={todo.id} />
                <input
                  className="border p-1"
                  type="text"
                  name="input"
                  defaultValue={todo.input}
                />
                <SaveButtons />
              </form>
              <form action={deleteItem}>
                <input type="hidden" name="inputId" value={todo.id} />
                <DeleteButton />
              </form>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
