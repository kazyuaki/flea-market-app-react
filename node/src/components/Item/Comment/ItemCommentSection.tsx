import CommentForm from "./CommentForm"
import CommentList from "./CommentList"
import type { Comment } from "../../../types/comment"

type CommentProps = {
  comments: Comment[]
  count: number
  comment: string
  setComment: (v: string) => void
  onSubmit: () => void
}

export default function ItemCommentSection({
  comments,
  count,
  comment,
  setComment,
  onSubmit,
}: CommentProps) {
  return (
    <section className="mt-8" aria-label="商品コメント">
      <CommentList comments={comments} count={count} />
      <CommentForm
        comment={comment}
        setComment={setComment}
        onSubmit={onSubmit}
      />
    </section>
  )
}
