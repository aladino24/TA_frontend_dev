import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import Config from "../../../../config";
import $, { data } from "jquery";
import "./styles/style.css";
import ModalSelectBarang from "./ModalSelectBarang";

const CreateRequestBarang = () => {
    const tableRef = useRef(null);
    const [selectedRowData, setSelectedRowData] = useState(null);

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


            const formattedData = responseData ? responseData.map((requestData, index) => ({
                ...requestData,
                no: index + 1,
              })) : [];

              const table = $(tableRef.current).DataTable({
                responsive: true,
                processing: true,
                serverSide: false, // Ubah menjadi true jika ingin implementasi server-side processing
                data: formattedData,
                columnDefs: [
                ],
                columns: [
                    {data: "no"},
                    {data: "fc_divisioncode"},
                    {data: "branch.fv_description"},
                    {data: "fc_distributorcode"},
                    {data: "fc_distributorname1"},
                    {
                        data: null,
                    }
                ],
                rowCallback: function(row, data) {
                    const actionBtns = `
                    <button class="btn btn-primary btn-sm" data-toggle="modal" data-target="#selectBarang" id="selectButton">
                        <i class="fas fa-shopping-cart"></i>
                    </button>
                    `;
                    $("td:eq(5)", row).html(actionBtns);

                    $(tableRef.current).on("click", "#selectButton", function () {
                        const rowData = table.row($(this).closest("tr")).data();
                        setSelectedRowData(rowData);
                        //modal show
                        window.$('#selectBarang').modal('show');
                      });
                },
                
                });
        } catch (error) {
            
        }
    };

    useEffect(() => {
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
        <div className="d-sm-flex align-items-center mb-2">
          <h1 className="h3 mb-0 text-gray-800">Buat Request</h1>
        </div>

        <div className="row">
          {/*   <!-- Area Chart --> */}
          <div className="col-xl-12 col-lg-12">
            <div className="card shadow mb-4">
              {/*  <!-- Card Header - Dropdown --> */}
              <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                <h6 className="m-0 font-weight-bold text-primary">
                  Daftar Gudang Distributor
                </h6>
                <div className="dropdown no-arrow">
                  <a
                    className="dropdown-toggle"
                    href="#"
                    role="button"
                    id="dropdownMenuLink"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    <i className="fas fa-ellipsis-v fa-sm fa-fw text-gray-400"></i>
                  </a>
                  <div
                    className="dropdown-menu dropdown-menu-right shadow animated--fade-in"
                    aria-labelledby="dropdownMenuLink"
                  >
                    <div className="dropdown-header">Dropdown Header:</div>
                    <a className="dropdown-item" href="#">
                      Action
                    </a>
                    <a className="dropdown-item" href="#">
                      Another action
                    </a>
                    <div className="dropdown-divider"></div>
                    <a className="dropdown-item" href="#">
                      Something else here
                    </a>
                  </div>
                </div>
              </div>
              {/*  <!-- Card Body --> */}

             <div className="card-body">
                <div className="table-responsive">
                <table
                className="table table-bordered mt-2"
                ref={tableRef}
                id="dataTable"
                width="100%"
                cellSpacing="0"
             >
                    <thead className="bg-primary text-light">
                    <tr>
                        <th>No</th>
                        <th>Division</th>
                        <th>Cabang</th>
                        <th>Kode Distributor</th>
                        <th>Nama Gudang Distributor</th>
                        <th>Action</th>
                    </tr>
                    </thead>
                    <tfoot>
                    <tr>
                    <th>No</th>
                        <th>Division</th>
                        <th>Cabang</th>
                        <th>Kode Distributor</th>
                        <th>Nama Gudang Distributor</th>
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

      <ModalSelectBarang id="selectBarang" selectedRowData={selectedRowData}/>
    </>
  );
};

export default CreateRequestBarang;
