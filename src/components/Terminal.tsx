function Terminal() {
  return (
    <div className="w-[90%] max-w-6xl h-[85vh] rounded-xl overflow-hidden border border-zinc-700 bg-[#0d1117] shadow-2xl">

      <div className="flex items-center gap-2 bg-zinc-800 px-4 py-3 border-b border-zinc-700">
        <div className="h-3 w-3 rounded-full bg-red-500"></div>
        <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
        <div className="h-3 w-3 rounded-full bg-green-500"></div>

        <p className="ml-4 text-sm text-gray-300">
          yash@portfolio
        </p>
      </div>

      <div className="p-6 text-green-400 font-mono">
        Terminal Loading...
      </div>

    </div>
  );
}

export default Terminal;