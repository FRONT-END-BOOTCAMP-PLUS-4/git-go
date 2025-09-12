export default function SideBarRepoSkeleton() {
    return (
        <ul className="flex flex-col gap-y-2 p-2">
            {Array.from({ length: 3 }).map((_, i) => (
                <li
                    key={i}
                    className="bg-bg-skeleton1 h-10 w-full animate-pulse rounded-md"
                />
            ))}
        </ul>
    );
}
