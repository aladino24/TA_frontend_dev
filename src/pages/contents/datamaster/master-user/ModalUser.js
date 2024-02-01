import React, { useEffect, useState } from "react";
import RadioButtons from "../../../../components/RadioButton";
import { event } from "jquery";
import Select from 'react-select'
import Config from "../../../../config";
import axios from "axios";
import SweetAlertSuccess from "../../../../components/SweetAlertSuccess";
import SweetAlertLoading from "../../../../components/SweetAlertLoading";
import SweetAlertError from "../../../../components/SweetAlertError";

const ModalUser = (props) => {

    const [branchOptions, setBranchOptions] = useState([]);
    const [groupUserOptions, setGroupUserOptions] = useState([]);
    const [passwordMatchError, setPasswordMatchError] = useState('');
    const [flHold, setFlHold] = useState('');
    const [showSuccess, setShowSuccess] = useState(false);
    const [showLoading, setShowLoading] = useState(false);
    const [showError, setShowError] = useState(false);
    const [inputData, setInputData] = useState({
        divisioncode: "SBY001",
        branch: "",
        userid: "",
        username: "",
        password: "",
        c_password: "",
        fc_groupuser: "",
        fl_level: "",
        fl_hold: "",
        fd_expired: "",
        fv_ttdpath: "",
        fv_description: "",
    });


    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = localStorage.getItem("token");

                const branchApiUrl = Config.api.server2 + "get-data-where-field-id-get/TransaksiType/fc_trx/BRANCH";
                const groupUserApiUrl = Config.api.server1 + "get-groupuser";

                const [
                    branchResponse,
                    groupUserResponse
                ] = await Promise.all([
                    axios.get(branchApiUrl),
                    axios.get(groupUserApiUrl)
                ]);

                const branchData = branchResponse.data.data;
                const groupUserData = groupUserResponse.data.data;

                const branchOptions = branchData.map((branch) => ({
                    value: branch.fc_kode,
                    label: branch.fv_description,
                }));

                setBranchOptions(branchOptions);

                const groupUserOptions = groupUserData.map((group) => ({
                    value: group.fc_groupcode,
                    label: group.fc_groupname
                }));
                setGroupUserOptions(groupUserOptions);

            } catch (error) {
                console.log(error);
            }
            
        };

        fetchData();

    }, []);



    const handleBranchChange = (event) => {
        setInputData(prevInputData => ({
            ...prevInputData,
            branch: event.value,
        }));
    };

    const handleGroupUserChange = (event) => {
        setInputData(prevInputData => ({
            ...prevInputData,
            fc_groupuser: event.value,
        }));
    };

    const handlePasswordChange = (event) => {
        setInputData(prevInputData => ({
            ...prevInputData,
            password: event.target.value,
        }));
        const matchError = inputData.password !== inputData.c_password ? 'Password does not match' : '';
        // console.log(inputData.password)
        // console.log(inputData.confirmPassword)
        setPasswordMatchError(matchError)
    }

    const handleConfirmPasswordChange = (event) => {
        const matchError = inputData.password !== event.target.value ? 'Password does not match' : '';
        setInputData(
            prevInputData => ({
                ...prevInputData,
                c_password: event.target.value
            })
        )
        setPasswordMatchError(matchError);
    }

    const handleHoldChange = (value) => {
        if (value !== flHold) {
            setFlHold(value);
            setInputData(prevInputData => ({
                ...prevInputData,
                fl_hold: value,
            }));
       } 
    }

    const handleFileChange = (event) => {
        setInputData(prevInputData => ({
            ...prevInputData,
            fv_ttdpath: event.target.files[0],
        }));
        // console.log(event.target.files[0])
    }

    const handleSubmit = async(event) => {
        event.preventDefault();

        setShowLoading(true);
        const token = localStorage.getItem("token");
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "multipart/form-data",
            },
        };
        const formData = new FormData();
        formData.append("divisioncode", inputData.divisioncode);
        formData.append("branch", inputData.branch);
        formData.append("userid", inputData.userid);
        formData.append("username", inputData.username);
        formData.append("password", inputData.password);
        formData.append("c_password", inputData.c_password);
        formData.append("fc_groupuser", inputData.fc_groupuser);
        formData.append("fl_level", inputData.fl_level);
        formData.append("fl_hold", inputData.fl_hold);
        formData.append("fd_expired", inputData.fd_expired);
        formData.append("fv_ttdpath", inputData.fv_ttdpath);
        formData.append("fv_description", inputData.fv_description);

        try {
            const response = await axios.post(
                Config.api.server1 + "register",
                formData,
                config
            );
            // console.log(response);
            // alert("Data berhasil disimpan");
            // window.location.reload();
            if(response.status == 200){
                setShowSuccess(true);
                setShowLoading(false);
            }else{
                setShowError(true);
                setShowLoading(false);
            }
        } catch (error) {
            setShowError(true);
            setShowLoading(false);
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

    const handleSuccessAlertClose = () => {
        setShowSuccess(false);
        // Reload the page upon successful API response
        window.location.reload();
      };
    
      const handleErrorAlertClose = () => {
        setShowError(false);
      };

    return (
        <>
             <div
                className="modal fade"
                id={props.id}
                tabIndex="-1"
                role="dialog"
                aria-labelledby="editModalLabel">
                <div className="modal-dialog modal-lg" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="editModalLabel">
                                Tambah User
                            </h5>
                            <button
                                type="button"
                                className="close"
                                data-dismiss="modal"
                                aria-label="Close"
                            >
                            <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                       <form onSubmit={handleSubmit}>
                        <div className="modal-body">
                            <div className="row">
                                <div className="col-6">
                                <div className="form-group"> 
                                        <label className="form-label">Division Code</label>
                                        <input type="text" className="form-control" value={inputData.divisioncode} readOnly/>
                                </div>
                                </div>
                                <div className="col-6">
                                <div className="form-group"> 
                                        <label className="form-label">Cabang</label>
                                        <Select
                                            options={branchOptions}
                                            onChange={handleBranchChange}
                                            required
                                        />
                                </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-6">
                                    <div className="form-group"> 
                                            <label className="form-label">User ID</label>
                                            <input 
                                                type="text" 
                                                className="form-control" 
                                                placeholder="Userid"
                                                name="userid"
                                                id="userid"
                                                onChange={
                                                    (e) => setInputData(prevInputData => ({
                                                        ...prevInputData,
                                                        userid: e.target.value,
                                                    }))
                                                }
                                            />
                                    </div>
                                </div>
                                <div className="col-6">
                                    <div className="form-group"> 
                                            <label className="form-label">Username</label>
                                            <input 
                                                type="text" 
                                                className="form-control" 
                                                placeholder="Username"
                                                name="username"
                                                id="username"
                                                onChange={
                                                    (e) => setInputData(prevInputData => ({
                                                        ...prevInputData,
                                                        username: e.target.value,
                                                    }))
                                                }
                                            />
                                    </div>
                                </div>
                            </div>  
                            <div className="row">
                                <div className="col-6">
                                    <div className="form-group"> 
                                            <label className="form-label">Password</label>
                                            <input 
                                                type="password" 
                                                className="form-control" 
                                                placeholder="Password"
                                                name="password"
                                                id="password"
                                                onChange={handlePasswordChange}
                                            />
                                    </div>
                                </div>
                                <div className="col-6">
                                    <div className="form-group"> 
                                            <label className="form-label">Confirm Password</label>
                                            <input 
                                                type="password" 
                                                className="form-control" 
                                                placeholder="Confirm Password"
                                                name="c_password"
                                                id="c_password"
                                                onChange={handleConfirmPasswordChange}
                                            />
                                             {passwordMatchError && <p style={{ color: 'red' }}>{passwordMatchError}</p>}
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-6">
                                    <div className="form-group"> 
                                            <label className="form-label">Group User</label>
                                            <Select 
                                               options={groupUserOptions}
                                               onChange={handleGroupUserChange}
                                            />
                                    </div>
                                </div>
                                <div className="col-6">
                                    <div className="form-group"> 
                                            <label className="form-label">Level</label>
                                            <input 
                                                type="number" 
                                                name="fl_level" 
                                                className="form-control" 
                                                onChange={
                                                    (e) => setInputData(prevInputData => ({
                                                        ...prevInputData,
                                                        fl_level: e.target.value,
                                                    }))
                                                }
                                            />
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-6">
                                    <div className="form-group"> 
                                            <label className="form-label">Hold</label>
                                            <RadioButtons 
                                                name="fl_hold" 
                                                onChange={(value) => handleHoldChange(value)}
                                                options1="Active" 
                                                options2="Non Active"
                                            />
                                    </div>
                                </div>
                                <div className="col-6">
                                    <div className="form-group"> 
                                            <label className="form-label">Expired Date</label>
                                            <input 
                                                type="date" 
                                                className="form-control"
                                                name="fd_expired"
                                                id="fd_expired"
                                                onChange={
                                                    (e) => setInputData(prevInputData => ({
                                                        ...prevInputData,
                                                        fd_expired: e.target.value,
                                                    }))
                                                }
                                            />
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-6">
                                    <div className="form-group"> 
                                            <label className="form-label">Assign Role</label>
                                            <input type="text" className="form-control"/>
                                    </div>
                                </div>
                                <div className="col-6">
                                    <div className="form-group"> 
                                            <label className="form-label">Tanda Tangan</label>
                                            <input 
                                                type="file" 
                                                className="form-control"
                                                name="fv_ttdpath"
                                                onChange={handleFileChange}
                                            />
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-12">
                                    <div className="form-group"> 
                                            <label className="form-label">Description</label>
                                            {/* Text area */}
                                            <textarea 
                                                className="form-control" 
                                                rows="3"
                                                name="fv_description"
                                                id="fv_description"
                                                onChange={
                                                    (e) => setInputData(prevInputData => ({
                                                        ...prevInputData,
                                                        fv_description: e.target.value,
                                                    }))
                                                }
                                            >
                                            </textarea>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button
                                type="button"
                                className="btn btn-secondary"
                                data-dismiss="modal"
                            >
                            Close
                            </button>
                            <button type="submit" className="btn btn-primary">
                            Save changes
                            </button>
                        </div>
                      </form>
                    </div>
                </div>
            </div>

            <SweetAlertLoading show={showLoading} />

            <SweetAlertSuccess
            show={showSuccess}
            message="Update successful!"
            onClose={handleSuccessAlertClose}
            />

            <SweetAlertError
            show={showError}
            message="Update failed. Please try again."
            onClose={handleErrorAlertClose}
            />
        </>
    );
}

export default ModalUser;