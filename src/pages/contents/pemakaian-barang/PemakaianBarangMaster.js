import React from "react";

const PemakaianBarangMaster = () => {
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
            </div>
        </div>
    </div>
    );
}

export default PemakaianBarangMaster;