import React, { useEffect, useRef } from "react";
import Config from "../../../../config";
import axios from "axios";
import $ from "jquery";
import ModalBankAcc from "./ModalBankAcc";

const DashboardMasterBankAcc = () => {
    const tableRef = useRef(null);
    useEffect(() => {
        const fetchData = async () => {
            try {
                  const token = localStorage.getItem("token");
                  const axiosConfig = {
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${token}`,
                        },
                    };

                const response = await axios.get(
                    Config.api.server2 + "master/bank-acc",
                    axiosConfig
                );
                const responseData = response.data.data;

                console.log(responseData);

                if($.fn.DataTable.isDataTable('#dataTable')){
                    const existingTable = $(tableRef.current).DataTable();
                    existingTable.destroy();
                }

                const formattedData = responseData.map((data, index) => ({
                    ...data,
                    no: index + 1,
                  }));

                // console.log(response.data);
                const table = $(tableRef.current).DataTable({
                    responsive: true,
                    processing: true,
                    serverSide: false,
                    data: formattedData,
                    columnDefs: [
                        {
                            targets: 11, 
                            width: "100px", 
                        },
                    ],
                    columns: [
                        {
                            data: "no"
                        },
                        {
                            data: "fc_divisioncode"
                        },
                        {
                            data: "branch.fv_description"
                        },
                        {
                            data: "fv_bankname"
                        },
                        {
                            data: "fc_banktype"
                        },
                        {
                            data: "fc_bankcode"
                        },
                        {
                            data: "fv_bankbranch"
                        },
                        {
                            data: "fv_bankusername"
                        },
                        {
                            data: "fv_bankhold",
                            render: function(data, type, row) {
                                if(data === 'T'){
                                    return '<span style="color: white; background-color: red; padding: 2px 2px; border-radius: 3px;">Yes</span>';
                                  }else{
                                    return '<span style="color: white; background-color: green; padding: 2px 2px; border-radius: 3px;">No</span>';
                                  }
                            }
                        },
                        {
                            data: "fv_bankaddress1"
                        },
                        {
                            data: "fv_bankaddress2"
                        },
                        {
                            data: null
                        }
                    ],
                    rowCallback: function(row, data) {
                        const actionBtns = `
                        <div class="d-flex">
                            <button class="btn btn-sm btn-warning" id="editBtn">Edit</button>
                            <button class="btn btn-sm btn-danger ml-2" id="deleteBtn">Delete</button>
                        </div>
                        `;
                        $("td:eq(11)", row).html(actionBtns);

                        $("#deleteBtn", row).on("click", () => {});
                    }
                });
                
                
            } catch (error) {
                
            }
        };

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
                    <h1 className="h3 mb-0 text-gray-900">Master Bank Acc</h1>
                    <div>
                    <button className="ml-2 btn btn-sm btn-success shadow-sm" data-toggle="modal" data-target="#addModalBankAcc"><i className="fa fa-plus"></i> Tambahkan Bank Account</button>
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-12">
                    <div className="card shadow mb-4">
                    <div className="card-body">
                        <div className="table-responsive">
                        <table
                            className="table table-bordered"
                            ref={tableRef}
                            id="dataTable"
                            width="100%"
                            cellSpacing="0"
                        >
                            <thead>
                            <tr>
                                <th>No</th>
                                <th>Division</th>
                                <th>Cabang</th>
                                <th>Nama Bank</th>
                                <th>Tipe Bank</th>
                                <th>No Rekening</th>
                                <th>Cabang Bank</th>
                                <th>Username Bank</th>
                                <th>Bank Terkunci</th>
                                <th>Alamat Bank 1</th>
                                <th>Alamat Bank 2</th>
                                <th>Action</th>
                            </tr>
                            </thead>
                            <tfoot>
                            <tr>
                                 <th>No</th>
                                <th>Division</th>
                                <th>Cabang</th>
                                <th>Nama Bank</th>
                                <th>Tipe Bank</th>
                                <th>No Rekening</th>
                                <th>Cabang Bank</th>
                                <th>Username Bank</th>
                                <th>Bank Terkunci</th>
                                <th>Alamat Bank 1</th>
                                <th>Alamat Bank 2</th>
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

            <ModalBankAcc id="addModalBankAcc" />
        </>
    );
}

export default DashboardMasterBankAcc;