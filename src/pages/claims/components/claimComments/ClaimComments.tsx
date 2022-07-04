import { format } from "date-fns";
import React from "react";
import { useGetClaimCommentsQuery } from "src/services/api/claimsApi";
import styles from "./ClaimComment.module.less";

export interface IClaimComment {
  id: number;
  claimId: number;
  createDate: number;
  creatorId: number;
  creatorName: string;
  description: string;
}

const ClaimComments = ({ claimId }: { claimId: number }) => {
  const { data: comments } = useGetClaimCommentsQuery(claimId.toString());

  return comments ? (
    <div>
      {comments?.map((comment: IClaimComment) => (
        <CommentCard key={comment.id} comment={comment} />
      ))}
    </div>
  ) : (
    <h1>Nothing</h1>
  );
};

const CommentCard = ({ comment }: { comment: IClaimComment }) => (
  <div className={styles.comment_card__container}>
    <div
      title={comment.description}
      className={styles.comment_card__description}
    >
      {comment.description}
    </div>
    <div className={styles.comment_card__row}>
      <span>{comment.creatorName}</span>
      <span>{format(comment.createDate, "dd.MM.yyyy")}</span>
    </div>
  </div>
);

export default ClaimComments;