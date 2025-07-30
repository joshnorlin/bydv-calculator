import Link from "./A";

function Header() {
  return (
    <nav className="flex justify-between items-center bg-blue-50 border-b-2 border-black">
      <div className="m-8 text-4xl font-bold">Logo!</div>
      <div className="m-8 space-x-4">
        <Link text="Background" href="" />
        <Link text="Calculators" href="" />
        <Link text="Community" href="" />
        <Link text="Project Updates" href="" />
      </div>
    </nav>
  )
}

export default Header;