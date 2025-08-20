import pixel from './pixel.jpg';
const Banner = () => {
    return (
        <div class="relative h-100 w-full mt-2">
            <img src={pixel} alt="Background Image" class="absolute w-full h-full rounded-lg object-cover"/>
                <div class="absolute inset-0  bg-opacity-50"></div>
                <div class="absolute inset-0 flex flex-col items-center justify-center">
                    <h2 class="text-4xl text-blue-300 bg-black opacity-60 p-3 rounded-lg font-bold">Welcome to My Blog</h2>
                    <p class="text-xl text-yellow-300 bg-black opacity-60 p-3 rounded-lg font-bold mt-1">Enjoy reading insightful articles</p>
                </div>
        </div>
    )
}

export default Banner;