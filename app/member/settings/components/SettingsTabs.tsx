"use client";

const tabs = [
    { key: "badges", label: "뱃지" },
    { key: "settings", label: "설정" },
];

export default function SettingsTabs({
    selectedTab,
    onSelect,
}: {
    selectedTab: string;
    onSelect: (key: string) => void;
}) {
    return (
        <div className="border-border-primary1 mb-6 flex border-b">
            {tabs.map((tab) => (
                <button
                    key={tab.key}
                    className={`mr-4 pb-2 text-sm font-medium ${
                        selectedTab === tab.key
                            ? "border-text-primary1 text-text-primary1 border-b-2"
                            : "text-text-secondary2"
                    }`}
                    onClick={() => onSelect(tab.key)}
                >
                    {tab.label}
                </button>
            ))}
        </div>
    );
}
