import React, { useEffect, useState } from "react";
import { Dialog } from "primereact/dialog";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import axios from "axios";
import Config from "../../../../../config";
import SweetAlertLoading from "../../../../../components/SweetAlertLoading"; // Adjust the import path as needed
import SweetAlertSuccess from "../../../../../components/SweetAlertSuccess"; // Adjust the import path as needed
import SweetAlertError from "../../../../../components/SweetAlertError"; // Adjust the import path as needed
import 'primeicons/primeicons.css';
import { Button } from "primereact/button";
import { InputNumber } from "primereact/inputnumber";

const CreateStockOpnameModal = ({ isOpen, onHide, fetchMasterData, refreshData }) => {
    const [dataInventory, setDataInventory] = useState([]);
    const [filteredDataInventory, setFilteredDataInventory] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [globalFilter, setGlobalFilter] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const [showError, setShowError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    useEffect(() => {
        if (isOpen) {
            fetchPersediaan();
        }
    }, [isOpen]);

    useEffect(() => {
        if (globalFilter) {
            const filteredData = dataInventory.filter((item) => {
                return ["fc_stockcode", "stock.fc_namelong", "stock.fc_namepack", "fc_batch", "fd_expired", "fn_quantity"].some((field) =>
                    field.split('.').reduce((obj, key) => obj && obj[key], item)?.toString().toLowerCase().includes(globalFilter.toLowerCase())
                );
            });
            setFilteredDataInventory(filteredData);
        } else {
            setFilteredDataInventory(dataInventory);
        }
    }, [globalFilter, dataInventory]);

    const fetchPersediaan = async () => {
        setIsLoading(true);
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
                setDataInventory(responseData);
            }
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };

    const renderHeader = () => {
        return (
            <div className="table-header p-2 d-flex justify-content-between align-items-center">
                <h5>Detail Inventory Stock</h5>
                <div className="input-group" style={{ maxWidth: '300px' }}>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Keyword Search"
                        aria-label="Keyword Search"
                        aria-describedby="basic-addon2"
                        value={globalFilter}
                        onChange={(e) => setGlobalFilter(e.target.value)}
                    />
                    <div className="input-group-append">
                        <span className="input-group-text" id="basic-addon2">
                            <i className="pi pi-search"></i>
                        </span>
                    </div>
                </div>
            </div>
        );
    };

    const header = renderHeader();

    const qtyEditor = (options) => {
        return (
            <InputNumber
                value={options.value}
                onValueChange={(e) => options.editorCallback(e.value)}
                mode="decimal"
                locale="id-ID"
            />
        );
    };

    const onRowEditComplete = (e) => {
        let updatedData = [...dataInventory];
        let { newData, index } = e;

        updatedData[index] = newData;
        setDataInventory(updatedData);
        setFilteredDataInventory(updatedData);
    };

    const allowEdit = (rowData) => {
        return rowData.stock !== null;
    };

    const sendSelectedStock = async (rowData) => {
        setIsSubmitting(true);
        try {
            const token = localStorage.getItem('token');
            const axiosConfig = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            };
            const response = await axios.post(
                `${Config.api.server2}stock-opname/detail/select-stock`,
                rowData,
                axiosConfig
            );
            if (response.status === 200) {
                onHide();
                setShowSuccess(true);
                fetchMasterData();
                refreshData();
            } else {
                setErrorMessage(response.data.message || "An error occurred");
                setShowError(true);
            }
        } catch (error) {
            setErrorMessage(error.message);
            setShowError(true);
        } finally {
            setIsSubmitting(false);
        }
    };

    const actionBodyTemplate = (rowData) => {
        return (
            <Button
                type="button"
                label="Pilih"
                className="rounded pl-2 pr-2"
                severity="success"
                raised
                onClick={() => sendSelectedStock(rowData)}
            />
        );
    };

    return (
        <div className="card flex justify-content-center">
            {isLoading || isSubmitting ? (
                <SweetAlertLoading show={true} />
            ) : (
                <Dialog
                    header={header}
                    visible={isOpen && !isLoading}
                    style={{ width: '80vw', height: '80vw' }}
                    onHide={onHide}
                >
                    <DataTable
                        value={filteredDataInventory}
                        style={{ padding: '20px' }}
                        paginator
                        rows={18}
                        rowsPerPageOptions={[5, 10, 20, 30, 40, 50]}
                        globalFilterFields={['fc_stockcode', 'stock.fc_namelong', 'stock.fc_namepack', 'fc_batch', 'fd_expired', 'fn_quantity']}
                        editMode="row"
                        onRowEditComplete={onRowEditComplete}
                    >
                        <Column field="DT_RowIndex" header="No"></Column>
                        <Column field="fc_stockcode" header="Kode Barang"></Column>
                        <Column field="stock.fc_namelong" header="Nama Barang"></Column>
                        <Column field="stock.fc_namepack" header="Satuan"></Column>
                        <Column field="fc_batch" header="Batch"></Column>
                        <Column field="fd_expired" header="Exp. Date"></Column>
                        <Column field="fn_quantity" editor={qtyEditor} header="Qty"></Column>
                        <Column field="status" body={actionBodyTemplate} header="Action"></Column>
                        <Column rowEditor={allowEdit} headerStyle={{ width: '10%', minWidth: '8rem' }} bodyStyle={{ textAlign: 'center' }}></Column>
                    </DataTable>
                </Dialog>
            )}
            <SweetAlertSuccess
                show={showSuccess}
                message="Stock selected successfully!"
                onConfirm={() => {
                    setShowSuccess(false);
                    onHide();
                }}
            />
            <SweetAlertError
                show={showError}
                message={errorMessage}
                onConfirm={() => setShowError(false)}
            />
        </div>
    );
};

export default CreateStockOpnameModal;
