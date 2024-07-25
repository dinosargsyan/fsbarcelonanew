import dynamic from "next/dynamic";
import React from "react";

// Dynamically import the Example component with no SSR
const Example = dynamic(() => import("../../components/Admin/Example"), { ssr: false });

const AdminPage: React.FC = () => {
  return <Example placeholder="Enter content here..." />;
};

export default AdminPage;
