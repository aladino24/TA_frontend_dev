import React from "react";
import SweetAlert from "react-bootstrap-sweetalert";

const SweetAlertConfirmation = ({ show, message,content,onConfirm, onCancel }) => {
    return (
        <SweetAlert
            warning
            show={show}
            title="Are you sure?"
            onConfirm={onConfirm}
            onCancel={onCancel}
            confirmBtnText={content}
            confirmBtnBsStyle="danger"
            cancelBtnBsStyle="default"
        >
            {message}
        </SweetAlert>
    );
}

export default SweetAlertConfirmation;