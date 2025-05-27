export default function StatsCard({
    title,
    value,
    change,
}: {
    title: string;
    value: string;
    change: string;
}) {
    if (change === "hide") {
        return (
            <div className="border-border-primary1 h-20 rounded-xl border bg-white p-3 shadow-sm">
                <p className="text-text-secondary2 text-sm">{title}</p>
                <div className="flex items-baseline">
                    <span className="text-text-secondary1 text-2xl font-bold">
                        {value}
                    </span>
                </div>
            </div>
        );
    }
    const changeNumber = parseFloat(change.replace("%", ""));
    const isNegative = changeNumber < 0;
    const isZero = changeNumber === 0;

    return (
        <div className="border-border-primary1 h-20 rounded-xl border bg-white p-3 shadow-sm">
            <p className="text-text-secondary2 text-sm">{title}</p>
            <div className="flex items-baseline space-x-2">
                <span className="text-text-secondary1 text-2xl font-bold">
                    {value}
                </span>
                <span
                    className={`text-sm ${
                        isZero
                            ? "text-gray-400"
                            : isNegative
                              ? "text-red-600"
                              : "text-green-600"
                    }`}
                >
                    {isZero ? "⬆" : isNegative ? "⬇" : "⬆"}{" "}
                    {Math.abs(changeNumber)}
                </span>
                {/* <span className="text-sm text-green-600">⬆ {change}</span> */}
            </div>
        </div>
    );
}
