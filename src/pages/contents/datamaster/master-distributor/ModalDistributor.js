import axios from "axios";
import React, { useEffect, useState } from "react";
import Config from "../../../../config";
import Select from 'react-select';


const ModalDistributor = (props) => {
    const [legalStatusOptions, setLegalStatusOptions] = useState([]);
    const [inputData, setInputData] = useState({
        fc_divisioncode: "",
        fc_branch: "",
        fc_distributorcode: "",
        fc_distributorname: "",
        fc_branchtype: "",
        fc_distributorpicname: "",
        fc_distributorpicphone: "",
        fc_distributorpicpos: "",
        fc_distributorlegalstatus: "",
        fc_distributornationality: "",
        fc_distributorforex: "",
        fc_suppliertypebusiness: "",
        fd_supplierjoindate: "",
        fd_distributorexpired: "",
        fl_distributorreseller: "",
        fc_distributortaxcode: "",
        fc_distributorNPWP: "",
        fc_distributornpwp_name: "",
        fc_distributor_npwpaddress1: "",
        fc_distributoremail1: "",
        fc_distributorbank1: "",
        fc_distributornorek1: "",
        fc_distributorvirtualac: "",
        fm_distributorAR: "",
        fn_distributorAgingAR: "",
        fn_distributorlockTrans: "",
        fv_distributordescription: ""
    });

    useEffect(() => {
        const fetchData = async () => {

            try {
                const token = localStorage.getItem("token");
                const checkTokenApiUrl = Config.api.server1 + "check-token"; 
                const legalStatusApiUrl = Config.api.server3 + "master/legal-status";

                const [
                    sessionDataResponse,
                    legalStatusResponse
                ] = await Promise.all([
                    axios.get(checkTokenApiUrl, {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }),
                    axios.get(legalStatusApiUrl,{
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                     }
                    )
                ]);

                const sessionBranchData = sessionDataResponse.data.user.branch;
                const legalStatusData = legalStatusResponse.data.data;

                setInputData(prevInputData => ({
                    ...prevInputData,
                    fc_branch: sessionBranchData,
                }));

                const legalOptions = legalStatusData.map((item) => ({
                    value: item.fc_legalcode,
                    label: item.fc_legalname + '(' + item.fc_legalcode + ')'
                }));

                setLegalStatusOptions(legalOptions)
                
            } catch (error) {
                console.log(error);
            }
        };

        fetchData();
    },[]);

    const handleLegalStatusChange = () => {
        console.log('Change');
    }

    return (
        <>
             <div
                className="modal fade"
                id={props.id}
                tabIndex="-1"
                role="dialog"
                aria-labelledby="addModalBrandLabel">
                <div className="modal-dialog modal-xl" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="editModalLabel">
                                Tambah Distributor
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

                        <form >
                            <div className="modal-body">
                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label htmlFor="fc_branch">Cabang</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="fc_branch"
                                                name="fc_branch"
                                                defaultValue={inputData.fc_branch}
                                                readOnly
                                            />
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label htmlFor="fc_distributorcode">Kode Distributor</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="fc_distributorcode"
                                                name="fc_distributorcode"
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label htmlFor="fc_distributorname">Nama Distributor</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="fc_distributorname"
                                                name="fc_distributorname"
                                                onChange={(e) => setInputData({
                                                        ...inputData,
                                                        fc_distributorname: e.target.value
                                                    })}
                                            />
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label htmlFor="fc_branchtype">Tipe Cabang Distributor</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="fc_branchtype"
                                                name="fc_branchtype"
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-4">
                                        <div className="form-group">
                                            <label htmlFor="fc_distributorpicname">Nama PIC Distributor</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="fc_distributorpicname"
                                                name="fc_distributorpicname"
                                                onChange={
                                                    (e) => setInputData({
                                                        ...inputData,
                                                        fc_distributorpicname: e.target.value
                                                    })
                                                }
                                            />
                                        </div>
                                    </div>
                                    <div className="col-md-4">
                                        <div className="form-group">
                                            <label htmlFor="fc_distributorpicphone">No.HP PIC Distributor</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="fc_distributorpicphone"
                                                name="fc_distributorpicphone"
                                                onChange={
                                                    (e) => setInputData({
                                                        ...inputData,
                                                        fc_distributorpicphone: e.target.value
                                                    })
                                                }
                                            />
                                        </div>
                                    </div>
                                    <div className="col-md-4">
                                        <div className="form-group">
                                            <label htmlFor="fc_distributorpicpos">Jabatan PIC Distributor</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="fc_distributorpicpos"
                                                name="fc_distributorpicpos"
                                                onChange={
                                                    (e) => setInputData({
                                                        ...inputData,
                                                        fc_distributorpicpos: e.target.value
                                                    })
                                                }
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-3">
                                        <div className="form-group">
                                            <label htmlFor="fc_distributorlegalstatus">Legal Status Distributor</label>
                                            {/* <input
                                                type="text"
                                                className="form-control"
                                                id="fc_distributorlegalstatus"
                                                name="fc_distributorlegalstatus"
                                            /> */}
                                             <Select 
                                                options={legalStatusOptions} 
                                                name="fc_distributorlegalstatus"
                                                id="fc_distributorlegalstatus"
                                                onChange={handleLegalStatusChange}
                                                required
                                            />
                                        </div>
                                    </div>
                                    <div className="col-md-3">
                                        <div className="form-group">
                                            <label htmlFor="fc_distributornationality">Kebangsaan Distributor</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="fc_distributornationality"
                                                name="fc_distributornationality"
                                            />
                                        </div>
                                    </div>
                                    <div className="col-md-3">
                                        <div className="form-group">
                                            <label htmlFor="fc_distributorforex">Distributor Forex</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="fc_distributorforex"
                                                name="fc_distributorforex"
                                            />
                                        </div>
                                    </div>
                                    <div className="col-md-3">
                                        <div className="form-group">
                                            <label htmlFor="fc_suppliertypebusiness">Tipe Bisnis Distributor</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="fc_suppliertypebusiness"
                                                name="fc_suppliertypebusiness"
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-3">
                                            <div className="form-group">
                                                <label htmlFor="fd_supplierjoindate">Tanggal Join Distributor</label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    id="fd_supplierjoindate"
                                                    name="fd_supplierjoindate"
                                                />
                                            </div>
                                    </div>
                                    <div className="col-md-3">
                                            <div className="form-group">
                                                <label htmlFor="fd_distributorexpired">Distributor Expired</label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    id="fd_distributorexpired"
                                                    name="fd_distributorexpired"
                                                />
                                            </div>
                                    </div>
                                    <div className="col-md-3">
                                            <div className="form-group">
                                                <label htmlFor="fl_distributorreseller">Distributor Reseller</label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    id="fl_distributorreseller"
                                                    name="fl_distributorreseller"
                                                />
                                            </div>
                                    </div>
                                    <div className="col-md-3">
                                            <div className="form-group">
                                                <label htmlFor="fc_distributortaxcode">Kode Pajak Distributor</label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    id="fc_distributortaxcode"
                                                    name="fc_distributortaxcode"
                                                />
                                            </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-6" >
                                         <div className="form-group">
                                                <label htmlFor="fc_distributorNPWP">NPWP Distributor</label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    id="fc_distributorNPWP"
                                                    name="fc_distributorNPWP"
                                                />
                                            </div>
                                    </div>
                                    <div className="col-md-6" >
                                         <div className="form-group">
                                                <label htmlFor="fc_distributornpwp_name">Nama NPWP Distributor</label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    id="fc_distributornpwp_name"
                                                    name="fc_distributornpwp_name"
                                                />
                                            </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="form-group">
                                                <label htmlFor="fc_distributor_npwpaddress1">Alamat NPWP Distributor</label>
                                                <textarea
                                                 type="text"
                                                 className="form-control"
                                                 name="fc_distributor_npwpaddress1"
                                                 id="fc_distributor_npwpaddress1"
                                                ></textarea>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group" >
                                            <label htmlFor="fc_distributoremail1">Email Distributor</label>
                                            <input
                                                    type="text"
                                                    className="form-control"
                                                    id="fc_distributoremail1"
                                                    name="fc_distributoremail1"
                                                />
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                  <div className="col-md-6">
                                    <div className="form-group" >
                                                <label htmlFor="fc_distributorbank1">Bank Distributor</label>
                                                <input
                                                        type="text"
                                                        className="form-control"
                                                        id="fc_distributorbank1"
                                                        name="fc_distributorbank1"
                                                    />
                                        </div>
                                  </div>
                                  <div className="col-md-6">
                                    <div className="form-group" >
                                                <label htmlFor="fc_distributornorek1">No Rekening Distributor</label>
                                                <input
                                                        type="text"
                                                        className="form-control"
                                                        id="fc_distributornorek1"
                                                        name="fc_distributornorek1"
                                                    />
                                        </div>
                                  </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-3">
                                        <div className="form-group" >
                                                    <label htmlFor="fc_distributorvirtualac">Virtual AC Distributor</label>
                                                    <input
                                                            type="text"
                                                            className="form-control"
                                                            id="fc_distributorvirtualac"
                                                            name="fc_distributorvirtualac"
                                                        />
                                            </div>
                                    </div>
                                    <div className="col-md-3">
                                        <div className="form-group" >
                                                    <label htmlFor="fm_distributorAR">Hutang Distributor</label>
                                                    <input
                                                            type="text"
                                                            className="form-control"
                                                            id="fm_distributorAR"
                                                            name="fm_distributorAR"
                                                        />
                                            </div>
                                    </div>
                                    <div className="col-md-3">
                                        <div className="form-group" >
                                                    <label htmlFor="fn_distributorAgingAR">Masa Hutang Supplier</label>
                                                    <input
                                                            type="text"
                                                            className="form-control"
                                                            id="fn_distributorAgingAR"
                                                            name="fn_distributorAgingAR"
                                                        />
                                            </div>
                                    </div>
                                    <div className="col-md-3">
                                        <div className="form-group" >
                                                    <label htmlFor="fn_distributorlockTrans">Kunci Transaksi</label>
                                                    <input
                                                            type="text"
                                                            className="form-control"
                                                            id="fn_distributorlockTrans"
                                                            name="fn_distributorlockTrans"
                                                        />
                                            </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-12">
                                        <div className="form-group" >
                                                    <label htmlFor="fv_distributordescription">Deskripsi</label>
                                                    <textarea
                                                        type="text"
                                                        className="form-control"
                                                        name="fv_distributordescription"
                                                        id="fv_distributordescription"
                                                    ></textarea>
                                            </div>
                                    </div>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-dismiss="modal">
                                    Tutup
                                </button>
                                <button type="submit" className="btn btn-primary" id="saveChangesBtn">
                                    Simpan
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

        </>
    );
}

export default ModalDistributor;