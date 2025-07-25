import { useForm } from "react-hook-form";
import { fetchComments, addComment, deleteComment } from "../../../../services/commentService";
import Comment from "./Comment";
import "../../../../styles/scrollbar.css";
import { useEffect, useRef, useState } from "react";
import Loader from "../../../Common/Loader";
import { useAuthContext } from "../../../../context/AuthContext";

export default function CommentSection({ animeId }) {

  const { user } = useAuthContext();

  const { register, handleSubmit, reset } = useForm();
  const [submitting, setSubmitting] = useState(false);
  const [commentData, setCommentData] = useState(null);
  const [loading, setLoading] = useState(false);

  const [replyTo, setReplyTo] = useState(null); // holds comment object to reply to
  const textAreaRef = useRef(null); // for focusing the textarea when replying

  const onSubmit = async (data) => {
    if (!animeId) return;
    setSubmitting(true);
    try {
      const res = await addComment(animeId, data.comment);
      console.log(res.data);
      reset();

      // Optimistically add new comment to state
      const newComment = {
        ...res.data.newComment,
        userId: {
          username: user.username, // If you have it in auth context
          profilePicture: user.profilePicture,
        },
        replies: [],
      };

      setCommentData((prev) => ({
        ...prev,
        comments: [newComment, ...prev.comments],
        total: prev.total + 1,
      }));
    } catch (error) {
      console.error("Failed to post comment:", error);
    } finally {
      setSubmitting(false);
    }
  };

  const fetchAnimeComments = async (page) => {
    setLoading(true);
    try {
      const res = await fetchComments(animeId, page);
      console.log(res.data);
      setCommentData(res.data);
    } catch (error) {
      console.error("Error fetching comments!", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAnimeComments(1);
  }, [animeId]);

  const handleCommentDelete = async (commentId) => {
    try {
      const res = await deleteComment(commentId);
      console.log("Comment deleted successfully");

      // Update state to remove the deleted comment
      setCommentData((prev) => ({
        ...prev,
        comments: prev.comments.filter((c) => c._id !== commentId),
        total: prev.total - 1,
      }));
    } catch (error) {
      console.error("Failed to delete comment:", error);
    }
  };

  return (
    <div className="break-inside-avoid mt-5">
      <div className="mb-5">
        <h3 className="text-2xl font-bold text-secondary pb-2 border-b-3 border-primary">
          Discussion (20)
        </h3>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mt-2 border border-secondary/50 rounded-md px-4 py-2">
            <textarea
              {...register("comment", { required: true })}
              id="comment"
              placeholder="Write a comment..."
              className="w-full outline-0 resize-none"
              rows={3}
            ></textarea>
          </div>
          <button
            type="submit"
            disabled={submitting}
            className="bg-primary mt-2 px-4 py-2 rounded-md text-sm font-medium text-white"
          >
            {submitting ? "Posting..." : "Post comment"}
          </button>
        </form>
      </div>
      <div className="h-[560px] overflow-y-auto custom-scrollbar">
        {loading || !commentData?.comments ? (
          <Loader />
        ) : (
          commentData.comments.map((comment) => (
            <Comment key={comment._id} comment={comment} handleCommentDelete={handleCommentDelete} />
          ))
        )}
      </div>
    </div>
  );
}
