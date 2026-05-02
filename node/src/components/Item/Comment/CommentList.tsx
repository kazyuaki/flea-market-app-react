import type { Comment } from '../../../types/comment'
import { getProfileImageUrl } from '../../../utils/profileImage'

type Props = {
  comments: Comment[]
  count: number
  onDelete: (commentId: number) => void
}

export default function CommentList({ comments, count, onDelete }: Props) {
  return (
    <>
      <h2 className="text-2xl text-gray-600 font-bold mb-2">
        コメント({count})
      </h2>

      {comments.map(comment => {
        const avatarUrl = getProfileImageUrl(comment.user.profile_image_url)

        return (
          <div key={comment.id} className="bg-gray-100 p-3 rounded text-base mb-2">
            <div className="flex items-center gap-2 mb-2">
              {avatarUrl ? (
                <img
                  src={avatarUrl}
                  alt={`${comment.user.name}のプロフィール画像`}
                  className="w-8 h-8 rounded-full object-cover"
                />
              ) : (
                <div className="w-8 h-8 bg-gray-300 rounded-full" />
              )}
              <p className="font-bold">
                {comment.user.name}
              </p>
              <button
                type="button"
                onClick={() => onDelete(comment.id)}
                className="ml-5 text-sm text-red-500">
                削除
              </button>
            </div>

            <p className="text-gray-600">
              {comment.content}
            </p>
          </div>
        )
      })}
    </>
  )
}
