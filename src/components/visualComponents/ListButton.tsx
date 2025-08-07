type ListButtonProps = {
  text: string,
  handleClick: () => void,
  selected?: boolean
}

function ListButton({ text, handleClick, selected = false }: ListButtonProps) {
  return (
    <button
      className={`px-6 py-3 rounded border-2 font-medium transition-all duration-200 min-w-[120px]
        ${selected 
          ? 'bg-green-700 text-white border-green-700 hover:bg-green-800 hover:border-green-800' 
          : 'bg-white text-gray-700 border-gray-400 hover:bg-green-50 hover:border-green-600 hover:text-green-700'
        }
      `}
      onClick={handleClick}
    >
      {text}
    </button>
  );
}

export default ListButton;