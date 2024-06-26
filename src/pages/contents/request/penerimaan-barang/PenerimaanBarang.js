import React, { useState, useEffect } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import axios from "axios";
import SweetAlertLoading from "../../../../components/SweetAlertLoading";
import Config from "../../../../config";
import { Button } from "primereact/button";
import SweetAlertConfirmationYesOrNo from "../../../../components/SweetAlertConfirmationYesOrNo"; // Importing SweetAlertConfirmationYesOrNo component
import SweetAlertSuccess from "../../../../components/SweetAlertSuccess";

const PenerimaanBarang = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [successAlert, setSuccessAlert] = useState(false);
    const [selectedRowData, setSelectedRowData] = useState(null);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        //token
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
                }
                return item;
            });
            setData(modifiedData);
        } catch (error) {
            console.error("Error fetching data:", error);
        } finally {
            setLoading(false);
        }
    };

    const renderLoader = () => {
        return (
            <SweetAlertLoading show={loading} />
        );
    };

    // Handler for Detail button click
    const handleDetail = (rowData) => {
        console.log("Detail clicked for:", rowData);
        // Add your detail logic here
    };

    // Handler for Konfirmasi Terima button click
    const handleKonfirmasiTerima = (rowData) => {
        setSelectedRowData(rowData);
        setShowConfirmation(true);
    };

    const handleConfirm = () => {
        setShowConfirmation(false);
        setSuccessAlert(true);
    };

    const handleCancel = () => {
        setShowConfirmation(false);
    };

    const actionBodyTemplate = (rowData) => {
        return (
            <div className="p-d-flex p-jc-center">
                <Button label="Detail" className="p-button-info rounded mr-2 pl-2 pr-2" onClick={() => handleDetail(rowData)} />
                <Button label="Terima" className="p-button-success rounded mr-2 pl-2 pr-2" onClick={() => handleKonfirmasiTerima(rowData)} />
            </div>
        );
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
                    <Column field="fc_dono" header="No Pengiriman"  align={'center'} />
                    <Column field="somst.fc_sono" header="No Pesanan"  align={'center'} />
                    <Column field="fn_dodetail" header="Jumlah Item"  align={'center'} />
                    <Column field="fd_dodate_user" header="Tanggal Pengiriman"  align={'center'} />
                    <Column field="fv_transporter" header="Transporter"  align={'center'} />
                    <Column field="fc_status" header="Status"  align={'center'} />
                    <Column field="fm_netto" header="Total Harga"  align={'center'} />
                    <Column header="Action" body={actionBodyTemplate} align={'center'} />
                </DataTable>
            </div>
            <SweetAlertConfirmationYesOrNo 
                show={showConfirmation}
                message="Apakah Anda yakin ingin mengkonfirmasi penerimaan barang ini?"
                content="Ya, Terima"
                onConfirm={handleConfirm}
                onCancel={handleCancel}
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
