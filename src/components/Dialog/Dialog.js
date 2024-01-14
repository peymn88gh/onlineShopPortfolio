import React, { useEffect, useRef, useState } from "react";
import Modal from "components/Modal/Modal";
import propTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

function Dialog ({ isOpen, onClose, onConfirm, params, title, content }) {
  const dialogRef = useRef(null);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    if (isOpen) {
      dialogRef.current.focus();
    }
  }, [isOpen]);

  const handleKeyDown = (e) => {
    if (e.key === "Escape") {
      onClose();
    }
  };
  const handleConfirm = () => {
      setLoading(true);
      if(params.length===1){
      onConfirm(params[0]).then(()=>{
        setLoading(false);
        onClose();
      })
    }
    else if (!params) {
      onConfirm().then(()=>{
        setLoading(false);
        onClose();
      })
    }
    else setLoading(false)
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div
        ref={dialogRef}
        autoFocus
        className="bg-white rounded-lg p-6 shadow-lg"
        role="dialog"
        aria-modal="true"
        aria-labelledby="dialoglabel"
        aria-describedby="dialogdescription"
        onKeyDown={handleKeyDown}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold" id="dialoglabel">{title}</h2>
          <button id="closebutton" tabIndex={2} className=" hover:bg-slate-300 hover:text-slate-500 rounded-full  bg-slate-400 text-gray-200 font-bold w-7 h-7 focus:border-neutral-800" onClick={onClose} aria-label="Close">
            &times;
          </button>
        </div>
        <div className="mb-4" id="dialogdescription">{content}</div>
        <div className="flex justify-end">
          <button id="cancelbutton" tabIndex={0} className="bg-gray-300 text-gray-700 px-4 py-2 rounded mr-2 hover:bg-gray-400 focus:border-solid focus:border-slate-500 focus:border-4 " onClick={onClose} autoFocus>Cancel</button>
          <button id="confirmbutton" tabIndex={1} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 focus:border-solid focus:border-sky-800 focus:border-4 disabled:bg-slate-500" disabled={loading} onClick={handleConfirm}>
            {loading && <FontAwesomeIcon icon={faSpinner} spin className="mr-2 text-white" />}
            Confirm
          </button>
        </div>
      </div>
    </Modal>
  );
};

Dialog.propTypes = {
  isOpen : propTypes.bool.isRequired,
  onClose : propTypes.func.isRequired,
  onConfirm : propTypes.func.isRequired,
  params : propTypes.array,
  loading: propTypes.bool,
  title : propTypes.string.isRequired,
  content : propTypes.string.isRequired
};

export default Dialog;
