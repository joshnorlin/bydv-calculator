type H2Props = {
  text: string,
}

function H2({text}: H2Props) {
  return (
    <h2 className="font-bold text-3xl">{text}</h2>
  )
}

export default H2;