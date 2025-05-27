export default function VideoSection({
    id,
    title,
    videoSrc,
    content,
}: {
    id: string;
    title: string;
    videoSrc: string;
    nextSectionId?: string;
    content: string;
}) {
    return (
        <section
            className="relative flex min-h-screen scroll-mt-24 flex-col items-center justify-center px-4"
            id={id}
        >
            <h2 className="mb-4 text-2xl font-bold">{title}</h2>
            <div className="text-xl">{content}</div>
            <video
                className="w-full max-w-3xl rounded-xl shadow-xl"
                autoPlay
                playsInline
                muted
                loop
                // src={videoSrc}
            />
        </section>
    );
}
