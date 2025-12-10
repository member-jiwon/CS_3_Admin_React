// src/admin/report/CommentDetail.jsx
import React, { useEffect } from "react";
import styles from "./CommentDetail.module.css";
import { caxios } from "../../config/config";

const CommentDetail = ({ comment, setSelectedComment, onClose, onDelete }) => {

  useEffect(() => {
    caxios.get("/report/commentDetail", { params: { comment_seq: comment.comment_seq } })
      .then(resp => {
        setSelectedComment(prev => ({
          ...prev,
          report_types: resp.data.map(item => item.report_type)
        }));
      })
  }, []);

  if (!comment) return null;

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <h3 className={styles.modalAuthor}>{comment.user_id}</h3>
        <div className={styles.modalMeta}>
          <span className={styles.modalDate}>{comment.created_at}</span>
          <span className={styles.modalReport}>신고사유 :
            {comment.report_types &&
              Object.entries(
                comment.report_types.reduce((acc, type) => {
                  acc[type] = (acc[type] || 0) + 1;
                  return acc;
                }, {})
              ).map(([type, count]) => (
                <span key={type}>{`${type}(${count})`} </span>
              ))
            }
          </span>
        </div>

        <p className={styles.modalComment}>{comment.comment_content}</p>

        <div className={styles.buttons}>
          <button className={styles.btnBack} onClick={onClose}>뒤로가기</button>
          <button className={styles.btnDelete} onClick={() => onDelete ? onDelete(comment.id) : alert(`댓글 ${comment.id} 삭제`)}>삭제</button>
        </div>
      </div>
    </div>
  );
};

export default CommentDetail;