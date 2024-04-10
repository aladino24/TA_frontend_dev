import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Select from 'react-select'
import Config from "../../../../config";
import axios from "axios";

const CreateRequestBarangDetail = () => {
  const location = useLocation();
  const data = location.state.data;
  const [bankOptions, setBankOptions] = useState([]);

  const paymentMethodCodeOptions = [
    { value: '1', label: '1' },
    { value: '2', label: '2' },
    { value: '3', label: '3' },
  ];



  const fetchData = async () => {
    try {
      const token = localStorage.getItem("token");
      const requestBarangApiUrl = Config.api.server3 + "master/bank-name";
      
      
      const [
        bankResponse
      ] = await Promise.all([
        axios.get(requestBarangApiUrl, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }),
      ]);

      const bankData = bankResponse.data.data;
      const formattedBankData = bankData.map((bank) => ({
        value: bank.fv_description,
        label: bank.fv_description,
      }));

      setBankOptions(formattedBankData);
      } catch (error) {
        console.log(error);
      }
  }

  useEffect(() => {
    fetchData();
  }
  , []);

  return (
    <>
      <div className="container-fluid">
        <div className="d-sm-flex align-items-center mb-2">
          <h1 className="h3 mb-0 text-gray-800">Detail Request</h1>
        </div>
        <div className="row">
          {/* <!-- Area Chart --> */}
          <div className="col-xl-7 col-lg-7">
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
                  <div className="row">
                    <div className="col-md-4">
                      <div className="form-group">
                        <label htmlFor="fc_typestock1">Tipe Stock</label>
                        <input
                          type="text"
                          className="form-control"
                          id="fc_typestock1"
                          value={data.stock.fc_typestock1}
                          onChange={() => {}}
                          readOnly
                        />
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="form-group">
                        <label htmlFor="fc_batch">Batch</label>
                        <input
                          type="text"
                          className="form-control"
                          id="fc_batch"
                          value={data.fc_batch}
                          onChange={() => {}}
                          readOnly
                        />
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="form-group">
                        <label htmlFor="fm_price_distributor">Harga</label>
                        <input
                          type="text"
                          className="form-control"
                          id="fm_price_distributor"
                          value={data.stock.fm_price_distributor.toLocaleString('id-ID', { style: 'currency', currency: 'IDR' })}
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
                  <div className="row">
                    <div className="col-md-6">
                      <div className="form-group">
                        <label htmlFor="paymentmethod_code">Kode Metode Pembayaran</label>
                        <Select 
                          options={paymentMethodCodeOptions}
                          onChange={() => {}}
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <label htmlFor="deskripsi_bayar">Deskripsi Bayar</label>
                        <input
                          type="text"
                          className="form-control"
                          id="deskripsi_bayar"
                          onChange={() => {}}
                          readOnly
                        />
                      </div>
                    </div>
                  </div>
                  <div className="form-group">
                    <label htmlFor="fc_distributorname1">Bank Pembayaran</label>
                    <Select 
                      options={bankOptions}
                      onChange={() => {}}
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

                  <button type="submit" className="btn btn-primary">
                    Kirim
                  </button>
                </form>
              </div>
            </div>
          </div>
          <div className="col-xl-5 col-lg-5">
            <div className="card shadow mb-4">
              {/* <!-- Card Header - Dropdown --> */}
              <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                <h6 className="m-0 font-weight-bold text-primary">
                  Profil
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

              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateRequestBarangDetail;
