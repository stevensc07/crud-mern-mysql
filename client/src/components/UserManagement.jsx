import React, { useState, useEffect } from "react";
import axios from "axios";
import EditUserModal from "./EditUserModal";
import UserForm from "./UserForm";
import {
  MagnifyingGlassIcon,
  ChevronUpDownIcon,
} from "@heroicons/react/24/outline";
import { PencilIcon, UserPlusIcon, TrashIcon } from "@heroicons/react/24/solid";
import {
  Card,
  CardHeader,
  Input,
  Typography,
  Button,
  CardBody,
  CardFooter,
  Tabs,
  TabsHeader,
  Tab,
  Avatar,
  Tooltip,
} from "@material-tailwind/react";

const TABS = [
  {
    label: "All",
    value: "all",
  },
  {
    label: "Monitored",
    value: "monitored",
  },
];

const TABLE_HEAD = ["Name", "Last Name", "ID", "Create At", "Edit"];

const UserManagement = ({ onUserDeleted, onUserAdded }) => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [editedUsers, setEditedUsers] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);
  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = () => {
    axios
      .get("http://localhost:4000/api/users")
      .then((response) => {
        setUsers(response.data);
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
      });
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      axios
        .delete(`http://localhost:4000/api/users/${id}`)
        .then(() => {
          console.log("User deleted successfully");
          fetchUsers();
          onUserDeleted();

          alert("User deleted successfully");
        })
        .catch((error) => {
          console.error("Error deleting user:", error);

          alert("Error deleting user");
        });
    }
  };

  const handleEdit = (id) => {
    const userToEdit = users.find((user) => user.id === id);
    setEditedUsers((prevEditedUsers) => ({
      ...prevEditedUsers,
      [id]: userToEdit,
    }));
    setIsModalOpen(true);
  };

  const handleUpdateEditedUser = (id, field, value) => {
    setEditedUsers((prevEditedUsers) => ({
      ...prevEditedUsers,
      [id]: {
        ...prevEditedUsers[id],
        [field]: value,
      },
    }));
  };
  const handleUpdateUser = (id) => {
    axios
      .put(`http://localhost:4000/api/users/${id}`, editedUsers[id])
      .then((response) => {
        console.log("User updated successfully:", response.data);
        fetchUsers();

        alert("User updated successfully");
      })
      .catch((error) => {
        console.error("Error updating user:", error);

        alert("Error updating user");
      });
  };

  const handleInputChange = (e, id) => {
    const { name, value } = e.target;
    setEditedUsers((prevEditedUsers) => ({
      ...prevEditedUsers,
      [id]: {
        ...prevEditedUsers[id],
        [name]: value,
      },
    }));
  };

  return (
    <Card className="h-full w-full justify-center">
      <CardHeader floated={false} shadow={false} className="rounded-none">
        <div className="mb-8 flex items-center justify-between gap-8">
          <div>
            <Typography variant="h5" color="blue-gray">
              Members list
            </Typography>
            <Typography color="gray" className="mt-1 font-normal">
              See information about all members
            </Typography>
          </div>
          <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
            <Button variant="outlined" size="sm">
              view all
            </Button>
            <Button
              onClick={() => setIsFormOpen(true)}
              className="flex items-center gap-3"
              size="sm"
            >
              <UserPlusIcon strokeWidth={2} className="h-4 w-4" /> Add member
            </Button>

            {isFormOpen && (
              <UserForm
                onUserAdded={() => {
                  setIsFormOpen(false);
                  onUserAdded();
                }}
                fetchUsers={fetchUsers}
              />
            )}
          </div>
        </div>
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <Tabs value="all" className="w-full md:w-max">
            <TabsHeader>
              {TABS.map(({ label, value }) => (
                <Tab key={value} value={value}>
                  &nbsp;&nbsp;{label}&nbsp;&nbsp;
                </Tab>
              ))}
            </TabsHeader>
          </Tabs>
          <div className="w-full md:w-72">
            <Input
              onChange={(e) => setSearchTerm(e.target.value)}
              label="Search"
              icon={<MagnifyingGlassIcon className="h-5 w-5" />}
            />
          </div>
        </div>
      </CardHeader>
      <CardBody className="overflow-scroll px-0">
        <table className="mt-4 w-full min-w-max table-auto text-left">
          <thead>
            <tr>
              {TABLE_HEAD.map((head, index) => (
                <th
                  key={head}
                  className="cursor-pointer border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 transition-colors hover:bg-blue-gray-50"
                >
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="flex items-center justify-between gap-2 font-normal leading-none opacity-70"
                  >
                    {head}{" "}
                    {index !== TABLE_HEAD.length - 1 && (
                      <ChevronUpDownIcon strokeWidth={2} className="h-4 w-4" />
                    )}
                  </Typography>
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {users
              .filter((user) =>
                user.name.toLowerCase().includes(searchTerm.toLowerCase())
              )
              .map((user, index) => (
                <tr key={index}>
                  <td className="p-4 border-b border-blue-gray-50">
                    <div className="flex items-center gap-3">
                      <Avatar
                        src="https://docs.material-tailwind.com/img/face-2.jpg"
                        alt={user.name}
                        size="sm"
                      />
                      <div className="flex flex-col">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {user.name}
                        </Typography>
                        {editedUsers[user.id] && (
                          <EditUserModal
                            isOpen={isModalOpen}
                            onClose={() => setIsModalOpen(false)}
                            user={user}
                            onUpdateUser={() => handleUpdateUser(user.id)}
                            handleInputChange={(e) =>
                              handleInputChange(e, user.id)
                            }
                            onUpdateEditedUser={handleUpdateEditedUser}
                          />
                        )}
                      </div>
                    </div>
                  </td>
                  <td className="p-4 border-b border-blue-gray-50">
                    <div className="flex flex-col">
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {user.lastName}
                      </Typography>
                    </div>
                  </td>
                  <td className="p-4 border-b border-blue-gray-50">
                    <div className="flex flex-col">
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {user.id}
                      </Typography>
                    </div>
                  </td>
                  <td className="p-4 border-b border-blue-gray-50">
                    <div className="flex flex-col">
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {user.createAt}
                      </Typography>
                    </div>
                  </td>
                  <td className="p-4 border-b border-blue-gray-50">
                    <Tooltip content="Edit User">
                      <Button
                        onClick={() => handleEdit(user.id)}
                        variant="text"
                      >
                        <PencilIcon className="h-4 w-4" />
                      </Button>
                    </Tooltip>
                    <Tooltip content="Delet User">
                      <Button
                        onClick={() => handleDelete(user.id)}
                        variant="text"
                      >
                        <TrashIcon className="h-4 w-4" />
                      </Button>
                    </Tooltip>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </CardBody>
      <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
        <Typography variant="small" color="blue-gray" className="font-normal">
          {`Total users ${users.length}`}
        </Typography>
        <div className="flex gap-2">
          <Button variant="outlined" size="sm">
            Previous
          </Button>
          <Button variant="outlined" size="sm">
            Next
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default UserManagement;
