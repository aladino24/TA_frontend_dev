import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import Config from "../../../../config";
import ModalDistributor from "./ModalDistributor";
import $, { data } from "jquery";

const DashboardMasterDistributor = () => {
    const tableRef = useRef(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);
    const [message, setMessage] = useState('');
    const [deleteConfirmation, setDeleteConfirmation] = useState({
        show: false,
        id: null,
        userid: null,
      });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = localStorage.getItem('token');
                const axiosConfig = {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                };
                const response = await axios.get(
                    Config.api.server3 + "master/datatables-distributor",
                    axiosConfig
                );

                const responseData = response.data.data;
                if ($.fn.DataTable.isDataTable("#dataTable")) {
                    // If it is initialized, destroy it before reinitializing
                    const existingTable = $(tableRef.current).DataTable();
                    existingTable.destroy();
                  }


                const formattedData = responseData ? responseData.map((distributor, index) => ({
                    ...distributor,
                    no: index + 1,
                  })) : [];

                  const table = $(tableRef.current).DataTable({
                    responsive: true,
                    processing: true,
                    serverSide: false, // Ubah menjadi true jika ingin implementasi server-side processing
                    data: formattedData,
                    columnDefs: [
                      {
                        width: "300px",
                      },
                    ],
                    columns: [
                        {data: "no"},
                        {data: "fc_divisioncode"},
                        {data: "branch.fv_description"},
                        {data: "fc_distributorcode"},
                        {data: "fc_distributorlegalstatus"},
                        {data: "fc_distributorname1"},
                        {data: "fc_distributorphone1"},
                        {data: "fc_distributoremail1"},
                        {data: "fc_distributornationality"},
                        {data: "fc_distributorforex"},
                        {data: "fc_distributortypebusiness"},
                        {data: "fc_branchtype"},
                        {data: "fl_distributorreseller"},
                        {data: "fc_distributortaxcode"},
                        {data: "fc_distributorNPWP"},
                        {data: "fc_distributornpwp_name"},
                        {data: "fc_distributor_npwpaddress1"},
                        {data: null},
                        {data: null},
                        {data: null},
                        {data: null},
                        {data: null},
                        {data: null},
                        {data: null},
                        {data: null},
                        {data: null},
                        {data: null},
                    ],
                    rowCallback: function(row, data) {
                    }
                  },);
            } catch (error) {
                setError(error);
            }
        }

        fetchData();
        return () => {
            // Hancurkan DataTable saat komponen dilepas
            const existingTable = $(tableRef.current).DataTable();
            existingTable.destroy();
          };
    }, []);
    return (
        <>
            <div className="container-fluid">
                <div className="d-sm-flex align-items-center justify-content-between mb-4">
                    <h1 className="h3 mb-0 text-gray-900">Master Distributor</h1>
                    <div>
                    <button className="ml-2 btn btn-sm btn-success shadow-sm" data-toggle="modal" data-target="#addModalDistributor"><i className="fa fa-plus"></i> Tambahkan Distributor</button>
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-12">
                    <div className="card shadow mb-4">
                    <div className="card-body">
                        <div className="table-responsive">
                        <table
                            ref={tableRef}
                            className="table table-bordered"
                            id="dataTable"
                            width="100%"
                            cellSpacing="0"
                        >
                            <thead>
                            <tr>
                                <th>No</th>
                                <th>Division</th>
                                <th>Cabang</th>
                                <th>Kode Distributor</th>
                                <th>Legal Status Distributor</th>
                                <th>Nama Distributor</th>
                                <th>No. HP Distributor</th>
                                <th>Email Distributor</th>
                                <th>Kebangsaan Distributor</th>
                                <th>Distributor Forex</th>
                                <th>Tipe Bisnis Distributor</th>
                                <th>Tipe Cabang Distributor</th>
                                <th>Distributor Reseller</th>
                                <th>Kode Pajak Distributor</th>
                                <th>NPWP Distributor</th>
                                <th>Nama NPWP Distributor</th>
                                <th>Alamat NPWP Distributor</th>
                                <th>Hutang Distributor</th>
                                <th>Masa Hutang Distributor</th>
                                <th>Kunci Distributor</th>
                                <th>Nama PIC Distributor</th>
                                <th>No.HP PIC Distributor</th>
                                <th>Jabatan PIC Distributor</th>
                                <th>Tanggal Join Distributor</th>
                                <th>Distributor Expired</th>
                                <th>Bank Distributor</th>
                                <th>VirtualACC Distributor</th>
                                <th>Norek Distributor</th>
                                <th>Deskripsi</th>
                                <th>Action</th>
                            </tr>
                            </thead>
                            <tfoot>
                            <tr>
                            <th>No</th>
                                <th>Division</th>
                                <th>Cabang</th>
                                <th>Kode Distributor</th>
                                <th>Legal Status Distributor</th>
                                <th>Nama Distributor</th>
                                <th>No. HP Distributor</th>
                                <th>Email Distributor</th>
                                <th>Kebangsaan Distributor</th>
                                <th>Distributor Forex</th>
                                <th>Tipe Bisnis Distributor</th>
                                <th>Tipe Cabang Distributor</th>
                                <th>Distributor Reseller</th>
                                <th>Kode Pajak Distributor</th>
                                <th>NPWP Distributor</th>
                                <th>Nama NPWP Distributor</th>
                                <th>Alamat NPWP Distributor</th>
                                <th>Hutang Distributor</th>
                                <th>Masa Hutang Distributor</th>
                                <th>Kunci Distributor</th>
                                <th>Nama PIC Distributor</th>
                                <th>No.HP PIC Distributor</th>
                                <th>Jabatan PIC Distributor</th>
                                <th>Tanggal Join Distributor</th>
                                <th>Distributor Expired</th>
                                <th>Bank Distributor</th>
                                <th>VirtualACC Distributor</th>
                                <th>Norek Distributor</th>
                                <th>Deskripsi</th>
                                <th>Action</th>
                            </tr>
                            </tfoot>
                        </table>
                        </div>
                    </div>
                    </div>
                    </div>
                </div>
            </div>

            <ModalDistributor id="addModalDistributor" />
        </>
    );
}

export default DashboardMasterDistributor;