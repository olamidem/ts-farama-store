
const LoadingScreen = ({ text }: { text: string }) => {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center items-center">
      <div className="animate-spin rounded-full h-20 w-20 border-b-2 border-blue-600"></div>
      <p className="text-xs text-slate-500 mt-2 font-semibold">{text}</p>
    </div>
  );
}

export default LoadingScreen
