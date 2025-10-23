const LeftMenu = () => {
    return (
        <div className="bg-white rounded-xl p-3 gap-3 flex flex-col">
            <div className="bg-yellow-100 hover:bg-yellow-400 rounded-xl px-3 py-1.5 hover:cursor-pointer">Tasks</div>
            <div className="bg-yellow-100 hover:bg-yellow-400 rounded-xl px-3 py-1.5 hover:cursor-pointer">
                Archived
            </div>
        </div>
    );
};

export default LeftMenu;
