type Item = {
  id: number
  name: string
  image_url: string
  status: string
}

export default function ItemCard({ item }: { item: Item }) {
  return (
    <div style={{ width: '150px', position: 'relative' }}>
      {/* 画像 */}
      <img
        src={item.image_url || 'https://via.placeholder.com/150'}
        alt={item.name}
        width="150"
        height="150"
      />

      {/* 商品名 */}
      <p>{item.name}</p>

      {/* SOLD */}
      {item.status === 'sold' && (
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          background: 'red',
          color: 'white',
          padding: '5px'
        }}>
          SOLD
        </div>
      )}
    </div>
  )
}