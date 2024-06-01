import React, { useEffect, useState } from "react";
import moment from "moment";
import "./styles/style.css";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import { InputIcon } from "primereact/inputicon";
import { InputText } from "primereact/inputtext";
import { IconField } from "primereact/iconfield";

const CreateRequestBarangDetail = () => {
  const [supplierCode, setSupplierCode] = useState("");
  const [statusPkp, setStatusPkp] = useState("");
  const [isInformasiUmumOpen, setIsInformasiUmumOpen] = useState(false);
  const [isDetailSupplier, setDetailSupplier] = useState(false);
  const [products, setProducts] = useState([]);

    useEffect(() => {
        const exampleData = [
            { no: 1, kodeBarang: 'A001', namaProduk: 'Produk A', satuan: 'pcs', harga: 10000, disc: 5, qty: 10, total: 95000, kedatangan: '2024-06-01', catatan: 'Baik' },
            { no: 2, kodeBarang: 'A002', namaProduk: 'Produk B', satuan: 'pcs', harga: 20000, disc: 10, qty: 5, total: 90000, kedatangan: '2024-06-02', catatan: 'Rusak' },
        ];
        setProducts(exampleData);
    }, []);

  const user = {
    fc_branch: "branchCode", // Replace with actual data
    fc_username: "username", // Replace with actual data
  };

  const handleSupplierClick = () => {
    console.log("Supplier modal clicked");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted");
  };

  const toggleInformasiUmum = () => {
    setIsInformasiUmumOpen(!isInformasiUmumOpen);
  };

  const toggleDetailSupplier = () => {
    setDetailSupplier(!isDetailSupplier);
  }

  
  const renderHeader = () => {
    return (
        <div className="d-flex justify-content-between p-2">
            <h4>Daftar Detail Barang</h4>
            <IconField iconPosition="left">
                <InputIcon className="pi pi-search" />
                <InputText placeholder="Keyword Search" />
            </IconField>
        </div>
    );
};

const header = renderHeader();


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
                    onClick={toggleInformasiUmum}
                    aria-expanded={isInformasiUmumOpen}
                    aria-controls="mycard-collapse"
                  >
                    <i className={`fas fa-${isInformasiUmumOpen ? "minus" : "plus"}`}></i>
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
                <div className={`collapse ${isInformasiUmumOpen ? "show" : ""}`} id="mycard-collapse">
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
                    onClick={toggleDetailSupplier}
                    aria-expanded={isDetailSupplier}
                    aria-controls="mycard-collapse2"
                  >
                     <i className={`fas fa-${isDetailSupplier ? "minus" : "plus"}`}></i>
                  </button>
                </div>
              </div>
              <div className={`collapse ${isDetailSupplier ? "show" : ""}`} id="mycard-collapse2">
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
                        <label>Alamat Pengiriman</label>
                        <input
                          type="text"
                          className="form-control"
                          name="fc_supplieraddress1"
                          id="fc_supplieraddress1"
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
        <div className="row mt-4 mb-4">
          <div className="col-12 col-md-12 col-lg-6">
            <div className="card">
              <div className="card-body" style={{ paddingTop: "30px!important" }}>
                <form
                  id="form_submit_custom"
                  action="/apps/sales-order/detail/store-update"
                  method="POST"
                  autoComplete="off"
                >
                  <div className="row">
                    <div className="col-12 col-md-6 col-lg-6">
                      <div className="form-group">
                        <label>Kode Barang</label>
                        <div className="input-group mb-3">
                          <input
                            type="text"
                            className="form-control"
                            id="fc_barcode"
                            name="fc_barcode"
                            readOnly
                          />
                          <div className="input-group-append">
                            <button className="btn btn-primary" type="button" onClick="">
                              <i className="fa fa-search"></i>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-12 col-md-6 col-lg-3">
                      <label>Qty</label>
                      <div className="form-group">
                        <input
                          type="number"
                          min="0"
                          onInput={(e) =>
                            (e.target.value = e.target.value && Math.abs(e.target.value) >= 0 ? Math.abs(e.target.value) : null)
                          }
                          className="form-control"
                          name=""
                          id=""
                        />
                      </div>
                    </div>
                    <div className="col-12 col-md-6 col-lg-3">
                      <label>Bonus</label>
                      <div className="form-group">
                        <input
                          type="number"
                          min="0"
                          onInput={(e) =>
                            (e.target.value = e.target.value && Math.abs(e.target.value) >= 0 ? Math.abs(e.target.value) : null)
                          }
                          className="form-control"
                          name=""
                          id=""
                        />
                      </div>
                    </div>
                    <div className="col-12 col-md-6 col-lg-5">
                      <div className="form-group">
                        <label>Harga</label>
                        <div className="input-group">
                          <div className="input-group-prepend">
                            <div className="input-group-text">Rp.</div>
                          </div>
                          <input
                            type="text"
                            className="form-control format-rp"
                            name=""
                            id=""
                            required
                          />
                        </div>
                      </div>
                    </div>
                    <div className="col-12 col-md-6 col-lg-7">
                      <div className="form-group">
                        <label>Deskripsi</label>
                        <div className="input-group">
                          <input type="text" className="form-control" fdprocessedid="hgh1fp" name="" />
                        </div>
                      </div>
                    </div>
                    <div className="col-12 col-md-12 col-lg-12 text-right">
                      <button className="btn btn-success">Add Item</button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>

          <div className="col-12 col-md-12 col-lg-6">
            <div className="card">
              <div className="card-header">
                <h4>Calculation</h4>
              </div>
              <div className="card-body" style={{ height: "190px" }}>
                <div className="d-flex">
                  <div className="flex-row-item" style={{ marginRight: "30px" }}>
                    <div className="d-flex" style={{ gap: "5px", whiteSpace: "pre" }}>
                      <p className="text-secondary flex-row-item" style={{ fontSize: "medium" }}>Item</p>
                      <p className="text-success flex-row-item text-right" style={{ fontSize: "medium" }} id="count_item">0,00</p>
                    </div>
                    <div className="d-flex">
                      <p className="flex-row-item"></p>
                      <p className="flex-row-item text-right"></p>
                    </div>
                    <div className="d-flex" style={{ gap: "5px", whiteSpace: "pre" }}>
                      <p className="text-secondary flex-row-item" style={{ fontSize: "medium" }}>Disc. Total</p>
                      <p className="text-success flex-row-item text-right" style={{ fontSize: "medium" }} id="fm_so_disc">0,00</p>
                    </div>
                    <div className="d-flex">
                      <p className="flex-row-item"></p>
                      <p className="flex-row-item text-right"></p>
                    </div>
                    <div className="d-flex" style={{ gap: "5px", whiteSpace: "pre" }}>
                      <p className="text-secondary flex-row-item" style={{ fontSize: "medium" }}>Total</p>
                      <p className="text-success flex-row-item text-right" style={{ fontSize: "medium" }} id="total_harga">0,00</p>
                    </div>
                  </div>
                  <div className="flex-row-item">
                    <div className="d-flex" style={{ gap: "5px", whiteSpace: "pre" }}>
                      <p className="text-secondary flex-row-item" style={{ fontSize: "medium" }}>Pelayanan</p>
                      <p className="text-success flex-row-item text-right" style={{ fontSize: "medium" }} id="fm_servpay">0,00</p>
                    </div>
                    <div className="d-flex">
                      <p className="flex-row-item"></p>
                      <p className="flex-row-item text-right"></p>
                    </div>
                    <div className="d-flex" style={{ gap: "5px", whiteSpace: "pre" }}>
                      <p className="text-secondary flex-row-item" style={{ fontSize: "medium" }}>Pajak</p>
                      <p className="text-success flex-row-item text-right" style={{ fontSize: "medium" }} id="fm_tax">0,00</p>
                    </div>
                    <div className="d-flex">
                      <p className="flex-row-item"></p>
                      <p className="flex-row-item text-right"></p>
                    </div>
                    <div className="d-flex" style={{ gap: "5px", whiteSpace: "pre" }}>
                      <p className="text-secondary flex-row-item" style={{ fontWeight: "bold", fontSize: "medium" }}>GRAND</p>
                      <p className="text-success flex-row-item text-right" style={{ fontWeight: "bold", fontSize: "medium" }} id="grand_total">Rp. 0,00</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          </div>

          <div className="row">
            <div className="col-12 col-md-12 col-lg-12">
              <div className="card">
              <DataTable 
                header={header} 
                value={products} 
                style={
                  {padding: '10px'}
                }
                showGridlines
              >
                        <Column field="no" header="No" align={'center'} />
                        <Column field="kodeBarang" header="Kode Barang" align={'center'}/>
                        <Column field="namaProduk" header="Nama Produk" align={'center'}/>
                        <Column field="satuan" header="Satuan" align={'center'}/>
                        <Column field="harga" header="Harga" align={'center'}/>
                        <Column field="disc" header="Disc" align={'center'}/>
                        <Column field="qty" header="Qty" align={'center'}/>
                        <Column field="total" header="Total" align={'center'}/>
                        <Column field="kedatangan" header="Kedatangan" align={'center'}/>
                        <Column field="catatan" header="Catatan" align={'center'}/>
                        <Column field="action" header="Action" align={'center'}/>
                    </DataTable>
              </div>
            </div>
          </div>
      </div>
    </>
  );
};

export default CreateRequestBarangDetail;
