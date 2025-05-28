import { FiMail, FiMoreVertical, FiLogOut } from 'react-icons/fi';
import { useUserStore } from '../../../store/useUserStore';
import { useEdgesStore } from '../../../store/useEdgesStore';
import { useState } from 'react';
import LoginDialog from '../../dialog/LoginDialog';
import Dialog from '../../dialog/Dialog';
import { useNodesStore } from '../../../store/useNodesStore';
import { useUserListStore } from '../../../store/useUserListStore';

const UserProfile = () => {
    const { user, logout } = useUserStore();
    const { edges, clearEdges } = useEdgesStore();
    const { clearNodes } = useNodesStore();
    const { clearUsers } = useUserListStore();
    const [isMenuOptionOpen, setIsMenuOptionOpen] = useState(false);
    const [isLoginDialogOpen, setIsLoginDialogOpen] = useState(false);
    const [isResetDialogOpen, setIsResetDialogOpen] = useState(false);

    const followingCount = (userId: number) => {
        return edges.filter(edge => edge.from === userId).length;
    };

    const followerCount = (userId: number) => {
        return edges.filter(edge => edge.to === userId).length;
    };

    const handleResetAll = () => {
        // reset all edges
        clearEdges()
        // reset all nodes
        clearNodes()
        // reset all users
        clearUsers()
        // reset the user
        logout()
    }

    if (!user) {
        return (
            <div className="text-center text-gray-500 p-4">
                No user logged in.
            </div>
        );
    }

    return (
        <div className="max-w-xs mx-auto bg-white rounded-lg p-4 shadow-sm">

            {
                isLoginDialogOpen && <LoginDialog
                    onCancel={() => { setIsLoginDialogOpen(false), setIsMenuOptionOpen(false) }}
                />
            }

            {
                isResetDialogOpen && <Dialog
                    title='Reset everything'
                    description='Do you really want to reset all?'
                    confirmText='Confirm'
                    cancelText='Cancel'
                    isOpen={isResetDialogOpen}
                    onConfirm={handleResetAll}
                    onCancel={() => setIsResetDialogOpen(false)}
                />
            }

            {/* Profile Picture and Basic Info */}
            <div className="flex items-center space-x-4">
                {user.profile ? (
                    <img
                        src={user.profile}
                        alt={`${user.firstName} ${user.lastName ?? ""}`}
                        className="w-16 h-16 rounded-full object-cover"
                    />
                ) : (
                    <div className="w-16 h-16 rounded-full bg-gray-300 flex items-center justify-center text-sm text-white">
                        No Image
                    </div>
                )}

                <div>
                    <h2 className="font-semibold text-gray-800 truncate max-w-[150px] overflow-hidden whitespace-nowrap">
                        {user.firstName} {user.lastName}
                    </h2>
                    <div className="flex items-center text-sm text-gray-500 mt-1">
                        <FiMail className="mr-1 shrink-0" size={14} />
                        <span className="truncate max-w-[150px] overflow-hidden whitespace-nowrap">{user.email}</span>
                    </div>
                </div>

            </div>

            {/* Following Count and Menu */}
            <div className="mt-4 text-sm flex justify-between items-center relative">
                <div>
                    <span className="font-medium text-gray-700">{followingCount(user.id)}</span>
                    <span className="text-gray-500 ml-1">Following</span>
                </div>

                <div>
                    <span className="font-medium text-gray-700">{followerCount(user.id)}</span>
                    <span className="text-gray-500 ml-1">Followers</span>
                </div>
                <div className='font-medium text-white bg-green-500 w-5 h-5 rounded-full text-center' title='user-id'>
                    {user.id}
                </div>

                {/* Menu Icon */}
                <div className="relative">
                    <button
                        onClick={() => setIsMenuOptionOpen(!isMenuOptionOpen)}
                        className="p-2 rounded-full hover:bg-gray-100 transition"
                    >
                        <FiMoreVertical size={18} />
                    </button>

                    {/* Dropdown Menu */}
                    {isMenuOptionOpen && (
                        <div className="absolute right-0 mt-2 w-52 bg-white  border border-gray-200 rounded shadow-lg z-10">

                            <button
                                onClick={() => setIsLoginDialogOpen(true)
                                }
                                className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
                            >
                                <FiLogOut className="mr-2" />
                                Login other account
                            </button>


                            <button
                                onClick={() => {
                                    setIsResetDialogOpen(true)
                                    setIsMenuOptionOpen(false);
                                }}
                                className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100 flex items-center text-red-600"
                            >
                                <FiLogOut className="mr-2" />
                                Reset All
                            </button>


                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default UserProfile;
