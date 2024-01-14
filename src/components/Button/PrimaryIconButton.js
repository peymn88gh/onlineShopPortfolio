import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function PrimaryIconButton({ selected, children, icon, onClick, loading }){
const selectetClass = `${ selected ? 'bg-primary text-accent' : 'bg-primaryButton  hover:text-accent text-gray-100' }`
    return(
        <span>
            <button disabled={loading} onClick={onClick} type="submit" className={`${selectetClass} hover:bg-primary px-3 py-2 rounded-lg shadow-lg text-sm flex flex-row gap-2 items-center disabled:bg-slate-500`}>
                <span>
                {loading ? <FontAwesomeIcon icon={faSpinner} spin/> : icon}
                </span>
                <span>{` ${children}`}</span>
            </button>
        </span>
    );
}
