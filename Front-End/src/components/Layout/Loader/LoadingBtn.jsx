function LoadingBtn({ text="Please Wait....." }) {
  return (
    <div className="flex items-center space-x-2">
    <div className="relative">
      {/* Spinning R loader */}
      <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-s font-bold text-white">R</span>
      </div>
    </div>
    <span>{text} </span>
  </div>
  );
}

export default LoadingBtn;
