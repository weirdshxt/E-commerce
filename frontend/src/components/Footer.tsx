import React from "react";

const Footer: React.FC = () => (
  <footer className="bg-green-50 py-4 text-center text-gray-500 text-sm">
    &copy; {new Date().getFullYear()} Organic Product Viewer &mdash; Demo
    Project
  </footer>
);

export default Footer;
