import React from "react";
import SweetAlert from "react-bootstrap-sweetalert";

const SweetAlertSuccess = ({ show, message, onClose}) => {
    return (
        <SweetAlert
            success
            show={show}
            title="Success!"
            onConfirm={onClose}
            confirmBtnText="OK"
        >
            {message}
        </SweetAlert>
    );
}

export default SweetAlertSuccess;