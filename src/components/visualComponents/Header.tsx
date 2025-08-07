function Header() {
  const navLinks = [
    { text: "Background", href: "#" },
    { text: "Calculators", href: "#" },
    { text: "Community", href: "#" },
    { text: "Project Updates", href: "#" },
  ];

  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-6">
          <div className="text-2xl font-bold text-gray-800">Idaho Wheat Calculator</div>
          <nav className="hidden md:flex space-x-1">
            {navLinks.map((link) => (
              <a
                key={link.text}
                href={link.href}
                className="px-4 py-2 rounded-lg text-gray-600 hover:text-gray-800 hover:bg-gray-100 transition-all duration-200 font-medium"
              >
                {link.text}
              </a>
            ))}
          </nav>
        </div>
      </div>
    </header>
  )
}

export default Header;