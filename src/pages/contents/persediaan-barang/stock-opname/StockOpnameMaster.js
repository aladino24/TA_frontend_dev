import React, { useState, useEffect } from "react";
import axios from "axios";
import moment from "moment";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import SweetAlertLoading from "../../../../components/SweetAlertLoading";
import './css/StockOpnameMaster.css';
import Config from "../../../../config";
import SweetAlertSuccess from "../../../../components/SweetAlertSuccess";
import SweetAlertError from "../../../../components/SweetAlertError";

const StockOpnameMaster = () => {
    const [startDate, setStartDate] = useState(null);
    const [loading, setLoading] = useState(false);
    const [successAlert, setSuccessAlert] = useState(false);
    const [successMessage, setSuccessMessage] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);
    const [errorAlert, setErrorAlert] = useState(false);
    const [stockOpnameData, setStockOpnameData] = useState({
        branch: "",
        userid: "",
        membercode: "",
        divisioncode: "",
        jumlah_stock: "",
        total_opname: "",
        membername: "",
        member_address: ""
    });

    const fetchData = async () => {
        setLoading(true);
        const token = localStorage.getItem('token');
        const axiosConfig = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        };
        try {
            const response = await axios.get(
                `${Config.api.server2}stock-opname/master`,
                axiosConfig
            );
            if (response.data.success) {
                const data = response.data.data;
                setStockOpnameData({
                    branch: data.branch,
                    userid: data.userid,
                    membercode: data.membercode,
                    divisioncode: data.divisioncode,
                    jumlah_stock: data.jumlah_stock,
                    total_opname: data.total_opname,
                    membername: data.membername,
                    member_address: data.member_address
                });
            }
        } catch (error) {
            console.error("Error fetching data:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleSubmit = async (event) => {
        setLoading(true);
        event.preventDefault();
        const token = localStorage.getItem('token');
        const axiosConfig = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        };

        const payload = {
            fd_stockopname_start: startDate,
        };
        try {
            const response = await axios.post(
                `${Config.api.server2}stock-opname/master`,
                payload,
                axiosConfig
            );

            const responseData = response.data;

            if (responseData.success) {
                setLoading(false);
                setSuccessMessage(responseData.message);
                setSuccessAlert(true);
            } else {
                setLoading(false);
                setErrorMessage(response.message);
                setErrorAlert(true)
            }
        } catch (error) {
            setLoading(false);
            console.error("Error submitting data:", error);
            setErrorMessage(error);
            setErrorAlert(true);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            {loading && <SweetAlertLoading show={true} />}
            <SweetAlertSuccess 
                message={successAlert}
                show={successAlert}
                onConfirm={() => {
                    setSuccessAlert(false);
                    setSuccessMessage('');
                    setTimeout(() => {
                        window.location.reload();
                    }, 2000);
                }}
            />

            <SweetAlertError 
                 message={errorMessage}
                 show={errorAlert}
                 onConfirm={() => {
                     setErrorAlert(false);
                     setErrorMessage('');
                 }}
            />
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
                            <input type="text" id="fc_branch" value={stockOpnameData.branch} hidden />
                            <form onSubmit={handleSubmit}>
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
                                                        value={stockOpnameData.userid}
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
                                                        value={stockOpnameData.membercode}
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
                                                    value={stockOpnameData.jumlah_stock}
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
                                                    value={`Gudang ${stockOpnameData.membername}`}
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
                                                    value={stockOpnameData.member_address}
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
                                                    value="INTERNAL" 
                                                    readOnly
                                                />
                                            </div>
                                        </div>
                                        <div className="col-4 col-md-4 col-lg-4">
                                            <div className="form-group">
                                                <label>Telah Berlangsung</label>
                                                <div className="input-group" data-date-format="dd-mm-yyyy">
                                                    <input type="number" className="form-control" value="0" readOnly />
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
                                                <div className="text mt-2">
                                                    <h5 className="text-success" style={{ fontSize: 'large' }}>
                                                        {stockOpnameData.total_opname}/{stockOpnameData.jumlah_stock} Stock
                                                    </h5>
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
};

export default StockOpnameMaster;
