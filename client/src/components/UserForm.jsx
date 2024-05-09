import React, { useState } from "react";
import axios from "axios";
import { Button } from "@material-tailwind/react";
const UserForm = ({ onUserAdded }) => {
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:4000/api/users", { name, lastName })
      .then((response) => {
        console.log("User created successfully:", response.data);
        onUserAdded();
        setLastName("");

        alert("User created successfully");
      })
      .catch((error) => {
        console.error("Error creating user:", error);

        alert("Error creating user");
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="border border-gray-300 rounded-md p-2 mb-2"
      />
      <input
        type="text"
        placeholder="Last Name"
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
        className="border border-gray-300 rounded-md p-2 mb-2"
      />

      <Button className="mx-2" type="submit" variant="gradient">
        Create User
      </Button>
    </form>
  );
};

export default UserForm;
