import { ToastContainer as ToastContainerReact } from "react-toastify";

import { TOAST_CONTAINER_ATTRIBUTES } from "../utils/constants";

function ToastContainer() {
  return (
    <ToastContainerReact {...TOAST_CONTAINER_ATTRIBUTES}></ToastContainerReact>
  );
}

export default ToastContainer;
