import React from "react";
import SweetAlert from "react-bootstrap-sweetalert";

const SweetAlertError = ({ show, message, onClose}) => {
    return (
        <SweetAlert
            danger
            show={show}
            title="Error"
            onConfirm={onClose}
            onCancel={onClose}
        >
            {message}
        </SweetAlert>
    );
}

export default SweetAlertError;