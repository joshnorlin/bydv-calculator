
type LinkProps = {
  text: string,
  href: string,
}

function A({text, href}: LinkProps) {
  return (
    <a className="underline text-blue-600 hover:text-blue-800 visited:text-purple-600" href={href}>{text}</a>
  );
}

export default A;