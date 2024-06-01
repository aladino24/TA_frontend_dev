import React, { useState } from "react";
import moment from "moment";
import "./styles/style.css";

const CreateRequestBarangMaster = () => {
  const [supplierCode, setSupplierCode] = useState("");
  const [statusPkp, setStatusPkp] = useState("");
  const user = {
    fc_branch: "branchCode", // Replace with actual data
    fc_username: "username" // Replace with actual data
  };

  const handleSupplierClick = () => {
    console.log("Supplier modal clicked");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted");
  };

  return (
    <>
      <div className="container-fluid">
        <div className="full-width-container">
          <h3>Request Barang</h3>
        </div>
        <div className="row">
          <div className="col-12 col-md-4 col-lg-4">
            <div className="card">
              <div className="card-header d-flex justify-between">
                <h4>Informasi Umum</h4>
                <div className="card-header-action">
                  <button
                    className="btn btn-icon btn-info"
                    data-toggle="collapse"
                    data-target="#mycard-collapse"
                    aria-expanded="true"
                    aria-controls="mycard-collapse"
                  >
                    <i className="fas fa-minus"></i>
                  </button>
                </div>
              </div>
              <input type="text" id="fc_branch" value={user.fc_branch} hidden />
              <form
                id="form_submit"
                action="/apps/purchase-order/store-update"
                method="POST"
                autoComplete="off"
                onSubmit={handleSubmit}
              >
                <div className="collapse show" id="mycard-collapse">
                  <div className="card-body">
                    <div className="row">
                      <div className="col-12 col-md-12 col-lg-12">
                        <div className="form-group">
                          <label>Tanggal: {moment().format("DD/MM/YYYY")}</label>
                        </div>
                      </div>
                      <div className="col-12 col-md-12 col-lg-6">
                        <div className="form-group">
                          <label>Operator</label>
                          <input
                            type="text"
                            className="form-control"
                            name=""
                            id=""
                            value={user.fc_username}
                            readOnly
                          />
                        </div>
                      </div>
                      <div className="col-12 col-md-6 col-lg-6">
                        <div className="form-group">
                          <label>PO Type</label>
                          <input
                            type="text"
                            className="form-control"
                            id="fc_potype"
                            name="fc_potype"
                            value="PO Beli"
                            readOnly
                          />
                        </div>
                      </div>
                      <div className="col-12 col-md-6 col-lg-6">
                        <div className="form-group required">
                          <label>Supplier Code</label>
                          <div className="input-group mb-3">
                            <input
                              type="text"
                              className="form-control"
                              id="fc_suppliercode"
                              name="fc_suppliercode"
                              value={supplierCode}
                              readOnly
                            />
                            <div className="input-group-append">
                              <button
                                className="btn btn-primary"
                                type="button"
                                onClick={handleSupplierClick}
                              >
                                <i className="fa fa-search"></i>
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-12 col-md-6 col-lg-6">
                        <div className="form-group">
                          <label>Status PKP</label>
                          <input
                            type="text"
                            className="form-control"
                            id="status_pkp"
                            name="fc_status_pkp"
                            value={statusPkp}
                            readOnly
                          />
                        </div>
                      </div>
                      <div className="col-12 col-md-12 col-lg-12 text-right">
                        <button type="submit" className="btn btn-success">
                          Save Changes
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>

          <div className="col-12 col-md-8 col-lg-8">
            <div className="card">
              <div className="card-header">
                <h4>Detail Supplier</h4>
                <div className="card-header-action">
                  <button
                    className="btn btn-icon btn-info"
                    data-toggle="collapse"
                    data-target="#mycard-collapse2"
                    aria-expanded="true"
                    aria-controls="mycard-collapse2"
                  >
                    <i className="fas fa-minus"></i>
                  </button>
                </div>
              </div>
              <div className="collapse show" id="mycard-collapse2">
                <div className="card-body">
                  <div className="row">
                    <div className="col-4 col-md-4 col-lg-4">
                      <div className="form-group">
                        <label>NPWP</label>
                        <input
                          type="text"
                          className="form-control"
                          name="fc_supplierNPWP"
                          id="fc_supplierNPWP"
                          readOnly
                        />
                      </div>
                    </div>
                    <div className="col-4 col-md-4 col-lg-4">
                      <div className="form-group">
                        <label>Tipe Cabang</label>
                        <input
                          type="text"
                          className="form-control"
                          name="fc_branchtype"
                          id="fc_branchtype"
                          readOnly
                          hidden
                        />
                        <input
                          type="text"
                          className="form-control"
                          name="fc_branchtype_desc"
                          id="fc_branchtype_desc"
                          readOnly
                        />
                      </div>
                    </div>
                    <div className="col-4 col-md-4 col-lg-4">
                      <div className="form-group">
                        <label>Tipe Bisnis</label>
                        <input
                          type="text"
                          className="form-control"
                          name="fc_suppliertypebusiness"
                          id="fc_suppliertypebusiness"
                          readOnly
                          hidden
                        />
                        <input
                          type="text"
                          className="form-control"
                          name="fc_suppliertypebusiness_desc"
                          id="fc_suppliertypebusiness_desc"
                          readOnly
                        />
                      </div>
                    </div>
                    <div className="col-4 col-md-4 col-lg-4">
                      <div className="form-group">
                        <label>Nama</label>
                        <input
                          type="text"
                          className="form-control"
                          name="fc_suppliername1"
                          id="fc_suppliername1"
                          readOnly
                        />
                      </div>
                    </div>
                    <div className="col-4 col-md-4 col-lg-4">
                      <div className="form-group">
                        <label>Telepon</label>
                        <input
                          type="text"
                          className="form-control"
                          name="fc_supplierphone1"
                          id="fc_supplierphone1"
                          readOnly
                        />
                      </div>
                    </div>
                    <div className="col-4 col-md-4 col-lg-4">
                      <div className="form-group">
                        <label>Masa Hutang</label>
                        <input
                          type="text"
                          className="form-control"
                          name="fn_supplierAgingAR"
                          id="fn_supplierAgingAR"
                          readOnly
                        />
                      </div>
                    </div>
                    <div className="col-4 col-md-4 col-lg-4">
                      <div className="form-group">
                        <label>Legal Status</label>
                        <input
                          type="text"
                          className="form-control"
                          name="fc_supplierlegalstatus"
                          id="fc_supplierlegalstatus"
                          readOnly
                          hidden
                        />
                        <input
                          type="text"
                          className="form-control"
                          name="fc_supplierlegalstatus_desc"
                          id="fc_supplierlegalstatus_desc"
                          readOnly
                        />
                      </div>
                    </div>
                    <div className="col-4 col-md-4 col-lg-4">
                      <div className="form-group">
                        <label>Alamat</label>
                        <input
                          type="text"
                          className="form-control"
                          name="fc_supplier_npwpaddress1"
                          id="fc_supplier_npwpaddress1"
                          readOnly
                        />
                      </div>
                    </div>
                    <div className="col-4 col-md-4 col-lg-4">
                      <div className="form-group">
                        <label>Hutang</label>
                        <input
                          type="text"
                          className="form-control"
                          name="fm_supplierAR"
                          id="fm_supplierAR"
                          readOnly
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          
        </div>
      </div>
    </>
  );
};

export default CreateRequestBarangMaster;
