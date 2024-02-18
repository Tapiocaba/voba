import React from 'react';

// Assuming TailwindCSS is properly set up in your project
const Footer = () => {
  return (
    <footer className="bg-blue-300 text-gray-800 text-center py-5">
      <div className="max-w-6xl mx-auto px-4 mt-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="mb-8 md:mb-0">
            <h4 className="font-bold">About Us</h4>
            <p>Simplifying vocabulary comprehension</p>
            <p>Created for TreeHacks 2024</p>
          </div>
          <div>
            <h4 className="font-bold">Contact Us</h4>
            <p>Email: contact@voba.com</p>
            <div>
              <a href="https://www.facebook.com/" className="mr-2">Facebook</a> |
              <a href="https://twitter.com/" className="mx-2">X</a> |
              <a href="https://www.instagram.com/" className="ml-2">Instagram</a>
            </div>
          </div>
        </div>
        <div className="pt-8 mt-8">
          &copy; {new Date().getFullYear()} www.voba.com | All Rights Reserved
        </div>
      </div>
    </footer>
  );
};

export default Footer;

