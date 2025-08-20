import React from "react";
import './home.css';
import Banner from "../banner/banner";
import Categories from "./categoties";
const Home=()=>{
    return(
        <div className="text-white">
            <Banner/>
            <Categories/>
        </div>
    )
}
export default Home;