
const LoadingScreen = () => {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center items-center">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      <p className="text-xs text-slate-500 mt-2 font-semibold">Loading...</p>
    </div>
  );
}

export default LoadingScreen
