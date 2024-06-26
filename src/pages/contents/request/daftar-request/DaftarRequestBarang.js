import React, { useEffect, useState } from "react";
import axios from "axios";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { format } from 'date-fns';
import { id } from 'date-fns/locale';
import { Link } from "react-router-dom";

const DaftarRequestBarang = () => {
    const [products, setProducts] = useState([]);
    const token = localStorage.getItem('token');
    const axiosConfig = {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    }
    useEffect(() => {
        axios.get(
            'http://127.0.0.1:8002/api/datatable-request-somaster',
            axiosConfig
            ).then(response => {
                const data = response.data.data.map((item, index) => ({
                    id: item.id,  // Add the ID here
                    no: index + 1,
                    code: item.fc_sono,
                    date: format(new Date(item.fd_sodate_user), 'dd MMMM yyyy', { locale: id }),
                    expired: format(new Date(item.fd_soexpired), 'dd MMMM yyyy', { locale: id }),
                    type: item.fc_sotype === 'WHOLESALER' ? 'GROSIR' : item.fc_sotype,
                    operator: item.fc_salescode,
                    created_by: item.created_by,
                    item: item.fn_sodetail,
                    total: item.requestsodetail.reduce((sum, detail) => sum + detail.fm_value, 0)
                }));
                
                setProducts(data);
            })
            .catch(error => {
                console.error("There was an error fetching the data!", error);
            });
    }, []);

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-xl-12 col-lg-12">
                    <div className="card shadow mb-4">
                        <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                            <h6 className="m-0 font-weight-bold text-primary">Daftar Request Barang</h6>
                            <div className="dropdown no-arrow">
                                <a
                                    className="dropdown-toggle"
                                    href="#"
                                    role="button"
                                    id="dropdownMenuLink"
                                    data-toggle="dropdown"
                                    aria-haspopup="true"
                                    aria-expanded="false"
                                >
                                    <i className="fas fa-ellipsis-v fa-sm fa-fw text-gray-400"></i>
                                </a>
                                <div className="dropdown-menu dropdown-menu-right shadow animated--fade-in" aria-labelledby="dropdownMenuLink">
                                    <div className="dropdown-header">Dropdown Header:</div>
                                    <a className="dropdown-item" href="#">Action</a>
                                    <a className="dropdown-item" href="#">Another action</a>
                                    <div className="dropdown-divider"></div>
                                    <a className="dropdown-item" href="#">Something else here</a>
                                </div>
                            </div>
                        </div>
                        <div className="card-body">
                            <DataTable 
                            value={products} columnResizeMode="expand" resizableColumns showGridlines tableStyle={{ minWidth: '50rem' }}>
                                <Column field="no" align={"center"} header="No"></Column>
                                <Column field="code" align={"center"} header="No Pesanan"></Column>
                                <Column field="date" align={"center"} header="Tanggal"></Column>
                                <Column field="expired" align={"center"} header="Expired"></Column>
                                <Column field="type" align={"center"} header="Tipe"></Column>
                                <Column field="created_by" align={"center"} header="Operator"></Column>
                                <Column field="item" align={"center"} header="Item"></Column>
                                <Column field="total" align={"center"} header="Total" body={(rowData) => (
                                    <span>{rowData.total.toLocaleString('id-ID', { style: 'currency', currency: 'IDR' })}</span>
                                )}></Column>
                              <Column header="Action" body={(rowData) => {
                                // console.log(rowData.code)
                                const encodedSono = btoa(rowData.code);
                                return (
                                    <Link to={`/request-barang/detail/${encodedSono}`}>
                                        <Button icon="pi pi-info-circle pr-2" label="Detail" className="rounded p-button-info pr-2 pl-2" />
                                    </Link>
                                );
                            }}></Column>
                            </DataTable>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DaftarRequestBarang;
