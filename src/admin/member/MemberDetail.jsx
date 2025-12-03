// src/admin/member/MemberDetail.jsx
import React from "react";
import styles from "./MemberDetail.module.css";
import { caxios } from "../../config/config";

const MemberDetail = ({ member, setNewRender, onClose }) => {
    if (!member) return null;

    const clickSecession = (id, nickname) => {
        // eslint-disable-next-line no-restricted-globals
        if (confirm(`회원 ${nickname}님을 강제탈퇴하시겠습니까?`)) {
            caxios.post("/user/secession", { user_id: id })
                .then(resp => {
                    alert("강제탈퇴 완료");
                    setNewRender(prev => !prev);
                    onClose();
                })
                .catch(err => console.log(err));
        }
    }

    return (
        <div className={styles.overlay}>
            <div className={styles.modal}>

                {/* 🎯 콘텐츠 영역: 제목과 정보 리스트를 묶음 */}
                <div className={styles.modalContent}>
                    {/* 모달 제목 */}
                    <h2 className={styles.modalTitle}>회원 정보</h2>

                    {/* 정보 출력 영역: infoList는 이미 묶여 있음 */}
                    <div className={styles.infoList}>
                        {/* 아이디 */}
                        <p className={styles.infoKey}>아이디</p>
                        <p className={styles.infoValue}>{member.user_id}</p>

                        {/* 닉네임 */}
                        <p className={styles.infoKey}>닉네임</p>
                        <p className={styles.infoValue}>{member.nickname}</p>

                        {/* 이메일 */}
                        <p className={styles.infoKey}>이메일</p>
                        <p className={styles.infoValue}>{member.email}</p>

                        {/* 생일 */}
                        <p className={styles.infoKey}>생일</p>
                        <p className={styles.infoValue}>
                            {member.birth_date
                                ? member.birth_date.split("-").map((v, i) => (i === 0 ? v.slice(2) : v)).join(".")
                                : ""}
                        </p>

                        {/* 연락처 */}
                        <p className={styles.infoKey}>연락처</p>
                        <p className={styles.infoValue}>
                            {member.contact.split('-').map((part, index, arr) => (
                                <span key={index}>
                                    {part}
                                    {index < arr.length - 1 && <span className={styles.dash}> - </span>}
                                </span>
                            ))}
                        </p>
                    </div>
                </div>

                {/* 버튼 영역: buttonContainer는 이미 묶여 있음 */}
                <div className={styles.buttonContainer}>
                    <button className={`${styles.actionButton} ${styles.cancelButton}`} onClick={onClose}>취소</button>
                    <button className={`${styles.actionButton} ${styles.completeButton}`} onClick={() => clickSecession(member.user_id, member.nickname)}>강제탈퇴</button>
                </div>
            </div>
        </div>
    );
};

export default MemberDetail;