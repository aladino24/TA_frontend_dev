import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import Config from "../../../../config";
// import RadioButtons from "../../../../components/RadioButton";
import Select from 'react-select'
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
    const [inputData, setInputData]  = useState(
        {
            fc_divisioncode: '',
            fc_branch: '',
            fc_distributorcode: '',
            fc_distributorname1: '',
            fc_distributorlegalstatus: '',
            fc_distributorphone1: '',
            fc_distributoremail1: '',
            fc_distributornationality: '',
            fc_distributorforex: '',
            fc_branchtype: '',
            fc_distributortypebusiness: '',
            fl_distributorreseller: '',
            fc_distributortaxcode: '',
            fc_distributorNPWP: '',
            fc_distributor_npwpaddress1: '',
            fm_distributorAR: '',
            fn_distributorAgingAR: '',
            fn_distributorlockTrans: '',
            fc_distributorpicname: '',
            fc_distributorpicphone: '',
            fc_distributorpicpos: '',
            fd_distributorjoindate: '',
            fd_distributorexpired: '',
            fc_distributorbank1: '',
            fc_distributorvirtualac: '',
            fc_distributornorek1: '',
            fv_distributordescription: ''
        }
    );
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
                        {data: "fm_distributorAR"},
                        {data: "fn_distributorAgingAR"},
                        {data: "fn_distributorlockTrans"},
                        {data: "fc_distributorpicname"},
                        {data: "fc_distributorpicphone"},   
                        {data: "fc_distributorpicpos"},
                        {data: "fd_distributorjoindate"},
                        {data: "fd_distributorexpired"},
                        {data: "fc_distributorbank1"},
                        {data: "fc_distributorvirtualac"},
                        {data: "fc_distributornorek1"},
                        {data: "fv_distributordescription"},
                        {data: null}
                    ],
                    rowCallback: function(row, data) {
                        const actionBtns = `
                        <button class="btn btn-sm btn-warning" id="holdBtn">Hold</button>
                        <button class="btn btn-sm btn-primary" id="editBtn">Edit</button>
                        `;
                        $("td:eq(29)", row).html(actionBtns);
                    }
                  },);

                  $(tableRef.current).on("click", "#editBtn", function () {
                    const rowData = table.row($(this).closest("tr")).data();
                    // console.log(rowData);
                    detailEditDistributor(rowData);
                    //modal show
                    window.$('#editModalDistributor').modal('show');
                  });
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

    async function detailEditDistributor(data) {
        const token = localStorage.getItem('token');
      console.log(data)
        if (data) {
            setInputData({
                fc_divisioncode: data.fc_divisioncode || '',
                fc_branch: (data.branch && data.branch.fv_description) || '',
                fc_distributorcode: data.fc_distributorcode || '',
                fc_distributorname1: data.fc_distributorname1 || '',
                fc_distributorlegalstatus: data.fc_distributorlegalstatus || '',
                fc_distributorphone1: data.fc_distributorphone1 || '',
                fc_distributoremail1: data. fc_distributoremail1 || '',
                fc_distributornationality: data.fc_distributornationality || '',
                fc_distributorforex: data.fc_distributorforex || '',
                fc_branchtype: data.fc_branchtype || '',
                fc_distributortypebusiness: data.fc_distributortypebusiness || '',
                fl_distributorreseller: data.fl_distributorreseller || '',
                fc_distributortaxcode: data.fc_distributortaxcode || '',
                fc_distributorNPWP: data.fc_distributorNPWP || '',
                fc_distributor_npwpaddress1: data.fc_distributor_npwpaddress1 || '',
                fm_distributorAR: data.fm_distributorAR || '',
                fn_distributorAgingAR: data.fn_distributorAgingAR || '',
                fn_distributorlockTrans: data.fn_distributorlockTrans || '',
                fc_distributorpicname: data.fc_distributorpicname || '',
                fc_distributorpicphone: data.fc_distributorpicphone || '',
                fc_distributorpicpos: data.fc_distributorpicpos || '',
                fd_distributorjoindate: data.fd_distributorjoindate || '',
                fd_distributorexpired: data.fd_distributorexpired || '',
                fc_distributorbank1: data.fc_distributorbank1 || '',
                fc_distributorvirtualac: data.fc_distributorvirtualac || '',
                fc_distributornorek1: data.fc_distributornorek1 || '',
                fv_distributordescription: data.fv_distributordescription || ''
            });
    
            try {
               
    
                const [
                   
                ] = await Promise.all([
                   
                ]);
    
               
            } catch (error) {
                console.error('Error:', error);
                // Handle errors here
            }
        }
    }
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

            <div
                className="modal fade"
                id="editModalDistributor"
                tabIndex="-1"
                role="dialog"
                aria-labelledby="addModalBrandLabel">
                <div className="modal-dialog modal-xl" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="editModalLabel">
                                Edit Distributor
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

                        <form onSubmit="">
                            <div className="modal-body">
                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label htmlFor="fc_branch">Cabang</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="fc_branch"
                                                name="fc_branch"
                                                defaultValue={inputData.fc_branch}
                                                readOnly
                                            />
                                            <input
                                                type="hidden"   
                                                name="fc_divisioncode"
                                                id="fc_divisioncode"
                                                defaultValue={inputData.fc_divisioncode}
                                            />
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label htmlFor="fc_distributorcode">Kode Distributor</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="fc_distributorcode"
                                                name="fc_distributorcode"
                                                value={inputData.fc_distributorcode}
                                                onChange={
                                                    (e) => setInputData({
                                                        ...inputData,
                                                        fc_distributorcode: e.target.value
                                                    })
                                                }
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label htmlFor="fc_distributorname">Nama Distributor</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="fc_distributorname"
                                                name="fc_distributorname"
                                                value={inputData.fc_distributorname1}
                                                onChange={(e) => setInputData({
                                                        ...inputData,
                                                        fc_distributorname1: e.target.value
                                                    })}
                                            />
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label htmlFor="fc_branchtype">Tipe Cabang Distributor</label>
                                            <Select 
                                                // options={tipeCabangOptions}
                                                name="fc_branchtype"
                                                id="fc_branchtype"
                                                // onChange={handleTypeBranchChange}
                                                required
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-4">
                                        <div className="form-group">
                                            <label htmlFor="fc_distributorpicname">Nama PIC Distributor</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="fc_distributorpicname"
                                                name="fc_distributorpicname"
                                                // onChange={
                                                //     (e) => setInputData({
                                                //         ...inputData,
                                                //         fc_distributorpicname: e.target.value
                                                //     })
                                                // }
                                            />
                                        </div>
                                    </div>
                                    <div className="col-md-4">
                                        <div className="form-group">
                                            <label htmlFor="fc_distributorpicphone">No.HP PIC Distributor</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="fc_distributorpicphone"
                                                name="fc_distributorpicphone"
                                                // onChange={
                                                //     (e) => setInputData({
                                                //         ...inputData,
                                                //         fc_distributorpicphone: e.target.value
                                                //     })
                                                // }
                                            />
                                        </div>
                                    </div>
                                    <div className="col-md-4">
                                        <div className="form-group">
                                            <label htmlFor="fc_distributorpicpos">Jabatan PIC Distributor</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="fc_distributorpicpos"
                                                name="fc_distributorpicpos"
                                                // onChange={
                                                //     (e) => setInputData({
                                                //         ...inputData,
                                                //         fc_distributorpicpos: e.target.value
                                                //     })
                                                // }
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-3">
                                        <div className="form-group">
                                            <label htmlFor="fc_distributorlegalstatus">Legal Status Distributor</label>
                                             <Select 
                                                // options={legalStatusOptions} 
                                                name="fc_distributorlegalstatus"
                                                id="fc_distributorlegalstatus"
                                                // onChange={handleLegalStatusChange}
                                                required
                                            />
                                        </div>
                                    </div>
                                    <div className="col-md-3">
                                        <div className="form-group">
                                            <label htmlFor="fc_distributornationality">Kebangsaan Distributor</label>
                                            <Select
                                            //  options={nationalityOptions}
                                                name="fc_distributornationality"
                                                id="fc_distributornationality"
                                                // onChange={
                                                //     handleNationalityChange
                                                // }
                                                required
                                            />
                                        </div>
                                    </div>
                                    <div className="col-md-3">
                                        <div className="form-group">
                                            <label htmlFor="fc_distributorforex">Distributor Forex</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="fc_distributorforex"
                                                name="fc_distributorforex"
                                                // readOnly
                                                // onChange={
                                                //     (e) => setInputData({
                                                //         ...inputData,
                                                //         fc_distributorforex: e.target.value
                                                //     })
                                                // }
                                                // value={inputData.fc_distributorforex}
                                            />
                                        </div>
                                    </div>
                                    <div className="col-md-3">
                                        <div className="form-group">
                                            <label htmlFor="fc_distributortypebusiness">Tipe Bisnis Distributor</label>
                                            <Select
                                                // options={tipeBisnisOptions}
                                                name="fc_distributortypebusiness"
                                                id="fc_distributortypebusiness"
                                                // onChange={
                                                //     handleTypeBusinessChange
                                                // }
                                                required
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-3">
                                            <div className="form-group">
                                                <label htmlFor="fd_distributorjoindate">Tanggal Join Distributor</label>
                                                <input
                                                    type="date"
                                                    className="form-control"
                                                    id="fd_distributorjoindate"
                                                    name="fd_distributorjoindate"
                                                    // onChange={
                                                    //     (e) => setInputData({
                                                    //         ...inputData,
                                                    //         fd_distributorjoindate: e.target.value
                                                    //     })
                                                    // }
                                                />
                                            </div>
                                    </div>
                                    <div className="col-md-3">
                                            <div className="form-group">
                                                <label htmlFor="fd_distributorexpired">Distributor Expired</label>
                                                <input
                                                    type="date"
                                                    className="form-control"
                                                    id="fd_distributorexpired"
                                                    name="fd_distributorexpired"
                                                    // onChange={
                                                    //     (e) => setInputData({
                                                    //         ...inputData,
                                                    //         fd_distributorexpired: e.target.value
                                                    //     })
                                                    // }
                                                />
                                            </div>
                                    </div>
                                    <div className="col-md-3">
                                            <div className="form-group">
                                                <label htmlFor="fl_distributorreseller">Distributor Reseller</label>
                                                {/* <RadioButtons
                                                    id="fl_distributorreseller"
                                                    name="fl_distributorreseller"
                                                    options1="Active"
                                                    options2="Non Active"
                                                    // onChange={handleChangeDistributorReseller}
                                                /> */}
                                            </div>
                                    </div>
                                    <div className="col-md-3">
                                            <div className="form-group">
                                                <label htmlFor="fc_distributortaxcode">Kode Pajak Distributor</label>
                                                <Select
                                                    // options={tipePajakOptions}
                                                    name="fc_distributortaxcode"
                                                    id="fc_distributortaxcode"
                                                    // onChange={handleTaxTypeChange}
                                                    required
                                                />
                                            </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-6" >
                                         <div className="form-group">
                                                <label htmlFor="fc_distributorNPWP">NPWP Distributor</label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    id="fc_distributorNPWP"
                                                    name="fc_distributorNPWP"
                                                    // onChange={
                                                    //     (e) => setInputData({
                                                    //         ...inputData,
                                                    //         fc_distributorNPWP: e.target.value
                                                    //     })
                                                    // }
                                                />
                                            </div>
                                    </div>
                                    <div className="col-md-6" >
                                         <div className="form-group">
                                                <label htmlFor="fc_distributornpwp_name">Nama NPWP Distributor</label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    id="fc_distributornpwp_name"
                                                    name="fc_distributornpwp_name"
                                                    // onChange={
                                                    //     (e) => setInputData({
                                                    //         ...inputData,
                                                    //         fc_distributornpwp_name: e.target.value
                                                    //     })
                                                    // }
                                                />
                                            </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="form-group">
                                                <label htmlFor="fc_distributor_npwpaddress1">Alamat NPWP Distributor</label>
                                                <textarea
                                                 type="text"
                                                 className="form-control"
                                                 name="fc_distributor_npwpaddress1"
                                                 id="fc_distributor_npwpaddress1"
                                                //  onChange={
                                                //         (e) => setInputData({   
                                                //             ...inputData,
                                                //             fc_distributor_npwpaddress1: e.target.value
                                                //         })
                                                //  }
                                                ></textarea>
                                        </div>
                                    </div>
                                    <div className="col-md-3">
                                        <div className="form-group" >
                                            <label htmlFor="fc_distributoremail1">Email Distributor</label>
                                            <input
                                                    type="text"
                                                    className="form-control"
                                                    id="fc_distributoremail1"
                                                    name="fc_distributoremail1"
                                                    // onChange={
                                                    //     (e) => {
                                                    //         setInputData({
                                                    //             ...inputData, 
                                                    //             fc_distributoremail1: e.target.value
                                                    //      })
                                                    //     }
                                                    // }
                                            />
                                        </div>
                                    </div>
                                    <div className="col-md-3">
                                        <div className="form-group" >
                                            <label htmlFor="fc_distributorphone1">No.HP Distributor</label>
                                            <input
                                                    type="text"
                                                    className="form-control"
                                                    id="fc_distributorphone1"
                                                    name="fc_distributorphone1"
                                                    // onChange={
                                                    //     (e) => {
                                                    //         setInputData({
                                                    //             ...inputData, 
                                                    //             fc_distributorphone1: e.target.value
                                                    //      })
                                                    //     }
                                                    // }
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                  <div className="col-md-6">
                                    <div className="form-group" >
                                                <label htmlFor="fc_distributorbank1">Bank Distributor</label>
                                                {/* <input
                                                        type="text"
                                                        className="form-control"
                                                        id="fc_distributorbank1"
                                                        name="fc_distributorbank1"
                                                    /> */}
                                                <Select
                                                    // options={bankOptions}
                                                    name="fc_distributorbank1"
                                                    id="fc_distributorbank1"
                                                    // onChange={handleBankChange}
                                                    required
                                                />
                                        </div>
                                  </div>
                                  <div className="col-md-6">
                                    <div className="form-group" >
                                                <label htmlFor="fc_distributornorek1">No Rekening Distributor</label>
                                                <input
                                                        type="text"
                                                        className="form-control"
                                                        id="fc_distributornorek1"
                                                        name="fc_distributornorek1"
                                                        // onChange={
                                                        //     (e) => {
                                                        //         setInputData ({
                                                        //             ...inputData,
                                                        //             fc_distributornorek1: e.target.value
                                                        //         })
                                                        //     }
                                                        // }
                                                />
                                        </div>
                                  </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-3">
                                        <div className="form-group" >
                                                    <label htmlFor="fc_distributorvirtualac">Virtual AC Distributor</label>
                                                    <input
                                                            type="text"
                                                            className="form-control"
                                                            id="fc_distributorvirtualac"
                                                            name="fc_distributorvirtualac"
                                                            // onChange={
                                                            //     (e) => {
                                                            //         setInputData({
                                                            //             ...inputData,
                                                            //             fc_distributorvirtualac: e.target.value
                                                            //         })
                                                            //     }
                                                            // }
                                                    />
                                            </div>
                                    </div>
                                    <div className="col-md-3">
                                        <div className="form-group" >
                                                    <label htmlFor="fm_distributorAR">Hutang Distributor</label>
                                                    <input
                                                            type="text"
                                                            className="form-control"
                                                            id="fm_distributorAR"
                                                            name="fm_distributorAR"
                                                            // onChange={
                                                            //     (e) => {
                                                            //         setInputData ({
                                                            //             ...inputData,
                                                            //             fm_distributorAR: e.target.value
                                                            //         })
                                                            //     }
                                                            // }
                                                    />
                                            </div>
                                    </div>
                                    <div className="col-md-3">
                                        <div className="form-group" >
                                                    <label htmlFor="fn_distributorAgingAR">Masa Hutang Distributor</label>
                                                    <input
                                                            type="number"
                                                            className="form-control"
                                                            id="fn_distributorAgingAR"
                                                            name="fn_distributorAgingAR"
                                                            // onChange={
                                                            //     (e) => {
                                                            //         setInputData ({
                                                            //             ...inputData,
                                                            //             fn_distributorAgingAR: e.target.value
                                                            //         })
                                                            //     }
                                                            // }
                                                        />
                                            </div>
                                    </div>
                                    <div className="col-md-3">
                                        <div className="form-group" >
                                                    <label htmlFor="fn_distributorlockTrans">Kunci Transaksi</label>
                                                    <Select
                                                        // options={lockTypeOptions}
                                                         name="fn_distributorlockTrans"
                                                            id="fn_distributorlockTrans"
                                                            // onChange={handleLockTypeChange}
                                                            required
                                                    />
                                            </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-12">
                                        <div className="form-group" >
                                                    <label htmlFor="fv_distributordescription">Deskripsi</label>
                                                    <textarea
                                                        type="text"
                                                        className="form-control"
                                                        name="fv_distributordescription"
                                                        id="fv_distributordescription"
                                                        // onChange={
                                                        //     (e) => {
                                                        //         setInputData ({
                                                        //             ...inputData,
                                                        //             fv_distributordescription: e.target.value
                                                        //         })
                                                        //     }
                                                        // }
                                                    ></textarea>
                                            </div>
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

            <ModalDistributor id="addModalDistributor" />
        </>
    );
}

export default DashboardMasterDistributor;