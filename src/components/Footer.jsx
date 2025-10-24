const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-white border-t border-gray-200 py-4">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <p className="text-gray-600 text-sm">
          © {currentYear} Ticket Tocket. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;