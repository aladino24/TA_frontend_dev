import axios from "axios";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import React, { useEffect, useState } from "react";
import QRCode from "qrcode.react";
import jsPDF from "jspdf";
import Config from "../../../../config";
import { Button } from "primereact/button";

const ModalPersediaanBarang = (props) => {
    const { showModal, setShowModal, selectedRowData } = props;
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            const token = localStorage.getItem('token');
            const axiosConfig = {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            }
            try {
                const response = await axios.get(Config.api.server2 + "persediaan-barang/datatables_detail_inventory/" + btoa(selectedRowData.stock.fc_stockcode), axiosConfig);
                const responseData = response.data.data;
                console.log(responseData);
                setData(responseData);
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false);
            }
        };

        if (selectedRowData && selectedRowData.stock && selectedRowData.stock.fc_stockcode) {
            setLoading(true);
            fetchData();
        }
    }, [selectedRowData]);

    const generatePDF = (rowData) => {
        const doc = new jsPDF();
        doc.text("QR Codes", 10, 10);
        
        for (let i = 0; i < rowData.fn_quantity; i++) {
            const qrCodeCanvas = document.getElementById(`${rowData.fc_barcode}-${i}`);
            const x = (i % 5) * 40 + 10; 
            const y = Math.floor(i / 5) * 50 + 20; 

            if (qrCodeCanvas) {
                doc.addImage(qrCodeCanvas.toDataURL("image/png"), "PNG", x, y, 30, 30);
            }
        }

        doc.save("qrcodes.pdf");
    };

    const actionBodyTemplate = (rowData) => {
        const qrCodes = [];
        for (let i = 0; i < rowData.fn_quantity; i++) {
            qrCodes.push(
                <div key={i} style={{ display: 'inline-block', margin: '5px' }}>
                    <QRCode id={`${rowData.fc_barcode}-${i}`} value={rowData.fc_barcode} size={128} />
                </div>
            );
        }
        return (
            <div>
                <Button
                    icon="fa fa-qrcode"
                    className="rounded pl-2 pr-2"
                    label=" Generate QR"
                    onClick={() => generatePDF(rowData)}
                />
                <div style={{ display: 'none' }}>
                    {qrCodes}
                </div>
            </div>
        );
    };

    return (
        <div
            className={`modal fade ${showModal ? 'show' : ''}`}
            id={props.id}
            tabIndex="-1"
            role="dialog"
            aria-labelledby="editModalLabel"
            style={{ display: showModal ? 'block' : 'none' }}
        >
            <div
                className="modal-dialog modal-xl"
                role="document"
                style={{ maxWidth: "90%", maxHeight: "90%" }}
            >
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">
                            {selectedRowData.stock.fc_namelong}
                        </h5>
                        <button
                            type="button"
                            className="close"
                            data-dismiss="modal"
                            aria-label="Close"
                            onClick={() => setShowModal(false)}
                        >
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        {loading ? (
                            <div>Loading...</div>
                        ) : (
                            <div className="card-body">
                                <DataTable value={data} paginator rows={20} showGridlines sortMode='multiple' tableStyle={{ border: '1px solid black' }}>
                                    <Column field="DT_RowIndex" header="No" align={'center'} />
                                    <Column field="stock.fc_stockcode" header="Kode Barang" align={'center'} />
                                    <Column field="fd_expired" header="Expired Date" align={'center'} />
                                    <Column field="fc_batch" header="Batch" align={'center'} />
                                    <Column field="fn_quantity" header="Qty" align={'center'} />
                                    <Column body={actionBodyTemplate} header="Action" align={'center'} />
                                </DataTable>
                            </div>
                        )}
                    </div>
                    <div className="modal-footer">
                        <button
                            type="button"
                            className="btn btn-secondary"
                            data-dismiss="modal"
                            onClick={() => setShowModal(false)}
                        >
                            Close
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ModalPersediaanBarang;
