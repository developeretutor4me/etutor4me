import React from "react";
import Totalincome from "./Totalincome";
import TotalPayouts from "./TotalPayouts";

function Dashboard() {
  return (
    <div>
     
      <div className="flex gap-4">
        <Totalincome />
        <TotalPayouts />
      </div>
    </div>
  );
}

export default Dashboard;
