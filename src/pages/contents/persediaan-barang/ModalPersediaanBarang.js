import axios from "axios";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import React, { useEffect, useState } from "react";
import Config from "../../../config";

const ModalPersediaanBarang = (props) => {
    const { showModal, setShowModal, selectedRowData } = props;
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true); // State for loading indicator

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
                setLoading(false); // Set loading to false after fetching data
            }
        };

        if (selectedRowData && selectedRowData.stock && selectedRowData.stock.fc_stockcode) {
            setLoading(true); // Set loading to true when component re-renders
            fetchData();
        }
    }, [selectedRowData]);

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
                        {loading ? ( // Render loading indicator if loading is true
                            <div>Loading...</div>
                        ) : (
                            <div className="card-body">
                                <DataTable value={data} paginator rows={20} showGridlines sortMode='multiple' tableStyle={{ border: '1px solid black' }}>
                                    <Column field="DT_RowIndex" header="No" align={'center'} />
                                    <Column field="stock.fc_stockcode" header="Kode Barang" align={'center'} />
                                    <Column field="fd_expired" header="Expired Date" align={'center'} />
                                    <Column field="fc_batch" header="Batch" align={'center'} />
                                    <Column field="fn_quantity" header="Qty" align={'center'} />
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
