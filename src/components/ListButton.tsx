type ListButtonProps = {
  text: string,
  handleClick: () => void,
  selected?: boolean
}

function ListButton({ text, handleClick, selected = false }: ListButtonProps) {
  return (
    <button
      className={`whitespace-nowrap overflow-hidden bg-white border-2 border-black rounded-xl px-4 py-1 mx-1
        hover:border-blue-500
        ${selected ? 'border-blue-500 bg-blue-500 font-bold text-white' : ''}
      `}
      onClick={handleClick}
    >
      {text}
    </button>
  );
}

export default ListButton;