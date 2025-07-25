import { FaEdit, FaRegHeart } from "react-icons/fa";
import { GoDotFill } from "react-icons/go";
import { MdDelete } from "react-icons/md";
import CommentActionBtn from "./CommentActionBtn";

export default function Reply() {
  return (
    <div>
      {/* Comment header */}
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-4">
          <div className="flex gap-2 items-center">
            <div className="w-7 h-7 bg-secondary rounded-full"></div>
            <span className="text-md text-primary font-semibold">
              Jese Leos
            </span>
          </div>
          <span className="text-xs text-secondary">
            <GoDotFill className="inline-block -mt-[2px]" /> Feb. 8, 2022
          </span>
        </div>
        <div className="flex gap-4 text-secondary">
          <CommentActionBtn
            Icon={FaRegHeart}
            style="flex items-center gap-1 text-secondary hover:text-black cursor-pointer"
          />
          <CommentActionBtn Icon={FaEdit} style="text-xl" />
          <CommentActionBtn Icon={MdDelete} style="text-xl" />
        </div>
      </div>

      {/* Comment Content */}
      <div className="px-1">
        <p className="mt-2 text-black/70 text-md">
          Much appreciated! Glad you liked it ☺️
        </p>
      </div>
    </div>
  );
}
