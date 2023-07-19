"use client";
import { useEffect, useState } from "react";

interface PropTypes {
  title: string;
  body: string;
}

const TodoComponent = ({ title, body }: PropTypes) => {
  const [todoInfo, setTodoInfo] = useState({
    title: title,
    body: body,
  });

  const inputOnChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setTodoInfo((prevTodoInfo) => ({
      ...prevTodoInfo,
      [name]: value,
    }));
  };
  const textAreaOnChangeHandler = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setTodoInfo((prevTodoInfo) => ({
      ...prevTodoInfo,
      [name]: value,
    }));
  };

  return (
    <>
      <div className="mb-[25px] flex w-[75%] flex-col items-start justify-between">
        <p className="text-[14px] font-bold">Todo Title:</p>
        <input
          type="text"
          className="h-[35px] w-full border-b-[1px] border-b-black/75 pl-[5px] outline-none"
          value={todoInfo.title}
          onChange={inputOnChangeHandler}
        />
      </div>
      <div className="mb-[25px] flex w-[75%] flex-col items-start justify-between">
        <p className="text-[14px] font-bold">Todo Body:</p>
        <textarea
          name=""
          id=""
          className="h-[100px] w-full border-[1px] border-black/75 p-[5px] outline-none"
          value={todoInfo.body}
          onChange={textAreaOnChangeHandler}
        />
      </div>
      <div className="mb-[25px] flex w-[75%] flex-col items-start justify-between">
        <p className="text-[12px] font-bold">Add Comment:</p>
        <div className="flex w-full flex-col items-end justify-between">
          <input
            type="text"
            className="mb-[5px] h-[25px] w-[75%] border-b-[1px] border-b-black/75 pl-[5px] outline-none"
          />
          <button className="h-[20px] w-[75px] rounded-[4px] bg-[#343434] text-[12px] text-white">
            Add
          </button>
        </div>
      </div>
      <div className="relative flex h-[30%] w-[90%] flex-col items-start justify-start">
        <p className="text-[14px] font-bold">Comments:</p>
        <div className="relative h-[80%] w-full overflow-y-auto border-[1px] border-black/75"></div>
      </div>
    </>
  );
};

export default TodoComponent;
