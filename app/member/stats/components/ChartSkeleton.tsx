export default function ChartSkeleton() {
    return (
        <div>
            <div className="h-4 bg-gray-300 rounded w-1/6 mt-2"></div>
            <div className="h-4 bg-gray-200 rounded w-1/8 mt-2 mb-2"></div>
            <div className="w-full h-56 bg-gray-100 rounded-lg relative overflow-hidden">
                {[...Array(4)].map((_, i) => (
                    <div
                        key={i}
                        className="absolute left-0 w-full h-[1px] bg-gray-200"
                        style={{ top: `${(i + 1) * 20}%` }}
                    />
                ))}

                <svg
                    viewBox="0 0 100 40"
                    preserveAspectRatio="none"
                    className="w-full h-full"
                >
                    <path
                        d="M0,35 C20,30 40,10 60,20 C80,30 100,15 120,25"
                        stroke="#d1d5db"
                        strokeWidth="1.5"
                        fill="none"
                        className="animate-pulse"
                    />
                </svg>
            </div>
        </div>
    );
}