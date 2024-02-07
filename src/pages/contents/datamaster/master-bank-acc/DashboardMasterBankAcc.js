import React, { useEffect, useRef, useState } from "react";
import Config from "../../../../config";
import axios from "axios";
import $ from "jquery";
import Select from 'react-select'
import ModalBankAcc from "./ModalBankAcc";
import SweetAlertLoading from "../../../../components/SweetAlertLoading";
import SweetAlertError from "../../../../components/SweetAlertError";
import SweetAlertSuccess from "../../../../components/SweetAlertSuccess";

const DashboardMasterBankAcc = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);
    const [message, setMessage] = useState('');
    const [banknameOptions, setBanknameOptions] = useState([]);
    const [selectedBankname, setSelectedBankname] = useState("");
    const [selectedBankhold, setSelectedBankhold] = useState("");
    const [selectedBanktype, setSelectedBanktype] = useState("");
    const banktypeOptions = [
        {value: "1", label: "1"},
        {value: "2", label: "2"}
    ];
    const bankholdOptions = [
        {value: "T", label: "Ya"},
        {value: "F", label: "Tidak"}
    ];
    const tableRef = useRef(null);
    const [inputData, setInputData] = useState({
        id: "",
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
                console.log(error);
            }
        };

        fetchData();
        return () => {
            // Hancurkan DataTable saat komponen dilepas
            const existingTable = $(tableRef.current).DataTable();
            existingTable.destroy();
          };
    }, []);

    const detailBankAcc = async(data) => {
        if(data){
            setInputData({
                id: data.id,
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

            try {
                const bankNameApiUrl = Config.api.server2 + "get-data-where-field-id-get/TransaksiType/fc_trx/BANKNAME";

                const [
                    bankNameResponse, 
                    bankTypeResponse, 
                    bankHoldResponse
                ] = await Promise.all([
                    axios.get(bankNameApiUrl),
                ]);

                const bankNameData = bankNameResponse.data.data;
                
                const bankNameOptions = bankNameData.map((data) => ({
                    value: data.fv_description,
                    label: data.fv_description,
                }));
                setBanknameOptions(bankNameOptions);
                const selectedBankName = bankNameOptions.find((option) => option.value === data.fv_bankname);
                setSelectedBankname(selectedBankName);

                const bankTypeData = banktypeOptions.map((data) => ({
                    value: data.value,
                    label: data.label
                }));
                const selectedBankType = bankTypeData.find((option) => option.value === data.fc_banktype);
                setSelectedBanktype(selectedBankType);

                const bankHoldData = bankholdOptions.map((data) => ({
                    value: data.value,
                    label: data.label
                }));

                const selectedBankHold = bankHoldData.find((option) => option.value === data.fl_bankhold);
                setSelectedBankhold(selectedBankHold);

            } catch (error) {
                console.log(error);
            }
        }
    }

    const handleBanknameChange = (selectedOption) => {
        setSelectedBankname(selectedOption);
        setInputData({
            ...inputData,
            fv_bankname: selectedOption.value
        });
    }

    const handleBanktypeChange = (selectedOption) => {
        setSelectedBanktype(selectedOption);
        setInputData({
            ...inputData,
            fc_banktype: selectedOption.value
        });
    }

    const handleBankHoldChange = (selectedOption) => {
        setSelectedBankhold(selectedOption);
        setInputData({
            ...inputData,
            fl_bankhold: selectedOption.value
        });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const token = localStorage.getItem("token");
        setLoading(true);

        const data = {
            id: inputData.id,
            fc_divisioncode: inputData.fc_divisioncode,
            fc_branch: inputData.fc_branch,
            fv_bankname: inputData.fv_bankname,
            fc_banktype: inputData.fc_banktype,
            fc_bankcode: inputData.fc_bankcode,
            fv_bankbranch: inputData.fv_bankbranch,
            fv_bankusername: inputData.fv_bankusername,
            fv_bankaddress1: inputData.fv_bankaddress1,
            fv_bankaddress2: inputData.fv_bankaddress2,
            fl_bankhold: inputData.fl_bankhold
        };

        const apiUrl = Config.api.server2 + "master/bank-acc";

        try {
            const response = await axios({
                method: "PUT",
                url: apiUrl,
                data: data,
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });

            if(response.data.success){
                setLoading(false);
                setSuccess(true);
                setMessage(response.data.message);
            }else{
                setLoading(false);
                setSuccess(false);
                setMessage(response.data.message);
            }
        } catch (error) {
            setError(true);
            setLoading(false);
            if (error.response) {
                console.log('Response Data:', error.response.data);
                console.log('Response Status:', error.response.status);
                console.log('Response Headers:', error.response.headers);
            } else if (error.request) {
                console.log('Request made but no response received:', error.request);
            } else {
                console.log('Error during request setup:', error.message);
            }
            console.log('Config:', error.config);
        }finally{
            setLoading(false);
        }


    }

    const handleCloseErrorModal = () => {
        setError(null);
      };
    

    const handleSuccessAlertClose = () => {
        setSuccess(false);
        // Reload the page upon successful API response
        window.location.reload();
      };
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
            aria-labelledby="addModalBankAccLabel">
            <div className="modal-dialog modal-lg" role="document">
                <div className="modal-content">
                 <div className="modal-header">
                        <h5 className="modal-title" id="editModalLabel">
                            Edit Master Bank Account
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
                                     <Select 
                                        options={banknameOptions} 
                                        value={selectedBankname}
                                        name="fv_bankname"
                                        id="fv_bankname_edit"
                                        onChange={handleBanknameChange}
                                        required
                                    />
                            </div>
                         </div>
                         <div className="col-md-3">
                            <div className="form-group">
                                    <label htmlFor="fc_group">Tipe Bank</label>
                                    <Select 
                                        options={banktypeOptions} 
                                        value={selectedBanktype}
                                        name="fc_banktype"
                                        id="fc_banktype"
                                        onChange={
                                            handleBanktypeChange
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
                                        value={inputData.fv_bankusername}
                                        onChange={
                                            (e) => setInputData({
                                                ...inputData,
                                                fv_bankusername: e.target.value
                                            })
                                        }
                                    />
                            </div>
                         </div>
                         <div className="col-md-3">
                            <div className="form-group">
                                    <label htmlFor="fc_group">Bank Terkunci</label>
                                    <Select 
                                        options={bankholdOptions} 
                                        value={selectedBankhold}
                                        name="fl_bankhold"
                                        id="fl_bankhold"
                                        onChange={
                                            handleBankHoldChange
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
                                         value={inputData.fv_bankbranch} 
                                         onChange={
                                            (e) => setInputData({
                                                ...inputData,
                                                fv_bankbranch: e.target.value
                                            })
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
                                    value={inputData.fv_bankaddress1}
                                    onChange={
                                        (e) => setInputData({
                                            ...inputData,
                                            fv_bankaddress1: e.target.value
                                        })
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
                                    value={inputData.fv_bankaddress2}
                                    onChange={
                                        (e) => setInputData({
                                            ...inputData,
                                            fv_bankaddress2: e.target.value
                                        })
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

            <SweetAlertLoading show={loading} />
            <SweetAlertError show={!!error} message={error} onClose={handleCloseErrorModal} />
            {/* <SweetAlertDeleteConfirmation
                show={deleteConfirmation.show}
                content={`Are you sure you want to delete this user?`}
                onCancel={handleCloseDeleteConfirmation}
                onConfirm={handleDeleteConfirmation}
            /> */}
            <SweetAlertSuccess 
                show={success}
                message={message}
                onClose={handleSuccessAlertClose}
            
            />
        </>
    );
}

export default DashboardMasterBankAcc;