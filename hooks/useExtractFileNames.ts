type FileData = {
    filename: string;
    [key: string]: any; // 다른 필드 무시
};

export default function useExtractFilenames(files: FileData[]): string[] {
    return files.map((file) => file.filename);
}
