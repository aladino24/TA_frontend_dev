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
import { useLocation } from "react-router-dom";
import { Dialog } from "primereact/dialog";
import BarangDialog from "./Components/BarangDialog";
import axios from "axios";
import Config from "../../../../config";
import SweetAlertLoading from "../../../../components/SweetAlertLoading";
import { Button } from "primereact/button";
import { useNavigate } from "react-router-dom";
import SweetAlertSubmitConfirmation from "../../../../components/SweetAlertSubmitConfirmation";
import SweetAlertSuccess from "../../../../components/SweetAlertSuccess";
import SweetAlertError from "../../../../components/SweetAlertError";

const CreateRequestBarangDetail = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const responseValue = location.state?.responseData?.data;
  const [supplierCode, setSupplierCode] = useState("");
  const [statusPkp, setStatusPkp] = useState("");
  const [isInformasiUmumOpen, setIsInformasiUmumOpen] = useState(false);
  const [isDetailSupplier, setDetailSupplier] = useState(false);
  const [products, setProducts] = useState([]);
  const [isDialogVisible, setIsDialogVisible] = useState(false);
  const [barangData, setBarangData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [qtyValue, setQtyValue] = useState("");
  const [salesPrice, setSalesPrice] = useState(0);
  const [barcode, setBarcode] = useState("");
  const [stockcode, setStockcode] = useState("");
  const [namepack, setNamepack] = useState("");
  const [catatan, setCatatan] = useState("");
  const [soMasterData, setSoMasterData] = useState([]);
  const [jumlahItem, setJumlahItem] = useState("");
  const [brutto, setBrutto] = useState("");
  const [stockData, setStockData] = useState([]);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");


  const fetchExistRequestSo = async () => {
    setLoading(true);
    const token = localStorage.getItem('token');
    const axiosConfig = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
  
    try {
      const response = await axios.get(
        Config.api.server3 + 'exist-request-so-master',
        axiosConfig
      );
  
      const responseSoData = response.data.data;
      const responseSoDetail = responseSoData.requestsodetail || [];
  
      if (response.data.success) {
        setLoading(false);
        setProducts(responseSoDetail || []);
        setSoMasterData(responseSoData);
        setJumlahItem(responseSoData.fn_sodetail || "");
        setBrutto(responseSoData.fm_brutto || "");
      } else {
        setLoading(false);
        navigate('/request-barang/create/master')
      }
    } catch (error) {
      setLoading(false);
      console.error("Error fetching master data:", error);
    } finally {
      setLoading(false);
    }
  };
  
  


  // console.log(responseValue)
    useEffect(() => {
      fetchExistRequestSo();
    }, []);

  const handleDialogHide = (selectedItem) => {
    setIsDialogVisible(false);
    if (selectedItem) {
      setSalesPrice(Number(selectedItem.fm_sales));
      setBarcode(selectedItem.fc_barcode);
      setStockcode(selectedItem.fc_stockcode);
      setNamepack(selectedItem.fc_namepack);
      setStockData(selectedItem);
    }
  };

  const handleInsertDetail = async (e) => {
    e.preventDefault();
    setLoading(true)
    const data = {
        fc_stockcode: stockcode,
        fc_barcode: barcode,
        fc_namepack: namepack,
        fn_qty: qtyValue,
        fm_price: salesPrice,
        ft_description: catatan,
        stock: stockData
    };

    const token = localStorage.getItem('token');
    const axiosConfig = {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    };

    try {
        const response = await axios.post(
            `${Config.api.server3}create-request-so-detail`,
            data,  
            axiosConfig
        );
        if(response.data.success){
          fetchExistRequestSo();
          setLoading(false)
        }
    } catch (error) {
      setLoading(false)
        // handle error response
        console.error('Detail item gagal ditambahkan:', error.response.data);
    } finally{
      setLoading(false)
    }
};

// handleconfirm submit
  const handleConfirmSubmit = () => {
    setShowConfirmation(true);
  }

  const handleSubmitRequest = async() => {
    setShowConfirmation(false);
    setLoading(true);
    const token = localStorage.getItem('token');
        const axiosConfig = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        };
    try {
      const response = await axios.post(
        `${Config.api.server3}submit-request-so-order`,
        {},
        axiosConfig
      );
      if(response.data.success){
        setLoading(false);
        setSuccessMessage(response.data.message);
        setShowSuccess(true);
      }
    } catch (error) {
      setLoading(false);
      setErrorMessage(error);
    }finally{
      setLoading(false);
    }
  };

  const handleCancelSubmit = () => {
    setShowConfirmation(false);
  };

  const handleAlertConfirm = () => {
    setShowSuccess(false);
    setShowError(false);
    window.location.reload();
  };

  const toggleInformasiUmum = () => {
    setIsInformasiUmumOpen(!isInformasiUmumOpen);
  };

  const handleKodeBarangClick = async () => {
    setLoading(true);
    const token = localStorage.getItem("token");
    const axiosConfig = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
  
    try {
      const response = await axios.get(
        `${Config.api.server3}external-stock`,
        axiosConfig
      );
      const responseData = response.data.data;
      setBarangData(responseData);
      setIsDialogVisible(true);
    } catch (error) {
      console.error("Error fetching stock data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteRow = async(rowData) => {
    setLoading(true);
    // console.log(rowData);
    const token = localStorage.getItem("token");
    const axiosConfig = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      const response = await axios.delete(
        `${Config.api.server3}delete-request-so-detail/${rowData}`,
        axiosConfig
      );

      const resposeData = response.data;

      if(resposeData.success){
        fetchExistRequestSo();
       setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      console.error("Error delete stock data:", error);
    }finally{
      setLoading(false);
    }
  }


  const rowIndexTemplate = (rowData, column) => {
    return column.rowIndex + 1;
  };
  

  
  const renderHeader = () => {
    return (
        <div className="d-flex justify-content-between p-2">
            <h4>Daftar Detail Barang</h4>
            <div className="input-group" style={{ maxWidth: '200px' }}>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Keyword Search"
                            aria-label="Keyword Search"
                            aria-describedby="basic-addon2"
                            onChange={(e) => { }}
                        />
                        <div className="input-group-append">
                            <span className="input-group-text" id="basic-addon2">
                                <i className="pi pi-search"></i>
                            </span>
                        </div>
                    </div>
        </div>
    );
};


const header = renderHeader();

const deleteIconTemplate = (rowData) => {
  return (
      <Button 
          icon="pi pi-trash" 
          className="rounded p-button-danger"
          onClick={() => handleDeleteRow(rowData.fn_rownum)} 
      />
  );
};


  return (
    <>
      <div className="container-fluid">
        <div className="full-width-container">
          <h3>Request Barang</h3>
        </div>
        <div className="row">
        <div className="col-12 col-md-12 col-lg-12">
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
              {/* <input type="text" id="fc_branch" value={user ? user.fc_branch : ""}  hidden /> */}
              <form>
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
                            name="fc_userid"
                            id="fc_userid"
                            value={soMasterData ? soMasterData.created_by : ""}
                            readOnly
                          />
                        </div>
                      </div>
                      <div className="col-12 col-md-6 col-lg-6">
                        <div className="form-group">
                          <label>Request Type</label>
                          <input
                            type="text"
                            className="form-control"
                            id="fc_sotype"
                            name="fc_sotype"
                            value="GROSIR"
                            readOnly
                          />
                        </div>
                      </div>
                      <div className="col-12 col-md-6 col-lg-6">
                        <div className="form-group required">
                          <label>Membercode</label>
                          <div className="input-group mb-3">
                            <input
                              type="text"
                              className="form-control"
                              id="fc_membercode"
                              name="fc_membercode"
                              value={soMasterData ? soMasterData.fc_membercode : ""}
                              readOnly
                            />
                            {/* <div className="input-group-append">
                              <button
                                className="btn btn-primary"
                                type="button"
                                onClick={handleSupplierClick}
                              >
                                <i className="fa fa-search"></i>
                              </button>
                            </div> */}
                          </div>
                        </div>
                      </div>
                      <div className="col-12 col-md-6 col-lg-6">
                        <div className="form-group">
                          <label>Jumlah Item</label>
                          <input
                            type="text"
                            className="form-control"
                            id="fn_sodetail"
                            name="fn_sodetail"
                            value={soMasterData ? soMasterData.fn_sodetail : ""}
                            readOnly
                          />
                        </div>
                      </div>
                      <div className="col-12 col-md-6 col-lg-6">
                          <div className="form-group">
                            <label>Tanggal Expired</label>
                            <input
                              type="date"
                              className="form-control"
                              id="fd_soexpired"
                              name="fd_soexpired"
                              value={soMasterData && soMasterData.fd_soexpired ? soMasterData.fd_soexpired.split(' ')[0] : ""}
                              readOnly
                          />
                          </div>
                      </div>
                      <div className="col-12 col-md-6 col-lg-6">
                          <div className="form-group">
                            <label>Deskripsi</label>
                            <textarea
                              className="form-control"
                              id="fv_description"
                              name="fv_description"
                              rows="1"
                              value={soMasterData ? soMasterData.ft_description : ""}
                              readOnly
                            ></textarea>
                          </div>
                      </div>
                      <div className="col-12 col-md-7 col-lg-7">
                          <div className="form-group">
                            <label>Alamat Pengiriman</label>
                            <textarea
                              className="form-control"
                              id="fv_member_address_loading"
                              name="fv_member_address_loading"
                              rows="2"
                              value={soMasterData ? soMasterData.fv_member_address_loading : ""}
                              readOnly
                            ></textarea>
                          </div>
                      </div>
                      <div className="col-12 col-md-12 col-lg-12 text-right">
                        <button type="submit" className="btn btn-danger">
                          Cancel Request
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
        <div className="row mt-4 mb-4">
          <div className="col-12 col-md-12 col-lg-6">
            <div className="card">
              <div className="card-body" style={{ paddingTop: "30px!important" }}>
                <form onSubmit={handleInsertDetail} id={'item-stock'}>
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
                            onChange={() => {}}
                            value={barcode}
                            readOnly
                          />
                          <div className="input-group-append">
                            <button className="btn btn-primary" type="button" onClick={handleKodeBarangClick}>
                              <i className="fa fa-search"></i>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-12 col-md-6 col-lg-6">
                      <label>Qty</label>
                      <div className="form-group">
                        <input
                          type="number"
                          min="0"
                          onInput={(e) =>
                            (e.target.value = e.target.value && Math.abs(e.target.value) >= 0 ? Math.abs(e.target.value) : null)
                          }
                          className="form-control"
                          name="fn_qty"
                          id="fn_qty"
                          value={qtyValue} 
                           onChange={(e) => setQtyValue(e.target.value)} 
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
                            type="number"
                            className="form-control"
                            name="fm_sales"
                            id="fm_sales"
                            value={salesPrice}
                            readOnly
                          />
                        </div>
                      </div>
                    </div>
                    <div className="col-12 col-md-6 col-lg-7">
                      <div className="form-group">
                        <label>Catatan</label>
                        <div className="input-group">
                          <input 
                            type="text" 
                            className="form-control" 
                            fdprocessedid="hgh1fp" 
                            name="fv_description" 
                            id="fv_description"
                            onChange={(e) => setCatatan(e.target.value)}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="col-12 col-md-12 col-lg-12 text-right">
                      <button className="btn btn-warning">Add Item</button>
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
                      <p className="text-success flex-row-item text-right" style={{ fontSize: "medium" }} id="count_item">{jumlahItem ? jumlahItem : "0,00"}</p>
                    </div>
                    <div className="d-flex">
                      <p className="flex-row-item"></p>
                      <p className="flex-row-item text-right"></p>
                    </div>
                    <div className="d-flex" style={{ gap: "5px", whiteSpace: "pre" }}>
                      <p className="text-secondary flex-row-item" style={{ fontSize: "medium" }}>Disc. Total</p>
                      <p className="text-success flex-row-item text-right" style={{ fontSize: "medium" }} id="fm_so_disc">0,00</p>
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
                      <p className="text-secondary flex-row-item" style={{ fontSize: "medium" }}>Total</p>
                      <p className="text-success flex-row-item text-right" style={{ fontSize: "medium" }} id="fm_tax">{brutto ? brutto : "0,00"}</p>
                    </div>
                    <div className="d-flex">
                      <p className="flex-row-item"></p>
                      <p className="flex-row-item text-right"></p>
                    </div>
                    <div className="d-flex" style={{ gap: "5px", whiteSpace: "pre" }}>
                      <p className="text-secondary flex-row-item" style={{ fontWeight: "bold", fontSize: "medium" }}>GRAND</p>
                      <p className="text-success flex-row-item text-right" style={{ fontWeight: "bold", fontSize: "medium" }} id="grand_total">Rp. {brutto}</p>
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
                style={{ padding: '10px' }}
                showGridlines
                emptyMessage={<div style={{ textAlign: 'center' }}>No available options</div>}
              >
                <Column field="no" header="No" body={rowIndexTemplate} align={'center'} />
                <Column field="fc_stockcode" header="Kode Barang" align={'center'} />
                <Column field="stock.fv_namestock" header="Nama Produk" align={'center'} />
                <Column field="stock.fc_namepack" header="Satuan" align={'center'} />
                <Column field="stock.fm_sales" header="Harga" align={'center'} />
                <Column field="fn_qty" header="Qty" align={'center'} />
                <Column field="fm_value" header="Total" align={'center'} />
                <Column field="ft_description" header="Catatan" align={'center'} />
                <Column body={deleteIconTemplate} align={'center'} />
              </DataTable>
              </div>
            </div>
          </div>

          {/* Button submit */}
          <div className="row mt-4">
            <div className="col-12 col-md-12 col-lg-12 d-flex justify-content-end">
              <button className="btn btn-success" onClick={handleConfirmSubmit}>
                Submit Request
              </button>
            </div>
          </div>
      </div>
      <BarangDialog
        isVisible={isDialogVisible}
        onHide={handleDialogHide}
        data={barangData}
      />

      <SweetAlertSubmitConfirmation
        show={showConfirmation}
        message="Apakah kamu yakin submit request?"
        content="Yes, submit"
        onConfirm={handleSubmitRequest}
        onCancel={handleCancelSubmit}
      />

      <SweetAlertSuccess
        show={showSuccess}
        message={successMessage}
        onConfirm={handleAlertConfirm}
      />
      <SweetAlertError
        show={showError}
        message={errorMessage}
        onConfirm={handleAlertConfirm}
      />
      
      <SweetAlertLoading show={loading} />
    </>
  );
};

export default CreateRequestBarangDetail;
