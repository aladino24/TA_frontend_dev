import React, { useEffect, useRef, useState } from "react";
import $, { data } from "jquery";
import axios from "axios";
import Config from "../../../../config";
import { useNavigate } from 'react-router-dom';

const ModalSelectBarang = (props) => {
  const tableRef = useRef(null);
  const { id, selectedRowData } = props;
  let navigate = useNavigate();

   const fetchData = async () => {
      try {
        const fc_distributorcode = selectedRowData.fc_distributorcode
          ? btoa(selectedRowData.fc_distributorcode)
          : "";
        const token = localStorage.getItem("token");
        const axiosConfig = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        };

        const response = await axios.get(
          Config.api.server3 + "stock-barang/" + fc_distributorcode,
          axiosConfig
        );

        const responseData = response.data.data;
        if ($.fn.DataTable.isDataTable("#dataTable")) {
          // If it is initialized, destroy it before reinitializing
          const existingTable = $(tableRef.current).DataTable();
          existingTable.destroy();
        }

        const formattedData = responseData
          ? responseData.map((distributor, index) => ({
              ...distributor,
              no: index + 1,
            }))
          : [];

        const table = $(tableRef.current).DataTable({
          responsive: true,
          processing: true,
          serverSide: false, // Ubah menjadi true jika ingin implementasi server-side processing
          data: formattedData,
          columnDefs: [],
          columns: [
            { data: "no" },
            { data: "stock.fc_stockcode" },
            { data: "stock.fc_namelong" },
            { data: "stock.fc_nameshort" },
            { data: "stock.fc_brand" },
            { data: "stock.fc_subgroup" },
            { data: "stock.fc_typestock1" },
            { data: "fc_batch" },
            { data: "fd_expired" },
            {
              data: "stock.fm_price_distributor",
              render: $.fn.dataTable.render.number(",", ".", 0, "Rp "),
            },
            {
              data: null,
            },
          ],
          rowCallback: function (row, data) {
            const actionBtns = `
                  <button class="btn btn-primary btn-sm" data-toggle="modal" data-target="#selectButton" id="selectButton">
                      <i class="fas fa-shopping-cart"></i>
                  </button>
                  `;
            $("td:eq(10)", row).html(actionBtns);

            $(tableRef.current).on("click", "#selectButton", function () {
              const rowData = table.row($(this).closest("tr")).data();
              // route to new component
              // close modal
              window.$(`#${id}`).modal('hide');
              navigate('/request-barang/create/detail', { state: { data: rowData } });
            });
          },
        });
      } catch (error) {}
    };


  useEffect(() => {
    fetchData();

    return () => {
      // Hancurkan DataTable saat komponen dilepas
      const existingTable = $(tableRef.current).DataTable();
      existingTable.destroy();
    };
  }, [selectedRowData]);
  return (
    <div
      className="modal fade"
      id={id}
      tabIndex="-1"
      role="dialog"
      aria-labelledby="editModalLabel"
    >
      <div
        className="modal-dialog modal-xl"
        role="document"
        style={{ maxWidth: "90%", maxHeight: "90%" }}
      >
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">
              {selectedRowData ? selectedRowData.fc_distributorname1 : ""}
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
          <div className="modal-body">
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
                      <th>Kode Barang</th>
                      <th>Nama Barang</th>
                      <th>Sebutan</th>
                      <th>Brand</th>
                      <th>Sub Group</th>
                      <th>Tipe Stock</th>
                      <th>Batch</th>
                      <th>Tgl.Expired</th>
                      <th>Harga</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tfoot className="bg-primary text-light">
                    <tr>
                      <th>No</th>
                      <th>Kode Barang</th>
                      <th>Nama Barang</th>
                      <th>Sebutan</th>
                      <th>Brand</th>
                      <th>Sub Group</th>
                      <th>Tipe Stock</th>
                      <th>Batch</th>
                      <th>Tgl Expired</th>
                      <th>Harga</th>
                      <th>Actions</th>
                    </tr>
                  </tfoot>
                </table>
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalSelectBarang;
