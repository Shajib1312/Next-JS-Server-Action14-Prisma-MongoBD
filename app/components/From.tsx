"use client";

import { useRef } from "react";
import { useFormStatus } from "react-dom";
import { MoonLoader } from "react-spinners";
import { create } from "../action";

const SubmitButton = () => {
  const { pending } = useFormStatus();
  return (
    <button
      className="border border-green-500 flex justify-center  py-2 mt-2"
      type="submit"
    >
      {pending ? <MoonLoader size={20} color="green" /> : "Add"}
    </button>
  );
};

const FromElement = () => {
  const fromRef = useRef<HTMLFormElement>(null);
  return (
    <form
      className="flex flex-col"
      action={async (fromData: FormData) => {
        await create(fromData);
        fromRef.current?.reset();
      }}
      ref={fromRef}
    >
      <input
        required
        className="border  p-1 border-gray-600"
        type="text"
        name="input"
      />
      <SubmitButton />
    </form>
  );
};

export default FromElement;
