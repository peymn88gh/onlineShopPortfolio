
export default function SecondaryButton({loading, children, onClick, icon }) {
    return (
      <button disabled={loading} role="reset" onClick={onClick} className="disabled:text-gray-600 disabled:cursor-not-allowed text-primaryButton px-3 py-2 rounded-lg text-sm hover:scale-110">
        <span>
          {icon}
        </span>
        {children}
      </button>
    );
  }
  