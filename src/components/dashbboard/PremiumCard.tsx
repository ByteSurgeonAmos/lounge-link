import React from "react";
import { ArrowUpRight } from "lucide-react";

interface PremiumCardProps {
  onUpgradeClick?: () => void;
}

const PremiumCard: React.FC<PremiumCardProps> = ({ onUpgradeClick }) => {
  return (
    <div
      className="bg-amber-400 rounded-lg p-6 max-w-md cursor-pointer hover:bg-amber-500 transition-colors duration-300"
      onClick={onUpgradeClick}
    >
      <div className="flex items-start justify-between">
        <div className="space-y-4">
          <div className="space-y-1">
            <p className="text-white text-lg font-medium">Upgrade</p>
            <h2 className="text-white text-2xl font-bold">GO PREMIUM</h2>
          </div>

          <p className="text-white/90 text-sm leading-relaxed">
            Unlock exclusive benefits designed to elevate your networking
            experience. Connect with professionals in new cities at the flip of
            a switch. Browse profiles discreetly and stay in control of your
            visibility. Organize and join events that match your interests,
            instantly and so much more.
          </p>

          <div className="flex items-center space-x-2 text-white">
            <ArrowUpRight className="w-5 h-5" />
            <ArrowUpRight className="w-5 h-5" />
            <ArrowUpRight className="w-5 h-5" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PremiumCard;
