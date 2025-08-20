import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-sky-50 to-green-50 py-6 border-t border-gray-200 rounded-lg">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center text-center">
          <p className="text-gray-600 mb-2 max-w-md">
            Connecting people through stories, ideas, and shared experiences.
          </p>
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} Blogverse. All rights reserved.
          </p>
          <div className="mt-3 w-12 h-1 bg-gradient-to-r from-sky-400 to-green-400 rounded-full opacity-60"></div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;