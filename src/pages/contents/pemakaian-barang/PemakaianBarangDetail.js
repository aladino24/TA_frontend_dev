import React, { useEffect, useState } from "react";
import './styles/style.css';
import { Html5QrcodeScanner, Html5QrcodeScanType } from 'html5-qrcode';
import { useLocation } from "react-router-dom";
import SweetAlertConfirmationYesOrNo from "../../../components/SweetAlertConfirmationYesOrNo";
import axios from "axios";
import Config from "../../../config";
import SweetAlertLoading from "../../../components/SweetAlertLoading";
import SweetAlertSuccess from "../../../components/SweetAlertSuccess";
import SweetAlertError from "../../../components/SweetAlertError";
import BarcodeDetailModal from './components/BarcodeDetailModal'; // Import the modal component
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import { IconField } from "primereact/iconfield";
import { InputIcon } from "primereact/inputicon";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";


const PemakaianBarangDetail = () => {
    const location = useLocation();
    const responseValue = location.state?.responseData?.data;
    const [isCameraAccessGranted, setIsCameraAccessGranted] = useState(false);
    const [showConfirmationAlert, setShowConfirmationAlert] = useState(false);
    const [showErrorAlert, setShowErrorAlert] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [showAlertSuccess, setShowAlertSuccess] = useState(false);
    const [showMessageSuccess, setShowMessageSuccess] = useState('');
    const [loading, setLoading] = useState(false);
    const [detailData, setDetailData] = useState(""); 
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [usageDetailData, setUsageDetailData] = useState([]);

    const [formValues, setFormValues] = useState({
        fc_patient_id: "",
        fc_patient_name: "",
        fn_patient_age: "",
        fc_patient_gender: "",
        fc_patient_phone: "",
        fc_patient_address: "",
        fv_description: "",
    });

    useEffect(() => {
        setDetailData();
        if (responseValue) {
            setFormValues({
                fc_patient_id: responseValue.patient.fc_patient_id || "",
                fc_patient_name: responseValue.patient.fc_patient_name || "",
                fn_patient_age: responseValue.patient.fn_patient_age || "",
                fc_patient_gender: responseValue.patient.fc_patient_gender || "",
                fc_patient_phone: responseValue.patient.fc_patient_phone || "",
                fc_patient_address: responseValue.patient.fc_patient_address || "",
                fv_description: responseValue.fv_description || "",
            });
        }
    }, [responseValue]);

    useEffect(() => {
        if (isCameraAccessGranted) {
            const audio = new Audio('/audio/scan.mp3');

            const onScanSuccess = (decodedText) => {
                audio.play();
                document.getElementById('result').value = decodedText;
                clickModalBarcode(decodedText);
            };

            const onScanFailure = (error) => {
                console.warn(`Code scan error = ${error}`);
            };

            const qrboxFunction = (viewfinderWidth, viewfinderHeight) => {
                const minEdgePercentage = 0.7; // 70%
                const minEdgeSize = Math.min(viewfinderWidth, viewfinderHeight);
                const qrboxSize = Math.floor(minEdgeSize * minEdgePercentage);
                return {
                    width: qrboxSize,
                    height: qrboxSize
                };
            };

            const html5QrcodeScanner = new Html5QrcodeScanner(
                "reader", {
                    fps: 10,
                    qrbox: qrboxFunction,
                    supportedScanTypes: [
                        Html5QrcodeScanType.SCAN_TYPE_CAMERA
                    ],
                    showTorchButtonIfSupported: true,
                    showZoomSliderIfSupported: true,
                }, false);
            html5QrcodeScanner.render(onScanSuccess, onScanFailure);

            return () => {
                html5QrcodeScanner.clear();
            };
        }
    }, [isCameraAccessGranted]);

    const requestCameraAccess = () => {
        setIsCameraAccessGranted(true);
    };

    const clickModalBarcode = async() => {
        setLoading(true);
        const barcodeValue = document.getElementById('result').value;
        const encodedBarcode = btoa(barcodeValue);

        // config
        const token = localStorage.getItem('token');
        const axiosConfig = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        };

        try {
            const response = await axios.get(
                `${Config.api.server2}pemakaian-barang/detail-barang/${encodedBarcode}`, 
                axiosConfig
            );
            setLoading(false);
            const data = response.data.data;
            setDetailData(data); 
            setIsModalOpen(true); // Open the modal
        } catch (error) {
            setLoading(false);
            setErrorMessage("Failed to fetch barcode details");
            setShowErrorAlert(true);
        }
    };

    const handleDelete = () => {
        setShowConfirmationAlert(true);
    }

    const confirmDelete = async() => {
        setShowConfirmationAlert(false);
        setLoading(true);
        const token = localStorage.getItem('token');
        const axiosConfig = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        };

        try {
            const response = await axios.delete(
                Config.api.server2 + "pemakaian-barang/delete-usage-master/" + formValues.fc_patient_id,
                axiosConfig
            );

            const responseData = response.data;

            if (response.status === 201) {
                setShowMessageSuccess(
                    responseData.message
                );
                setShowAlertSuccess(true);
                setTimeout(() => {
                    window.location.href = "/pemakaian-barang";
                }, 2000)
            }else{
                setErrorMessage("Error: " + responseData.message);
                setShowErrorAlert(true);
                setLoading(false);
            }
        } catch (error) {
            setErrorMessage("Error: " + error.message);
            setShowErrorAlert(true);
            setLoading(false);
        }finally{
            setLoading(false);
            setTimeout(() => {
                setShowAlertSuccess(false);
            }, 2000);
        }
    }

    const fetchUsageDetail = async() => {
        // setLoading(true);
        const token = localStorage.getItem('token');
        const axiosConfig = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        };
        try {
            const response = await axios.get(
                `${Config.api.server2}pemakaian-barang/new-scanqr`,
                axiosConfig
            );
            // setUsageDetailData(response.data.data);
            const dataResponse = response.data.data;
            setUsageDetailData(dataResponse);
        } catch (error) {
       
        }
    }

    useEffect(() => {
        fetchUsageDetail();
    }, []);

    const handleDeleteDetail = () => {

    }

    const totalBodyTemplate = (rowData) => {
        return (rowData.invstore.stock.fm_price_default * rowData.fn_quantity_used).toLocaleString();
    }

    const actionBodyTemplate = (rowData) => {
        return (
            <Button 
                label="Delete" 
                icon="pi pi-trash" 
                className="custom-rounded-button p-button-danger pl-2 pr-2"  
                onClick={() => handleDeleteDetail(rowData)} 
            />
        );
    };
    
    const handleCancelConfirmation = () => {
        setShowConfirmationAlert(false);
    };

    const handleCloseAlertSuccess = () => {
        setShowAlertSuccess(false);
    }

    const handleCloseAlertError = () => {
        setShowErrorAlert(false);
    }

    return (
        <div className="container-fluid">
            <div className="d-sm-flex align-items-center justify-content-between mb-4">
                <h1 className="h3 mb-0 text-gray-900">Scan Pemakaian Barang</h1>
            </div>
            <div className="section-body">
                <div className="row">
                  
                    <div className="col-12 col-md-12 col-lg-12 mb-4">
                        <div className="card">
                            <div className="card-body text-center">
                                <div id="reader" width="600px">
                                    {!isCameraAccessGranted && (
                                        <button className="btn btn-primary" onClick={requestCameraAccess}>
                                            <i className="fas fa-camera"></i> Request Access Camera
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-12 col-md-12 col-lg-12 mb-4">
                        <div className="card">
                            <div className="card-body">
                                <div className="form-group required">
                                    <label>Hasil Scan</label>
                                    <div className="input-group">
                                        <input type="text" className="form-control"  id="result" name="fc_barcode" readOnly />
                                        <div className="input-group-append">
                                            <button className="btn btn-primary" onClick={clickModalBarcode} type="button" id="detail">
                                                <i className="fa fa-eye"></i> Detail
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-12 col-md-12 col-lg-12">
                        <div className="card">
                            <div className="card-body">
                                {/* Tabel detail penggunaan */}
                                <h4 className="card-title">Pemakaian Barang Terbaru</h4>
                                <div className="table-responsive">
                                    <DataTable value={usageDetailData} paginator rows={10} showGridlines rowsPerPageOptions={[5, 10, 20]}>
                                        <Column field="DT_RowIndex" align={"center"} header="No" />
                                        <Column field="fc_scanqrno" align={"center"} header="Kode Pemakaian" />
                                        <Column field="invstore.stock.fc_stockcode" align={"center"} header="Katalog" />
                                        <Column field="invstore.stock.fc_namelong" align={"center"} header="Nama Barang" />
                                        <Column field="fd_scanqrdate" align={"center"} header="Tgl Pemakaian" />
                                        <Column field="invstore.fc_batch" align={"center"} header="Batch" />
                                        <Column field="invstore.fd_expired" align={"center"} header="Expired Date" />
                                        <Column field="fv_description" align={"center"} header="Catatan" />
                                    </DataTable>
                                </div>
                            </div>
                         </div>
                    </div>
                </div>
            </div>

            <SweetAlertConfirmationYesOrNo
                show={showConfirmationAlert}
                message="Do you want to delete this data?"
                content="Yes"
                onConfirm={confirmDelete}
                onCancel={handleCancelConfirmation}
            />

            <SweetAlertLoading show={loading} />

            <SweetAlertSuccess
               show={showAlertSuccess}
               message={showMessageSuccess}
                onConfirm={handleCloseAlertSuccess}
             />

             <SweetAlertError
                 message={errorMessage}
                show={showErrorAlert}
                onConfirm={handleCloseAlertError}
             />

            {isModalOpen && <BarcodeDetailModal isOpen={isModalOpen} onUpdate={fetchUsageDetail} onRequestClose={() => setIsModalOpen(false)} data={detailData} />}
        </div>
    );
}

export default PemakaianBarangDetail;
