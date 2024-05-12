import React from "react";

const ModalPersediaanBarang = (props) => {
    const { id, selectedRowData} = props;
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
                { selectedRowData.stock.fc_namelong }
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
}

export default ModalPersediaanBarang;