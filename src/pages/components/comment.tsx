"use client";

import React, { useState } from "react";
import { useSession } from "next-auth/react";
import { api } from "@/utils/api";

interface PropTypes {
  id: string;
  body: string;
  creatorName: string;
  creatorID: string;
}

const CommentComponent = ({ id, body, creatorName, creatorID }: PropTypes) => {
  const { data: sessionData } = useSession();
  const [commentValue, setCommentValue] = useState(body);

  const updateCommentHandler = api.comment.updateComment.useMutation({
    onSuccess: () => {
      window.alert("Comment Updated");
      window.location.reload();
    },
    onError: (err) => {
      window.alert(err.message);
    },
  });

  const deleteCommentHandler = api.comment.deleteComment.useMutation({
    onSuccess: () => {
      window.alert("Comment Deleted");
      window.location.reload();
    },
    onError: (err) => {
      window.alert(err.message);
    },
  });

  const commentValueOnChangeHandler = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setCommentValue(event.target.value);
  };

  return (
    <div className="flex h-[75px] w-full items-center justify-center">
      <div className="items-start-justify-between relative flex h-[80%] w-[95%] flex-col">
        <p className="text-[12px] font-bold text-black/75">{creatorName}</p>
        <input
          type="text"
          id="comment_input"
          className="h-[20px] w-full border-b-[1px] border-b-black/50 text-[12px] outline-none"
          value={commentValue}
          onChange={commentValueOnChangeHandler}
          readOnly={creatorID === sessionData?.user.id ? false : true}
        />
        {creatorID === sessionData?.user.id && (
          <div className="flex h-[25px] w-1/2 flex-row items-center justify-end self-end">
            {body !== commentValue && (
              <button
                className="mr-[10px] h-[20px] w-[55px] bg-[#1e1e1e]/75 text-[10px] text-white/75"
                onClick={() =>
                  updateCommentHandler.mutate({
                    commentID: id,
                    commentBody: commentValue,
                  })
                }
              >
                Update
              </button>
            )}
            <button
              className="h-[20px] w-[55px] bg-[#1e1e1e]/75 text-[10px] text-white/75"
              onClick={() =>
                deleteCommentHandler.mutate({
                  commentID: id,
                })
              }
            >
              Delete
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CommentComponent;
