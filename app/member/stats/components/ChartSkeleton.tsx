export default function ChartSkeleton() {
    return (
        <div className="h-full w-full animate-pulse">
            <div className="mb-2 h-4 w-1/4 rounded bg-gray-300"></div>
            <div className="mb-4 h-4 w-1/5 rounded bg-gray-200"></div>
            <div className="relative h-[208px] w-full overflow-hidden rounded-md bg-gray-100">
                {[...Array(4)].map((_, i) => (
                    <div
                        key={i}
                        className="absolute left-0 h-[1px] w-full bg-gray-200"
                        style={{ top: `${(i + 1) * 20}%` }}
                    />
                ))}

                <svg
                    viewBox="0 0 100 40"
                    preserveAspectRatio="none"
                    className="h-full w-full"
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
