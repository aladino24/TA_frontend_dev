import React, { useEffect, useState } from "react";
import moment from "moment";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './css/StockOpnameDetail.css';
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { IconField } from "primereact/iconfield";
import { InputIcon } from "primereact/inputicon";
import { InputText } from "primereact/inputtext";
import Config from "../../../../config";
import axios from "axios";
import SweetAlertLoading from "../../../../components/SweetAlertLoading";
import StockOpnamePersediaanModal from "./components/StockOpnamePersediaanModal";
import CreateStockOpnameModal from "./components/CreateStockOpnameModal";
import { useLocation } from "react-router-dom";
const StockOpnameDetail = () => {
    const location = useLocation();
    const responseValue = location.state?.responseData?.data;
    const initialDate = responseValue?.fd_stockopname_start ? moment(responseValue.fd_stockopname_start, "YYYY-MM-DD HH:mm:ss").toDate() : null;
    
    const [startDate, setStartDate] = useState(initialDate);
    const [isInformasiUmumOpen, setIsInformasiUmumOpen] = useState(false);
    const [isDetailOpname, setIsDetailOpname] = useState(false);
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [isModalPersediaanOpen, setIsModalPersediaanOpen] = useState(false);
    const [isModalCreateOpen, setIsModalCreateOpen] = useState(false);
    const [masterData, setMasterData] = useState([]);
    const [daysElapsed, setDaysElapsed] = useState(0);

    const fetchMasterData = async () => {
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
               Config.api.server2 + 'stock-opname/master',
               axiosConfig
            );

            const responseData = response.data.data
            if (response.status === 200) {
                setMasterData(responseData);
            }
        } catch (error) {
            console.error("Error fetching master data:", error);
        } finally {
            setLoading(false);
        }
    };

    const fetchPersediaan = async () => {
        setLoading(true);
        const token = localStorage.getItem('token');
        const axiosConfig = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        };
        try {
            const warehouseCode = "WRHS0000001";
            const encodedWarehouseCode = btoa(warehouseCode);
            const response = await axios.get(
                `${Config.api.server2}stock-opname/datatable-persediaan/${encodedWarehouseCode}`,
                axiosConfig
            );

            if (response.status === 200) {
                const responseData = response.data.data;
                if (Array.isArray(responseData)) {
                    setProducts(responseData);
                } else {
                    console.error("API response is not an array:", responseData);
                    setProducts([]);
                }
            }
        } catch (error) {
            console.error("Error fetching products:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchMasterData();
        if (responseValue?.fd_stockopname_start) {
            const start = moment(responseValue.fd_stockopname_start, "YYYY-MM-DD HH:mm:ss");
            const today = moment();
            const daysDiff = today.diff(start, 'days');
            setDaysElapsed(daysDiff);
        }
    }, [responseValue]);

    const toggleInformasiUmum = () => {
        setIsInformasiUmumOpen(!isInformasiUmumOpen);
    };

    const toggleDetailOpname = () => {
        setIsDetailOpname(!isDetailOpname);
    }

    // console.log(responseValue);
 
    const renderHeader = () => {
        return (
            <div className="container-fluid">
                <div className="row d-flex justify-content-between p-2">
                    <h4>Stock yang Diopname</h4>
                    <div className="d-flex">
                        <button
                            className="btn btn-warning mr-2"
                            style={{ height: '30px', padding: '0 10px' }}
                            onClick={() => {
                                fetchPersediaan()
                                .then(() => {
                                    setIsModalPersediaanOpen(true);
                                })
                                .catch(error => {
                                    console.error('Error:', error);
                                });
                            }}
                        >
                            <i className="fas fa-box"></i> Cek Persediaan
                        </button>
                        <button 
                            className="btn btn-success mr-2" 
                            style={{ height: '30px', padding: '0 10px' }}
                            onClick={() => {
                                setIsModalCreateOpen(true);
                            }}
                        >
                            <i className="fa fa-plus mr-2"></i>Tambah Stock Opname
                        </button>
                    </div>
                </div>
                <div className="row d-flex justify-content-between p-2">
                    <div>
                        {/* Add content here if needed */}
                    </div>
                    <div className="input-group" style={{ maxWidth: '200px' }}>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Keyword Search"
                        aria-label="Keyword Search"
                        aria-describedby="basic-addon2"
                        onChange={(e) => {}}
                    />
                    <div className="input-group-append">
                        <span className="input-group-text" id="basic-addon2">
                            <i className="pi pi-search"></i>
                        </span>
                    </div>
                </div>
                </div>
            </div>
        );
    }

    const header = renderHeader();

    // console.log(responseValue);

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
                                        onClick={toggleInformasiUmum}
                                        aria-expanded={isInformasiUmumOpen}
                                        aria-controls="mycard-collapse"
                                    >
                                        <i className={`fas fa-${isInformasiUmumOpen ? "minus" : "plus"}`}></i>
                                    </button>
                                </div>
                            </div>
                            <input type="text" id="fc_branch" value="" hidden />
                            <input type="text" id="fc_branch" value="" hidden />
                            <form
                                id="form_submit"
                                action="/apps/purchase-order/store-update"
                                method="POST"
                                autoComplete="off"
                            >
                                <div className={`collapse ${isInformasiUmumOpen ? "show" : ""}`} id="mycard-collapse">
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
                                                        name="fc_userid"
                                                        id="fc_userid"
                                                        value={responseValue.fc_userid}
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
                                                        id="fc_potype"
                                                        name="fc_potype"
                                                        value="PO Beli"
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
                                                            dateFormat="dd-MM-yyyy"
                                                            className="form-control datepicker-custom-width"
                                                            placeholderText="Pilih tanggal"
                                                            readOnly
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
                                                        id="status_pkp"
                                                        name="fc_status_pkp"
                                                        value={responseValue.fc_membercode}
                                                        readOnly
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-12 col-md-12 col-lg-12 text-right">
                                                <button type="submit" className="btn btn-danger">
                                                    Cancel Stockopname
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
                                        onClick={toggleDetailOpname}
                                        aria-expanded={isDetailOpname}
                                        aria-controls="mycard-collapse2"
                                    >
                                        <i className={`fas fa-${isDetailOpname ? "minus" : "plus"}`}></i>
                                    </button>
                                </div>
                            </div>
                            <div className={`collapse ${isDetailOpname ? "show" : ""}`} id="mycard-collapse2">
                                <div className="card-body">
                                    <div className="row">
                                        <div className="col-5 col-md-5 col-lg-5">
                                            <div className="form-group">
                                                <label>Jumlah Stock</label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    value={masterData.jumlah_stock}
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
                                                    value={`Gudang ${masterData.membername}`}
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
                                                    value={masterData.member_address}
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
                                                    value='INTERNAL'
                                                    readOnly
                                                />
                                            </div>
                                        </div>
                                        <div className="col-4 col-md-4 col-lg-4">
                                            <div className="form-group">
                                                <label>Telah Berlangsung</label>
                                                <div className="input-group" data-date-format="dd-mm-yyyy">
                                                    <input 
                                                        type="number" 
                                                        id="" 
                                                        className="form-control" 
                                                        name="" 
                                                        value={daysElapsed}
                                                        readOnly 
                                                    />
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
                                                    <h5 className="text-success" style={
                                                        {
                                                            fontSize: 'large'
                                                        }
                                                    }>{masterData.stock_teropname}/{masterData.jumlah_stock} Stock</h5>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="row mt-4">
                    <div className="col-12 col-md-12 col-lg-12">
                        <div className="card">
                            <DataTable value={[]} header={header} paginator rows={5} rowsPerPageOptions={[5, 10, 25, 50]} showGridlines>
                                <Column align={'center'} field="id" header="No"></Column>
                                <Column align={'center'} field="fc_barcode" header="Kode Barang"></Column>
                                <Column align={'center'} field="fc_namelong" header="Nama Barang"></Column>
                                <Column align={'center'} field="fc_namepack" header="Satuan"></Column>
                                <Column align={'center'} field="fc_batch" header="Batch"></Column>
                                <Column align={'center'} field="fd_expired" header="Exp.Date"></Column>
                                <Column align={'center'} field="fn_quantity" header="Qty"></Column>
                                <Column align={'center'} field="" header="Action"></Column>
                            </DataTable>
                        </div>
                    </div>
                </div>
            </div>
            <CreateStockOpnameModal isOpen={isModalCreateOpen} onHide={() => setIsModalCreateOpen(false)} />
            <StockOpnamePersediaanModal isOpen={isModalPersediaanOpen} products={products} onHide={() => setIsModalPersediaanOpen(false)} />
            <SweetAlertLoading show={loading} />
        </>
    );
}

export default StockOpnameDetail;
