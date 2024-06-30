import React, { useState, useEffect } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import axios from "axios";
import { Button } from "primereact/button";
import { Tag } from "primereact/tag";
import SweetAlertLoading from "../../../../components/SweetAlertLoading";
import Config from "../../../../config";
import SweetAlertSuccess from "../../../../components/SweetAlertSuccess";
import ModalFormPenerimaan from "./components/ModalFormPenerimaan";
import { format, set } from 'date-fns';
import { se } from "date-fns/locale";

const PenerimaanBarang = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [successAlert, setSuccessAlert] = useState(false);
    const [selectedRowData, setSelectedRowData] = useState(null);
    const [formData, setFormData] = useState({ fc_custreceiver: '', fd_doarrivaldate: null, ft_description: '' });

    useEffect(() => {
        fetchData();
    }, []);

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
                `${Config.api.server3}get-pengiriman-pesanan`,
                axiosConfig
            );
            const modifiedData = response.data.map(item => {
                if (item.fc_status === "SUBMIT") {
                    return { ...item, fc_status: "Sedang Dikirim" };
                } else if (item.fc_status === "FINISH") {
                    return { ...item, fc_status: "Diterima" };
                }
                return item;
            });
            setData(modifiedData);
            setLoading(false);
        } catch (error) {
            setLoading(false);
            console.error("Error fetching data:", error);
        } finally {
            setLoading(false);
        }
    };

    const formatRupiah = (number) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0,
        }).format(number);
    };

    const renderLoader = () => {
        return (
            <SweetAlertLoading show={loading} />
        );
    };

    const handleDetail = (rowData) => {
        console.log("Detail clicked for:", rowData);
        // Add your detail logic here
    };

    const handleKonfirmasiTerima = (rowData) => {
        setSelectedRowData(rowData);
        setShowConfirmation(true);
    };

    const handleConfirm = async () => {
        setShowConfirmation(false);
        try {
            setLoading(true);
            const token = localStorage.getItem('token');
            const axiosConfig = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            };
            const formattedDate = format(new Date(formData.fd_doarrivaldate), 'yyyy-MM-dd');
            const response = await axios.put(
                `${Config.api.server3}confirm-receipt`,
                {
                    data: selectedRowData,
                    fc_dono: selectedRowData.fc_dono,
                    fc_custreceiver: formData.fc_custreceiver,
                    fd_doarrivaldate: formattedDate,
                    ft_description: formData.ft_description,
                },
                axiosConfig
            );
            if (response.data.success) {
                setLoading(false);
                setSuccessAlert(true);
                fetchData(); // Refresh data after confirmation
            }
        } catch (error) {
            setLoading(false);
            console.error("Error confirming receipt:", error);
        } finally {
            setShowConfirmation(false);
            setLoading(false);
        }
    };

    const handleCancel = () => {
        setShowConfirmation(false);
        // reset form data
        setFormData({ fc_custreceiver: '', fd_doarrivaldate: null, ft_description: '' });
    };

    const actionBodyTemplate = (rowData) => {
        return (
            <div className="p-d-flex p-jc-center">
                <Button label="Detail" className="p-button-info rounded mr-2 pl-2 pr-2" onClick={() => handleDetail(rowData)} />
                <Button label="Terima" className="p-button-success rounded mr-2 pl-2 pr-2" onClick={() => handleKonfirmasiTerima(rowData)} />
            </div>
        );
    };

    const fmNettoBodyTemplate = (rowData) => {
        return formatRupiah(rowData.fm_netto);
    };

    const statusBodyTemplate = (rowData) => {
        let severity = "info";
        if (rowData.fc_status === "Diterima") {
            severity = "success";
        } else if (rowData.fc_status === "Sedang Dikirim") {
            severity = "warning";
        }
        return <Tag value={rowData.fc_status} severity={severity} />;
    };

    return (
        <div className="container-fluid">
            {renderLoader()}
            <div className="card">
                <div className="card-header">
                    <h2>Daftar Pengiriman</h2>
                </div>
                <DataTable
                    className="p-2"
                    value={data}
                    showGridlines
                    tableStyle={{ minWidth: '50rem' }}
                    paginator
                    rows={20}
                >
                    <Column field="no" header="No" align={'center'} />
                    <Column field="fc_dono" header="No Pengiriman" align={'center'} />
                    <Column field="somst.fc_sono" header="No Pesanan" align={'center'} />
                    <Column field="fn_dodetail" header="Jumlah Item" align={'center'} />
                    <Column field="fd_dodate_user" header="Tanggal Pengiriman" align={'center'} />
                    <Column field="fv_transporter" header="Transporter" align={'center'} />
                    <Column field="fc_status" header="Status" body={statusBodyTemplate} align={'center'} />
                    <Column field="fm_netto" header="Total Harga" body={fmNettoBodyTemplate} align={'center'} />
                    <Column header="Action" body={actionBodyTemplate} align={'center'} />
                </DataTable>
            </div>
            <ModalFormPenerimaan
                visible={showConfirmation}
                formData={formData}
                setFormData={setFormData}
                onHide={handleCancel}
                onConfirm={handleConfirm}
            />
            <SweetAlertSuccess
                message={'Konfirmasi penerimaan berhasil'}
                show={successAlert}
                onConfirm={() => setSuccessAlert(false)}
            />
        </div>
    );
};

export default PenerimaanBarang;
