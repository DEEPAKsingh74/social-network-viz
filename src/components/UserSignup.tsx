import React, { useState } from 'react';
import InputField from './input/InputField';
import { useUserStore, type User } from '../store/useUserStore';
import { useUserListStore } from '../store/useUserListStore';
import { useNodesStore } from '../store/useNodesStore';
import type { Node } from 'vis-network';
import { isUserExists } from '../lib/isUserExits';
import { toast } from 'react-toastify';

interface FormData {
    firstName: string;
    lastName: string;
    email: string;
    profilePic: File | null;
    previewImage?: string;
}

interface UserSignupProps {
    submituser: (user: User) => void;
    onCancel?: () => void;
}

const UserSignUp: React.FC<UserSignupProps> = ({ submituser, onCancel }) => {
    const [formData, setFormData] = useState<FormData>({
        firstName: "",
        lastName: "",
        email: "",
        profilePic: null,
        previewImage: undefined,
    });


    const { users } = useUserListStore();
    const { isLoggedIn } = useUserStore();
    const { addNode } = useNodesStore();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, files } = e.target;

        if (name === "profilePic" && files && files[0]) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setFormData(prev => ({
                    ...prev,
                    profilePic: files[0],
                    previewImage: reader.result as string
                }));
            };
            reader.readAsDataURL(files[0]);
        } else {
            setFormData(prev => ({
                ...prev,
                [name]: value
            }));
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const userId = isLoggedIn ? users.length : 0;

        const user: User = {
            id: userId,
            firstName: formData.firstName,
            lastName: formData.lastName,
            email: formData.email,
            profile: formData.previewImage,
        }

        // check for unique user email.
        if (isUserExists(user.email, users)) {
            toast.error("Email Already exists");
            return;
        }

        const node: Node = {
            id: userId,
            label: userId.toString(),
            physics: true,
            image: formData.previewImage
        }

        addNode(node);

        submituser(user);
    };

    return (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
            <div className="w-full max-w-lg bg-white rounded-xl shadow-lg overflow-hidden">
                <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-6 text-white flex justify-between items-center">
                    <div>
                        <h1 className="text-2xl font-bold">Join Social Viz</h1>
                        <p className="text-blue-100 text-sm mt-1">
                            Create your account to get started
                        </p>
                    </div>
                    {isLoggedIn && onCancel && (
                        <button
                            onClick={onCancel}
                            className="text-white hover:text-gray-200 text-2xl font-bold"
                            aria-label="Close"
                        >
                            &times;
                        </button>
                    )}
                </div>

                <form onSubmit={handleSubmit} className="p-6 space-y-5">
                    <div className="flex gap-4">
                        <InputField
                            label="First Name"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleChange}
                            required
                            containerClass="flex-1"
                        />
                        <InputField
                            label="Last Name"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleChange}
                            containerClass="flex-1"
                        />
                    </div>

                    <InputField
                        label="Email Address"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />

                    <div className="space-y-3">
                        <p className="text-sm font-medium text-gray-700">
                            Profile Picture
                            <span className="text-gray-400 ml-1">(optional)</span>
                        </p>

                        <div className="flex items-center gap-4">
                            <div className="relative">
                                {formData.previewImage ? (
                                    <img
                                        src={formData.previewImage}
                                        alt="Profile preview"
                                        className="w-16 h-16 rounded-full object-cover border-2 border-white shadow-sm"
                                    />
                                ) : (
                                    <div className="w-16 h-16 rounded-full bg-gray-100 border-2 border-dashed border-gray-300 flex items-center justify-center">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-5 w-5 text-gray-400"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                        </svg>
                                    </div>
                                )}
                            </div>

                            <label className="flex-1">
                                <div className="cursor-pointer text-sm bg-white border border-gray-300 rounded-lg px-4 py-2.5 hover:bg-gray-50 transition-all flex items-center justify-between">
                                    <span className="text-gray-700">
                                        {formData.profilePic ? formData.profilePic.name : 'Choose file'}
                                    </span>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-4 w-4 text-gray-500"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                                    </svg>
                                </div>
                                <input
                                    type="file"
                                    name="profilePic"
                                    onChange={handleChange}
                                    accept="image/*"
                                    className="hidden"
                                />
                            </label>
                        </div>
                    </div>

                    <div className="flex gap-3">
                        <button
                            type="submit"
                            className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 px-4 rounded-lg hover:from-blue-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all shadow-md hover:shadow-lg"
                        >
                            Create Account
                        </button>
                        {isLoggedIn && onCancel && (
                            <button
                                type="button"
                                onClick={onCancel}
                                className="flex-1 bg-gray-200 text-gray-800 py-3 px-4 rounded-lg hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-all"
                            >
                                Cancel
                            </button>
                        )}
                    </div>
                </form>
            </div>


        </div>
    );
};

export default UserSignUp;