import { Line } from "react-chartjs-2";
import {
    Chart as ChartJS,
    LineElement,
    PointElement,
    LinearScale,
    TimeScale,
    Title,
    Tooltip,
    Legend,
    Filler,
    CategoryScale,
} from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";

ChartJS.register(
    LineElement,
    PointElement,
    LinearScale,
    TimeScale,
    Title,
    Tooltip,
    Legend,
    Filler,
    CategoryScale,
    ChartDataLabels
);

interface Props {
    data: { date: string; count: number }[];
}

export default function WeeklyCommitChart({ data }: Props) {
    const chartData = {
        labels: data.map((d) => {
            const date = new Date(d.date);
            const mm = String(date.getMonth() + 1).padStart(2, "0");
            const dd = String(date.getDate()).padStart(2, "0");
            return `${mm}.${dd}`;
        }),
        datasets: [
            {
                label: "커밋 수",
                data: data.map((d) => d.count),
                fill: true,
                backgroundColor: "rgba(99, 102, 241, 0.1)",
                borderColor: "#6366f1",
                tension: 0.4,
                pointRadius: 4,
                pointHoverRadius: 6,
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: { display: false },
            tooltip: {
                callbacks: {
                    label: (context: any) => `${context.parsed.y} 커밋`,
                },
            },
            datalabels: {
                anchor: "end" as const,
                align: "top" as const,
                font: {
                    size: 10,
                },
                color: "#6366f1",
                formatter: (value: number) => `${value}`,
            },
        },
        scales: {
            y: {
                beginAtZero: true,
                ticks: {
                    stepSize: 1,
                    callback: function (
                        this: any,
                        tickValue: number | string,
                    ): string | number | null {
                        const maxValue = Math.max(...data.map((d) => d.count));
                        return tickValue === maxValue ? tickValue : "";
                    },
                },
                suggestedMax: Math.max(...data.map(d => d.count)) + 1.5,
                grid: {
                    display: false,
                },
            },
            x: {
                grid: {
                    display: false,
                },
            },
        },
    };

    return <Line data={chartData} options={options} plugins={[ChartDataLabels]} />;
}