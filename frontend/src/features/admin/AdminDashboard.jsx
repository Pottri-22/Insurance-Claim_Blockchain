import DashboardLayout from "../../components/layout/DashboardLayout";
import CreateCompany from "./CreateCompany";
import InsuranceCompanies from "./InsuranceCompanies";
import { useState } from "react";

export default function AdminDashboard() {
  const [reload, setReload] = useState(false);

  return (
    <DashboardLayout>
      <h2>Admin Dashboard</h2>
      <CreateCompany onCreated={() => setReload(!reload)} />
      <InsuranceCompanies reload={reload} />
    </DashboardLayout>
  );
}
