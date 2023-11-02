const Loading = () => {
  return (
    <div className="fixed z-[60] flex h-screen w-full items-center justify-center bg-slate-900">
      <span className="loading loading-infinity w-24 bg-gradient-to-r from-emerald-500 to-sky-500"></span>
    </div>
  );
};

export default Loading;
