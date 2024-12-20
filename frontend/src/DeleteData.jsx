import React, { useState } from "react";

const DeleteData = () => {
  return (
    <>
      <div className="flex flex-col justify-center items-center flex-start gap-5">
        <button
          className="bg-red-500 text-white w-full max-w-96 py-2 ">
          - Delete Package
        </button>
      </div>
    </>
  )
}

export default DeleteData;