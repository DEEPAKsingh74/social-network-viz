import { useState } from "react";
import { useUserListStore } from "../../../store/useUserListStore";
import Button from "../../button/Button";
import UserCard from "./UserCard";
import UserProfile from "./UserProfile";
import UserSignUp from "../../UserSignup";
import { useUserStore, type User } from "../../../store/useUserStore";

const UserInfo = () => {
  const { users, addUser } = useUserListStore();
  const { user: adminUser } = useUserStore();
  const [isUserAddDialogOpen, setIsUserAddDialogOpen] = useState(false);

  const handleAddUserDialog = () => {
    setIsUserAddDialogOpen(!isUserAddDialogOpen);
  }

  const handleSubmitUser = (user: User) => {
    addUser(user);
    setIsUserAddDialogOpen(false);
  }

  return (
    <div className="flex  flex-col gap-5 min-h-screen">
      <UserProfile />

      <Button onClick={handleAddUserDialog}>
        <span>Add new User</span>
      </Button>

      <div className="px-1 w-full max-w-md overflow-y-auto h-[70vh]">
        {users && users.length > 0 ? (
          users.map((item) => (item.id != adminUser!.id) && <UserCard key={item.id} user={item} />)
        ) : (
          <div className="text-black/50 text-sm text-center">
            No user connections found yet. Please add users.
          </div>
        )}
      </div>

      {isUserAddDialogOpen && (
        <UserSignUp
          submituser={handleSubmitUser}
          onCancel={handleAddUserDialog}
        />
      )}
    </div>
  );
}

export default UserInfo;