import React from "react";
import SweetAlert from "react-bootstrap-sweetalert";

const SweetAlertSubmitConfirmation = ({ show, message, content, onConfirm, onCancel }) => {
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
            showCancel={true}
            cancelBtnText="No"
        >
            {message}
        </SweetAlert>
    );
};

export default SweetAlertSubmitConfirmation;