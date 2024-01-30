import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import Config from "../../../../config";
import $ from "jquery";
import ModalBrand from "./ModalBrand";
import SweetAlertLoading from "../../../../components/SweetAlertLoading";
import SweetAlertError from "../../../../components/SweetAlertError";
import SweetAlertSuccess from "../../../../components/SweetAlertSuccess";

const DashboardMasterBrand = () => {
    const tableRef = useRef(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);
    const [message, setMessage] = useState('');
    const [inputData, setInputData] = useState({
        id: "",
        fc_divisioncode: "",
        fc_branch: "",
        fc_brand: "",
        fc_group: "",
        fc_subgroup: ""
    });
    
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
                        <button class="btn btn-sm btn-warning" id="editBtn">Edit</button>
                        <button class="btn btn-sm btn-danger" id="deleteBtn">Delete</button>
                        `;
                        $("td:eq(6)", row).html(actionBtns);
                    }
                });

                $(tableRef.current).on("click", "#editBtn", function(e) {
                    const rowData = table.row($(this).parents("tr")).data();
                    detailEditBrand(rowData);
                    window.$('#editModalBrand').modal('show');
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

    const detailEditBrand = async(data) => {
        // const token = localStorage.getItem('token');

        if(data){
            setInputData({
                id: data.id ? data.id : "",
                fc_divisioncode: data.fc_divisioncode ? data.fc_divisioncode : "",
                fc_branch: data.fc_branch ? data.fc_branch : "",
                fc_brand: data.fc_brand ? data.fc_brand : "",
                fc_group: data.fc_group ? data.fc_group : "",
                fc_subgroup: data.fc_subgroup ? data.fc_subgroup : ""
            });
        }
    }

    const handleEditBrand = async(e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');

        setLoading(true);
        const data = {
            id: inputData.id,
            fc_divisioncode: inputData.fc_divisioncode,
            fc_branch: inputData.fc_branch,
            fc_brand: inputData.fc_brand,
            fc_group: inputData.fc_group,
            fc_subgroup: inputData.fc_subgroup
        }
        const apiurl = Config.api.server2 + `master/brand`;

        try {
            const response = await axios({
                method: "put",
                url: apiurl,
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                data: data
            });

            if(response.data.success){
                setSuccess(true);
                setLoading(false);
                setMessage(response.data.message);
            }else{
                setError(true);
                setLoading(false);
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
        } finally {
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

            <div
            className="modal fade"
            id="editModalBrand"
            tabIndex="-1"
            role="dialog"
            aria-labelledby="editModalBrandLabel">
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                 <div className="modal-header">
                        <h5 className="modal-title" id="editModalLabel">
                            Edit Brand
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

                <form onSubmit={handleEditBrand}>
                  <div className="modal-body">
                        <div className="form-group">
                            <label htmlFor="fc_branch">Cabang</label>
                            <input 
                                type="text" 
                                className="form-control" 
                                id="fc_divisioncode" 
                                value={inputData.fc_divisioncode}  
                                onChange={
                                    (e) => setInputData(prevInputData => ({
                                        ...prevInputData,
                                        fc_divisioncode: e.target.value,
                                    }))
                                }
                                hidden 
                            />
                            <input 
                                type="text" 
                                className="form-control" 
                                id="fc_branch" 
                                value={inputData.fc_branch} 
                                onChange={
                                    (e) => setInputData(prevInputData => ({
                                        ...prevInputData,
                                        fc_branch: e.target.value,
                                    }))
                                }
                                readOnly
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="fc_brand">Brand</label>
                            <input 
                                type="text" 
                                className="form-control" 
                                id="fc_brand"
                                name="fc_brand"  
                                value={inputData.fc_brand}
                                onChange={
                                    (e) => setInputData(prevInputData => ({
                                        ...prevInputData,
                                        fc_brand: e.target.value,
                                    }))
                                }
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="fc_group">Group</label>
                            <input 
                                type="text" 
                                className="form-control" 
                                id="fc_group" 
                                name="fc_group" 
                                value={inputData.fc_group}
                                onChange={
                                    e => setInputData(prevInputData => ({
                                        ...prevInputData,
                                        fc_group: e.target.value,
                                    }))
                                }
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="fc_subgroup">Sub Group</label>
                            <input 
                                type="text" 
                                className="form-control" 
                                id="fc_subgroup"  
                                name="fc_subgroup"
                                value={inputData.fc_subgroup}
                                onChange={
                                    e => setInputData(prevInputData => ({
                                        ...prevInputData,
                                        fc_subgroup: e.target.value,
                                    }))
                                }
                            />
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
            <ModalBrand id="addModalBrand" />

            <SweetAlertLoading show={loading} />
            <SweetAlertError show={!!error} message={error} onClose={handleCloseErrorModal} />
            <SweetAlertSuccess 
                show={success}
                message={message}
                onClose={handleSuccessAlertClose}
            
            />
        </>
    );
}

export default DashboardMasterBrand;