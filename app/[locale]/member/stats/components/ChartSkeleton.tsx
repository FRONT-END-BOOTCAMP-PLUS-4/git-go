export default function ChartSkeleton() {
    return (
        <div className="h-full w-full animate-pulse">
            <div className="bg-bg-skeleton2 mb-2 h-4 w-1/4 rounded"></div>
            <div className="bg-bg-skeleton1 mb-4 h-4 w-1/5 rounded"></div>
            <div className="bg-bg-skeleton1 relative h-[208px] w-full overflow-hidden rounded-md">
                {[...Array(4)].map((_, i) => (
                    <div
                        key={i}
                        className="bg-bg-skeleton1 absolute left-0 h-[1px] w-full"
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
