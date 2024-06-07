import React, { useState } from "react";
import moment from "moment";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './css/StockOpnameMaster.css';

const StockOpnameMaster = () => {
    const [startDate, setStartDate] = useState(null);
    return (
        <>
            <div className="container-fluid">
                <div className="full-width-container">
                    <h3>Stock Opname</h3>
                </div>
                <div className="row">
                    <div className="col-12 col-md-5 col-lg-5">
                        <div className="card">
                            <div className="card-header d-flex justify-between">
                                <h4>Informasi Umum</h4>
                                <div className="card-header-action">
                                    <button
                                        className="btn btn-icon btn-info"
                                        data-toggle="collapse"
                                        data-target="#mycard-collapse"
                                        aria-expanded="true"
                                        aria-controls="mycard-collapse"
                                    >
                                        <i className="fas fa-minus"></i>
                                    </button>
                                </div>
                            </div>
                            <input type="text" id="fc_branch" value="" hidden />
                            <form
                                id="form_submit"
                                action="/apps/purchase-order/store-update"
                                method="POST"
                                autoComplete="off"
                            >
                                <div className="collapse show" id="mycard-collapse">
                                    <div className="card-body">
                                        <div className="row">
                                            <div className="col-12 col-md-12 col-lg-12">
                                                <div className="form-group">
                                                    <label>Tanggal: {moment().format("DD/MM/YYYY")}</label>
                                                </div>
                                            </div>
                                            <div className="col-12 col-md-12 col-lg-6">
                                                <div className="form-group">
                                                    <label>Operator</label>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        name=""
                                                        id=""
                                                        value=""
                                                        readOnly
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-12 col-md-6 col-lg-6">
                                                <div className="form-group">
                                                    <label>Tipe Opname</label>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        id="fc_stockopname_type"
                                                        name="fc_stockopname_type"
                                                        value="DAILY"
                                                        readOnly
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-12 col-md-6 col-lg-6">
                                                <div className="form-group required">
                                                    <label>Tanggal Mulai</label>
                                                    <div className="input-group">
                                                        <div className="input-group-prepend">
                                                            <div className="input-group-text">
                                                                <i className="fas fa-calendar"></i>
                                                            </div>
                                                        </div>
                                                        <DatePicker
                                                            selected={startDate}
                                                            onChange={(date) => setStartDate(date)}
                                                            dateFormat="dd-MM-yyyy"
                                                            name="fd_stockopname_start"
                                                            className="form-control datepicker-custom-width"
                                                            placeholderText="Pilih tanggal"
                                                            required
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-12 col-md-6 col-lg-6">
                                                <div className="form-group">
                                                    <label>Sebagai Customer</label>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        id="fc_membercode"
                                                        name="fc_membercode"
                                                        value=""
                                                        readOnly
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-12 col-md-12 col-lg-12 text-right">
                                                <button type="submit" className="btn btn-success">
                                                    Save Changes
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>

                    <div className="col-12 col-md-7 col-lg-7">
                        <div className="card">
                            <div className="card-header">
                                <h4>Detail Opname</h4>
                                <div className="card-header-action">
                                    <button
                                        className="btn btn-icon btn-info"
                                        data-toggle="collapse"
                                        data-target="#mycard-collapse2"
                                        aria-expanded="true"
                                        aria-controls="mycard-collapse2"
                                    >
                                        <i className="fas fa-minus"></i>
                                    </button>
                                </div>
                            </div>
                            <div className="collapse show" id="mycard-collapse2">
                                <div className="card-body">
                                    <div className="row">
                                        <div className="col-5 col-md-5 col-lg-5">
                                            <div className="form-group">
                                                <label>Jumlah Stock</label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    name="fc_supplierNPWP"
                                                    id="fc_supplierNPWP"
                                                    readOnly
                                                />
                                            </div>
                                        </div>
                                        <div className="col-7 col-md-7 col-lg-7">
                                            <div className="form-group">
                                                <label>Nama Gudang</label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    name="fc_branchtype_desc"
                                                    id="fc_branchtype_desc"
                                                    readOnly
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-12 col-md-12 col-lg-12">
                                            <div className="form-group">
                                                <label>Alamat Gudang</label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    name="fc_warehouseaddress"
                                                    id="fc_warehouseaddress"
                                                    readOnly
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-4 col-md-4 col-lg-4">
                                            <div className="form-group">
                                                <label>Jenis Gudang</label>
                                                <input 
                                                    type="text" 
                                                    className="form-control" 
                                                    id="fc_warehousepos" 
                                                    name="fc_warehousepos" 
                                                    readOnly
                                                />
                                            </div>
                                        </div>
                                        <div className="col-4 col-md-4 col-lg-4">
                                            <div class="form-group">
                                                <label>Telah Berlangsung</label>
                                                <div className="input-group" data-date-format="dd-mm-yyyy">
                                                    <input type="number" id="" className="form-control" name="" value="0" readonly />
                                                    <div className="input-group-prepend">
                                                        <div className="input-group-text">
                                                            Hari
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-4 col-md-4 col-lg-4">
                                            <div className="form-group d-flex-row">
                                                <label>Stock Teropname</label>
                                                <div class="text mt-2">
                                                    <h5 className="text-success" style={
                                                        {
                                                            fontSize: 'large'
                                                        }
                                                    } value=" " id="" name="">0/0 Stock</h5>
                                                </div>
                                             </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>


                </div>
            </div>
        </>
    );
}

export default StockOpnameMaster;