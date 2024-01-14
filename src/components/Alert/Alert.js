import { toast } from 'react-toastify';

const Alert = ({ type, message }) => {

  if (type === 'success') {
    toast.success(message,{toastId:'success', position:'top-center'});
  } else if (type === 'loading') {
    toast.info(message,{toastId:'loading', position:'top-center'});
  } else if (type === 'failed') {
    toast.error(message,{toastId:'failed', position:'top-center'});
  }

  return null;
};

export default Alert;
