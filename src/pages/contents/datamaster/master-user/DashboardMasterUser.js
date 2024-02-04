import React, { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import $ from "jquery";
import "datatables.net";
import "datatables.net-bs4";
import axios from "axios";
import Config from "../../../../config";
import SweetAlertError from "../../../../components/SweetAlertError";
import SweetAlertLoading from "../../../../components/SweetAlertLoading";
import SweetAlertConfirmation from "../../../../components/SweetAlertConfirmation";
import SweetAlertSuccess from "../../../../components/SweetAlertSuccess";
import ModalUser from "./ModalUser";
import Select from 'react-select'
import RadioButtons from "../../../../components/RadioButton";
import SweetAlertDeleteConfirmation from "../../../../components/SweetAlertDeleteConfirmation";

const DashboardMasterUser = () => {
  const tableRef = React.useRef(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [branchOptions, setBranchOptions] = useState([]);
  const [groupUserOptions, setGroupUserOptions] = useState([]);
  const [selectedBranch, setSelectedBranch] = useState("");
  const [selectedGroupUser, setSelectedGroupUser] = useState("");
  const [holdValue, setHoldValue] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);
  const [message, setMessage] = useState('');
  const [holdConfirmation, setHoldConfirmation] = useState({
    show: false,
    id: null,
    userid: null,
    fl_hold: null
  });
  const [deleteConfirmation, setDeleteConfirmation] = useState({
    show: false,
    id: null,
    userid: null,
  });
  const [inputData, setInputData] = useState({
    id: "",
    divisioncode: "",
    branch: "",
    userid: "",
    username: "",
    password: "",
    c_password: "",
    fc_groupuser: "",
    fl_level: "",
    fl_hold: "",
    fd_expired: "",
    fv_ttdpath: "",
    fv_description: "",
});


  useEffect(()=>{
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        const axiosConfig = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        const response = await axios.get(Config.api.server1 + "get-user", axiosConfig);
        const userData = response.data.data;
        if ($.fn.DataTable.isDataTable("#dataTable")) {
          // If it is initialized, destroy it before reinitializing
          const existingTable = $(tableRef.current).DataTable();
          existingTable.destroy();
        }

        const formattedData = userData.map((user, index) => ({
          ...user,
          no: index + 1,
        }));

        const table = $(tableRef.current).DataTable({
          responsive: true,
          processing: true,
          serverSide: false, // Ubah menjadi true jika ingin implementasi server-side processing
          data: formattedData,
          columnDefs: [
            {
              targets: -1,
              width: "200px",
            },
          ],
          columns: [
            { 
              data: "no" 
            },
            { 
              data: "divisioncode" 
            },
            { 
              data: "branch" 
            },
            { 
              data: "username" 
            },
            { 
              data: "userid" 
            },
            {
              data: "group_user.fc_groupname",
            },
            {
              data: "fc_membercode",
            },
            {
              data: "fl_hold",
              render : function(data, type, row){
                if(data === 'T'){
                  return '<span style="color: white; background-color: red; padding: 2px 5px; border-radius: 3px;">Hold</span>';
                }else{
                  return '<span style="color: white; background-color: green; padding: 2px 5px; border-radius: 3px;">Unhold</span>';
                }
              }
            },
            { 
              data: "fd_expired" 
            },
            { 
              data: "updated_at",
              render : function(data, type, row){
                return new Date(data).toLocaleString();;
              }
            },
            {
              data: null,
            },
          ],
          rowCallback: function(row, data) {
            const textHold = data.fl_hold === 'T' ? 'Unhold' : 'Hold';
            const actionBtns = `
              <button class="btn btn-sm btn-danger" id="deleteBtn">Delete</button>
              <button class="btn btn-sm btn-warning" id="holdBtn">${textHold}</button>
              <button class="btn btn-sm btn-primary" id="editBtnUser">Edit</button>
            `;
            $("td:eq(10)", row).html(actionBtns);

            $("#deleteBtn", row).on("click", () => showDeleteConfirmation(data.id));
            $("#holdBtn", row).on("click", () => showHoldConfirmation(data.id, data.userid, data.fl_hold));
          }
        },);


        $(tableRef.current).on("click", "#editBtnUser", function () {
          const rowData = table.row($(this).parents("tr")).data();
          detailEditUser(rowData);
          window.$('#editUserModal').modal('show');
        });
      } catch (error) {
        console.error(error);
      }
    }

    fetchData();
    return () => {
      // Hancurkan DataTable saat komponen dilepas
      const existingTable = $(tableRef.current).DataTable();
      existingTable.destroy();
    };
  },[])

  const showDeleteConfirmation = (id) => {
    setDeleteConfirmation({
      show: true,
      id: id,
    });
  };

  const showHoldConfirmation = (id, userid, fl_hold) => {
    setHoldConfirmation({
      show: true,
      id: id,
      userid: userid,
      fl_hold: fl_hold
    });
  };

  const handleCloseDeleteConfirmation = () => {
    setDeleteConfirmation({
      show: false,
      id: null,
      userid: null,
    });
  };

  const handleCloseHoldConfirmation = () => {
    setHoldConfirmation({
      show: false,
      id: null,
      userid: null,
    });
  };

  const handleDeleteConfirmation = async() => {
    const token = localStorage.getItem('token');

    try {
      const axiosConfig = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      setLoading(true);

      const response = await axios.delete(Config.api.server1 + "delete-user" + "/" + deleteConfirmation.id, axiosConfig);

      if(response.data.success){
        setDeleteConfirmation({
          show: false,
          id: null,
          userid: null,
        });
        setSuccess(true);
        setLoading(false);
        setMessage(response.data.message);
      }else{
        throw new Error(response.data.error);
      }
    } catch (error) {
      setLoading(false);
      setError(error.message);
      throw new Error(error.message);
    }finally{
      setLoading(false);
    }

  }

  const handleHoldConfirmation = async() => {
    const token = localStorage.getItem('token');
   
    try {
      const axiosConfig = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      // sweetalert
      setLoading(true);
      // status hold
      const statusHold = holdConfirmation.fl_hold === 'T' ? 'unhold' : 'hold';
      const response  = await axios.put(Config.api.server1 + statusHold, {
        id: holdConfirmation.id,
        userid: holdConfirmation.userid,
        }, axiosConfig);
      // const userData = response.data.data;
      // console.log(userData.fl_hold);

      // console.log(userData.fl_hold);
      if (response.data.success) {
        setHoldConfirmation({
          show: false,
          id: null,
          userid: null,
        });
       
        setSuccess(true);
        setLoading(false);
        setMessage(response.data.message);
      }else{
        throw new Error(response.data.error);
      }
    } catch (error) {
      setLoading(false);
      setError(error.message);
      throw new Error(error.message);
    }finally{
      setLoading(false);
    }
  }

  const detailEditUser = async(data) => {
    // console.log(data);
    if(data){
      setInputData({
        id: data.id || '',
        divisioncode: data.divisioncode || '',
        branch: data.branch || '',
        userid: data.userid || '',
        username: data.username || '',
        password: data.password,
        c_password: data.c_password,
        fc_groupuser: data.fc_groupuser || '',
        fl_level: data.fl_level || '',
        fl_hold: data.fl_hold || '',
        fd_expired: data.fd_expired || '',
        fv_ttdpath: data.fv_ttdpath,
        fv_description: data.fv_description || '',
      });

      try {
        const token = localStorage.getItem('token');

        const branchApiUrl = Config.api.server2 + "get-data-where-field-id-get/TransaksiType/fc_trx/BRANCH";
        const groupUserApiUrl = Config.api.server1 + "get-groupuser";
        const [
          branchResponse,
          groupUserResponse
        ] = await Promise.all([
          axios.get(branchApiUrl),
          axios.get(groupUserApiUrl)
        ]);

        const branchData = branchResponse.data.data;
        const branchOptions = branchData.map((branch) => ({
            value: branch.fc_kode,
            label: branch.fv_description,
        }));

        setBranchOptions(branchOptions);
        const selectedBranchOptions = branchOptions.find((option) => option.value === data.branch);
        setSelectedBranch(selectedBranchOptions);

        const groupUserData = groupUserResponse.data.data;
        const groupUserOptions = groupUserData.map((groupUser) => ({ 
          value: groupUser.fc_groupcode,
          label: groupUser.fc_groupname,
        }));

        setGroupUserOptions(groupUserOptions);
        const selectedGroupUserOptions = groupUserOptions.find((option) => option.value === data.fc_groupuser);
        setSelectedGroupUser(selectedGroupUserOptions);

      } catch (error) {
        console.log(error);
      }
    }
  }

  const handleCloseErrorModal = () => {
    setError(null);
  };

  const handleBranchChange = (selectedOption) => {
    setSelectedBranch(selectedOption);
    setInputData({
      ...inputData,
      branch: selectedOption.value
    })
  }

  const handleGroupUserChange = (selectedOption) => {
    setSelectedGroupUser(selectedOption);
    setInputData({
      ...inputData,
      fc_groupuser: selectedOption.value
    })
  }

  const handleHoldChange = (value) => {
    if(value !== holdValue){
      setHoldValue(value);
      setInputData({
        ...inputData,
        fl_hold: value
      })
    }
  }

  const handleSubmitEdit = async(e) => {
    e.preventDefault();

    setLoading(true);
    const token = localStorage.getItem("token");
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
        },
    };
    const formData = new FormData();
    formData.append("divisioncode", inputData.divisioncode);
    formData.append("branch", inputData.branch);
    formData.append("userid", inputData.userid);
    formData.append("username", inputData.username);
    formData.append("password", inputData.password);
    formData.append("c_password", inputData.c_password);
    formData.append("fc_groupuser", inputData.fc_groupuser);
    formData.append("fl_level", inputData.fl_level);
    formData.append("fl_hold", inputData.fl_hold);
    formData.append("fd_expired", inputData.fd_expired);
    formData.append("fv_ttdpath", inputData.fv_ttdpath);
    formData.append("fv_description", inputData.fv_description);
    
    // lihat isi form data
    // for (var pair of formData.entries()) {
    //   console.log(pair[0]+ ', ' + pair[1]);
    // }
    try {
      // console.log(inputData);
        const response = await axios.post(
            Config.api.server1 + "edit-user" + "/" + inputData.id,
            formData,
            config
        );
        
        if(response.status == 200){
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
    }finally{
        setLoading(false);
    }
  }


  const handleSuccessAlertClose = () => {
    setShowSuccess(false);
    // Reload the page upon successful API response
    window.location.reload();
  };

  const formatDateForInput = (timestamp) => {
      const date = new Date(timestamp);
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      return `${year}-${month}-${day}`;
  }

  return (
    <>
      <div className="container-fluid">
        {/*  <!-- Page Heading --> */}
        <div className="d-sm-flex align-items-center justify-content-between mb-4">
          <h1 className="h3 mb-0 text-gray-800">Master User</h1>
          <div>
          <button className="mr-2 btn btn-sm btn-success shadow-sm" data-toggle="modal" data-target="#addUser"><i className="fa fa-plus"></i> Tambahkan User</button>
            <a
              href="#"
              className="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm"
            >
              <i className="fas fa-download fa-sm text-white-50"></i> Generate
              Report
            </a>
          </div>
        </div>

        {/* Tabel */}
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
                        <th>Division Code</th>
                        <th>Branch</th>
                        <th>Name</th>
                        <th>User ID</th>
                        <th>Group User</th>
                        <th>Customer</th>
                        <th>Hold</th>
                        <th>Expired</th>
                        <th>Updated At</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tfoot>
                      <tr>
                        <th>ID</th>
                        <th>Division Code</th>
                        <th>Branch</th>
                        <th>Name</th>
                        <th>User ID</th>
                        <th>Group User</th>
                        <th>Hold</th>
                        <th>Expired</th>
                        <th>Updated At</th>
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
                id="editUserModal"
                tabIndex="-1"
                role="dialog"
                aria-labelledby="editModalLabel">
                <div className="modal-dialog modal-lg" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="editModalLabel">
                                Edit User
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
                       <form onSubmit={handleSubmitEdit}>
                        <div className="modal-body">
                            <div className="row">
                                <div className="col-6">
                                <div className="form-group"> 
                                        <label className="form-label">Division Code</label>
                                        <input type="text" className="form-control" value={inputData.divisioncode}  readOnly/>
                                </div>
                                </div>
                                <div className="col-6">
                                <div className="form-group"> 
                                        <label className="form-label">Cabang</label>
                                        <Select
                                            options={branchOptions}
                                            value={selectedBranch}
                                            onChange={handleBranchChange}
                                            required
                                        />
                                </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-6">
                                    <div className="form-group"> 
                                            <label className="form-label">User ID</label>
                                            <input 
                                                type="text" 
                                                className="form-control" 
                                                placeholder="Userid"
                                                name="userid"
                                                id="userid_edit"
                                                value={inputData.userid}
                                                onChange={
                                                  (e) => {
                                                    setInputData({
                                                      ...inputData,
                                                      userid: e.target.value
                                                    })
                                                  }
                                                }
                                            />
                                    </div>
                                </div>
                                <div className="col-6">
                                    <div className="form-group"> 
                                            <label className="form-label">Username</label>
                                            <input 
                                                type="text" 
                                                className="form-control" 
                                                placeholder="Username"
                                                name="username"
                                                id="username_edit"
                                                value={inputData.username}
                                                onChange={
                                                  (e) => {
                                                    setInputData({
                                                      ...inputData,
                                                      username: e.target.value
                                                    })
                                                  }
                                                }
                                            />
                                    </div>
                                </div>
                            </div>  
                            <div className="row">
                                <div className="col-6">
                                    <div className="form-group"> 
                                            <label className="form-label">Password</label>
                                            <input 
                                                type="password" 
                                                className="form-control" 
                                                placeholder="Password"
                                                name="password"
                                                id="password_edit"
                                                onChange={
                                                  (e) => {
                                                    setInputData({
                                                      ...inputData,
                                                      password: e.target.value
                                                    })
                                                  }
                                                }
                                            />
                                    </div>
                                </div>
                                <div className="col-6">
                                    <div className="form-group"> 
                                            <label className="form-label">Confirm Password</label>
                                            <input 
                                                type="password" 
                                                className="form-control" 
                                                placeholder="Confirm Password"
                                                name="c_password"
                                                id="c_password_edit"
                                                onChange={
                                                  (e) => {
                                                    setInputData({
                                                      ...inputData,
                                                      c_password: e.target.value
                                                    })
                                                  }
                                                }
                                            />
                                             {/* {passwordMatchError && <p style={{ color: 'red' }}>{passwordMatchError}</p>} */}
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-6">
                                    <div className="form-group"> 
                                            <label className="form-label">Group User</label>
                                            <Select 
                                                options={groupUserOptions}
                                                value={selectedGroupUser}
                                               onChange={handleGroupUserChange}
                                            />
                                    </div>
                                </div>
                                <div className="col-6">
                                    <div className="form-group"> 
                                            <label className="form-label">Level</label>
                                            <input 
                                                type="number" 
                                                name="fl_level" 
                                                id="fl_level_edit"
                                                className="form-control" 
                                                value={inputData.fl_level}
                                                onChange={ 
                                                  (e) => {
                                                    setInputData({
                                                      ...inputData,
                                                      fl_level: e.target.value
                                                    })
                                                  }
                                                }
                                            />
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-6">
                                    <div className="form-group"> 
                                            <label className="form-label">Hold</label>
                                            <RadioButtons 
                                                value={inputData.fl_hold === 'T' ? 'T' : 'F'}
                                                name="fl_hold_edit" 
                                                onChange={handleHoldChange}
                                                options1="Active" 
                                                options2="Non Active"
                                            />
                                    </div>
                                </div>
                                <div className="col-6">
                                    <div className="form-group"> 
                                            <label className="form-label">Expired Date</label>
                                            <input 
                                                type="date" 
                                                className="form-control"
                                                name="fd_expired"
                                                id="fd_expired_edit"
                                                value={formatDateForInput(inputData.fd_expired)}
                                                onChange={
                                                  (e) => {
                                                    setInputData({
                                                      ...inputData,
                                                      fd_expired: e.target.value
                                                    })
                                                  }
                                                }
                                            />
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-6">
                                    <div className="form-group"> 
                                            <label className="form-label">Assign Role</label>
                                            <input type="text" className="form-control"/>
                                    </div>
                                </div>
                                <div className="col-6">
                                    <div className="form-group"> 
                                            <label className="form-label">Tanda Tangan</label>
                                            <input 
                                                type="file" 
                                                className="form-control"
                                                name="fv_ttdpath"
                                                onChange={
                                                  (e) => {
                                                    setInputData({
                                                      ...inputData,
                                                      fv_ttdpath: e.target.files[0]
                                                    })
                                                  }
                                                }
                                            />
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-12">
                                    <div className="form-group"> 
                                            <label className="form-label">Description</label>
                                            {/* Text area */}
                                            <textarea 
                                                className="form-control" 
                                                rows="3"
                                                name="fv_description"
                                                id="fv_description_edit"
                                                value={inputData.fv_description}
                                                onChange={
                                                  (e) => {
                                                    setInputData({
                                                      ...inputData,
                                                      fv_description: e.target.value
                                                    })
                                                  }
                                                }
                                            >
                                            </textarea>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button
                                type="button"
                                className="btn btn-secondary"
                                data-dismiss="modal"
                            >
                            Close
                            </button>
                            <button type="submit" className="btn btn-primary">
                            Save changes
                            </button>
                        </div>
                      </form>
                    </div>
                </div>
            </div>

      <ModalUser id="addUser" />

      <SweetAlertLoading show={loading} />
      <SweetAlertError show={!!error} message={error} onClose={handleCloseErrorModal} />
      <SweetAlertConfirmation show={
        holdConfirmation.show}
        content={`Are you sure you want to ${holdConfirmation.fl_hold === 'T' ? 'Unhold' : 'Hold'} this user?`}
        onCancel={handleCloseHoldConfirmation}
        onConfirm={handleHoldConfirmation} 
        />
      <SweetAlertDeleteConfirmation
        show={deleteConfirmation.show}
        content={`Are you sure you want to delete this user?`}
        onCancel={handleCloseDeleteConfirmation}
        onConfirm={handleDeleteConfirmation}
      />
      <SweetAlertSuccess 
        show={success}
        message={message}
        onClose={handleSuccessAlertClose}
      
      />
    </>
  );
};

export default DashboardMasterUser;
