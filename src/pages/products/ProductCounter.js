import { faMinus, faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
export default function ProductCounter({isProductHovered, selected, dispatch, customClass}){
    if(selected.count===0) dispatch({ type: 'deleted', payload: selected })
   
    let counterClass
    if(!customClass) counterClass = 'bg-white absolute bottom-5 left-16 text-center px-5 py-2 rounded-lg'
    else counterClass = customClass
    return(
        <div className={!isProductHovered ? 'hidden' : counterClass}>
            <div className='flex gap-4 justify-between items-center'>
                <button
                    onClick={
                        selected.count === 1 || selected.count > 1
                        ?
                        ()=>dispatch({ type: 'minus', payload: selected })
                        :
                        ()=>dispatch({ type: 'deleted', payload: selected })
                    }
                    className='rounded-full p-1 hover:bg-slate-100'
                >
                    <FontAwesomeIcon icon={faMinus} />
                </button>
                <p>{selected.count}</p>
                <button className='rounded-full p-1 hover:bg-slate-100'
                        onClick={()=>dispatch({ type: 'added', payload: selected })}
                >
                    <FontAwesomeIcon icon={faPlus} />
                </button>
            </div>
        </div>
    );
}