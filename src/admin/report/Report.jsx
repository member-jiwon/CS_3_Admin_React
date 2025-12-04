import React, { useState } from "react";
import BoardList from "./BoardList";
import BoardDetail from "./BoardDetail";
import CommentList from "./CommentList";
import CommentDetail from "./CommentDetail"; // 추가
import styles from "./Report.module.css";
import { sendAdminMessage } from "../../webSocket/connectWebSocket";

const Report = () => {
  const [viewType, setViewType] = useState("board"); // board | comment
  const [selectedPost, setSelectedPost] = useState(null);
  const [selectedComment, setSelectedComment] = useState(null);
  const [newRender, setNewRender] = useState(false);

  const handleBack = () => setSelectedPost(null);
  const handleCloseComment = () => setSelectedComment(null);
  const handleDeletePost = (id) => {
    // eslint-disable-next-line no-restricted-globals
    if (confirm(`게시글 ${id}를 삭제하시겠습니까?`)) {
      sendAdminMessage("/pub/admin/notify/send/board", Number(id));
      handleBack();
      setTimeout(() => {
        setNewRender(prev => !prev);
      }, 500);
    }
  };
  const handleDeleteComment = (id) => {
    // eslint-disable-next-line no-restricted-globals
    if (window.confirm(`게시글 ${id}를 삭제하시겠습니까?`)) {
      sendAdminMessage("/pub/admin/notify/send/comment", Number(id));
      handleCloseComment();
      setTimeout(() => {
        setNewRender(prev => !prev);
      }, 500);
    }
  };

  return (
    <div className={styles.container}>
      {/* 상단 탭 */}
      <div className={styles.header}>
        <div className={styles.leftGroup}>
          <div className={styles.categoryList}>
            <button
              className={`${styles.board} ${viewType === "board" ? styles.activeTab : ""}`}
              onClick={() => { setViewType("board"); setSelectedPost(null); }}
            >
              게시판
            </button>
            <button
              className={`${styles.comment} ${viewType === "comment" ? styles.activeTab : ""}`}
              onClick={() => { setViewType("comment"); setSelectedComment(null); }}
            >
              댓글
            </button>
          </div>
        </div>
      </div>

      {/* 게시판 */}
      {viewType === "board" && (
        selectedPost ? (
          <BoardDetail
            post={selectedPost}
            setSelectedPost={setSelectedPost}
            onBack={handleBack}
            onDelete={() => handleDeletePost(selectedPost.board_seq)}
          />
        ) : (
          <BoardList
            newRender={newRender}
            onSelectPost={setSelectedPost}
          />
        )
      )}

      {/* 댓글 */}
      {viewType === "comment" && (
        <>
          <CommentList
            newRender={newRender}
            onSelectComment={setSelectedComment}
          />
          {selectedComment && (
            <CommentDetail
              comment={selectedComment}
              setSelectedComment={setSelectedComment}
              onClose={handleCloseComment}
              onDelete={() => handleDeleteComment(selectedComment.comment_seq)}
            />
          )}
        </>
      )}
    </div>
  );
};

export default Report;
