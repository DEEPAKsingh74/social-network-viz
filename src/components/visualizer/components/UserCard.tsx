import { useState } from 'react';
import { FiMoreVertical, FiMail, FiUser } from 'react-icons/fi';
import { useUserStore, type User } from '../../../store/useUserStore';
import { useUserListStore } from '../../../store/useUserListStore';
import Dialog from '../../dialog/Dialog';
import { useEdgesStore } from '../../../store/useEdgesStore';
import { useNodesStore } from '../../../store/useNodesStore';
import { toast } from 'react-toastify';


interface UserCardProps {
  user: User;
  onMenuClick?: (userId: number) => void;
}

const UserCard: React.FC<UserCardProps> = ({ user, onMenuClick }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { removeUserById } = useUserListStore();
  const { addEdge, removeEdge } = useEdgesStore();
  const { removeNode } = useNodesStore();
  const { user: adminUser } = useUserStore();

  const isFollowed = useEdgesStore((state) =>
    state.isFollowing(adminUser!.id, user.id) ?? false
  );


  const [removeUserConfirm, setRemoveUserConfirm] = useState(false);

  const handleRemoveUser = (userId: number) => {
    // remove the edge
    const edgeId = `${userId}-${adminUser!.id}`;
    const edgeIdInverse = `${adminUser!.id}-${userId}`;

    removeEdge(edgeId);
    removeEdge(edgeIdInverse);

    // remove the node
    removeNode(userId);

    removeUserById(userId);

    toast.success(`${userId} removed`)
  }

  const handleFollowUser = (userId: number) => {
    console.log("admin user id: ", adminUser?.id);
    console.log("user id: ", userId);

    if (adminUser?.id == undefined || adminUser?.id == null) return;

    const edgeId = `${adminUser.id}-${userId}`;
    console.log("edge id: ", edgeId);

    if (isFollowed) {
      removeEdge(edgeId);
    } else {
      addEdge({ id: edgeId, from: adminUser.id, to: userId });
    }

    setIsMenuOpen(false);
  };


  return (
    <div className="flex items-center p-2 hover:bg-gray-50 transition-colors gap-1">

      <div className='flex justify-center items-center bg-red-500 text-white rounded-full w-5 h-5 text-xs' title='user-id'>
        {user.id}
      </div>

      {/* Profile Image (Left) */}
      <div className="mr-3">
        {user.profile ? (
          <img
            src={user.profile}
            alt={user.firstName}
            className="w-10 h-10 rounded-full object-cover"
          />
        ) : (
          <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-400 to-purple-500 flex items-center justify-center text-white">
            <FiUser size={18} />
          </div>
        )}
      </div>

      {/* User Info (Middle) */}
      <div className="flex-1 min-w-0">
        <p className="font-medium text-sm truncate max-w-[160px] overflow-hidden whitespace-nowrap">
          {user.firstName} {user.lastName ?? ""}
        </p>
        <p className="text-gray-500 text-xs flex items-center truncate max-w-[160px] overflow-hidden whitespace-nowrap">
          <FiMail className="mr-1 shrink-0" size={12} />
          {user.email}
        </p>
      </div>



      {/* 3-dot Menu (Right) */}
      <div className="relative">
        <button
          onClick={() => {
            setIsMenuOpen(!isMenuOpen);
            onMenuClick?.(user.id);
          }}
          className="p-1 text-gray-500 hover:text-gray-800"
        >
          <FiMoreVertical size={18} />
        </button>

        {isMenuOpen && (
          <div className="absolute right-0 mt-1 w-40 bg-white rounded-md shadow-lg py-1 z-10 border border-gray-200">
            
            <button className={`block w-full text-left px-4 py-2 text-sm hover:bg-gray-100 ${isFollowed && "text-red-400"}`}
              onClick={() => handleFollowUser(user.id)}
            >

              {
                isFollowed ? "Unfollow" : "Follow"
              }

            </button>
            <button className="block w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-gray-100"
              onClick={() => setRemoveUserConfirm(true)}
            >
              Remove
            </button>
          </div>
        )}
      </div>

      {/* confirmation dialog  */}

      {
        removeUserConfirm && (
          <Dialog
            title='Delete User'
            description='Confirm if you want to remove this user.'
            cancelText='cancel'
            confirmText='delete'
            isOpen={removeUserConfirm}
            onConfirm={() => handleRemoveUser(user.id)}
            onCancel={() => setRemoveUserConfirm(false)}
          />
        )
      }
    </div>
  );
};

export default UserCard;