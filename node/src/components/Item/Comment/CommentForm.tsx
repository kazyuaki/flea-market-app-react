type Props = {
  comment: string
  setComment: (v: string) => void
  error?: string
  onSubmit: () => void
}

export default function CommentForm({ comment, setComment, error, onSubmit }: Props) {
  return (
    <>
      <div className="mt-3">
        <h2 className="text-2xl font-bold">商品へのコメント</h2>

        <textarea
          className={`w-full border mt-4 p-2 rounded text-2xl ${
            error ? "border-red-500 bg-red-50" : ""
          }`}
          rows={4}
          placeholder="コメントを入力"
          value={comment}
          onChange={e => setComment(e.target.value)}
          aria-invalid={error ? "true" : "false"}
          aria-describedby={error ? "comment-error" : undefined}
        />
        {error && (
          <p id="comment-error" className="mt-2 text-base font-bold text-red-500">
            {error}
          </p>
        )}
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
