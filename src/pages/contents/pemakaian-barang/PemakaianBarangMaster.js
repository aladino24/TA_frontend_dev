import React, { useState } from "react";
import axios from "axios";
import SweetAlertError from "../../../components/SweetAlertError";
import Config from "../../../config";
import SweetAlertConfirmationYesOrNo from "../../../components/SweetAlertConfirmationYesOrNo";
import SweetAlertLoading from "../../../components/SweetAlertLoading";

const PemakaianBarangMaster = () => {
    const [formData, setFormData] = useState({
        fc_patient_name: "",
        fn_patient_age: "",
        fc_patient_gender: "",
        fc_patient_phone: "",
        fc_patient_address: "",
        fv_description: ""
    });

    const [showErrorAlert, setShowErrorAlert] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [showConfirmationAlert, setShowConfirmationAlert] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setShowConfirmationAlert(true);
    };

    const confirmSubmit = async () => {
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
            const response = await axios.post(
                Config.api.server2 + "pemakaian-barang/store-patient",
                formData,
                axiosConfig
            );

            const responseData = response.data;

            if (responseData.success) {
                window.location.reload();
                setFormData({
                    fc_patient_name: "",
                    fn_patient_age: "",
                    fc_patient_gender: "",
                    fc_patient_phone: "",
                    fc_patient_address: "",
                    fv_description: ""
                });
            } else {
                setErrorMessage("Error: " + responseData.message);
                setShowErrorAlert(true);
            }
        } catch (error) {
            setErrorMessage("Error: " + error.message);
            setShowErrorAlert(true);
        } finally {
            setLoading(false);
        }
    };

    const handleCloseAlert = () => {
        setShowErrorAlert(false);
    };

    const handleCancelConfirmation = () => {
        setShowConfirmationAlert(false);
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
                                <form onSubmit={handleSubmit}>
                                    <div className="row">
                                        <div className="form-group col-6">
                                            <label htmlFor="fc_patient_name">Nama <span className="text-danger">*</span></label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="fc_patient_name"
                                                name="fc_patient_name"
                                                placeholder="Nama Pengguna atau Pasien"
                                                required
                                                value={formData.fc_patient_name}
                                                onChange={handleChange}
                                            />
                                        </div>
                                        <div className="form-group col-6">
                                            <label htmlFor="fn_patient_age">Umur</label>
                                            <input
                                                type="number"
                                                className="form-control"
                                                id="fn_patient_age"
                                                name="fn_patient_age"
                                                placeholder="Umur"
                                                value={formData.fn_patient_age}
                                                onChange={handleChange}
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
                                                value={formData.fc_patient_gender}
                                                onChange={handleChange}
                                                required
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
                                                value={formData.fc_patient_phone}
                                                onChange={handleChange}
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
                                                value={formData.fc_patient_address}
                                                onChange={handleChange}
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
                                                value={formData.fv_description}
                                                onChange={handleChange}
                                            />
                                        </div>
                                    </div>
                                    {/* Button Submit */}
                                    <button type="submit" className="btn btn-primary">Submit</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <SweetAlertError
                show={showErrorAlert}
                message={errorMessage}
                onConfirm={handleCloseAlert}
            />
            <SweetAlertConfirmationYesOrNo
                show={showConfirmationAlert}
                message="Do you want to submit this form?"
                content="Yes"
                onConfirm={confirmSubmit}
                onCancel={handleCancelConfirmation}
            />
            <SweetAlertLoading show={loading} />
        </div>
    );
};

export default PemakaianBarangMaster;
