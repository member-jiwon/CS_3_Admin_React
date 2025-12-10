
import React, { useState } from "react";
import styles from "./BoardList.module.css";
import useCommentList from "./useCommentList";

const ITEMS_PER_PAGE = 10;

const CommentList = ({ newRender, onSelectComment }) => {
  const [currentPage, setCurrentPage] = useState(1);

  const { data = [] } = useCommentList(newRender);
  const totalPages = Math.ceil(data.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentItems = data.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  return (
    <div className={styles.cardGrid}>
      <div className={styles.listHeader}>
        <div className={styles.listColNumber}>번호</div>
        <div className={styles.listColTitle}>댓글</div>
        <div className={styles.listColAuthor}>작성자</div>
        <div className={styles.listColDate}>작성일</div>
        <div className={styles.listColReport}>신고횟수</div>
      </div>

      {currentItems.length > 0 ? currentItems.map((item) => (
        <div
          key={item.id}
          className={styles.listRow}
          onClick={() => onSelectComment(item)}
        >
          <div className={styles.listColNumber}>{item.comment_seq}</div>
          <div className={styles.listColTitle}>{item.comment_content}</div>
          <div className={styles.listColAuthor}>{item.user_id}</div>
          <div className={styles.listColDate}>{item.created_at}</div>
          <div className={styles.listColReport}>{item.is_deleted}</div>
        </div>
      )) : <div>신고 댓글이 존재하지 않습니다.</div>}

      <div className={styles.pagination}>
        <button
          className={styles.pageControl}
          onClick={() => setCurrentPage(1)}
          disabled={currentPage === 1}
        >{"<<"}</button>
        <button
          className={styles.pageControl}
          onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
          disabled={currentPage === 1}
        >{"<"}</button>

        <div className={styles.pageNumbers}>
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              className={`${styles.pageBtn} ${currentPage === i + 1 ? styles.activePage : ""}`}
              onClick={() => setCurrentPage(i + 1)}
            >
              {i + 1}
            </button>
          ))}
        </div>

        <button
          className={styles.pageControl}
          onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
          disabled={currentPage === totalPages}
        >{">"}</button>
        <button
          className={styles.pageControl}
          onClick={() => setCurrentPage(totalPages)}
          disabled={currentPage === totalPages}
        >{">>"}</button>
      </div>
    </div>
  );
};

export default CommentList;
