import { useState } from 'react'
import type { Comment } from '../../../types/comment'
import { getProfileImageUrl } from '../../../utils/profileImage'
import { ConfirmDialog } from '../../Common/ConfirmDialog'

type Props = {
  comments: Comment[]
  count: number
  onDelete: (commentId: number) => Promise<void> | void
}

/* コメント一覧と削除機能を提供するコンポーネント */
export default function CommentList({ comments, count, onDelete }: Props) {
  const [deleteTargetId, setDeleteTargetId] = useState<number | null>(null)
  const [isDeleting, setIsDeleting] = useState(false)

  const handleConfirmDelete = async () => {
    if (deleteTargetId === null || isDeleting) return

    setIsDeleting(true)

    try {
      await onDelete(deleteTargetId)
      setDeleteTargetId(null)
    } finally {
      setIsDeleting(false)
    }
  }

  return (
    <>
      <ConfirmDialog
        isOpen={deleteTargetId !== null}
        title="コメントを削除しますか？"
        message="削除したコメントは元に戻せません。"
        confirmLabel="削除する"
        onConfirm={handleConfirmDelete}
        onCancel={() => setDeleteTargetId(null)}
        isProcessing={isDeleting}
        variant="danger"
      />

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
                onClick={() => setDeleteTargetId(comment.id)}
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
