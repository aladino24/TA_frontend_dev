import React from "react";
import SweetAlert from "react-bootstrap-sweetalert";

const SweetAlertLoading = ({show}) => {
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
        >
            Please wait...
        </SweetAlert>
    );
};

export default SweetAlertLoading;