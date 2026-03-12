

export default function Loading() {
    return (
        <div className="flex-1 flex flex-col items-center justify-center bg-[#050505] min-h-[50vh]">
            <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mb-4 shadow-[0_0_15px_rgba(37,99,235,0.3)]"></div>
            <p className="text-gray-500 text-sm font-bold uppercase tracking-widest animate-pulse">
                Optimizing Experience...
            </p>
        </div>
    );
}
