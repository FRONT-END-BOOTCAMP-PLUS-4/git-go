"use client";

import ReactCalendarHeatmap from "react-calendar-heatmap";
import "react-calendar-heatmap/dist/styles.css";
import { Tooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";
import { useEffect, useRef } from "react";

type HeatmapValue = { date: string; count: number };

export default function MemoirHeatmap({ data }: { data: HeatmapValue[] }) {
    const today = new Date();
    const oneYearAgo = new Date();
    oneYearAgo.setFullYear(today.getFullYear() - 1);

    const wrapRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        requestAnimationFrame(() => {
            const el = wrapRef.current;
            if (!el) return;
            el.scrollLeft = el.scrollWidth;
        });
    }, [data]);

    return (
        <div className="border-border-primary1 bg-bg-member1 h-[180px] rounded-xl border pr-2 shadow-sm md:h-[272px]">
            <h3 className="text-md mt-4 mb-4 ml-4 font-semibold">
                회고 히트맵
            </h3>

            <div className="flex">
                {/* ✅ 요일 라벨 영역 */}
                <div className="text-text-secondary2 flex flex-col pt-[14px] pr-2 pl-4 text-[10px] md:justify-between md:py-7 md:text-xs">
                    {["일", "월", "화", "수", "목", "금", "토"].map((d) => (
                        <div
                            key={d}
                            className="mt-[6px] h-[9px] leading-[9px] md:mt-1.5 md:h-[18px] md:leading-[18px]"
                        >
                            {d}
                        </div>
                    ))}
                </div>

                {/* ✅ Heatmap */}
                <div
                    className="h-[120px] flex-1 overflow-x-auto overflow-y-hidden md:h-[200px] [&>svg.react-calendar-heatmap]:block [&>svg.react-calendar-heatmap]:h-full [&>svg.react-calendar-heatmap]:w-auto"
                    ref={wrapRef}
                >
                    <ReactCalendarHeatmap
                        startDate={oneYearAgo}
                        endDate={today}
                        values={data}
                        classForValue={(v) => {
                            if (!v || v.count === 0) return "color-empty";
                            if (v.count >= 5) return "color-scale-4";
                            if (v.count >= 3) return "color-scale-3";
                            if (v.count >= 1) return "color-scale-2";
                            return "color-scale-1";
                        }}
                        tooltipDataAttrs={(v) => {
                            if (!v || !v.date) return null;
                            const formatted = new Intl.DateTimeFormat("ko-KR", {
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                            }).format(new Date(v.date));
                            return {
                                "data-tooltip-id": "memoir-tooltip",
                                "data-tooltip-content": `${formatted}: ${v.count}회`,
                            };
                        }}
                        showWeekdayLabels={false} // 라이브러리 기본 요일 라벨은 꺼버림
                    />
                </div>
            </div>

            <Tooltip id="memoir-tooltip" />
        </div>
    );
}
