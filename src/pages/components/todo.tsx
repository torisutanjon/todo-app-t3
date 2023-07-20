"use client";
import { useEffect, useState } from "react";
import { api } from "@/utils/api";
import { useSession } from "next-auth/react";
import Image from "next/image";
import loading_gif from "../assets/loading.gif";
import CommentComponent from "./comment";
interface PropTypes {
  id: string;
  title: string;
  body: string;
  creatorID: string;
}
interface CommentTypes {
  id: string;
  body: string;
  creatorName: string;
  creatorID: string;
}

const TodoComponent = ({ id, title, body, creatorID }: PropTypes) => {
  const { data: sessionData } = useSession();

  const commentQuery = api.comment.getCommentByTodo.useQuery({ todoID: id });

  const addComment = api.comment.addComment.useMutation({
    onSuccess: () => {
      window.alert("Comment Added");
      window.location.reload();
    },
    onError: (err) => {
      window.alert(err.message);
    },
  });

  const updateTodo = api.todo.updateTodo.useMutation({
    onSuccess: (res) => {
      window.alert(res.message);
      window.location.reload();
    },
    onError: (err) => {
      window.alert(err.message);
    },
  });

  const deleteTodo = api.todo.deleteTodo.useMutation({
    onSuccess: () => {
      window.alert("Todo Deleted");
      window.location.reload();
    },
    onError: (err) => {
      window.alert(err.message);
    },
  });

  const [todoInfo, setTodoInfo] = useState({
    title: title,
    body: body,
  });

  const [component, setComponent] = useState(<></>);
  const [comments, setComments] = useState<Array<CommentTypes>>();

  const loadingComponent = () => {
    return (
      <div className="fixed z-[1] flex h-[85%] w-[85%] items-center justify-center">
        <Image src={loading_gif} alt="" height={50} width={50} />
      </div>
    );
  };

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

  const addCommentHandler = () => {
    if (sessionData === null) {
      return window.alert("Please login first");
    }

    const comment = document.getElementById(
      "addComment_input"
    ) as HTMLInputElement;

    if (comment.value === "") return window.alert("Can't add an empty comment");

    addComment.mutate({
      todoID: id,
      comment: comment.value,
    });

    comment.value === "";
  };

  const updateTodoHandler = () => {
    setComponent(loadingComponent());
    updateTodo.mutate({
      id: id,
      title: todoInfo.title,
      body: todoInfo.body,
    });
  };

  useEffect(() => {
    if (commentQuery.isFetching === false) {
      if (commentQuery.data !== undefined) {
        setComments(commentQuery.data);
      }
    }
  }, [commentQuery]);

  return (
    <>
      <div className="mb-[25px] flex w-[75%] flex-col items-start justify-between">
        <p className="text-[14px] font-bold">Todo Title:</p>
        <input
          type="text"
          className="h-[35px] w-full border-b-[1px] border-b-black/75 pl-[5px] outline-none"
          name="title"
          value={todoInfo.title}
          onChange={inputOnChangeHandler}
        />
      </div>
      <div className="mb-[5px] flex w-[75%] flex-col items-start justify-between">
        <p className="text-[14px] font-bold">Todo Body:</p>
        <textarea
          name="body"
          id=""
          className="h-[100px] w-full border-[1px] border-black/75 p-[5px] outline-none"
          value={todoInfo.body}
          onChange={textAreaOnChangeHandler}
        />
      </div>
      {sessionData?.user.id === creatorID ? (
        <div className="relative mb-[20px] flex h-[25px] w-[75%] flex-row items-center justify-end">
          {body === todoInfo.body && title === todoInfo.title ? (
            <></>
          ) : (
            <button
              className="relative mr-[25px] h-[20px] w-[65px] rounded-[4px] bg-[#343434] text-[12px] text-white/50"
              onClick={() => updateTodoHandler()}
            >
              Update
            </button>
          )}

          <button
            className="relative h-[20px] w-[65px] rounded-[4px] bg-[#343434] text-[12px] text-white/50"
            onClick={() =>
              deleteTodo.mutate({
                todoID: id,
              })
            }
          >
            Delete
          </button>
        </div>
      ) : (
        <></>
      )}
      <div className="mb-[25px] flex w-[75%] flex-col items-start justify-between">
        <p className="text-[12px] font-bold">Add Comment:</p>
        <div className="flex w-full flex-col items-end justify-between">
          <input
            type="text"
            className="mb-[5px] h-[25px] w-full border-b-[1px] border-b-black/75 pl-[5px] text-[14px] text-black/75 outline-none"
            id="addComment_input"
          />
          <button
            className="h-[25px] w-[75px] rounded-[4px] bg-[#343434] text-[12px] text-white/50"
            onClick={() => addCommentHandler()}
          >
            Add
          </button>
        </div>
      </div>
      <div className="relative flex h-[30%] w-[90%] flex-col items-start justify-start">
        <p className="text-[14px] font-bold">Comments:</p>
        <div className="relative h-[80%] w-full overflow-hidden overflow-y-auto overflow-y-auto border-[1px] border-black/75">
          {comments === undefined ? (
            <></>
          ) : (
            comments.map((comment) => {
              return (
                <CommentComponent
                  key={comment.id}
                  id={comment.id}
                  body={comment.body}
                  creatorName={comment.creatorName}
                  creatorID={comment.creatorID}
                />
              );
            })
          )}
        </div>
      </div>
      {component}
    </>
  );
};

export default TodoComponent;
