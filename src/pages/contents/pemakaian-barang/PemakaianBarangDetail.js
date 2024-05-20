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

const PemakaianBarangDetail = () => {
    const location = useLocation();
    const responseValue = location.state?.responseData?.data;

    const [isCameraAccessGranted, setIsCameraAccessGranted] = useState(false);
    const [showConfirmationAlert, setShowConfirmationAlert] = useState(false);
    const [showErrorAlert, setShowErrorAlert] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [showAlertSuccess, setShowAlertSuccess] = useState(false);
    const [loading, setLoading] = useState(false);
    const [barcodeData, setBarcodeData] = useState(""); // State to hold the scanned barcode data
    const [isModalOpen, setIsModalOpen] = useState(false); // State to control modal visibility

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
        setBarcodeData("032903791900000000000000000000000000000965296001000000031122023");
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
                setBarcodeData(decodedText); 
                document.getElementById('result').value = decodedText;
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

    const clickModalBarcode = () => {
        setIsModalOpen(true); // Open the modal
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
                            <div className="card-body">
                                <h4 className="card-title">Informasi Pengguna atau Pasien</h4>
                        
                                    <div className="row">
                                        <div className="form-group col-6">
                                            <label htmlFor="fc_patient_name">Nama <span className="text-danger">*</span></label>
                                            <input 
                                                type="text" 
                                                className="form-control" 
                                                id="fc_patient_name" 
                                                name="fc_patient_name" 
                                                value={formValues.fc_patient_name}
                                                readOnly
                                                required 
                                            />
                                        </div>
                                        <div className="form-group col-6">
                                            <label htmlFor="fn_patient_age">Umur</label>
                                            <input 
                                                type="number" 
                                                className="form-control" 
                                                id="fn_patient_age" 
                                                name="fn_patient_age"
                                                readOnly
                                                value={formValues.fn_patient_age}
                                                placeholder="Umur" 
                                            />
                                        </div>
                                    </div>
                                   <div className="row">
                                        <div className="form-group col-6">
                                            <label htmlFor="fc_patient_gender">Jenis Kelamin</label>
                                            <select 
                                                className="form-control" 
                                                id="fc_patient_gender" 
                                                name="fc_patient_gender" 
                                                value={formValues.fc_patient_gender}
                                                required 
                                                disabled
                                            >
                                                <option value="">Pilih Jenis Kelamin</option>
                                                <option value="Laki-laki">Laki-laki</option>
                                                <option value="Perempuan">Perempuan</option>
                                            </select>
                                        </div>
                                        <div className="form-group col-6">
                                            <label htmlFor="fc_patient_phone">Kontak <span className="text-danger">*</span></label>
                                            <input 
                                                type="text" 
                                                className="form-control" 
                                                id="fc_patient_phone" 
                                                name="fc_patient_phone" 
                                                placeholder="Kontak" 
                                                value={formValues.fc_patient_phone}
                                                readOnly
                                                required 
                                            />
                                        </div>
                                   </div>
                                   <div className="row">
                                        <div className="form-group col-12">
                                            <label htmlFor="fc_patient_address">Alamat <span className="text-danger">*</span></label>
                                            <input 
                                                type="text" 
                                                className="form-control" 
                                                id="fc_patient_address" 
                                                name="fc_patient_address" 
                                                placeholder="Alamat" 
                                                readOnly
                                                value={formValues.fc_patient_address}
                                                required 
                                            />
                                        </div>
                                   </div>
                                   <div className="row">
                                        <div className="form-group col-12">
                                            <label htmlFor="fv_description">Catatan</label>
                                            <textarea 
                                                className="form-control" 
                                                id="fv_description" 
                                                name="fv_description" 
                                                placeholder="Catatan" 
                                                readOnly
                                                value={formValues.fv_description}
                                            />
                                        </div>
                                   </div>
                                   {/* Button Submit */}
                                    <button type="button" onClick={() => handleDelete()} className="btn btn-danger">Cancel Pemakaian</button>
   
                            </div>
                        </div>
                    </div>
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
                                        <input type="text" className="form-control" value="032903791900000000000000000000000000000965296001000000031122023" id="result" name="fc_barcode" readOnly />
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
                                <h4 className="card-title">Detail Pemakaian Barang</h4>
                                <div className="table-responsive">
                                    <table className="table table-bordered" id="dataTable" width="100%" cellSpacing="0">
                                        <thead>
                                            <tr>
                                                <th>No</th>
                                                <th>Nama Barang</th>
                                                <th>Jumlah</th>
                                                <th>Satuan</th>
                                                <th>Keterangan</th>
                                                <th>Aksi</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {/* Add table rows here */}
                                        </tbody>
                                    </table>
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
               message="Data has been successfully deleted!"
                onConfirm={handleCloseAlertSuccess}
             />

             <SweetAlertError
                 message={errorMessage}
                show={showErrorAlert}
                onConfirm={handleCloseAlertError}
             />

            <BarcodeDetailModal
                isOpen={isModalOpen}
                onRequestClose={() => setIsModalOpen(false)}
                barcodeData={barcodeData}
            />
        </div>
    );
}

export default PemakaianBarangDetail;
