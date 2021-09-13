import { toast } from "react-toastify";

interface ToastProps {
  message: string;
  type: 'success' | 'error' | 'info';
}

export const UseToast = ({message, type}: ToastProps) => {
  if (type === 'success') {
    toast.success(message);
  } else if (type === 'info') {
    toast.info(message);
  } else {
    toast.error(message);
  }
}