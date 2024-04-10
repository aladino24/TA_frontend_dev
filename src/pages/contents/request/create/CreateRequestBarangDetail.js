import React from "react";
import { useLocation } from "react-router-dom";

const CreateRequestBarangDetail = () => {
  const location = useLocation();
  const data = location.state.data;
  return (
    <>
      <div className="container-fluid">
        <div className="d-sm-flex align-items-center mb-2">
          <h1 className="h3 mb-0 text-gray-800">Detail Request</h1>
        </div>
        <div className="row">
          {/* <!-- Area Chart --> */}
          <div className="col-xl-10 col-lg-10">
            <div className="card shadow mb-4">
              {/* <!-- Card Header - Dropdown --> */}
              <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                <h6 className="m-0 font-weight-bold text-primary">
                  Kirim Permintaan Barang
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
              {/* <!-- Card Body --> */}
              <div className="card-body">
                <form>
                 <div className="row">
                    <div className="col-md-6">
                        <div className="form-group">
                            <label htmlFor="namaBarang">Nama Barang</label>
                            <input
                            type="text"
                            className="form-control"
                            id="fc_namelong"
                            value={data.stock.fc_namelong}
                            onChange={() => {}}
                            readOnly
                            />
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="form-group">
                            <label htmlFor="namaBarang">Kode Barang</label>
                            <input
                            type="text"
                            className="form-control"
                            id="fc_namelong"
                            value={data.stock.fc_stockcode}
                            onChange={() => {}}
                            readOnly
                            />
                        </div>
                        </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <div className="form-group">
                        <label htmlFor="fc_nameshort">Sebutan</label>
                        <input
                          type="text"
                          className="form-control"
                          id="fc_nameshort"
                          value={data.stock.fc_nameshort}
                          onChange={() => {}}
                          readOnly
                        />
                      </div>
                    </div>
                    <div className="col-md-3">
                      <div className="form-group">
                        <label htmlFor="fc_brand">Brand</label>
                        <input
                          type="text"
                          className="form-control"
                          id="fc_brand"
                          value={data.stock.fc_brand}
                          onChange={() => {}}
                          readOnly
                        />
                      </div>
                    </div>
                    <div className="col-md-3">
                      <div className="form-group">
                        <label htmlFor="fc_subgroup">Sub Group</label>
                        <input
                          type="text"
                          className="form-control"
                          id="fc_subgroup"
                          value={data.stock.fc_subgroup}
                          onChange={() => {}}
                          readOnly
                        />
                      </div>
                    </div>
                  </div>
                  <div className="form-group">
                    <label htmlFor="fn_quantity">Quantity</label>
                    <input
                      type="number"
                      className="form-control"
                      id="fn_quantity"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="keterangan">Keterangan</label>
                    <textarea
                      className="form-control"
                      id="fv_description"
                      rows="3"
                    ></textarea>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateRequestBarangDetail;
