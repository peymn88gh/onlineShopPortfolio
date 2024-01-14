
export default function PrimaryButton({ children }){
    return(
        <button className=" bg-primaryButton hover:bg-primary hover:text-accent text-gray-100  px-3 py-2 rounded-lg shadow-lg text-sm">
            {children}
        </button>
    );
}
