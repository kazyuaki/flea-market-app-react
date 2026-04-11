import type { Address } from '../../types/address'

/** 配送先情報を表示するコンポーネント */
export const AddressSection = ({ address }: { address: Address }) => {
  return (
    <>
      <div className="mt-6 border-b border-gray-500 pb-6">
        <div className="flex justify-between items-center">
          <h3 className="font-bold">配送先</h3>
          <button className="text-blue-500 text-sm">
            変更する
          </button>
        </div>
        <p className="mt-3 text-sm">〒{address.post_code}</p>
        <p className="text-sm">{address.address}</p>
        <p className="text-sm">{address.building_name}</p>
      </div> 
    </>
  )

}



