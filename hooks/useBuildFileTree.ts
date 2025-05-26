type FileNode = {
    name: string;
    path: string;
    children?: FileNode[];
    isFile?: boolean;
};

export default function useBuildFileTree(
    files: { filename: string }[]
): FileNode[] {
    const root: FileNode[] = [];

    for (const file of files) {
        const parts = file.filename.split("/");
        let currentLevel = root;
        let path = "";

        parts.forEach((part, i) => {
            path += (i > 0 ? "/" : "") + part;
            let existing = currentLevel.find((node) => node.name === part);
            if (!existing) {
                existing = {
                    name: part,
                    path,
                    isFile: i === parts.length - 1,
                    ...(i === parts.length - 1 ? {} : { children: [] }),
                };
                currentLevel.push(existing);
            }
            if (existing.children && !existing.isFile) {
                currentLevel = existing.children;
            }
        });
    }

    return root;
}
