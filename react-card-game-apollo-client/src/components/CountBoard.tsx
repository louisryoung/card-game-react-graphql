type Props = {
  type: string
  count: number
}

function CountBoard({ count, type }: Props) {
  return (
    <div className="flex flex-col items-center w-48 px-6 py-5 bg-gray-900 border border-[#FFF48C] gap-2">
      <div className="text-5xl font-bold text-white">{count}</div>
      <div className="text-xl text-white">{`${type}s Left`}</div>
    </div>
  )
}

export { CountBoard }
