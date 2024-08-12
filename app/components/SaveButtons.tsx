"use client";

import { useFormStatus } from "react-dom";
import { ClipLoader } from "react-spinners";

export default function SaveButtons() {
  const {  pending } = useFormStatus();
  return (
    <button type="submit" className="  p-1  mt-2 text-green-700">
      {pending ? <ClipLoader color="#090979" size={20} /> : "Save"}
    </button>
  );
}
