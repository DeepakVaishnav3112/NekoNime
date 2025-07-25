import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { GoDotFill } from "react-icons/go";
import { FaRegHeart } from "react-icons/fa";
import { MdInsertComment } from "react-icons/md";
import { formatDate } from "../../../../utils/dateUtils";
import CommentActionBtn from "./CommentActionBtn";
import { useState } from "react";
import Reply from "./Reply";
import { useAuthContext } from "../../../../context/AuthContext";
import { deleteComment } from "../../../../services/commentService";

export default function Comment({ comment, handleCommentDelete }) {
  const { user } = useAuthContext();

  const [showReplyField, setShowReplyField] = useState(false);
  const [replyText, setReplyText] = useState("");

  

  return (
    <div className="mt-5 px-4 pb-5 border-b-1 border-secondary/20">
      {/* Comment header */}
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-4">
          <div className="flex gap-2 items-center">
            <div className="w-7 h-7 rounded-full">
              <img
                src={comment.userId.profilePicture}
                alt="profile picture"
                className="rounded-full"
              />
            </div>
            <span className="text-md text-primary font-semibold">
              {comment.userId.username}
            </span>
          </div>
          <span className="text-xs text-secondary">
            <GoDotFill className="inline-block -mt-[2px]" />{" "}
            {formatDate(comment.createdAt)}
          </span>
        </div>
        <div className="flex gap-4 text-secondary">
          <CommentActionBtn
            Icon={FaRegHeart}
            style="flex items-center gap-1 text-secondary hover:text-black cursor-pointer"
          />
          {comment?.userId?._id.toString() === user?._id.toString() && (
            <>
              <CommentActionBtn Icon={FaEdit} style="text-xl" />
              <CommentActionBtn
                Icon={MdDelete}
                style="text-xl"
                onClick={() => handleCommentDelete(comment._id)}
              />
            </>
          )}
        </div>
      </div>

      {/* Comment Content */}
      <div className="px-1">
        <p className="mt-2 text-black/70 text-md">{comment.comment}</p>

        <div className="flex items-center gap-2">
          <CommentActionBtn
            Icon={MdInsertComment}
            text="Reply"
            style="flex items-center gap-1 mt-2 text-secondary cursor-pointer hover:underline hover:text-primary"
            onClick={() => setShowReplyField(!showReplyField)}
          />
        </div>
      </div>

      <div className="ps-15 mt-5">
        <Reply />
      </div>

      {/* Comment Reply */}
      {comment.replies ||
        (comment.replies.length > 0 && (
          <div className="ps-15 mt-5">
            <Reply />
          </div>
        ))}
    </div>
  );
}
