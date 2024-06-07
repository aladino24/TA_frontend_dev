import React, { useState } from 'react';
import axios from 'axios';
import Config from '../../../../config';
import SweetAlertLoading from '../../../../components/SweetAlertLoading';
import SweetAlertError from '../../../../components/SweetAlertError';
import SweetAlertSuccess from '../../../../components/SweetAlertSuccess';

const BarcodeDetailModal = ({ isOpen, onUpdate, onRequestClose, data}) => {
    const [description, setDescription] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [showSuccess, setShowSuccess] = useState(false);
    const [messageSuccess, setMessageSuccess] = useState('');
    const [showError, setShowError] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);
        const postData = {
            fc_stockcode: data.fc_stockcode,
            fc_barcode: data.fc_barcode,
            fc_warehousecode: data.fc_warehousecode,
            fv_description: description,
        };

        const token = localStorage.getItem('token');
        const axiosConfig = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        };

        try {
            const response = await axios.post(
                Config.api.server2 + "pemakaian-barang/scanqr",
                postData,
                axiosConfig
            );

            if (response.data.success) {
                console.log('Success:', response.data);
                setLoading(false);
                setMessageSuccess(response.data.message);
                setShowSuccess(true);

                // timeout 3 detik
                setTimeout(() => {
                    onRequestClose();
                    onUpdate();
                }, 3000);
            } else {
                console.error('Error:', response.data);
                setLoading(false);
                setError('An error occurred while saving the data.');
                setShowError(true);
            }
        } catch (error) {
            console.error('Error:', error.response ? error.response.data : error.message);
            setLoading(false);
            setError(error.response ? error.response.data.message : error.message);
            setShowError(true);
        }
    };

    return (
        <div>
            <SweetAlertLoading show={loading} />
            <SweetAlertError
                show={showError}
                message={error}
                onConfirm={() => setShowError(false)}
            />
            <SweetAlertSuccess
                show={showSuccess}
                message={messageSuccess}
                onConfirm={() => setShowSuccess(false)}
            />
            <div className={`modal fade ${isOpen ? 'show' : ''}`} tabIndex="-1" role="dialog" style={{ display: isOpen ? 'block' : 'none' }}>
                <div className="modal-dialog modal-lg" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Detail Barang</h5>
                            <button type="button" className="close" onClick={onRequestClose} aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <form onSubmit={handleSubmit}>
                            <div className="modal-body">
                                <div className="container">
                                    <div className="form-row">
                                        <div className="form-group col-md-5">
                                            <label htmlFor="fc_stockcode" className="form-label">Katalog</label>
                                            <input type="text" className="form-control" id="fc_stockcode" value={data.fc_stockcode || ''} readOnly />
                                        </div>
                                        <div className="form-group col-md-5">
                                            <label htmlFor="fc_namelong" className="form-label">Nama Barang</label>
                                            <input type="text" className="form-control" id="fc_namelong" value={data.stock.fc_namelong || ''} readOnly />
                                        </div>
                                    </div>
                                    <div className="form-row">
                                        <div className="form-group col-md-5">
                                            <label htmlFor="fc_batch" className="form-label">Batch</label>
                                            <input type="text" className="form-control" id="fc_batch" value={data.fc_batch || ''} readOnly />
                                        </div>
                                        <div className="form-group col-md-5">
                                            <label htmlFor="fd_expired" className="form-label">Expired Date</label>
                                            <input type="text" className="form-control" id="fd_expired" value={data.fd_expired || ''} readOnly />
                                        </div>
                                    </div>
                                    <div className="form-row">
                                        <div className="form-group col-md-5">
                                            <label htmlFor="fv_description" className="form-label">Catatan</label>
                                            <textarea className="form-control" id="fv_description" value={description} onChange={(e) => setDescription(e.target.value)} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" onClick={onRequestClose}>Close</button>
                                <button type="submit" className="btn btn-success">Submit</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BarcodeDetailModal;
