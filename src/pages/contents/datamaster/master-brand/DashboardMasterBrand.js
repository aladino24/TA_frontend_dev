import axios from "axios";
import React, { useEffect, useRef } from "react";
import Config from "../../../../config";
import $ from "jquery";
import ModalBrand from "./ModalBrand";

const DashboardMasterBrand = () => {
    const tableRef = useRef(null);
    
    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = localStorage.getItem('token');
                const axiosConfig = {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                }

                const response = await axios.get(Config.api.server2 + "master/brand/datatables", axiosConfig);
                const responseData = response.data.data;

                if($.fn.DataTable.isDataTable('#dataTable')){
                    const existingTable = $(tableRef.current).DataTable();
                    existingTable.destroy();
                }

                const formattedData = responseData.map((user, index) => ({
                    ...user,
                    no: index + 1,
                  }));

                const table = $(tableRef.current).DataTable({
                    responsive: true,
                    processing: true,
                    serverSide: false,
                    data: formattedData,
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
                            data: "fc_brand"
                        },
                        {
                            data: "fc_group"
                        },
                        {
                            data: "fc_subgroup"
                        },
                        {
                            data: null
                        }
                    ],
                    rowCallback: function(row, data) {
                        const actionBtns = `
                        <button class="btn btn-sm btn-primary" id="editBtn">Edit</button>
                        `;
                        $("td:eq(6)", row).html(actionBtns);
                    }
                });

                if(response.data.success){
                    // console.log(responseData);
                }else{
                    throw new Error(response.data.error);
                }

            } catch (error) {
                
            }
        }

        fetchData();
        return () => {
            // Hancurkan DataTable saat komponen dilepas
            const existingTable = $(tableRef.current).DataTable();
            existingTable.destroy();
          };
    },[]);
    return (
        <>
            <div className="container-fluid">
                <div className="d-sm-flex align-items-center justify-content-between mb-4">
                    <h1 className="h3 mb-0 text-gray-900">Master Brand</h1>
                    <div>
                    <button className="ml-2 btn btn-sm btn-success shadow-sm" data-toggle="modal" data-target="#addModalBrand"><i className="fa fa-plus"></i> Tambahkan Brand</button>
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
                                <th>Brand</th>
                                <th>Group</th>
                                <th>Sub Group</th>
                                <th>Action</th>
                            </tr>
                            </thead>
                            <tfoot>
                            <tr>
                                 <th>No</th>
                                <th>Division</th>
                                <th>Cabang</th>
                                <th>Brand</th>
                                <th>Group</th>
                                <th>Sub Group</th>
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
            <ModalBrand id="addModalBrand" />
        </>
    );
}

export default DashboardMasterBrand;