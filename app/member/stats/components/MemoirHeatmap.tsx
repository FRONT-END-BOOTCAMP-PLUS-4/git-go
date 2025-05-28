"use client";

import ReactCalendarHeatmap from "react-calendar-heatmap";
import "react-calendar-heatmap/dist/styles.css";
import { Tooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";

type HeatmapValue = {
    date: string;
    count: number;
};

export default function MemoirHeatmap({ data }: { data: HeatmapValue[] }) {
    const today = new Date();
    const oneYearAgo = new Date();
    oneYearAgo.setFullYear(today.getFullYear() - 1);

    return (
        <div className="border-border-primary1 h-[272px] rounded-xl border bg-white p-4 shadow-sm">
            <h3 className="mt-6 mb-4 text-center text-lg font-semibold">
                회고 히트맵
            </h3>
            <ReactCalendarHeatmap
                startDate={oneYearAgo}
                endDate={today}
                values={data}
                classForValue={(value: HeatmapValue | undefined) => {
                    if (!value || value.count === 0) return "color-empty";
                    if (value.count >= 5) return "color-scale-4";
                    if (value.count >= 3) return "color-scale-3";
                    if (value.count >= 1) return "color-scale-2";
                    return "color-scale-1";
                }}
                tooltipDataAttrs={(value: HeatmapValue | undefined) => {
                    if (!value || !value.date) return null;
                    const formattedDate = new Intl.DateTimeFormat("ko-KR", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                    }).format(new Date(value.date));
                    return {
                        "data-tooltip-id": "memoir-tooltip",
                        "data-tooltip-content": `${formattedDate}: ${value.count}회`,
                    };
                }}
                showWeekdayLabels={true}
            />
            <Tooltip id="memoir-tooltip" />
        </div>
    );
}
