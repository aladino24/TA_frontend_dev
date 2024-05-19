import React, { useEffect, useState } from "react";
import './styles/style.css';
import { Html5QrcodeScanner, Html5QrcodeScanType } from 'html5-qrcode';

const PemakaianBarangDetail = () => {
    const [isCameraAccessGranted, setIsCameraAccessGranted] = useState(false);

    useEffect(() => {
        if (isCameraAccessGranted) {
            const audio = new Audio('/audio/scan.mp3');

            const onScanSuccess = (decodedText) => {
                audio.play();
                document.getElementById('result').value = decodedText;
                // You may call your function to handle scan success here
            };

            const onScanFailure = (error) => {
                console.warn(`Code scan error = ${error}`);
                // Handle scan failure
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
        // Implement your modal functionality here
    };

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
                                <form>
                                    <div className="row">
                                        <div className="form-group col-6">
                                            <label htmlFor="fc_patient_name">Nama <span className="text-danger">*</span></label>
                                            <input type="text" className="form-control" id="fc_patient_name" name="fc_patient_name" placeholder="Nama Pengguna atau Pasien" required />
                                        </div>
                                        <div className="form-group col-6">
                                            <label htmlFor="fn_patient_age">Umur</label>
                                            <input type="number" className="form-control" id="fn_patient_age" name="fn_patient_age" placeholder="Umur" />
                                        </div>
                                    </div>
                                   <div className="row">
                                        <div className="form-group col-6">
                                            <label htmlFor="fc_patient_gender">Jenis Kelamin</label>
                                            <select className="form-control" id="fc_patient_gender" name="fc_patient_gender" required>
                                                <option value="">Pilih Jenis Kelamin</option>
                                                <option value="Laki-laki">Laki-laki</option>
                                                <option value="Perempuan">Perempuan</option>
                                            </select>
                                        </div>
                                        <div className="form-group col-6">
                                            <label htmlFor="fc_patient_phone">Kontak <span className="text-danger">*</span></label>
                                            <input type="text" className="form-control" id="fc_patient_phone" name="fc_patient_phone" placeholder="Kontak" required />
                                        </div>
                                   </div>
                                   <div className="row">
                                        <div className="form-group col-12">
                                            <label htmlFor="fc_patient_address">Alamat <span className="text-danger">*</span></label>
                                            <input type="text" className="form-control" id="fc_patient_address" name="fc_patient_address" placeholder="Alamat" required />
                                        </div>
                                   </div>
                                   <div className="row">
                                        <div className="form-group col-12">
                                            <label htmlFor="fv_description">Catatan</label>
                                            <textarea className="form-control" id="fv_description" name="fv_description" placeholder="Catatan" />
                                        </div>
                                   </div>
                                   {/* Button Submit */}
                                    <button type="submit" className="btn btn-primary">Submit</button>
                                </form>
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
                                        <input type="text" className="form-control" id="result" name="fc_barcode" readOnly />
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
        </div>
    );
}

export default PemakaianBarangDetail;
