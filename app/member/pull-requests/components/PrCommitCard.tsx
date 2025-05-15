export default function PrCommitCard() {
    return (
        <li className="border-border-primary1 flex flex-col gap-y-1 border-b px-4 py-3 last:border-b-0">
            <div className="flex items-center gap-x-3 text-sm">
                <p className="text-text-secondary2">e2d4f6a</p>
                <p>Add user authentication components</p>
                <p className="text-text-secondary2 ml-auto">2 hours ago</p>
            </div>
            <div className="text-text-secondary2 flex items-center gap-x-3 text-xs">
                <p>Sarah Chen</p>
                <p>+156 -23</p>
            </div>
        </li>
    );
}
