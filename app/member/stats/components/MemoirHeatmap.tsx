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
        <div className="border-border-primary1 bg-bg-member1 h-[180px] overflow-x-auto rounded-xl border pr-2 shadow-sm">
            <h3 className="text-md mt-4 mb-2 ml-4 font-semibold">
                회고 히트맵
            </h3>

            <div className="flex">
                <div
                    className="h-[140px] flex-1 overflow-x-auto overflow-y-hidden md:w-[100vw] [&>svg.react-calendar-heatmap]:block [&>svg.react-calendar-heatmap]:h-full [&>svg.react-calendar-heatmap]:w-auto md:[&>svg.react-calendar-heatmap]:h-auto md:[&>svg.react-calendar-heatmap]:w-full [&>svg.react-calendar-heatmap>g.react-calendar-heatmap-weekday-labels]:-translate-x-1"
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
                        showWeekdayLabels={true}
                    />
                </div>
            </div>

            <Tooltip id="memoir-tooltip" />
        </div>
    );
}
