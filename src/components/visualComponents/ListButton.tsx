type ListButtonProps = {
  text: string,
  handleClick: () => void,
  selected?: boolean
}

function ListButton({ text, handleClick, selected = false }: ListButtonProps) {
  return (
    <button
      className={`px-6 py-3 rounded-xl border-2 font-semibold transition-all duration-200 min-w-[120px]
        ${selected 
          ? 'bg-blue-600 text-white border-blue-600 shadow-md hover:bg-blue-700 hover:border-blue-700' 
          : 'bg-white text-gray-700 border-gray-300 hover:bg-blue-50 hover:border-blue-400 hover:text-blue-700'
        }
      `}
      onClick={handleClick}
    >
      {text}
    </button>
  );
}

export default ListButton;