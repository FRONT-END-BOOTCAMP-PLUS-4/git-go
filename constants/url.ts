export const MEMBER_URL = {
    main: "/member",
    commits: "/member/commits",
    prs: "/member/pull-requests",
    memoirs: "/member/memoirs",
    memoirs_detail: (source: string, memoirId: number) =>
        `/member/memoirs/${source}/${memoirId}`,
    stats: "/member/stats",
};
