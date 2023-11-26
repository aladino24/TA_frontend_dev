import React, { useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import $ from "jquery";
import "datatables.net";
import "datatables.net-bs4";
import axios from "axios";

const DashboardMasterUser = () => {
  const tableRef = React.useRef(null);

  useEffect(()=>{
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        const axiosConfig = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        const response = await axios.get("http://127.0.0.1:8000/api/get-user", axiosConfig);
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
              data: "name" 
            },
            { 
              data: "userid" 
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
            const actionBtns = `
              <button class="btn btn-sm btn-danger" id="deleteBtn">Delete</button>
              <button class="btn btn-sm btn-warning" id="holdBtn">Hold</button>
              <button class="btn btn-sm btn-primary" id="editBtn">Edit</button>
            `;
            $("td:eq(6)", row).html(actionBtns);

            $("#deleteBtn", row).on("click", () => handleDelete(data.id));
            $("#holdBtn", row).on("click", () => handleHold(data.id));
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

  const handleDelete = (id) => {
    alert(`Delete data with id ${id}`);
  }

  const handleHold = (id) => {
    alert(`Hold data with id ${id}`);
  }

  const handleEdit = (id) => {
    alert(`Edit data with id ${id}`);
  }
  return (
    <>
      <div className="container-fluid">
        {/*  <!-- Page Heading --> */}
        <div className="d-sm-flex align-items-center justify-content-between mb-4">
          <h1 className="h3 mb-0 text-gray-800">Master User</h1>
          <div>
            <a
              href="#"
              className="d-none d-sm-inline-block btn btn-sm btn-success shadow-sm mr-2"
            >
              <i className="fas fa-download fa-sm text-white-50"></i> Tambah User
            </a>
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
                        <th>ID</th>
                        <th>Division Code</th>
                        <th>Branch</th>
                        <th>Name</th>
                        <th>User ID</th>
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
    </>
  );
};

export default DashboardMasterUser;
