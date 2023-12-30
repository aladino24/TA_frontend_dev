import React from "react";
import RadioButtons from "../../../../components/RadioButton";
import Select from 'react-select'
import { useState } from "react";

const ModalStock = (props) => {
    const [inputData, setInputData] = useState(
        {
            fc_stockcode: '',
            fc_barcode: '',
            fc_nameshort: '',
            fc_namelong: '',
            fc_branch: '',
            fc_divisioncode: '',
            fl_batch: '',
            fc_catnumber: '',
            fc_typestock1: '',
            fc_typestock2: '',
            fn_reorderlevel: '',
            fn_maxonhand: '',
            fl_blacklist: '',
            fm_purchase: '',
            fm_cogs: '',
            fm_salesprice: '',
            fl_disc_date: '',
            fl_disc_time: '',
            fd_disc_begin: '',
            fd_disc_end: '',
            fm_disc_rp: '',
            fm_disc_pr: '',
            ft_disc_begin: '',
            ft_disc_end: '',
            fm_time_disc_rp: '',
            fm_time_disc_pr: '',
            fm_price_dealer: '',
            fm_price_default: '',
            fm_price_distributor: '',
            fm_price_project: '',
            fm_price_dealer: '',
            fm_price_enduser: '',
            fv_stockdescription: '',
            fl_repsupplier: '',
            fl_catnumber: '',
            fl_serialnumber: '',
            fl_expired: '',
            fl_taxtype: '',
            fl_batch: ''
        }
    );
    const namepackOptions = [
            { value: '1', label: '1' },
            { value: '2', label: '2' },
    ];
    const handleBatchChange = () => {
        console.log("Your favorite flavor is now Sweet");
    }
    console.log("Modal isOpen:", props.isOpen);
    return (
       <>
            <div
            className="modal fade"
            id="addModal"
            tabIndex="-1"
            role="dialog"
            aria-labelledby="editModalLabel"
            aria-hidden={!props.isOpen}
        >
            <div className="modal-dialog modal-lg" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="editModalLabel">
                            Tambah Master Stock
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
                    <form>
                        <div className="modal-body">
                             <div className="row">
                                    {/* Add more input fields as needed */}
                                    <div className="col-4">
                                        <div className="form-group">
                                            <label style={{ fontSize: '12px' }}>Branch</label>
                                            <input type="text" className="form-control" name="fc_branch" id="fc_branch" value="A001" readOnly />
                                        </div>
                                    </div>
                                    <div className="col-8">
                                        <div className="form-group">
                                            <label style={{ fontSize: '12px' }}>Stock Code</label>
                                            <input type="text" className="form-control" name="fc_stockcode" id="fc_stockcode" value="Test 123" readOnly />
                                        </div>
                                    </div>
                            </div>
                            <div className="row">
                                    <div className="col-4">
                                            <div className="form-group required">
                                                <label style={{ fontSize: '12px' }}>Nama Pendek</label>
                                                <input 
                                                    type="text" 
                                                    className="form-control" 
                                                    name="fc_nameshort" 
                                                    id="fc_nameshort" 
                                                    />
                                            </div>
                                    </div>
                                    <div className="col-5">
                                            <div className="form-group required">
                                                <label style={{ fontSize: '12px' }}>Nama Panjang</label>
                                                <input 
                                                    type="text" 
                                                    className="form-control" 
                                                    name="fc_namelong" 
                                                    id="fc_namelong" 
                                                />
                                            </div>
                                    </div>
                                    <div className="col-3">
                                            <div className="form-group">
                                                <label style={{ fontSize: '12px' }}>Namepack</label>
                                                <Select 
                                                    options={namepackOptions}
                                                    required
                                                />
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                 <div className="col-4">
                                            <div className="form-group">
                                                <label style={{ fontSize: '12px' }}>Brand</label>
                                                <Select
                                                    options={namepackOptions}
                                                    required
                                                />
                                            </div>
                                    </div>
                                    <div className="col-4">
                                            <div className="form-group">
                                                <label style={{ fontSize: '12px' }}>Group</label>
                                                <Select 
                                                options={namepackOptions}
                                                required
                                                />
                                            </div>
                                    </div>
                                    <div className="col-4">
                                            <div className="form-group">
                                                <label style={{ fontSize: '12px' }}>Sub Group</label>
                                                <Select 
                                                    options={namepackOptions}
                                                />
                                            </div>
                                    </div>
                            </div>
                            <div className="row">
                                    <div className="col-sm-6 col-md-3">
                                        <div className="form-group">
                                            <label style={{ fontSize: '12px' }}>Batch</label>
                                            <RadioButtons 
                                                name="fl_batch"
                                                onChange={handleBatchChange} 
                                            />
                                        </div>
                                    </div>
                                    <div className="col-sm-6 col-md-3">
                                        <div className="form-group">
                                            <label style={{ fontSize: '12px' }}>Expired Date</label>
                                            <RadioButtons name="fl_expired" onChange={handleBatchChange}/>
                                        </div>
                                    </div>
                                    <div className="col-sm-6 col-md-3">
                                        <div className="form-group">
                                            <label style={{ fontSize: '12px' }}>Serial Number</label>
                                            <RadioButtons name="fl_serialnumber"  onChange={handleBatchChange} />
                                        </div>
                                    </div>
                                    <div className="col-sm-6 col-md-3">
                                        <div className="form-group">
                                            <label style={{ fontSize: '12px' }}>Status Cat Number</label>
                                            <RadioButtons name="fl_catnumber"  onChange={handleBatchChange} />
                                        </div>
                                    </div>
                            </div>
                            <div className="row">
                                    <div className="col-sm-6 col-md-3">
                                            <div className="form-group">
                                                <label style={{ fontSize: '12px' }}>Blacklist</label>
                                                <RadioButtons name="fl_blacklist" onChange={handleBatchChange} />
                                            </div>
                                    </div>
                                    <div className="col-sm-6 col-md-3">
                                            <div className="form-group">
                                                <label style={{ fontSize: '12px' }}>Tax Type</label>
                                                <RadioButtons name="fl_taxtype" onChange={handleBatchChange} />
                                            </div>
                                    </div>
                                    <div className="col-sm-6 col-md-3">
                                            <div className="form-group">
                                                <label style={{ fontSize: '12px' }}>Report Supplier</label>
                                                <RadioButtons name="fl_repsupplier" onChange={handleBatchChange} />
                                            </div>
                                    </div>
                                    <div className="col-sm-6 col-md-3">
                                            <div className="form-group">
                                                <label style={{ fontSize: '12px' }}>Detail CAT Number</label>
                                                <input 
                                                    type="text" 
                                                    className="form-control" 
                                                    name="fc_catnumber" 
                                                    id="fc_catnumber" 
                                                />
                                            </div>
                                    </div>
                            </div>
                            <div className="row">
                                    <div className="col-md-3">
                                        <div className="form-group">
                                             <label style={{ fontSize: '12px' }}>Tipe Stock 1</label>
                                                <Select
                                                    options={namepackOptions}
                                                    name="fc_typestock1"
                                                    required
                                                />

                                        </div>
                                    </div>
                                    <div className="col-md-3">
                                        <div className="form-group">
                                            <label style={{ fontSize: '12px' }}>Tipe Stock 2</label>
                                                <Select
                                                    options={namepackOptions}
                                                    name="fc_typestock2"
                                                    required
                                                />
                                        </div>
                                    </div>
                                    <div className="col-md-3">
                                        <div className="form-group">
                                            <label style={{ fontSize: '12px' }}>Reorder Level</label>
                                            <input 
                                                type="number" 
                                                className="form-control" 
                                                name="fn_reorderlevel" 
                                                id="fn_reorderlevel"
                                            />
                                        </div>
                                    </div>
                                    <div className="col-md-3">
                                        <div className="form-group">
                                            <label style={{ fontSize: '12px' }}>Max On Hand</label>
                                            <input 
                                                type="number" 
                                                className="form-control" 
                                                name="fn_maxonhand" 
                                                id="fn_maxonhand" 
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-3">
                                            <div className="form-group">
                                                <label style={{ fontSize: '12px' }}>Purchase</label>
                                                <input 
                                                    type="number" 
                                                    className="form-control" 
                                                    name="fm_purchase" 
                                                    id="fm_purchase" 
                                                    required
                                                />
                                            </div>
                                    </div>
                                    <div className="col-md-3">
                                            <div className="form-group">
                                                <label style={{ fontSize: '12px' }}>COGS</label>
                                                <input 
                                                    type="number" 
                                                    className="form-control" 
                                                    name="fm_cogs" 
                                                    id="fm_cogs"
                                                    required
                                                />
                                            </div>
                                    </div>
                                    <div className="col-md-3">
                                            <div className="form-group">
                                                <label style={{ fontSize: '12px' }}>Sales Price</label>
                                                <input 
                                                    type="number" 
                                                    className="form-control" 
                                                    name="fm_salesprice" 
                                                    id="fm_salesprice" 
                                                    required
                                                />
                                            </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-sm-6 col-md-2">
                                            <div className="form-group">
                                                <label style={{ fontSize: '12px' }}>Diskon Tanggal</label>
                                                <RadioButtons name="fl_disc_date"  onChange={handleBatchChange} />
                                            </div>
                                    </div>
                                    <div className={`col-sm-6 col-md-2 col-lg-2 place_diskon_tanggal hidden}`}>
                                            <div className="form-group">
                                                <label style={{ fontSize: '12px' }}>Tanggal Start</label>
                                                <input 
                                                    type="date" 
                                                    className="form-control" 
                                                    name="fd_disc_begin" 
                                                    id="fd_disc_begin"
                                                />
                                            </div>
                                    </div>  
                                    <div className={`col-sm-6 col-md-2 col-lg-2 place_diskon_tanggal hidden}`}>
                                            <div className="form-group">
                                                <label style={{ fontSize: '12px' }}>Tanggal End</label>
                                                <input 
                                                    type="date" 
                                                    className="form-control" 
                                                    name="fd_disc_end" 
                                                    id="fd_disc_end" 
                                                />
                                            </div>
                                    </div>
                                    <div className={`col-sm-6 col-md-3 col-lg-3 place_diskon_tanggal hidden}`}>
                                        <div className="form-group">
                                            <label style={{ fontSize: '12px' }}>Rupiah</label>
                                            <input 
                                                type="number" 
                                                className="form-control" 
                                                name="fm_disc_rp" 
                                                id="fm_disc_rp" 
                                            />
                                        </div>
                                    </div>
                                    <div className={`col-sm-6 col-md-3 col-lg-3 place_diskon_tanggal hidden}`}>
                                        <div className="form-group">
                                            <label style={{ fontSize: '12px' }}>Persentase</label>
                                            <input 
                                                type="number" 
                                                className="form-control" 
                                                name="fm_disc_pr" 
                                                id="fm_disc_pr" 
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-sm-6 col-md-2">
                                            <div className="form-group">
                                                <label style={{ fontSize: '12px' }}>Diskon Waktu</label>
                                                <RadioButtons name="fl_disc_time"  onChange={handleBatchChange} />
                                            </div>
                                    </div>
                                    <div className={`col-sm-6 col-md-2 col-lg-2 place_diskon_waktu hidden}`}>
                                        <div className="form-group">
                                            <label style={{ fontSize: '12px' }}>Waktu Start</label>
                                            <input 
                                                type="time" 
                                                className="form-control" 
                                                name="ft_disc_begin" 
                                                id="ft_disc_begin" 
                                                maxLength="5" 
                                            />
                                        </div>
                                    </div>
                                    <div className={`col-sm-6 col-md-2 col-lg-2 place_diskon_waktu hidden}`}>
                                        <div className="form-group">
                                            <label style={{ fontSize: '12px' }}>Waktu End</label>
                                            <input 
                                                type="time" 
                                                className="form-control" 
                                                name="ft_disc_end" 
                                                id="ft_disc_end" 
                                                maxLength="5" 
                                            />
                                        </div>
                                    </div>
                                    <div className={`col-sm-6 col-md-3 col-lg-3 place_diskon_waktu hidden}`}>
                                        <div className="form-group">
                                            <label style={{ fontSize: '12px' }}>Rupiah</label>
                                            <input 
                                                type="number" 
                                                className="form-control" 
                                                name="fm_time_disc_rp" 
                                                id="fm_time_disc_rp" 
                                            />
                                        </div>
                                    </div>
                                    <div className={`col-sm-6 col-md-3 col-lg-3 place_diskon_waktu hidden}`}>
                                        <div className="form-group">
                                            <label style={{ fontSize: '12px' }}>Persentase</label>
                                            <input 
                                                type="number" 
                                                className="form-control" 
                                                name="fm_time_disc_pr" 
                                                id="fm_time_disc_pr" 
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-sm-6 col-md-2 col-lg-2">
                                        <div className="form-group">
                                            <label style={{ fontSize: '12px' }}>Price</label>
                                            <input 
                                                type="number" 
                                                className="form-control" 
                                                name="fm_price_default" 
                                                id="fm_price_default"
                                            />
                                        </div>
                                    </div>
                                    <div className="col-sm-6 col-md-2 col-lg-2">
                                        <div className="form-group">
                                            <label style={{ fontSize: '12px' }}>Price Distributor</label>
                                            <input 
                                                type="number" 
                                                className="form-control" 
                                                name="fm_price_distributor" 
                                                id="fm_price_distributor"
                                            />
                                        </div>
                                    </div>
                                    <div className="col-sm-6 col-md-2 col-lg-2">
                                        <div className="form-group">
                                            <label style={{ fontSize: '12px' }}>Price Project</label>
                                            <input 
                                                type="number" 
                                                className="form-control" 
                                                name="fm_price_project" 
                                                id="fm_price_project" 
                                            />
                                        </div>
                                    </div>
                                    <div className="col-sm-6 col-md-2 col-lg-2">
                                        <div className="form-group">
                                            <label style={{ fontSize: '12px' }}>Price Dealer</label>
                                            <input 
                                                type="number" 
                                                className="form-control" 
                                                name="fm_price_dealer" 
                                                id="fm_price_dealer"
                                            />
                                        </div>
                                    </div>
                                    <div className="col-sm-6 col-md-2 col-lg-2">
                                        <div className="form-group">
                                            <label style={{ fontSize: '12px' }}>Price Enduser</label>
                                            <input 
                                                type="number" 
                                                className="form-control" 
                                                name="fm_price_enduser" 
                                                id="fm_price_enduser" 
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-sm-12 col-md-12 col-lg-12">
                                        <div className="form-group">
                                            <label style={{ fontSize: '12px' }}>Description</label>
                                            <textarea 
                                                className="form-control" 
                                                name="fv_stockdescription" 
                                                id="fv_stockdescription" 
                                                rows="3" 
                                            ></textarea>
                                        </div>
                                    </div>
                                </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
       </>
    );
}


export default ModalStock;