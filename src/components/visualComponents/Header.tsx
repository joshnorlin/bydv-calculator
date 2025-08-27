// components/Header.jsx
import logo from "../../assets/bydv_logo_v1.png"; // adjust path as needed

export default function Header() {
  return (
    <header className="w-full bg-black shadow-sm">
      <div className="container mx-auto flex items-center justify-between py-5 px-4">
        {/* Logo + Title */}
        <div className="flex items-center gap-2">
          <img src={logo} alt="BYDV Logo" className="w-10 h-auto" />
          <a href="index.html" className="text-3xl font-bold text-gray-50 border-b-4 border-blue-200 hover:text-gray-200">
            Small Grains BYDV
          </a>
        </div>

        {/* Navigation */}
        <nav className="hidden md:block">
          <ul className="flex items-center space-x-6">
            <li>
              <a href="#hero" className="text-gray-100 hover:text-blue-600">
                Home
              </a>
            </li>
            <li>
              <a href="#about" className="text-gray-100 hover:text-blue-600">
                About
              </a>
            </li>
            <li>
              <a href="#team" className="text-gray-100 hover:text-blue-600">
                Team
              </a>
            </li>
            <li>
              <a href="#contact" className="text-gray-100 hover:text-blue-600">
                Contact
              </a>
            </li>
          </ul>
        </nav>

        {/* Mobile Menu Icon */}
        <button className="md:hidden text-2xl text-gray-700">
          <i className="bi bi-list"></i>
        </button>
      </div>
    </header>
  );
}
