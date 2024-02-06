import React, { useEffect, useRef, useState } from "react";
import Config from "../../../../config";
import axios from "axios";
import $ from "jquery";
import Select from 'react-select'
import ModalBankAcc from "./ModalBankAcc";

const DashboardMasterBankAcc = () => {
    const tableRef = useRef(null);
    const [inputData, setInputData] = useState({
        fc_divisioncode: "",
        fc_branch: "",
        fv_bankname: "",
        fc_bankcode: "",
        fc_banktype: "",
        fv_bankbranch: "",
        fv_bankusername: "",
        fv_bankaddress1: "",
        fv_bankaddress2: "",
        fl_bankhold: ""
    });
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

                // console.log(responseData);

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

                $(tableRef.current).on("click", "#editBtn", function() {
                    const rowData = table.row($(this).parents("tr")).data();
                    detailBankAcc(rowData);
                    window.$("#editModalBankAcc").modal("show");
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

    const detailBankAcc = (data) => {
        if(data){
            setInputData({
                fc_divisioncode: data.fc_divisioncode ? data.fc_divisioncode : "",
                fc_branch: data.fc_branch ? data.fc_branch : "",
                fv_bankname: data.fv_bankname ? data.fv_bankname : "",
                fc_banktype: data.fc_banktype ? data.fc_banktype : "",
                fc_bankcode: data.fc_bankcode ? data.fc_bankcode : "",
                fv_bankbranch: data.fv_bankbranch ? data.fv_bankbranch : "",
                fv_bankusername: data.fv_bankusername ? data.fv_bankusername : "",
                fv_bankaddress1: data.fv_bankaddress1 ? data.fv_bankaddress1 : "",
                fv_bankaddress2: data.fv_bankaddress2 ? data.fv_bankaddress2 : "",
                fl_bankhold: data.fl_bankhold ? data.fl_bankhold : ""
            });
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(inputData);
    }
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


            <div
            className="modal fade"
            id="editModalBankAcc"
            tabIndex="-1"
            role="dialog"
            aria-labelledby="addModalBrandLabel">
            <div className="modal-dialog modal-lg" role="document">
                <div className="modal-content">
                 <div className="modal-header">
                        <h5 className="modal-title" id="editModalLabel">
                            Tambah Master Brand
                        </h5>
                        <button
                            type="button"
                            className="close"
                            data-dismiss="modal"
                            aria-label="Close"
                        >
                            <span aria-hidden="true">&times;</span>
                        </button>
                  </div>

                <form onSubmit={handleSubmit}>
                  <div className="modal-body">
                        <div className="form-group">
                                <label htmlFor="fc_branch">Cabang</label>
                                <input 
                                    type="text" 
                                    className="form-control" 
                                    id="fc_divisioncode" 
                                    value={inputData.fc_divisioncode} 
                                    onChange={
                                        (e) => setInputData({
                                            ...inputData,
                                            fc_divisioncode: e.target.value
                                        })
                                    }
                                    hidden 
                                />
                                <input 
                                    type="text" 
                                    className="form-control" 
                                    id="fc_branch" 
                                    value={inputData.fc_branch} 
                                    onChange={
                                        (e) => setInputData({
                                            ...inputData,
                                            fc_branch: e.target.value
                                        })
                                    }
                                    readOnly
                                />
                               
                        </div>
                       <div className="row">
                        <div className="col-md-5">
                            <div className="form-group">
                                    <label htmlFor="fc_brand">Nama Bank</label>
                                    {/* <input 
                                        type="text" 
                                        className="form-control" 
                                        id="fv_bankname"
                                        name="fv_bankname"  
                                        onChange={
                                            (e) => setInputData({
                                                ...inputData,
                                                fv_bankname: e.target.value
                                            })
                                        }
                                    /> */}
                                     <Select 
                                        // options={banknameOptions} 
                                        name="fv_bankname"
                                        onChange={
                                            console.log('onChange')
                                        }
                                        required
                                    />
                            </div>
                         </div>
                         <div className="col-md-3">
                            <div className="form-group">
                                    <label htmlFor="fc_group">Tipe Bank</label>
                                    {/* <input 
                                        type="text" 
                                        className="form-control" 
                                        id="fc_group" 
                                        name="fc_group" 
                                        onChange={
                                            console.log('onChange')
                                        }
                                    /> */}
                                    <Select 
                                        // options={banktypeOptions} 
                                        name="fc_banktype"
                                        onChange={
                                            console.log('onChange')
                                        }
                                        required
                                    />
                            </div>
                         </div>
                         <div className="col-md-4">
                           <div className="form-group">
                                    <label htmlFor="fc_brand">No Rekening</label>
                                    <input 
                                        type="text" 
                                        className="form-control" 
                                        id="fc_bankcode"
                                        name="fc_bankcode"  
                                        value={inputData.fc_bankcode}
                                        onChange={
                                            (e) => setInputData({
                                                ...inputData,
                                                fc_bankcode: e.target.value
                                            })
                                        }
                                    />
                            </div>
                         </div>
                        </div>
                        <div className="row">
                         <div className="col-md-5">
                            <div className="form-group">
                                    <label htmlFor="fc_group">Nama Pemilik Rekening </label>
                                    <input 
                                        type="text" 
                                        className="form-control" 
                                        id="fv_bankusername" 
                                        name="fv_bankusername" 
                                        onChange={
                                            console.log('onChange')
                                        }
                                    />
                            </div>
                         </div>
                         <div className="col-md-3">
                            <div className="form-group">
                                    <label htmlFor="fc_group">Bank Terkunci</label>
                                    <Select 
                                        // options={bankholdOptions} 
                                        name="fl_bankhold"
                                        id="fl_bankhold"
                                        onChange={
                                            console.log('onChange')
                                        }
                                        required
                                    />
                            </div>
                         </div>
                         <div className="col-md-4">
                            <div className="form-group">
                                        <label htmlFor="fc_brand">Cabang Bank</label>
                                        <input 
                                         type="text" 
                                         className="form-control" 
                                         id="fv_bankbranch"
                                         name="fv_bankbranch"  
                                         onChange={
                                            console.log('onChange')
                                         }
                                        />
                             </div>
                         </div>
                        </div>
                        <div className="row">
                            <div className="col-md-12">
                                <label htmlFor="fc_group">Alamat Bank 1</label>
                                <textarea
                                    className="form-control"
                                    id="fv_bankaddress1"
                                    name="fv_bankaddress1"
                                    onChange={
                                        console.log('onChange')
                                    }
                                />
                            </div>
                        </div>
                        <div className="row mt-3">
                            <div className="col-md-12">
                                <label htmlFor="fc_group">Alamat Bank 2</label>
                                <textarea
                                    className="form-control"
                                    id="fv_bankaddress2"
                                    name="fv_bankaddress2"
                                    onChange={
                                        console.log('onChange')
                                    }
                                />
                            </div>
                        </div>
                    </div>
                    <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-dismiss="modal">
                                Tutup
                            </button>
                            <button type="submit" className="btn btn-primary" id="saveChangesBtn">
                                Simpan
                            </button>
                        </div>
                        </form>
                </div>
                
            </div>
            </div>

            <ModalBankAcc id="addModalBankAcc" />
        </>
    );
}

export default DashboardMasterBankAcc;