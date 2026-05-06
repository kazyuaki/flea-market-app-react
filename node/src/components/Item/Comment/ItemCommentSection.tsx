import CommentForm from "./CommentForm"
import CommentList from "./CommentList"
import type { Comment } from "../../../types/comment"

type CommentProps = {
  comments: Comment[]
  count: number
  comment: string
  setComment: (v: string) => void
  error?: string
  onSubmit: () => void
  onDelete: (commentId: number) => void
}

export default function ItemCommentSection({
  comments,
  count,
  comment,
  setComment,
  error,
  onSubmit,
  onDelete,
}: CommentProps) {
  return (
    <section className="mt-16" aria-label="商品コメント">
      <CommentList
        comments={comments}
        count={count}
        onDelete={onDelete}
      />
      <CommentForm
        comment={comment}
        setComment={setComment}
        error={error}
        onSubmit={onSubmit}
      />
    </section>
  )
}
