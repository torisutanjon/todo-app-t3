import TodoComponent from "./todo";
import { api } from "@/utils/api";
import Image from "next/image";
import loading_gif from "../assets/loading.gif";

interface PropTypes {
  id: string;
  index: number;
  displayTodoHandler: (data: JSX.Element) => void;
}

const SideBarTodo = ({ id, index, displayTodoHandler }: PropTypes) => {
  const todoInfoMutation = api.todo.getTodoByID.useMutation({
    onSuccess: (res) => {
      if (res === null) return;
      displayTodoHandler(<TodoComponent title={res.title} body={res.body} />);
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
  return (
    <div className="relative flex h-[40px] w-[40px] items-center justify-center">
      <div
        className="relative flex h-[30px] w-[30px] items-center justify-center border-[1px] border-white/50"
        onClick={() => setDisplayHandler()}
      >
        <p className="text-[12px] text-white">{index + 1}</p>
      </div>
    </div>
  );
};

export default SideBarTodo;
