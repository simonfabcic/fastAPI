import Header from "../components/Header";
import MainFeed from "../components/MainFeed";

function App() {
    return (
        <div className="bg-gray-100">
            <Header />
            <div className="max-w-5xl mx-auto">
                <MainFeed />
            </div>
        </div>
    );
}

export default App;
