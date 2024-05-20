import React from "react";
import SweetAlert from "react-bootstrap-sweetalert";

const SweetAlertError = ({ show, message, onConfirm}) => {
    return (
        <SweetAlert
            danger
            show={show}
            title="Error"
            onConfirm={onConfirm}
            onCancel={onConfirm}
        >
            {message}
        </SweetAlert>
    );
}

export default SweetAlertError;