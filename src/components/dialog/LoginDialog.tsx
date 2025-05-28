import React, { useState } from 'react';
import { useUserStore } from '../../store/useUserStore';
import InputField from '../input/InputField';
import { useUserListStore } from '../../store/useUserListStore';
import { toast } from 'react-toastify';


interface LoginDialogProps {
    onCancel: () => void;
}

const LoginDialog: React.FC<LoginDialogProps> = ({ onCancel }) => {

    const [email, setEmail] = useState<string | undefined>(undefined);
    const { isLoggedIn, login } = useUserStore();
    const { users } = useUserListStore();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;

        setEmail(value);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // check if the email is present in users list.
        const existingUser = users.find((user) => user.email === email);

        if (existingUser) {
            // login with this user details.
            login(existingUser);
            onCancel();

        } else {
            toast.error("Invalid email")
        }

    };

    return (
        <div className="inset-0 bg-black/50 z-50 flex items-center justify-center p-4 absolute top-0 left-0">
            <div className="w-full max-w-lg bg-white rounded-xl shadow-lg overflow-hidden">
                <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-6 text-white flex justify-between items-center">
                    <div>
                        <h1 className="text-2xl font-bold">Login Social Viz</h1>
                        <p className="text-blue-100 text-sm mt-1">
                            Login to any existing account (no password required).
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


                    <InputField
                        label="Email Address"
                        name="email"
                        type="email"
                        value={email}
                        onChange={handleChange}
                        required
                    />

                    <div className="flex gap-3">
                        <button
                            type="submit"
                            className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 px-4 rounded-lg hover:from-blue-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all shadow-md hover:shadow-lg"
                        >
                            Login
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

export default LoginDialog;