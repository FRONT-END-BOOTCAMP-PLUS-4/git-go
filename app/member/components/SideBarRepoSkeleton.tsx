export default function SideBarRepoSkeleton() {
    return (
        <ul className="flex flex-col gap-y-2 p-2">
            {Array.from({ length: 3 }).map((_, i) => (
                <li
                    key={i}
                    className="animate-pulse h-10 w-full bg-gray-200 rounded-md"
                />
            ))}
        </ul>
    );
}