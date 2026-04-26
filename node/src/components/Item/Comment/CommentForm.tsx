type Props = {
  comment: string
  setComment: (v: string) => void
  onSubmit: () => void
}

export default function CommentForm({ comment, setComment, onSubmit }: Props) {
  return (
    <>
      <div className="mt-3">
        <h2 className="text-2xl font-bold">商品へのコメント</h2>

        <textarea
          className="w-full border mt-4 p-2 rounded text-2xl"
          rows={4}
          placeholder="コメントを入力"
          value={comment}
          onChange={e => setComment(e.target.value)}
        />
      </div>

      <button
        onClick={onSubmit}
        disabled={!comment.trim()}
        className={`mt-3 w-full py-2 rounded text-2xl text-white ${
          comment.trim() ? 'bg-red-500' : 'bg-gray-400 cursor-not-allowed'
        }`}
      >
        コメントを送信する
      </button>
    </>
  )
}
