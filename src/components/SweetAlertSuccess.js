import React from "react";
import SweetAlert from "react-bootstrap-sweetalert";

const SweetAlertSuccess = ({ show, message, onConfirm}) => {
    return (
        <SweetAlert
            success
            show={show}
            title="Success!"
            onConfirm={onConfirm}
            confirmBtnText="OK"
        >
            {message}
        </SweetAlert>
    );
}

export default SweetAlertSuccess;