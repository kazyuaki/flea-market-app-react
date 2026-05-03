import type { Address } from '../../types/address'

type Props = {
  address: Address
  onClick: () => void
}

/** 配送先情報を表示するコンポーネント */
export const AddressSection = ({ address, onClick }: Props) => {
  return (
    <>
      <div className="mt-8 border-b border-gray-500 pb-10">
        <div className="flex items-center gap-5">
          <h3 className="text-3xl font-bold">配送先</h3>
          <button
            onClick={onClick}
            className="text-xl text-blue-500 underline hover:underline"
          >
            変更する
          </button>
        </div>
        <p className="mt-4 text-lg xl:text-xl">〒{address.postal_code}</p>
        <p className="text-lg xl:text-xl">{address.address}</p>
        <p className="text-lg xl:text-xl">{address.building_name}</p>
      </div> 
    </>
  )

}

