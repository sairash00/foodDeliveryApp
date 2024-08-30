import React from 'react'

const Skeleton = () => {
  return (
    <div className="flex md:max-w-[30vw] sm:max-w-[40vw] lg:max-w-[22vw] min-h-[50vh] flex-col gap-4">
        <div className="skeleton bg-gray-300  sm:h-[45vh] w-full"></div>
        <div className="skeleton bg-gray-300  h-4 w-28"></div>
        <div className="skeleton bg-gray-300  h-12 w-full"></div>
    </div>
  )
}

export default Skeleton