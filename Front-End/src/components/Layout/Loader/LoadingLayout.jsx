

function LoadingLayout() {
  return (
    <div className=" w-full h-screen fixed  inset-0 z-50 flex items-center justify-center bg-background/5 backdrop-blur-[1px] ">
        <div className="bg-gray-500 p-4 rounded-lg">
        <div className="w-16  h-16 border-8 border-orange-500 border-t-transparent rounded-full animate-spin"></div>

        </div>
    

  </div>
  )
}

export default LoadingLayout