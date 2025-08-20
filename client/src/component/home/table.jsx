import { Link } from "react-router-dom";

const Table = () => {
    return (
        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
            <div className="bg-gray-200 p-3 font-bold text-gray-900">
                <Link to="" className="hover:underline">All Categories</Link>
            </div>
            <ul className="divide-y divide-gray-200">
                {["Music", "Movies", "Sports", "Technology", "Fashion","Education","Travel","Personal_Blog","Finance"].map((category) => (
                    <li key={category} className="p-3 hover:bg-gray-100">
                        <Link
                            to={`/create?category=${category}`}
                            className="text-gray-900 hover:underline"
                        >
                            {category}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Table;