import axios from "axios";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import SweetAlertLoading from "../../../../components/SweetAlertLoading";
import Config from "../../../../config";
import './styles/DaftarRequestBarangDetail.css';

const DaftarRequestBarangDetail = () => {
    const { fc_sono } = useParams();
    const [isInformasiUmumOpen, setIsInformasiUmumOpen] = useState(false);
    const [details, setDetails] = useState(null);
    const [loading, setLoading] = useState(false);

    const token = localStorage.getItem('token');
    const axiosConfig = {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    };

    useEffect(() => {
        if (fc_sono) {
            setLoading(true);
            // console.log(`fc_sono parameter: ${fc_sono}`); // Tambahkan log ini
            axios.get(`${Config.api.server3}get-detail-request-somaster/${fc_sono}`, axiosConfig)
                .then(response => {
                    const data = response.data.data;
                    if (data && data.requestsodetail) {
                        data.requestsodetail = data.requestsodetail.map((item, index) => ({
                            ...item,
                            no: index + 1
                        }));
                    }
                    setDetails(data);
                })
                .catch(error => {
                    console.error("There was an error fetching the data!", error);
                })
                .finally(() => {
                    setLoading(false);
                });
        } else {
            console.error("fc_sono parameter is missing or undefined");
        }
    }, [fc_sono]);
    

    const toggleInformasiUmum = () => {
        setIsInformasiUmumOpen(!isInformasiUmumOpen);
    };

    return (
        <div className="container-fluid">
            <div className="full-width-container">
                <h3>Request Barang Detail</h3>
            </div>
            <div className="row mb-4 equal-height">
                <div className="col-12 col-md-6 col-lg-6">
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
                        <div className={`collapse ${isInformasiUmumOpen ? "show" : ""}`} id="mycard-collapse">
                            <div className="card-body">
                                <div className="row">
                                    <div className="col-12 col-md-6 col-lg-6">
                                        <div className="form-group">
                                            <label>Operator</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                name="fc_userid"
                                                id="fc_userid"
                                                value={details ? details.created_by : ""}
                                                readOnly
                                            />
                                        </div>
                                    </div>
                                    <div className="col-12 col-md-6 col-lg-6">
                                        <div className="form-group">
                                            <label>Request Type</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="fc_sotype"
                                                name="fc_sotype"
                                                value={details ? details.fc_sotype : ""}
                                                readOnly
                                            />
                                        </div>
                                    </div>
                                    <div className="col-12 col-md-6 col-lg-6">
                                        <div className="form-group required">
                                            <label>Membercode</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="fc_membercode"
                                                name="fc_membercode"
                                                value={details ? details.fc_membercode : ""}
                                                readOnly
                                            />
                                        </div>
                                    </div>
                                    <div className="col-12 col-md-6 col-lg-6">
                                        <div className="form-group">
                                            <label>Jumlah Item</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="fn_sodetail"
                                                name="fn_sodetail"
                                                value={details ? details.fn_sodetail : ""}
                                                readOnly
                                            />
                                        </div>
                                    </div>
                                    <div className="col-12 col-md-6 col-lg-6">
                                        <div className="form-group">
                                            <label>Tanggal Expired</label>
                                            <input
                                                type="date"
                                                className="form-control"
                                                id="fd_soexpired"
                                                name="fd_soexpired"
                                                value={details ? details.fd_soexpired.split(' ')[0] : ""}
                                                readOnly
                                            />
                                        </div>
                                    </div>
                                    <div className="col-12 col-md-6 col-lg-6">
                                        <div className="form-group">
                                            <label>Deskripsi</label>
                                            <textarea
                                                className="form-control"
                                                id="ft_description"
                                                name="ft_description"
                                                rows="1"
                                                value={details ? details.ft_description : ""}
                                                readOnly
                                            ></textarea>
                                        </div>
                                    </div>
                                    <div className="col-12 col-md-7 col-lg-7">
                                        <div className="form-group">
                                            <label>Alamat Pengiriman</label>
                                            <textarea
                                                className="form-control"
                                                id="fv_member_address_loading"
                                                name="fv_member_address_loading"
                                                rows="2"
                                                value={details ? details.fv_member_address_loading : ""}
                                                readOnly
                                            ></textarea>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-12 col-md-6 col-lg-6 card-calculation">
                    <div className="card">
                        <div className="card-header">
                            <h4>Calculation</h4>
                        </div>
                        <div className="card-body" style={{ height: "190px" }}>
                            <div className="d-flex">
                                <div className="flex-row-item" style={{ marginRight: "30px" }}>
                                    <div className="d-flex" style={{ gap: "5px", whiteSpace: "pre" }}>
                                        <p className="text-secondary flex-row-item" style={{ fontSize: "medium" }}>Item</p>
                                        <p className="text-success flex-row-item text-right" style={{ fontSize: "medium" }} id="count_item">{details ? details.fn_sodetail : ""}</p>
                                    </div>
                                    <div className="d-flex" style={{ gap: "5px", whiteSpace: "pre" }}>
                                        <p className="text-secondary flex-row-item" style={{ fontSize: "medium" }}>Disc. Total</p>
                                        <p className="text-success flex-row-item text-right" style={{ fontSize: "medium" }} id="fm_so_disc">{details ? details.fm_disctotal.toLocaleString('id-ID', { style: 'currency', currency: 'IDR' }) : "0,00"}</p>
                                    </div>
                                </div>
                                <div className="flex-row-item">
                                    <div className="d-flex" style={{ gap: "5px", whiteSpace: "pre" }}>
                                        <p className="text-secondary flex-row-item" style={{ fontSize: "medium" }}>Pelayanan</p>
                                        <p className="text-success flex-row-item text-right" style={{ fontSize: "medium" }} id="fm_servpay">{details ? details.fm_taxvalue.toLocaleString('id-ID', { style: 'currency', currency: 'IDR' }) : "0,00"}</p>
                                    </div>
                                    <div className="d-flex" style={{ gap: "5px", whiteSpace: "pre" }}>
                                        <p className="text-secondary flex-row-item" style={{ fontSize: "medium" }}>Total</p>
                                        <p className="text-success flex-row-item text-right" style={{ fontSize: "medium" }} id="fm_tax">{details ? details.fm_brutto.toLocaleString('id-ID', { style: 'currency', currency: 'IDR' }) : "0,00"}</p>
                                    </div>
                                    <div className="d-flex" style={{ gap: "5px", whiteSpace: "pre" }}>
                                        <p className="text-secondary flex-row-item" style={{ fontWeight: "bold", fontSize: "medium" }}>GRAND</p>
                                        <p className="text-success flex-row-item text-right" style={{ fontWeight: "bold", fontSize: "medium" }} id="grand_total">{details ? details.fm_brutto.toLocaleString('id-ID', { style: 'currency', currency: 'IDR' }) : "Rp. 0,00"}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="row">
                <div className="col-12 col-md-12 col-lg-12">
                    <div className="card">
                        <DataTable
                            value={details ? details.requestsodetail : []}
                            style={{ padding: '10px' }}
                            showGridlines
                            emptyMessage={<div style={{ textAlign: 'center' }}>No available options</div>}
                        >
                            <Column
                                field="no"
                                header="No"
                                style={{ textAlign: 'center' }}
                                headerStyle={{ textAlign: 'center' }}
                                align={'center'}
                            />
                            <Column
                                field="fc_stockcode"
                                header="Kode Barang"
                                style={{ textAlign: 'center' }}
                                headerStyle={{ textAlign: 'center' }}
                                align={'center'}
                            />
                            <Column
                                field="stock.fv_namestock"
                                header="Nama Barang"
                                style={{textAlign: 'center' }}
                                headerStyle={{ textAlign: 'center' }}
                                align={'center'}
                            />
                            <Column
                                field="stock.fc_namepack"
                                header="Satuan"
                                style={{ textAlign: 'center' }}
                                headerStyle={{ textAlign: 'center' }}
                                align={'center'}
                            />
                            <Column
                                field="fm_price"
                                header="Harga"
                                style={{ textAlign: 'center' }}
                                headerStyle={{ textAlign: 'center' }}
                                align={'center'}
                            />
                            <Column
                                field="fn_quantity"
                                header="Quantity"
                                style={{ textAlign: 'center' }}
                                headerStyle={{ textAlign: 'center' }}
                                align={'center'}
                            />
                            <Column
                                field="fm_value"
                                header="Total"
                                style={{ textAlign: 'center' }}
                                headerStyle={{ textAlign: 'center' }}
                                align={'center'}
                            />
                            <Column
                                field="ft_description"
                                header="Catatan"
                                style={{ width: "20%", textAlign: 'center' }}
                                headerStyle={{ textAlign: 'center' }}
                                align={'center'}
                            />
                        </DataTable>

                    </div>
                </div>
            </div>

            <SweetAlertLoading show={loading} />
        </div>
    );
};

export default DaftarRequestBarangDetail;
