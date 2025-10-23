// import { useAuth } from "../context/authContext";
// import { useNavigate } from "react-router-dom";
import { ListTodo } from "lucide-react";
const Header = () => {
    // var { user, userLogout } = useAuth();
    // const navigate = useNavigate();

    return (
        <header className="border-b border-gray-200 bg-white sticky top-0">
            <div className="flex items-center justify-between px-4 py-3 mx-auto w-5xl">
                <div className="flex items-center gap-2">
                    <div className="bg-yellow-400 w-10 h-10 rounded-full flex items-center justify-center">
                        <ListTodo />
                    </div>
                    <h1>TaSkS</h1>
                </div>
                <div className="gap-2 hidden">Search</div>
                <button className="bg-yellow-400 hover:bg-yellow-500 text-gary-900 font-semibold px-6 py-2 rounded-full flex gap-2 transition-colors cursor-pointer">
                    Add Fact
                </button>
            </div>
        </header>
    );
};

export default Header;
