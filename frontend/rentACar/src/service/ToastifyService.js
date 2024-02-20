import { toast } from "react-toastify";

const toastConfig = {
    autoClose: 2500,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "dark"
};

export function toastInfo(message) {
    toast.info(message, toastConfig);
}

export function toastSuccess(message) {
    toast.success(message, toastConfig);
}

export function toastWarning(message) {
    toast.warn(message, toastConfig);
}

export function toastError(message) {
    toast.error(message, toastConfig);
}