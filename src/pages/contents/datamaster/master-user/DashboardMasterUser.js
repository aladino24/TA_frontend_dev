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

const DashboardMasterUser = () => {
  const tableRef = React.useRef(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [holdConfirmation, setHoldConfirmation] = useState({
    show: false,
    id: null,
    userid: null,
    fc_hold: null
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
              data: "fc_groupuser",
            },
            {
              data: "fc_membercode",
            },
            {
              data: "fc_hold",
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
            const textHold = data.fc_hold === 'T' ? 'Unhold' : 'Hold';
            const actionBtns = `
              <button class="btn btn-sm btn-danger" id="deleteBtn">Delete</button>
              <button class="btn btn-sm btn-warning" id="holdBtn">${textHold}</button>
              <button class="btn btn-sm btn-primary" id="editBtn">Edit</button>
            `;
            $("td:eq(10)", row).html(actionBtns);

            $("#deleteBtn", row).on("click", () => handleDelete(data.id));
            $("#holdBtn", row).on("click", () => showHoldConfirmation(data.id, data.userid, data.fc_hold));
            $("#editBtn", row).on("click", () => handleEdit(data.id));
          }
        },);
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

  const showHoldConfirmation = (id, userid, fc_hold) => {
    setHoldConfirmation({
      show: true,
      id: id,
      userid: userid,
      fc_hold: fc_hold
    });
  };

  const handleCloseHoldConfirmation = () => {
    setHoldConfirmation({
      show: false,
      id: null,
      userid: null,
    });
  };

  const handleDelete = (id) => {
    alert(`Delete data with id ${id}`);
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
      const statusHold = holdConfirmation.fc_hold === 'T' ? 'unhold' : 'hold';
      const response  = await axios.put(Config.api.server1 + statusHold, {
        id: holdConfirmation.id,
        userid: holdConfirmation.userid,
        }, axiosConfig);
      const userData = response.data.data;
      // console.log(userData.fc_hold);

      // console.log(userData.fc_hold);
      if (response.data.success) {
        setHoldConfirmation({
          show: false,
          id: null,
          userid: null,
        });
       
        setSuccess(true);
        setLoading(false);
        // resirect
        window.location.href = '/master-user';
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

  const handleEdit = (id) => {
    alert(`Edit data with id ${id}`);
  }

  const handleCloseErrorModal = () => {
    setError(null);
  };
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

      <ModalUser id="addUser" />

      <SweetAlertLoading show={loading} />
      <SweetAlertError show={!!error} message={error} onClose={handleCloseErrorModal} />
      <SweetAlertConfirmation show={
        holdConfirmation.show}
        content={`Are you sure you want to ${holdConfirmation.fc_hold === 'T' ? 'Unhold' : 'Hold'} this user?`}
        onCancel={handleCloseHoldConfirmation}
        onConfirm={handleHoldConfirmation} 
        />
      <SweetAlertSuccess 
        show={success}
        message="Hold operation completed successfully."
        onClose={() => 
          setSuccess(false)
        }
      
      />
    </>
  );
};

export default DashboardMasterUser;
