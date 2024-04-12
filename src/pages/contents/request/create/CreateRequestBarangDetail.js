import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Select from 'react-select'
import Config from "../../../../config";
import axios from "axios";
import SweetAlertError from "../../../../components/SweetAlertError";
import SweetAlertSuccess from "../../../../components/SweetAlertSuccess";
import SweetAlertLoading from "../../../../components/SweetAlertLoading";
import { fn } from "jquery";

const CreateRequestBarangDetail = () => {
  const location = useLocation();
  const data = location.state.data;
  const [bankOptions, setBankOptions] = useState([]);
  const [paymentMethodCodeOptions, setPaymentMethodCodeOptions] = useState([]);
  const [showLoading, setShowLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);
  const [selectedDeskripsiBayar, setSelectedDeskripsiBayar] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessages, setErrorMessages] = useState([]);
  const [inputData, setInputData] = useState({
    fc_divisioncode: '',
    fc_branch: '',
    fc_operator: '',
    fc_membercode: '',
    fc_barcode: data.fc_barcode,
    fn_quantity: '',
    fc_paymentmethod: '',
    fc_ordercode: '',
    fc_bankpayment: '',
    fm_price: data.stock.fm_price_distributor,
  });


    // Fungsi untuk menghasilkan nomor dokumen
    const generateDocumentNumber = () => {
      const today = new Date();
      const month = (today.getMonth() + 1).toString().padStart(2, '0');
      const year = today.getFullYear().toString().slice(-2);
      const randomChars = Math.random().toString(36).substring(2, 8).toUpperCase();
      return `ORDER/${month}/${year}/${randomChars}`;
    }

  const fetchData = async () => {
    try {
      const token = localStorage.getItem("token");
      const checkTokenApiUrl = Config.api.server1 + "check-token";
      const paymentMethodCodeApiUrl = Config.api.server3 + "master/payment-method-code";
      const banknameApiUrl = Config.api.server3 + "master/bank-name";
      
      const [
        checkTokenResponse,
        paymentMethodCodeResponse,
        bankResponse
      ] = await Promise.all([
        axios.get(checkTokenApiUrl, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }),
        axios.get(paymentMethodCodeApiUrl, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }),
        axios.get(banknameApiUrl, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }),
      ]);

      // console.log(checkTokenResponse.data.user.fc_membercode);
     
      const operatorData = checkTokenResponse.data.user;
      setInputData({
        ...inputData,
        fc_divisioncode: operatorData.divisioncode,
        fc_branch: operatorData.branch,
        fc_operator: operatorData.username,
        fc_membercode: operatorData.fc_membercode,
      });

      const paymentMethodCodeData = paymentMethodCodeResponse.data.data;
      const formattedPaymentMethodCodeData = paymentMethodCodeData.map((paymentMethodCode) => ({
        value: paymentMethodCode.fv_description,
        label: paymentMethodCode.fc_kode,
      }));

      setPaymentMethodCodeOptions(formattedPaymentMethodCodeData);

      const bankData = bankResponse.data.data;
      const formattedBankData = bankData.map((bank) => ({
        value: bank.fc_kode,
        label: bank.fv_description,
      }));

      setBankOptions(formattedBankData);

      setInputData(prevState => ({
        ...prevState,
        fc_ordercode: generateDocumentNumber()
      }));
      } catch (error) {
        console.log(error);
      }
  }

  useEffect(() => {
    fetchData();
  }
  , []);

  const handleSuccessAlertClose = () => {
    setShowSuccess(false);
    // Reload the page upon successful API response
    window.location.href = "/request-barang/create";
  };

  const handleErrorAlertClose = () => {
    setShowError(false);
  };


  const handleSubmit = async (event) => {
    setShowLoading(true);
    event.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const createRequestBarangApiUrl = Config.api.server3 + "create-request-barang";
      const response = await axios.post(createRequestBarangApiUrl, inputData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.data.success) {
        setSuccessMessage(response.data.message);
        setShowSuccess(true);
        setShowLoading(false);
      }else{
        setErrorMessages(response.data.message);
        setShowError(true);
        setShowLoading(false);
      }

    } catch (error) {
      setShowError(true);
      if (error.response) {
          console.log('Response Data:', error.response.data);
          console.log('Response Status:', error.response.status);
          console.log('Response Headers:', error.response.headers);
      } else if (error.request) {
          console.log('Request made but no response received:', error.request);
      } else {
          console.log('Error during request setup:', error.message);
      }
      console.log('Config:', error.config);
    }finally{
        setShowLoading(false);
    }
  }

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
                <form onSubmit={handleSubmit}>
                  <div className="form-group">
                    <label htmlFor="fc_ordercode">Kode Pesanan</label>
                    <input
                      type="text"
                      className="form-control"
                      id="fc_ordercode"
                      value={inputData.fc_ordercode}
                      readOnly
                    />
                  </div>
                 <div className="row">
                    <div className="col-md-6">
                        <div className="form-group">
                            <label htmlFor="fc_namelong">Nama Barang</label>
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
                      defaultValue="0"
                      id="fn_quantity"
                      onChange={
                        (event) => {
                          setInputData({
                            ...inputData,
                            fn_quantity: event.target.value,
                          });
                        }
                      }
                    />
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <div className="form-group">
                        <label htmlFor="paymentmethod_code">Kode Metode Pembayaran</label>
                        <Select 
                          name="fc_paymentmethod"
                          options={paymentMethodCodeOptions}
                          onChange={(event) => {
                            const selectedPaymentMethodCode = paymentMethodCodeOptions.find((paymentMethodCode) => paymentMethodCode.label === event.label);
                            setSelectedDeskripsiBayar(selectedPaymentMethodCode.value);
                            setInputData({
                              ...inputData,
                              fc_paymentmethod: event.value,
                            });
                          }}
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
                          value={selectedDeskripsiBayar}
                          readOnly
                        />
                      </div>
                    </div>
                  </div>
                  <div className="form-group">
                    <label htmlFor="fc_distributorname1">Bank Pembayaran</label>
                    <Select 
                      options={bankOptions}
                      onChange={
                        (event) => {
                          setInputData({
                            ...inputData,
                            fc_bankpayment: event.label,
                          });
                        }
                      }
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="keterangan">Keterangan</label>
                    <textarea
                      className="form-control"
                      id="fv_description"
                      rows="3"
                      onChange={
                        (event) => {
                          setInputData({
                            ...inputData,
                            fv_description: event.target.value,
                          });
                      }
                    }
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
                    <div className="row" >
                       <div className="col-md-12">
                          <label>Nama Operator</label>
                          <input
                            type="text"
                            className="form-control"
                            id="fc_operator"
                            value={inputData.fc_operator}
                            readOnly
                          />
                       </div>
                    </div>
                    <div className="row mt-4" >
                       <div className="col-md-12">
                          <label>Kode Customer</label>
                          <input
                            type="text"
                            className="form-control"
                            id="fc_membercode"
                            value={inputData.fc_membercode}
                            readOnly
                          />
                       </div>
                    </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <SweetAlertLoading show={showLoading} />

        <SweetAlertSuccess
        show={showSuccess}
        message={successMessage}
        onClose={handleSuccessAlertClose}
        />

        <SweetAlertError
          show={showError}
          message={errorMessages}
          onClose={handleErrorAlertClose}
        />
    </>
  );
};

export default CreateRequestBarangDetail;
