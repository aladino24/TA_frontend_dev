import React from 'react';

const BarcodeDetailModal = ({ isOpen, onRequestClose, barcodeData }) => {
    return (
        <div className={`modal fade ${isOpen ? 'show' : ''}`} tabIndex="-1" role="dialog" style={{ display: isOpen ? 'block' : 'none' }}>
            <div className="modal-dialog modal-lg" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Detail Barang</h5>
                        <button type="button" className="close" onClick={onRequestClose} aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <form>
                    <div className="modal-body">
                            <div className='form-row'>
                                <div className='form-group col-md-5 ml-5'>
                                    <label htmlFor="fc_stockcode" className="form-label">Katalog</label>
                                    <input type="text" className="form-control" id="fc_stockcode" value="" readOnly />
                                </div>
                                <div className='form-group col-md-5 ml-4'>
                                    <label htmlFor="fc_namelong" className="form-label">Nama Barang</label>
                                    <input type="text" className="form-control" id="fc_namelong" value="" readOnly />
                                </div>
                            </div>
                            <div className='form-row'>
                                <div className='form-group col-md-5 ml-5'>
                                    <label htmlFor="fc_batch" className="form-label">Batch</label>
                                    <input type="text" className="form-control" id="fc_batch" value="" readOnly />
                                </div>
                                <div className='form-group col-md-5 ml-4'>
                                    <label htmlFor="fc_namelong" className="form-label">Expired Date</label>
                                    <input type="text" className="form-control" id="fc_namelong" value="" readOnly />
                                </div>
                            </div>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" onClick={onRequestClose}>Close</button>
                        <button type="submit" className="btn btn-success" onClick={onRequestClose}>Submit</button>
                    </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default BarcodeDetailModal;
