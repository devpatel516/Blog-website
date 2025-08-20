import Table from "./table";
import { Link, useSearchParams } from "react-router-dom";
import Posts from "./post/post";

const Categories = () => {
    const [searchParams] = useSearchParams();
    const category = searchParams.get('category');

    return (
        <>
            <div className="grid grid-cols-1 md:grid-cols-5 gap-5 p-5 md:p-3">
                <div className="mt-0.5">
                    <Link to={`/create?category=${category || ''}`}>
                        <button
                            type="button"
                            className="w-full mt-7.5 text-gray-900 bg-gradient-to-r from-lime-200 via-lime-300 to-lime-500 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-lime-300 dark:focus:ring-lime-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mb-2"
                        >
                            Create Blog
                        </button>
                    </Link>
                    <Table />
                </div>
                <Posts />
            </div>
        </>
    );
};

export default Categories;