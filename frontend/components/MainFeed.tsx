import Tasks from "./Tasks";
import LeftMenu from "./LeftMenu";

const MainFeed = () => {
    return (
        <div className="flex gap-3 py-3 px-3 h-screen">
            <div className="w-1/4">
                <LeftMenu />
            </div>
            <div className="w-3/4">
                <Tasks />
            </div>
        </div>
    );
};

export default MainFeed;
