import React, { useState } from "react";
import UserForm from "../components/UserForm";
import UserManagement from "../components/UserManagement";
export default function Home() {
  const [refreshList, setRefreshList] = useState(false);

  const handleUserAdded = () => {
    setRefreshList(!refreshList);
  };
  const handleUserDeleted = () => {
    setRefreshList(!refreshList);
  };

  return (
    <div>
      <UserManagement
        onUserDeleted={handleUserDeleted}
        onUserAdded={handleUserAdded}
      />
    </div>
  );
}
