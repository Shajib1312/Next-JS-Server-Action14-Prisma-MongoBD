"use client";

import { useFormStatus } from "react-dom";
import { BarLoader } from "react-spinners";

export default function DeleteButton() {
  const { pending } = useFormStatus();
  return (
    <button type="submit" className=" p-1  mt-2 text-red-700">
     {pending ? <BarLoader color="red"  /> : "Delete"}
    </button>
  );
}
