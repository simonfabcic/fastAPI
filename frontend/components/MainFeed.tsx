import Tasks from "./Tasks";
import LeftMenu from "./LeftMenu";
import { useState } from "react";

type MenuSelection = "tasks" | "archived";

const MainFeed = () => {
    const [menuSelection, setMenuSelection] = useState<string>("tasks");

    return (
        <div className="flex gap-3 py-3 px-3 h-screen">
            <div className="w-1/4">
                <LeftMenu menuSelection={menuSelection} setMenuSelection={setMenuSelection} />
            </div>
            <div className="w-3/4">
                <Tasks menuSelection={menuSelection} />
            </div>
        </div>
    );
};

export default MainFeed;
