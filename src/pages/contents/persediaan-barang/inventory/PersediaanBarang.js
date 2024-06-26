import React, { useState, useEffect } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import axios from "axios";
import Config from "../../../../config";
import { Button } from "primereact/button";
import ModalPersediaanBarang from "./ModalPersediaanBarang";
import SweetAlertLoading from "../../../../components/SweetAlertLoading";
import "./css/PersediaanBarang.css";  // Import custom CSS file

const PersediaanBarang = () => {
    const [data, setData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [selectedRowData, setSelectedRowData] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [globalFilters, setGlobalFilters] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        if (globalFilters) {
            const filteredData = data.filter((item) => {
                return ["fc_stockcode", "stock.fc_namelong", "stock.fc_nameshort", "stock.fc_brand", "stock.fc_subgroup", "stock.fc_typestock1", "fn_quantity"].some((field) =>
                    field.split('.').reduce((obj, key) => obj && obj[key], item)?.toString().toLowerCase().includes(globalFilters.toLowerCase())
                );
            });
            setFilteredData(filteredData);
        } else {
            setFilteredData(data);
        }
    }, [globalFilters, data]);

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
            setFilteredData(responseData);
        } catch (error) {
            console.error("Error:", error);
        } finally {
            setLoading(false);
        }
    }

    const renderHeader = () => {
        return (
            <div className="d-flex justify-content-between p-2">
                <h4>Daftar Persediaan Barang</h4>
                <div className="input-group" style={{ maxWidth: '300px' }}>
                     <Button 
                        type="button" 
                        icon="pi pi-file-excel" 
                        severity="success" 
                        className="rounded mr-3"
                        onClick={() => {}} 
                        data-pr-tooltip="XLS" 
                    />
                    <Button 
                        type="button" 
                        icon="pi pi-file-pdf" 
                        severity="danger" 
                        className="rounded mr-2"
                        onClick={exportPdf} 
                        data-pr-tooltip="PDF" 
                        style={
                            {
                                height: '100%',
                                marginRight: '5px'
                            }
                        }
                    />
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Keyword Search"
                        aria-label="Keyword Search"
                        aria-describedby="basic-addon2"
                        value={globalFilters}
                        onChange={(e) => setGlobalFilters(e.target.value)}
                    />
                    <div className="input-group-append" style={{ height: '100%' }}>
                        <span className="input-group-text" id="basic-addon2">
                            <i className="pi pi-search"></i>
                        </span>
                    </div>
                </div>
            </div>
        );
    };

    const exportPdf = () => {
        import('jspdf').then((jsPDF) => {
            import('jspdf-autotable').then(() => {
                const doc = new jsPDF.default(0, 0);
    
                // Add title to PDF
                doc.text('Persediaan Barang', 14, 16);  // (text, x, y)
    
                // Define export columns and data
                const exportColumns = [
                    { header: "No", dataKey: "DT_RowIndex" },
                    { header: "Kode Barang", dataKey: "fc_stockcode" },
                    { header: "Nama Barang", dataKey: "fc_namelong" },
                    { header: "Sebutan", dataKey: "fc_nameshort" },
                    { header: "Brand", dataKey: "fc_brand" },
                    { header: "Sub Group", dataKey: "fc_subgroup" },
                    { header: "Tipe Stock", dataKey: "fc_typestock1" },
                    { header: "Qty", dataKey: "fn_quantity" }
                ];
                const products = filteredData.map(item => ({
                    DT_RowIndex: item.DT_RowIndex,
                    fc_stockcode: item.stock?.fc_stockcode,
                    fc_namelong: item.stock?.fc_namelong,
                    fc_nameshort: item.stock?.fc_nameshort,
                    fc_brand: item.stock?.fc_brand,
                    fc_subgroup: item.stock?.fc_subgroup,
                    fc_typestock1: item.stock?.fc_typestock1,
                    fn_quantity: item.fn_quantity
                }));
    
                // Add table to PDF
                doc.autoTable({
                    head: [exportColumns.map(col => col.header)],
                    body: products.map(item => exportColumns.map(col => item[col.dataKey])),
                    startY: 20  // Adjust starting position to avoid overlap with title
                });
    
                doc.save('persediaan-barang.pdf');
            });
        });
    };


    const renderActionButtons = (rowData) => {
        return (
            <Button label="Detail" severity="info" className="pl-3 pr-3 rounded-lg" onClick={() => handleDetailClick(rowData)} />
        );
    };

    const handleDetailClick = (rowData) => {
        setSelectedRowData(rowData);
        setShowModal(true);
    };

    const header = renderHeader();
    // const footer = renderFooter();

    return (
        <>
            <SweetAlertLoading show={loading} />
            <div className="App">
                <div className="container-fluid">
                    <DataTable
                        value={filteredData}
                        header={header}
                        // footer={footer}
                        columnResizeMode="expand" 
                        resizableColumns 
                        paginator
                        rows={20}
                        showGridlines
                        sortMode='multiple'
                        size={'large'}
                        rowsPerPageOptions={[20, 30, 40, 50, 60, 70, 80, 90]}
                        tableStyle={{ minWidth: '90rem', height: '20rem', border: '1px solid black' }}
                        emptyMessage={<div style={{ textAlign: 'center' }}>No records found</div>}
                    >
                        <Column field="DT_RowIndex" header="No" style={{ width: '5%' }} align={"center"} sortable />
                        <Column field="fc_stockcode" header="Kode Barang" align={"center"} sortable />
                        <Column field="stock.fc_namelong" header="Nama Barang" align={"center"} sortable />
                        <Column field="stock.fc_nameshort" header="Sebutan" align={"center"} sortable />
                        <Column field="stock.fc_brand" header="Brand" align={"center"} sortable />
                        <Column field="stock.fc_subgroup" header="Sub Group" align={"center"} sortable />
                        <Column field="stock.fc_typestock1" header="Tipe Stock" align={"center"} sortable />
                        <Column field="fn_quantity" header="Qty" align={"center"} sortable />
                        <Column header="Action" align={"center"} body={(rowData) => renderActionButtons(rowData)} />
                    </DataTable>
                </div>
            </div>
            {selectedRowData && <ModalPersediaanBarang showModal={showModal} setShowModal={setShowModal} selectedRowData={selectedRowData} />}
        </>
    );
}

export default PersediaanBarang;
