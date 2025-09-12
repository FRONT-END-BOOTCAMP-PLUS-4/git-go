import Image from "next/image";
import Link from "next/link";
import Button from "../components/Button";

export default function NotFound() {
    return (
        <div className="bg-bg-primary1 mt-16 flex flex-col items-center justify-center text-center">
            <Image src="/404.png" alt="404" width={300} height={300} />
            <Link href="/">
                <Button>🏠 홈으로 돌아가기</Button>
            </Link>
        </div>
    );
}
