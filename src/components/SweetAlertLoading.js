import React from "react";
import SweetAlert from "react-bootstrap-sweetalert";

const SweetAlertLoading = ({show}) => {
    const onConfirm = () => {
        console.log("Default onConfirm function");
    };
    return (
        <SweetAlert
            show={show}
            title="Loading..."
            text="Please wait..."
            style={{
                width: "30%",
                height: "30%"
            }}
            showConfirm={false}
            showCancel={false}
            customClass=""
            closeOnClickOutside={false}
            onConfirm={onConfirm}
        >
            Please wait...
        </SweetAlert>
    );
};

export default SweetAlertLoading;