function Header() {
  const navLinks = [
    { text: "Background", href: "#" },
    { text: "Calculators", href: "#" },
    { text: "Community", href: "#" },
    { text: "Project Updates", href: "#" },
  ];

  return (
    <header className="bg-white border-b border-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="text-2xl font-bold text-green-800">Small Grains BYDV Calculator</div>
          <nav className="hidden md:flex space-x-6">
            {navLinks.map((link) => (
              <a
                key={link.text}
                href={link.href}
                className="text-gray-700 hover:text-green-700 transition-colors duration-200 font-medium"
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