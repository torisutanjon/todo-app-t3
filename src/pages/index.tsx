import Head from "next/head";
import Image from "next/image";
import add_image from "./assets/add.png";
import { useState } from "react";
import { signIn, useSession } from "next-auth/react";

interface TodoTypes {
  id: string;
  title: string;
  body: string;
  comments: CommentTypes[];
}

interface CommentTypes {
  id: string;
  creator: string;
  body: string;
}

export default function Home() {
  const { data: sessionData } = useSession();
  const [todo, setTodo] = useState<TodoTypes>();

  return (
    <>
      <Head>
        <title>Todo App</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="absolute left-0 top-0 flex h-screen w-screen flex-row items-center justify-center">
        <div className="relative flex h-full w-[15%] flex-col items-center justify-start bg-[#343434]">
          <button className="relative mt-[25px] h-[30px] w-[30px]">
            <Image src={add_image} alt="" height={30} width={30} />
          </button>
          <div className="relative mt-[35px] flex h-1/2 w-full flex-col items-center justify-start text-white/75">
            <p className="text-[12px]">Todos:</p>
          </div>
        </div>
        <div className="relative flex h-full w-[85%]">
          {sessionData ? (
            <div className="relatiev flex h-full w-full flex-col items-center justify-center">
              <button
                className="absolute right-[15px] top-[10px] h-[45px] w-[45px] rounded-[50px] bg-[#343434] text-[24px] font-medium text-[white]/75"
                onClick={() =>
                  (window.location.href = `/profile/${sessionData.user.id}`)
                }
              >
                {sessionData.user.name?.charAt(0).toUpperCase()}
              </button>
              {todo === undefined ? (
                <p className="m-0 p-0 text-[#343434]">
                  Please select a todo to view
                </p>
              ) : (
                <>
                  <div className="mb-[25px] flex w-[75%] flex-col items-start justify-between">
                    <p className="text-[14px] font-bold">Todo Title:</p>
                    <input
                      type="text"
                      className="h-[35px] w-full border-b-[1px] border-b-black/75 pl-[5px] outline-none"
                    />
                  </div>
                  <div className="mb-[25px] flex w-[75%] flex-col items-start justify-between">
                    <p className="text-[14px] font-bold">Todo Body:</p>
                    <textarea
                      name=""
                      id=""
                      className="h-[100px] w-full border-[1px] border-black/75 p-[5px] outline-none"
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
              )}
            </div>
          ) : (
            <div className="relative flex h-full w-full flex-col items-center justify-center">
              <p
                className="absolute right-[20px] top-[15px] text-[14px] font-medium"
                onClick={() => void signIn()}
              >
                Sign In
              </p>
              <p className="text-[#343434]">Login first to create todo list</p>
            </div>
          )}
        </div>
      </main>
    </>
  );
}
