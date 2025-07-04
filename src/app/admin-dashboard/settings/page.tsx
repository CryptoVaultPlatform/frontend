"use client";

import { useState } from "react";
import { Switch } from "@/components/ui/switch";

const SettingsPage = () => {
  const [isWithdrawals, setIsWithdrawals] = useState<boolean>(true);
  const [isManualApproval, setIsManualApproval] = useState<boolean>(true);

  return (
    <div className="flex flex-col gap-6 p-4 md:p-6">
      <h3>Settings</h3>
      <div className="flex flex-col gap-4 p-4 rounded-[12px] bg-[#1F1F2E]">
        <div className="flex justify-between items-center gap-2">
          <h6>Withdrawals</h6>
          <Switch
            checked={isWithdrawals}
            onCheckedChange={() => {
              setIsWithdrawals(!isWithdrawals);
            }}
          />
        </div>
        <div className="flex justify-between items-center gap-2">
          <h6>Minimum Withdrawable Balance</h6>
          <h6>$1,500</h6>
        </div>
        <div className="flex justify-between items-center gap-2">
          <h6>Manual Approval</h6>
          <Switch
            checked={isManualApproval}
            onCheckedChange={() => {
              setIsManualApproval(!isManualApproval);
            }}
          />
        </div>
        <div className="flex justify-between items-center gap-2">
          <h6>Dark Mode</h6>
          <Switch checked={true} disabled />
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
