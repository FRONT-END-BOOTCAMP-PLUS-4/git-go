export function Skeleton({ className }: { className?: string }) {
    return (
        <div
            className={`bg-bg-skeleton1 animate-pulse rounded-md ${className}`}
        />
    );
}
