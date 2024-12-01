import React from "react";
// import { Card, CardHeader, CardTitle, CardContent } from "../../components/Card";
import { ActiveEngagedLinks } from "../../components/feed/ActiveEngagedLinks";
import { WhatsBuzzingInYourWorld } from "../../components/feed/WhatsBuzzingInYourWorld";

const FeedSidebar: React.FC = () => {
  return (
    <div className="space-y-4">
      <ActiveEngagedLinks />
      <WhatsBuzzingInYourWorld />
    </div>
  );
};

export default FeedSidebar;