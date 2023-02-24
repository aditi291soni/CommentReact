import React, { useState } from "react";
import css from "./Reply.module.css";
const Reply = () => {
  const [reply, setreply] = useState("");
  const [replyToggle, setreplyToggle] = useState(false);

  const [replyList, setReplyList] = useState([]);
  const replyClickHandle = (e) => {
    setreply(e.target.value);
  };
  const ReplyCommentHandler = (e) => {
    if(reply.length){

        setReplyList([...replyList, reply]);
    }
   
    setreplyToggle(!replyToggle);
    console.log(replyList);
  };
  return (
    <div css={css.replymain}>
      <div
        style={{
          border: "2px solid black",
          padding: "5px",
          borderRadius: "5px",
        }}
        class="form-floating"
      >
        Total Replies: {replyList.length}
        { replyList.map((e) => (
          <>{e.length > 0 ? <li>{e}</li> : null}</>
        ))}
        <textarea
          className="form-control p-2"
          onChange={replyClickHandle}
          name="reply"
          
          placeholder="Reply on comment"
          id="floatingTextarea"
        ></textarea>
        <button
          type="button"
          disabled={reply.length===0}
          onClick={ReplyCommentHandler}
          class="btn btn-primary m-2"
        >
          Reply
        </button>
        
      </div>
    </div>
  );
};

export default Reply;
