import React from "react";
import RadioButtons from "../../../../components/RadioButton";
import Select from 'react-select'

const ModalStock = (props) => {
    const handleBatchChange = () => {
        console.log("Your favorite flavor is now Sweet");
    }
    console.log("Modal isOpen:", props.isOpen);
    return (
       <>
            <div
            className={`modal fade ${props.isOpen ? 'show' : ''}`}
            id="editModal"
            tabIndex="-1"
            role="dialog"
            aria-labelledby="editModalLabel"
            aria-hidden={!props.isOpen}
        >
            <div className="modal-dialog modal-lg" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="editModalLabel">
                            Edit Data
                        </h5>
                        <button
                            type="button"
                            className="close"
                            data-dismiss="modal"
                            aria-label="Close"
                            onClick={props.onClose}
                        >
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    {/* Modal body and other content */}
                    {/* ... */}
                </div>
            </div>
        </div>
       </>
    );
}


export default ModalStock;