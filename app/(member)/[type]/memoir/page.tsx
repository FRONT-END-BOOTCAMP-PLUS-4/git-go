"use client";

import { useParams } from "next/navigation";
import CommitMemoir from "./components/CommitMemoir";
import PullRequestMemoir from "./components/PullRequestMemoir";

export default function CreateMemoirPage() {
    const { type } = useParams();

    if (type === "commit") {
        return <CommitMemoir />;
    }

    if (type === "pull-request") {
        return <PullRequestMemoir />;
    }
}
