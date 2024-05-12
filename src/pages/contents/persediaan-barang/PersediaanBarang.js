import React from "react";
import {DataTable} from "primereact/datatable";
import { Column } from "primereact/column";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import { IconField } from "primereact/iconfield";
import { InputIcon } from "primereact/inputicon";
import { InputText } from "primereact/inputtext";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import Config from "../../../config";
import { Button } from "primereact/button";
import ModalPersediaanBarang from "./ModalPersediaanBarang";

const PersediaanBarang = () => {
    const [data, setData] = useState([]);
    const [selectedRowData, setSelectedRowData] = useState(null);
    const [showModal, setShowModal] = useState(false)

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        const token = localStorage.getItem('token');
        const axiosConfig = {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }

        try {
            const response = await axios.get(Config.api.server2 + "persediaan-barang/datatables-detail", axiosConfig);
            const responseData = response.data.data;
            setData(responseData);
        } catch (error) {
            console.error("Error:", error);
        }
    }


    const renderHeader = () => {
        return (
            <div className="d-flex justify-content-between p-2">
                <h4>Daftar Persediaan Barang</h4>
                <IconField iconPosition="left">
                    <InputIcon className="pi pi-search" />
                    <InputText  placeholder=" Keyword Search" />
                </IconField>
            </div>
        );
    };

    const renderActionButtons = (rowData) => {
        return (
            <Button label="Detail" severity="info" className="pl-3 pr-3 rounded-lg" onClick={() => handleDetailClick(rowData)} />
        );
    };

    const handleDetailClick = (rowData) => {
        setSelectedRowData(rowData);
        window.$('#selectStock').modal('show');
    };
    

    const header = renderHeader();

    return (
       <>
        <div className="App">
            <div className="container-fluid">
                <DataTable value={data} header={header} paginator rows={20} showGridlines  sortMode='multiple'  size={'large'} tableStyle={{ minWidth: '90rem', height:'50rem',border: '1px solid black'  }} >
                    <Column field="DT_RowIndex" header="No" style={{width:'5%'}} align={"center"} sortable/>
                    <Column field="fc_stockcode" header="Kode Barang" align={"center"} sortable />
                    <Column field="stock.fc_namelong" header="Nama Barang" align={"center"} sortable/>
                    <Column field="stock.fc_nameshort" header="Sebutan" align={"center"} sortable/>
                    <Column field="stock.fc_brand" header="Brand" align={"center"} sortable/>
                    <Column field="stock.fc_subgroup" header="Sub Group" align={"center"} sortable/>
                    <Column field="stock.fc_typestock1" header="Tipe Stock" align={"center"} sortable/>
                    <Column field="fn_quantity" header="Qty" align={"center"} sortable/>
                    <Column header="Action" align={"center"} body={(rowData) => renderActionButtons(rowData)} />
                </DataTable>
            </div>
        </div>
        {selectedRowData && <ModalPersediaanBarang id="selectStock" selectedRowData={selectedRowData} />}
        </>
    );
}

export default PersediaanBarang;