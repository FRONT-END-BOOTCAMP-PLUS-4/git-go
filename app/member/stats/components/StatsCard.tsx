export default function StatsCard({
    title,
    value,
    change,
}: {
    title: string;
    value: string;
    change: string;
}) {
    return (
        <div className="border-border-primary1 h-30 rounded-xl border bg-white p-4 shadow-sm">
            <p className="text-text-secondary2 mb-6 text-sm">{title}</p>
            <div className="flex items-baseline space-x-2">
                <span className="text-text-secondary1 text-2xl font-bold">
                    {value}
                </span>
                <span className="text-sm text-green-600">⬆ {change}</span>
            </div>
        </div>
    );
}
