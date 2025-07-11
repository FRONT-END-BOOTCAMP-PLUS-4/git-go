"use client";

import { useState } from "react";
import SettingsTabs from "./components/SettingsTabs";
import Settings from "./components/Settings";
import Badges from "./components/Badges";

export default function SettingsPage() {
    const [selectedTab, setSelectedTab] = useState("badges");

    return (
        <div className="flex justify-center">
            <div className="border-border-primary1 bg-bg-member1 m-4 w-full max-w-[880px] rounded-md border p-6">
                <div className="mb-4 text-xl font-semibold">마이페이지</div>

                <SettingsTabs
                    selectedTab={selectedTab}
                    onSelect={setSelectedTab}
                />

                {selectedTab === "settings" && <Settings />}
                {selectedTab === "badges" && <Badges />}
            </div>
        </div>
    );
}
