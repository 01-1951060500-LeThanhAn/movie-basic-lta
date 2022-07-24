import React, { useState } from "react";
import "./Comment.css";
import { formatRelative } from "date-fns/esm";
import { db } from "../../firebase/auth";
import { deleteDoc, doc } from "firebase/firestore";
import { toast } from "react-toastify";
import { useStore } from "../../stored/store";
const formatDate = (date) => {
  let formattedDate = "";
  if (date) {
    // Convert the date in words relative to the current date
    formattedDate = formatRelative(new Date(date * 1000), new Date());
    // Uppercase the first letter
    formattedDate =
      formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1);
  }
  return formattedDate;
};

const CommentItem = ({ comment }) => {
  const [loading, setLoading] = useState(false);
  const { user } = useStore((state) => state);
  
  const handleDeleteComment = async () => {
    const Ref = doc(db, "comments", comment.id);
    if (comment.userId === user.uid) {
      try {
        await deleteDoc(Ref);
        setLoading(true);
      } catch (err) {
        alert(err.message);
      }
      return toast.success("Delete this comment successfully");
    } else {
      return toast.error("Delete comment failed");
    }
  };

  return (
    <>
      {!loading && (
        <div className="show_commtent_items" key={comment.id}>
          <div className="show_avatar">
            <img alt="avatar" src={comment.avatar} />
          </div>
          <div className="show_info">
            <div className="show_name_time">
              <h3>{comment.userName}</h3>
              <p>{formatDate(comment?.createdAt?.seconds)}</p>
            </div>
            <p>{comment.content}</p>
          </div>
          <p
            onClick={() => handleDeleteComment(comment.id)}
            className="delete_comment"
          >
            Xóa
          </p>
        </div>
      )}
    </>
  );
};

export default CommentItem;
