"use client";

import TodoComponent from "./todo";
import { api } from "@/utils/api";
import Image from "next/image";
import loading_gif from "../assets/loading.gif";
import { useState, useEffect } from "react";
import { useMediaQuery } from "react-responsive";
interface PropTypes {
  id: string;
  index: number;
  title: string;
  displayTodoHandler: (data: JSX.Element) => void;
}

const SideBarTodo = ({ id, index, title, displayTodoHandler }: PropTypes) => {
  const [todoName, setTodoName] = useState(<>{index + 1}</>);
  const isDesktopOrLaptop = useMediaQuery({
    query: "(min-width: 1224px)",
  });

  const todoInfoMutation = api.todo.getTodoByID.useMutation({
    onSuccess: (res) => {
      if (res === null) return;
      displayTodoHandler(
        <TodoComponent
          id={res.id}
          title={res.title}
          body={res.body}
          creatorID={res.creatorID}
        />
      );
    },
    onError: () => {
      displayTodoHandler(
        <>
          <p>Unable to fetch todo: Internal Server Error</p>
        </>
      );
    },
  });

  const setDisplayHandler = () => {
    displayTodoHandler(
      <div className="relative flex h-[100px] w-[100px] items-center justify-center">
        <Image src={loading_gif} alt="" height={50} width={50} />
      </div>
    );

    todoInfoMutation.mutate({ id: id });
  };

  useEffect(() => {
    isDesktopOrLaptop
      ? setTodoName(<>{title}</>)
      : setTodoName(<>{index + 1}</>);
  }, []);

  return (
    <div className="relative flex h-[40px] w-[40px] items-center justify-center md:h-[50px] md:w-full">
      <div
        className="relative flex h-[30px] w-[30px] items-center justify-center border-[1px] border-white/50 md:h-[80%] md:w-[80%] md:cursor-pointer md:border-none md:bg-white"
        onClick={() => setDisplayHandler()}
      >
        <p className="text-[12px] text-white md:text-black/75">{todoName}</p>
      </div>
    </div>
  );
};

export default SideBarTodo;
