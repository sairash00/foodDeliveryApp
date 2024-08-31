
const Skeleton = () => {
  return (
    <div className="flex md:max-w-[30vw] sm:max-w-[40vw] lg:max-w-[22vw] min-h-[50vh] flex-col gap-4">
        <div className="skeleton bg-gray-300 max-sm:h-[50vh] sm:h-[45vh] w-full"></div>
        <div className="skeleton bg-gray-300  h-4 w-28"></div>
        <div className="skeleton bg-gray-300  h-12 w-full"></div>
    </div>
  )
}

export default Skeleton