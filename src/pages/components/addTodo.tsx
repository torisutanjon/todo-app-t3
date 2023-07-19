import Image from "next/image";
import close_icon from "../assets/close.png";
import { api } from "@/utils/api";

interface PropTypes {
  removeAddTodoHandler: (component: JSX.Element) => void;
}

const AddTodo = ({ removeAddTodoHandler }: PropTypes) => {
  const addTodoMutation = api.todo.addTodo.useMutation({
    onSuccess: (res) => {
      window.alert(res.message);
      removeAddTodoHandler(<></>);
    },
    onError: (err) => {
      window.alert(err.message);
    },
  });

  const addTodoHandler = () => {
    const title = document.getElementById("title_input") as HTMLInputElement;
    const body = document.getElementById(
      "body_textarea"
    ) as HTMLTextAreaElement;

    addTodoMutation.mutate({
      title: title.value,
      body: body.value,
    });
  };

  const closeAddTodoHandler = () => {
    removeAddTodoHandler(<></>);
  };

  const clearHandler = () => {
    const title = document.getElementById("title_input") as HTMLInputElement;
    const body = document.getElementById(
      "body_textarea"
    ) as HTMLTextAreaElement;

    title.value = "";
    body.value = "";
  };

  return (
    <div className="absolute left-0 top-0 flex h-screen w-screen items-center justify-center bg-black/25">
      <div className="item-center relative flex h-1/2 w-[75%] flex-col items-center justify-center rounded-[8px] bg-white">
        <button
          className="border-gray/25 absolute right-[5px] top-[5px] flex h-[25px] w-[25px] items-center justify-center rounded-[5px] border-[2px]"
          onClick={() => closeAddTodoHandler()}
        >
          <Image src={close_icon} alt="" height={15} width={15} />
        </button>
        <div className="relative flex h-[10%] w-[75%] items-center justify-center">
          <p className="text-[18px] font-bold text-black/50">Create Todo</p>
        </div>
        <div className="relative h-[70%] w-[75%]">
          <div className="flex h-[30%] w-full flex-col items-center justify-center">
            <p className="font-bold text-black/25">Title:</p>
            <input
              type="text"
              className="h-[35px] w-full border-[1px] border-black/25 text-center text-[14px] text-black/50 outline-none"
              id="title_input"
            />
          </div>
          <div className="relative flex h-[70%] w-full flex-col items-center justify-center">
            <p className="font-bold text-black/25">Body:</p>
            <textarea
              name=""
              id="body_textarea"
              className="border-gray/25 h-[75%] w-full border-[2px] pl-[10px] pt-[5px] text-black/50 outline-none"
            ></textarea>
          </div>
        </div>
        <div className="relative flex h-[10%] w-[75%] flex-row items-center justify-between">
          <button
            className="border-gray/25 h-[30px] w-[90px] rounded-[50px] border-[1px] bg-white text-[14px] text-[#1e1e1e]/50"
            onClick={() => clearHandler()}
          >
            Clear
          </button>
          <button
            className="border-gray/25 h-[30px] w-[90px] rounded-[50px] border-[1px] bg-white text-[14px] text-[#1e1e1e]/50"
            onClick={() => addTodoHandler()}
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddTodo;
