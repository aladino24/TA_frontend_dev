import React, { useEffect, useState } from "react";
import moment from "moment";
import "./styles/style.css";
import axios from "axios";
import Config from "../../../../config";
import SweetAlertLoading from "../../../../components/SweetAlertLoading";
import SweetAlertSubmitConfirmation from "../../../../components/SweetAlertSubmitConfirmation";
import SweetAlertSuccess from "../../../../components/SweetAlertSuccess";
import SweetAlertError from "../../../../components/SweetAlertError";

const CreateRequestBarangMaster = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [formData, setFormData] = useState({
    fd_soexpired: "",
    ft_description: "",
    fv_member_address_loading: "",
  });

  const checkToken = async () => {
    const token = localStorage.getItem('token');
    const axiosConfig = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      const response = await axios.get(
        `${Config.api.server1}check-token`,
        axiosConfig
      );

      const dataUser = response.data.user;

      if (response.status === 200) {
        setUserData(dataUser);
        setLoading(false);
      }
    } catch (error) {
      console.error("Token validation failed:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    checkToken();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowConfirmation(true);
  };

  const handleConfirm = async () => {
    setShowConfirmation(false);
    setLoading(true);

    const token = localStorage.getItem('token');
    const axiosConfig = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    const payload = {
      fc_userid: userData ? userData.userid : "",
      fc_sotype: "GROSIR",
      fc_membercode: userData?.ascustomer?.fc_membercode || "",
      fd_soexpired: formData.fd_soexpired,
      ft_description: formData.ft_description,
      fv_member_address_loading: formData.fv_member_address_loading,
    };

    try {
      const response = await axios.post(
        `${Config.api.server3}create-request-so-master`,
        payload,
        axiosConfig
      );

      if (response.status === 201) {
        setShowSuccess(true);
      } else {
        setErrorMessage("An unexpected error occurred.");
        setShowError(true);
      }
    } catch (error) {
      console.error("Error submitting the form:", error);
      setErrorMessage("Error submitting the form.");
      setShowError(true);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setShowConfirmation(false);
  };

  const handleAlertConfirm = () => {
    setShowSuccess(false);
    setShowError(false);
    window.location.reload();
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
                    data-toggle="collapse"
                    data-target="#mycard-collapse"
                    aria-expanded="true"
                    aria-controls="mycard-collapse"
                  >
                    <i className="fas fa-minus"></i>
                  </button>
                </div>
              </div>
              {/* <input type="text" id="fc_branch" value="" hidden /> */}
              <form onSubmit={handleSubmit}>
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
                            name="fc_userid"
                            id="fc_userid"
                            value={userData ? userData.userid : ""}
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
                              value={userData?.ascustomer?.fc_membercode || ""}
                              readOnly
                            />
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
                            value="0"
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
                            value={formData.fd_soexpired}
                            onChange={handleInputChange}
                          />
                        </div>
                      </div>
                      <div className="col-12 col-md-6 col-lg-6">
                        <div className="form-group">
                          <label>Deskripsi</label>
                          <textarea
                            className="form-control"
                            id="ft_description"
                            name="ft_description"
                            rows="1"
                            value={formData.ft_description}
                            onChange={handleInputChange}
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
                            value={formData.fv_member_address_loading}
                            onChange={handleInputChange}
                          ></textarea>
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
        </div>
      </div>

      <SweetAlertLoading show={loading} />
      <SweetAlertSubmitConfirmation
        show={showConfirmation}
        message="Do you really want to submit the changes?"
        content="Yes, submit"
        onConfirm={handleConfirm}
        onCancel={handleCancel}
      />
      <SweetAlertSuccess
        show={showSuccess}
        message="Form submitted successfully!"
        onConfirm={handleAlertConfirm}
      />
      <SweetAlertError
        show={showError}
        message={errorMessage}
        onConfirm={handleAlertConfirm}
      />
    </>
  );
};

export default CreateRequestBarangMaster;