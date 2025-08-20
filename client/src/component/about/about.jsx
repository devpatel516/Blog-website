import React from 'react';
import './about.css';

const About = () => {
    const funFacts = [
        { fact: "We've published over 1,000 stories from writers worldwide." },
        { fact: "Our team once wrote a blog post in under 10 minutes!" },
        { fact: "Readers from 50+ countries visit us every month." },
        { fact: "Our favorite snack while brainstorming? Popcorn!" }
    ];

    return (
        <div className="min-h-screen flex items-center justify-center py-10 px-4">
            <div className="max-w-3xl w-full rounded-2xl shadow-lg overflow-hidden transform transition-all hover:shadow-xl bg-white">
                <div className="p-6 md:p-8">
                    {/* Header */}
                    <div className="text-center mb-8">
                        <h2 className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-sky-500 to-green-500 mb-2">
                            About Us
                        </h2>
                        <div className="w-20 h-1 bg-gradient-to-r from-sky-400 to-green-400 mx-auto rounded-full"></div>
                    </div>

                    {/* Intro */}
                    <p className="text-gray-600 text-base md:text-lg leading-relaxed mb-8 text-center">
                        We're a team of curious minds who love sharing stories, ideas, and a bit of fun.
                        Our platform is all about connecting people through words—simple as that!
                    </p>

                    {/* Fun Facts Section */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                        {funFacts.map((item, index) => (
                            <div
                                key={index}
                                className="p-4 rounded-lg hover:shadow-md transform transition-all duration-300 text-center border border-opacity-20"
                                style={{
                                    background: index % 2 === 0
                                        ? 'linear-gradient(135deg, rgba(186, 230, 253, 0.3) 0%, rgba(220, 252, 231, 0.3) 100%)'
                                        : 'linear-gradient(135deg, rgba(220, 252, 231, 0.3) 0%, rgba(186, 230, 253, 0.3) 100%)',
                                    borderColor: index % 2 === 0 ? 'rgb(14, 165, 233)' : 'rgb(34, 197, 94)'
                                }}
                            >
                                <p className="text-gray-700 text-base font-medium">{item.fact}</p>
                            </div>
                        ))}
                    </div>

                    {/* Closing */}
                    <div className="text-center">
                        <p className="text-gray-600 text-base md:text-lg leading-relaxed mb-4">
                            Stick around, write with us, or just enjoy the read—we're happy you're here!
                        </p>
                        <button className="bg-gradient-to-r from-sky-500 to-green-500 hover:from-sky-600 hover:to-green-600 text-white font-medium py-2 px-6 rounded-full shadow-sm transform hover:scale-105 transition-all duration-300">
                            Join Our Community
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default About;