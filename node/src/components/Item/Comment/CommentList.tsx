import type { Comment } from '../../../types/comment'

type Props = {
  comments: Comment[]
  count: number
}

export default function CommentList({ comments, count }: Props) {
  return (
    <>
      <h2 className="text-2xl text-gray-600 font-bold mb-2">
        コメント({count})
      </h2>

      {comments.map(comment => (
        <div key={comment.id} className="bg-gray-100 p-3 rounded text-base mb-2">
          
          <div className="flex items-center gap-2 mb-2">
            <div className="w-8 h-8 bg-gray-300 rounded-full" />
            <p className="font-bold">
              {comment.user.name}
            </p>
          </div>

          <p className="text-gray-600">
            {comment.content}
          </p>

        </div>
      ))}
    </>
  )
}
