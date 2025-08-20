import React, { useState } from 'react';

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        description: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Form submitted:", formData);
        // Add your form submission logic here (e.g., API call)
        setFormData({ name: '', email: '', description: '' }); // Reset form
    };

    return (
        <div className="min-h-screen flex items-center justify-center py-10 px-4 text-black">
            <div className="max-w-3xl w-full rounded-2xl shadow-lg overflow-hidden transform transition-all hover:shadow-xl bg-white">
                <div className="p-6 md:p-8">
                    {/* Header */}
                    <div className="text-center mb-8">
                        <h2 className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-sky-500 to-green-500 mb-2">
                            Contact Us
                        </h2>
                        <div className="w-20 h-1 bg-gradient-to-r from-sky-400 to-green-400 mx-auto rounded-full mb-4"></div>
                        <p className="text-gray-600 text-sm italic">
                            We'd love to hear from you!
                        </p>
                    </div>

                    {/* Intro */}
                    <p className="text-gray-600 text-base md:text-lg leading-relaxed mb-6 text-center">
                        Have questions, suggestions, or just want to say hello? Fill out the form below,
                        and we'll get back to you as soon as possible.
                    </p>

                    {/* Contact Form */}
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label htmlFor="name" className="block text-gray-700 font-medium mb-2">
                                Name
                            </label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-300 focus:border-transparent transition-all"
                                placeholder="Your Name"
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
                                Email
                            </label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-300 focus:border-transparent transition-all"
                                placeholder="Your Email"
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="description" className="block text-gray-700 font-medium mb-2">
                                Message
                            </label>
                            <textarea
                                id="description"
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-300 focus:border-transparent transition-all"
                                placeholder="Your Message"
                                rows="5"
                                required
                            />
                        </div>
                        <div className="text-center pt-2">
                            <button
                                type="submit"
                                className="bg-gradient-to-r from-sky-500 to-green-500 hover:from-sky-600 hover:to-green-600 text-white font-medium py-3 px-8 rounded-full shadow-sm transform hover:scale-105 transition-all duration-300"
                            >
                                Send Message
                            </button>
                        </div>
                    </form>

                    {/* Closing */}
                    <p className="text-gray-600 text-center mt-8 italic">
                        We aim to respond to all inquiries within 24-48 hours. Thank you for reaching out!
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Contact;