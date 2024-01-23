import React, { useEffect, useState } from "react";
import RadioButtons from "../../../../components/RadioButton";
import { event } from "jquery";
import Select from 'react-select'
import Config from "../../../../config";
import axios from "axios";

const ModalUser = (props) => {

    const [branchOptions, setBranchOptions] = useState([]);
    const [groupUserOptions, setGroupUserOptions] = useState([]);
    const [passwordMatchError, setPasswordMatchError] = useState('');
    const [inputData, setInputData] = useState({
        divisioncode: "",
        branch: "",
        userid: "",
        username: "",
        password: "",
        confirmPassword: "",
        fc_groupuser: ""
    });


    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = localStorage.getItem("token");

                const branchApiUrl = Config.api.server2 + "get-data-where-field-id-get/TransaksiType/fc_trx/BRANCH";
                const groupUserApiUrl = Config.api.server2 + "get-data-where-field-id-get/TransaksiType/fc_trx/GROUPUSER";

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
                    value: group.fc_kode,
                    label: group.fv_description
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
        const matchError = inputData.password !== inputData.confirmPassword ? 'Password does not match' : '';
        // console.log(inputData.password)
        // console.log(inputData.confirmPassword)
        setPasswordMatchError(matchError)
    }

    const handleConfirmPasswordChange = (event) => {
        const matchError = inputData.password !== event.target.value ? 'Password does not match' : '';
        setInputData(
            prevInputData => ({
                ...prevInputData,
                confirmPassword: event.target.value
            })
        )
        setPasswordMatchError(matchError);
    }

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
                        <div className="modal-body">

                            <div className="row">
                                <div className="col-6">
                                <div className="form-group"> 
                                        <label className="form-label">Division Code</label>
                                        <input type="text" className="form-control" value={'SBY001'} readOnly/>
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
                                                name="confirmPassword"
                                                id="confirmPassword"
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
                                            <input type="number" className="form-control" />
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-6">
                                    <div className="form-group"> 
                                            <label className="form-label">Hold</label>
                                            <RadioButtons 
                                                name="fl_level" 
                                                onChange={
                                                    (e) => console.log(e)
                                                }
                                                options1="Active" 
                                                options2="Non Active"
                                            />
                                    </div>
                                </div>
                                <div className="col-6">
                                    <div className="form-group"> 
                                            <label className="form-label">Expired Date</label>
                                            <input type="date" className="form-control"/>
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
                                            <input type="file" className="form-control"/>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-12">
                                    <div className="form-group"> 
                                            <label className="form-label">Description</label>
                                            {/* Text area */}
                                            <textarea className="form-control" rows="3"></textarea>
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
                            <button type="button" className="btn btn-primary">
                            Save changes
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ModalUser;