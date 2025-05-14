"use client";

import { useParams } from "next/navigation";
import CommitMemoir from "./components/CommitMemoir";
import PullRequestMemoir from "./components/PullRequestMemoir";

export default function CreateMemoirPage() {
    const { type } = useParams();

    if (type === "commits") {
        return <CommitMemoir />;
    }

    if (type === "pull-requests") {
        return <PullRequestMemoir />;
    }
}
