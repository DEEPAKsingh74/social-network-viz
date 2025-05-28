import { useUserStore, type User } from "./store/useUserStore"
import Visualizer from "./components/visualizer/Visualizer";
import { ToastContainer } from "react-toastify";
import { useUserListStore } from "./store/useUserListStore";
import UserSignUp from "./components/UserSignup";

function App() {

  const { isLoggedIn, login } = useUserStore();
  const { addUser } = useUserListStore();

  const loginUser = (user: User) => {
    login(user);
    addUser(user);
  }

  return (
    <div>

      {
        isLoggedIn ? <Visualizer /> : <UserSignUp submituser={loginUser} />
      }
      <ToastContainer />

    </div>
  )
}

export default App