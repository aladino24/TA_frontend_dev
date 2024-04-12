import React from "react";

const DaftarRequestBarang = () => {
  return (
    <>
      <div className="container-fluid">
      <div className="row">
        {/*   <!-- Area Chart --> */}
        <div className="col-xl-10 col-lg-10">
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
                      <th>Kode Barang</th>
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
                      <th>Kode Barang</th>
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
