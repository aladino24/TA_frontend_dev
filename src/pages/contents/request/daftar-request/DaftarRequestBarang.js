import axios from "axios";
import React, { useEffect, useRef } from "react";
import Config from "../../../../config";
import $, { data } from "jquery";

const DaftarRequestBarang = () => {
  const tableRef = useRef(null);

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
          Config.api.server3 + "daftar-request",
          axiosConfig
        );

      const responseData = response.data.data;
      if ($.fn.DataTable.isDataTable("#dataTable")) {
        // If it is initialized, destroy it before reinitializing
        const existingTable = $(tableRef.current).DataTable();
        existingTable.destroy();
      }


    const formattedData = responseData ? responseData.map((listData, index) => ({
        ...listData,
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
            {data: "fc_branch"},
            {data: "fc_ordercode"},
            {data: "fd_dateorder"},
            {data: "fc_barcode"},
            {data: "fc_operator"},
            {
              data: "fm_value",
              render: function(data, type, row) {
                  // Memastikan bahwa nilai diubah hanya saat tampilan
                  if (type === 'display') {
                      // Mengonversi nilai ke format mata uang Rupiah
                      return "Rp " + Number(data).toLocaleString('id-ID');
                  }
                  return data;
              }
            },
            {
              data: "fl_status",
              render: function(data, type, row) {
                  let label, color;
                  switch (data) {
                      case 'W':
                          label = 'Menunggu';
                          color = 'yellow';
                          break;
                      case 'A':
                          label = 'Diterima';
                          color = 'green';
                          break;
                      case 'R':
                          label = 'Permintaan Ditolak';
                          color = 'red';
                          break;
                      case 'D':
                          label = 'Sedang Dikirim';
                          color = 'blue';
                          break;
                      default:
                          label = data; // Jika nilai tidak cocok dengan yang diharapkan
                          color = '';
                  }
                  return '<span style="color:white; font-weight:bold; background-color:' + color + '; padding: 5px; border-radius: 10px">' + label + '</span>';
              }
            },
            {
                data: null,
            }
        ],
        rowCallback: function(row, data) {
          const actionBtns = `
            <button class="btn btn-sm btn-primary" id="detailBtn">Detail</button>
          `;
          $("td:eq(9)", row).html(actionBtns);
        },
        
        });

    } catch (error) {
      
    }
  }

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
      <div className="row">
        {/*   <!-- Area Chart --> */}
        <div className="col-xl-12 col-lg-12">
          <div className="card shadow mb-4">
            {/*  <!-- Card Header - Dropdown --> */}
            <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
              <h6 className="m-0 font-weight-bold text-primary">
                Daftar Permintaan Barang
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
                      <th>Kode Pesanan</th>
                      <th>Tanggal Pesanan</th>
                      <th>Barcode</th>
                      <th>Operator</th>
                      <th>Total Harga</th>
                      <th>Status Pesanan</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tfoot>
                    <tr>
                      <th>No</th>
                      <th>Division</th>
                      <th>Cabang</th>
                      <th>Kode Pesanan</th>
                      <th>Tanggal Pesanan</th>
                      <th>Barcode</th>
                      <th>Operator</th>
                      <th>Total Harga</th>
                      <th>Status Pesanan</th>
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

export default DaftarRequestBarang;
