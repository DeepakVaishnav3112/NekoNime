import { useState } from "react";
import { formatDate } from "../../../../utils/dateUtils";
import { useAuthContext } from "../../../../context/AuthContext";
import { toggleLikeReply } from "../../../../services/commentService";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { GoDotFill } from "react-icons/go";
import { MdDelete, MdInsertComment } from "react-icons/md";

import CommentActionBtn from "./CommentActionBtn";

export default function Reply({
  reply,
  handleDeleteReply,
  showReplyField,
  setShowReplyField,
}) {
  const { user } = useAuthContext();

  const [likes, setLikes] = useState(reply.likes || []);
  const isLiked = likes.includes(user?._id);

  // Function to handle like toggle
  const handleLikeToggle = async () => {
    try {
      const res = await toggleLikeReply(reply._id);
      const isNowLiked = res.data.liked;

      setLikes((prevLikes) =>
        isNowLiked
          ? [...prevLikes, user._id]
          : prevLikes.filter((id) => id !== user._id)
      );
    } catch (err) {
      console.error("Failed to toggle like:", err);
    }
  };

  return (
    <div>
      {/* Reply header */}
      <div className="flex justify-between items-center mt-5">
        <div className="flex items-center gap-4">
          <div className="flex gap-2 items-center">
            <div className="w-7 h-7 rounded-full">
              {/* profile picture */}
              <img
                src={reply.userId.profilePicture}
                alt="profile picture"
                className="rounded-full"
              />
            </div>
            {/* username */}
            <span className="text-md text-primary font-semibold">
              {reply.userId.username}
            </span>
          </div>
          {/* date */}
          <span className="text-xs text-secondary">
            <GoDotFill className="inline-block -mt-[2px]" />{" "}
            {formatDate(reply.createdAt)}
          </span>
        </div>

        {/* Delete button */}
        <div className="flex gap-4 text-secondary">
          {reply?.userId?._id?.toString() === user?._id.toString() && (
            <CommentActionBtn
              Icon={MdDelete}
              style="text-xl"
              onClick={() => handleDeleteReply(reply._id)}
            />
          )}
        </div>
      </div>

      <div className="px-1">
        {/* Comment Content */}
        <p className="mt-2 text-black/70 text-md">{reply.reply}</p>

        <div className="flex items-center gap-2">
          {/* Like button */}
          <CommentActionBtn
            Icon={isLiked ? FaHeart : FaRegHeart}
            style={`flex items-center mt-2 gap-1 cursor-pointer ${
              isLiked ? "text-red-500" : "text-secondary"
            } hover:text-black`}
            onClick={handleLikeToggle}
            text={likes.length}
          />

          {/* Reply button */}
          <CommentActionBtn
            Icon={MdInsertComment}
            text="Reply"
            style="flex items-center gap-1 mt-2 text-secondary cursor-pointer hover:underline hover:text-primary"
            onClick={() => setShowReplyField(!showReplyField)}
          />
        </div>
      </div>
    </div>
  );
}
