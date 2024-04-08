import axios from "axios";
import React, { useEffect, useState } from "react";
import Config from "../../../../config";
import Select from 'react-select';
import RadioButtons from "../../../../components/RadioButton";
import SweetAlertLoading from "../../../../components/SweetAlertLoading";
import SweetAlertSuccess from "../../../../components/SweetAlertSuccess";
import SweetAlertError from "../../../../components/SweetAlertError";

const ModalDistributor = (props) => {
    const [legalStatusOptions, setLegalStatusOptions] = useState([]);
    const [tipeBisnisOptions, setTipeBisnisOptions] = useState([]);
    const [tipeCabangOptions, setTipeCabangOptions] = useState([]);
    const [tipePajakOptions, setTipePajakOptions] = useState([]);
    const [bankOptions, setBankOptions] = useState([]);
    const [lockTypeOptions, setLockTypeOptions] = useState([]);
    const [showLoading, setShowLoading] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const [showError, setShowError] = useState(false);
    const nationalityOptions = [
        { value: 'ID', label: 'Indonesia' },
        { value: 'SG', label: 'Singapore' },
        { value: 'MY', label: 'Malaysia' },
        { value: 'TH', label: 'Thailand' },
        { value: 'VN', label: 'Vietnam' },
    ];
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
        fc_distributortypebusiness: "",
        fc_distributornationality: "",
        fc_distributorforex: "",
        fd_distributorjoindate: "",
        fd_distributorexpired: "",
        fl_distributorreseller: "",
        fc_distributortaxcode: "",
        fc_distributorNPWP: "",
        fc_distributornpwp_name: "",
        fc_distributor_npwpaddress1: "",
        fc_distributoremail1: "",
        fc_distributoraddress: "",
        fc_distributorphone1: "",
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
                const tipeBisnisApiUrl = Config.api.server3 + "master/type-business";
                const tipeCabangApiUrl = Config.api.server3 + "master/branch-type";
                const tipePajakApiUrl = Config.api.server3 + "master/tax-type";
                const bankApiUrl = Config.api.server2 + "get-data-where-field-id-get/TransaksiType/fc_trx/BANKNAME";
                const lockTypeApiUrl = Config.api.server2 + "get-data-where-field-id-get/TransaksiType/fc_trx/CUST_LOCKTYPE";

                const [
                    sessionDataResponse,
                    legalStatusResponse,
                    tipeBisnisResponse,
                    tipeCabangResponse,
                    tipePajakResponse,
                    bankResponse,
                    lockTypeResponse
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
                    ),
                    axios.get(tipeBisnisApiUrl,{
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                     }
                    ),
                    axios.get(tipeCabangApiUrl,{
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                     }
                    ),
                    axios.get(tipePajakApiUrl,{
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                     }
                    ),
                    axios.get(bankApiUrl),
                    axios.get(lockTypeApiUrl)
                ]);

                const sessionBranchData = sessionDataResponse.data.user.branch;
                const sessionDivisionData = sessionDataResponse.data.user.divisioncode
                const legalStatusData = legalStatusResponse.data.data;
                const tipeBisnisData = tipeBisnisResponse.data.data;
                const tipeCabangData = tipeCabangResponse.data.data;
                const tipePajakData = tipePajakResponse.data.data;
                const bankData = bankResponse.data.data;
                const lockTypeData = lockTypeResponse.data.data;

                setInputData(prevInputData => ({
                    ...prevInputData,
                    fc_branch: sessionBranchData,

                }));

                setInputData(prevInputData => ({
                    ...prevInputData,
                    fc_divisioncode: sessionDivisionData,

                }));

                const legalOptions = legalStatusData.map((item) => ({
                    value: item.fc_legalcode,
                    label: item.fc_legalname + '(' + item.fc_legalcode + ')'
                }));

                setLegalStatusOptions(legalOptions)

                const tipeBisnisOptions = tipeBisnisData.map((item) => ({
                    value: item.fc_typebusinesscode,
                    label: item.fc_typebusinessname
                }));

                setTipeBisnisOptions(tipeBisnisOptions);

                const tipeCabangOptions = tipeCabangData.map((item) => ({
                    value: item.fc_branchtypecode,
                    label: item.fc_branchtypename
                }));

                setTipeCabangOptions(tipeCabangOptions);

                const tipePajakOptions = tipePajakData.map((item) => ({
                    value: item.fc_taxtypecode,
                    label: item.fc_taxtypename
                }));

                setTipePajakOptions(tipePajakOptions);


                const bankOptions = bankData.map((item) => ({
                    value: item.fv_description,
                    label: item.fv_description
                }));

                setBankOptions(bankOptions);

                const lockTypeOptions = lockTypeData.map((item) => ({
                    value: item.fv_description,
                    label: item.fv_description
                }));

                setLockTypeOptions(lockTypeOptions);
                
            } catch (error) {
                console.log(error);
            }
        };

        fetchData();
    },[]);

    const handleLegalStatusChange = (selectedOption) => {
        setInputData(prevInputData => ({
            ...prevInputData,
            fc_distributorlegalstatus: selectedOption.value
        }));
    }

    const handleNationalityChange = (selectedOption) => {
        setInputData({
            ...inputData,
            fc_distributornationality: selectedOption.label,
            fc_distributorforex: selectedOption.value
        });
    }

    const handleChangeDistributorReseller = (selectedOption) => {
        if (selectedOption !== inputData.fl_distributorreseller) {
            setInputData({
                ...inputData,
                fl_distributorreseller: selectedOption
            });
        }
    }

    const handleTaxTypeChange = (selectedOption) => {
        if (selectedOption.label !== inputData.fc_distributortaxcode) {
            setInputData({
                ...inputData,
                fc_distributortaxcode: selectedOption.label
            });
        }
    }

    const handleTypeBranchChange = (selectedOption) => {
        if (selectedOption.label !== inputData.fc_branchtype) {
            setInputData({
                ...inputData,
                fc_branchtype: selectedOption.label
            });
        }
    }

    const handleTypeBusinessChange = (selectedOption) => {
        if (selectedOption.label !== inputData.fc_distributortypebusiness) { 
            setInputData({
                ...inputData,
                fc_distributortypebusiness: selectedOption.label
            });
        }  
    }

    const handleBankChange = (selectedOption) => {
        if (selectedOption.label !== inputData.fc_distributorbank1) {
            setInputData({
                ...inputData,
                fc_distributorbank1: selectedOption.label
            });
        }
    }

    const handleLockTypeChange = (selectedOption) => {
        if (selectedOption.label !== inputData.fn_distributorlockTrans) {
            setInputData({
                ...inputData,
                fn_distributorlockTrans: selectedOption.label
            });
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem("token");
        setShowLoading(true);

        try {
            const addDistributorApiUrl = Config.api.server3 + "master/add-distributor";

            const response = await axios({
                method: "post",
                url: addDistributorApiUrl,
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                data: inputData,
            });

            if (response.status === 200) {
                setShowSuccess(true);
                setShowLoading(false);
            } else {
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
        }finally {
            setShowLoading(false);
        }
    }

    const handleSuccessAlertClose = () => {
        setShowSuccess(false);
        window.location.reload();
    }

    const handleErrorAlertClose = () => {
        setShowError(false);
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

                        <form onSubmit={handleSubmit}>
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
                                            <input
                                                type="hidden"   
                                                name="fc_divisioncode"
                                                id="fc_divisioncode"
                                                defaultValue={inputData.fc_divisioncode}
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
                                                onChange={
                                                    (e) => setInputData({
                                                        ...inputData,
                                                        fc_distributorcode: e.target.value
                                                    })
                                                }
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
                                            <Select 
                                                options={tipeCabangOptions}
                                                name="fc_branchtype"
                                                id="fc_branchtype"
                                                onChange={handleTypeBranchChange}
                                                required
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
                                            <Select
                                             options={nationalityOptions}
                                                name="fc_distributornationality"
                                                id="fc_distributornationality"
                                                onChange={
                                                    handleNationalityChange
                                                }
                                                required
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
                                                readOnly
                                                onChange={
                                                    (e) => setInputData({
                                                        ...inputData,
                                                        fc_distributorforex: e.target.value
                                                    })
                                                }
                                                value={inputData.fc_distributorforex}
                                            />
                                        </div>
                                    </div>
                                    <div className="col-md-3">
                                        <div className="form-group">
                                            <label htmlFor="fc_distributortypebusiness">Tipe Bisnis Distributor</label>
                                            <Select
                                                options={tipeBisnisOptions}
                                                name="fc_distributortypebusiness"
                                                id="fc_distributortypebusiness"
                                                onChange={
                                                    handleTypeBusinessChange
                                                }
                                                required
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-3">
                                            <div className="form-group">
                                                <label htmlFor="fd_distributorjoindate">Tanggal Join Distributor</label>
                                                <input
                                                    type="date"
                                                    className="form-control"
                                                    id="fd_distributorjoindate"
                                                    name="fd_distributorjoindate"
                                                    onChange={
                                                        (e) => setInputData({
                                                            ...inputData,
                                                            fd_distributorjoindate: e.target.value
                                                        })
                                                    }
                                                />
                                            </div>
                                    </div>
                                    <div className="col-md-3">
                                            <div className="form-group">
                                                <label htmlFor="fd_distributorexpired">Distributor Expired</label>
                                                <input
                                                    type="date"
                                                    className="form-control"
                                                    id="fd_distributorexpired"
                                                    name="fd_distributorexpired"
                                                    onChange={
                                                        (e) => setInputData({
                                                            ...inputData,
                                                            fd_distributorexpired: e.target.value
                                                        })
                                                    }
                                                />
                                            </div>
                                    </div>
                                    <div className="col-md-3">
                                            <div className="form-group">
                                                <label htmlFor="fl_distributorreseller">Distributor Reseller</label>
                                                <RadioButtons
                                                    id="fl_distributorreseller"
                                                    name="fl_distributorreseller"
                                                    options1="Active"
                                                    options2="Non Active"
                                                    onChange={handleChangeDistributorReseller}
                                                />
                                            </div>
                                    </div>
                                    <div className="col-md-3">
                                            <div className="form-group">
                                                <label htmlFor="fc_distributortaxcode">Kode Pajak Distributor</label>
                                                <Select
                                                    options={tipePajakOptions}
                                                    name="fc_distributortaxcode"
                                                    id="fc_distributortaxcode"
                                                    onChange={handleTaxTypeChange}
                                                    required
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
                                                    onChange={
                                                        (e) => setInputData({
                                                            ...inputData,
                                                            fc_distributorNPWP: e.target.value
                                                        })
                                                    }
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
                                                    onChange={
                                                        (e) => setInputData({
                                                            ...inputData,
                                                            fc_distributornpwp_name: e.target.value
                                                        })
                                                    }
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
                                                 onChange={
                                                        (e) => setInputData({   
                                                            ...inputData,
                                                            fc_distributor_npwpaddress1: e.target.value
                                                        })
                                                 }
                                                ></textarea>
                                        </div>
                                    </div>
                                    <div className="col-md-3">
                                        <div className="form-group" >
                                            <label htmlFor="fc_distributoremail1">Email Distributor</label>
                                            <input
                                                    type="text"
                                                    className="form-control"
                                                    id="fc_distributoremail1"
                                                    name="fc_distributoremail1"
                                                    onChange={
                                                        (e) => {
                                                            setInputData({
                                                                ...inputData, 
                                                                fc_distributoremail1: e.target.value
                                                         })
                                                        }
                                                    }
                                            />
                                        </div>
                                    </div>
                                    <div className="col-md-3">
                                        <div className="form-group" >
                                            <label htmlFor="fc_distributorphone1">No.HP Distributor</label>
                                            <input
                                                    type="text"
                                                    className="form-control"
                                                    id="fc_distributorphone1"
                                                    name="fc_distributorphone1"
                                                    onChange={
                                                        (e) => {
                                                            setInputData({
                                                                ...inputData, 
                                                                fc_distributorphone1: e.target.value
                                                         })
                                                        }
                                                    }
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                  <div className="col-md-6">
                                    <div className="form-group" >
                                                <label htmlFor="fc_distributorbank1">Bank Distributor</label>
                                                {/* <input
                                                        type="text"
                                                        className="form-control"
                                                        id="fc_distributorbank1"
                                                        name="fc_distributorbank1"
                                                    /> */}
                                                <Select
                                                    options={bankOptions}
                                                    name="fc_distributorbank1"
                                                    id="fc_distributorbank1"
                                                    onChange={handleBankChange}
                                                    required
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
                                                        onChange={
                                                            (e) => {
                                                                setInputData ({
                                                                    ...inputData,
                                                                    fc_distributornorek1: e.target.value
                                                                })
                                                            }
                                                        }
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
                                                            onChange={
                                                                (e) => {
                                                                    setInputData({
                                                                        ...inputData,
                                                                        fc_distributorvirtualac: e.target.value
                                                                    })
                                                                }
                                                            }
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
                                                            onChange={
                                                                (e) => {
                                                                    setInputData ({
                                                                        ...inputData,
                                                                        fm_distributorAR: e.target.value
                                                                    })
                                                                }
                                                            }
                                                    />
                                            </div>
                                    </div>
                                    <div className="col-md-3">
                                        <div className="form-group" >
                                                    <label htmlFor="fn_distributorAgingAR">Masa Hutang Distributor</label>
                                                    <input
                                                            type="number"
                                                            className="form-control"
                                                            id="fn_distributorAgingAR"
                                                            name="fn_distributorAgingAR"
                                                            onChange={
                                                                (e) => {
                                                                    setInputData ({
                                                                        ...inputData,
                                                                        fn_distributorAgingAR: e.target.value
                                                                    })
                                                                }
                                                            }
                                                        />
                                            </div>
                                    </div>
                                    <div className="col-md-3">
                                        <div className="form-group" >
                                                    <label htmlFor="fn_distributorlockTrans">Kunci Transaksi</label>
                                                    <Select
                                                        options={lockTypeOptions}
                                                         name="fn_distributorlockTrans"
                                                            id="fn_distributorlockTrans"
                                                            onChange={handleLockTypeChange}
                                                            required
                                                    />
                                            </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-12">
                                        <div className="form-group" >
                                                    <label htmlFor="fc_distributoraddress">Alamat Distributor</label>
                                                    <textarea
                                                        type="text"
                                                        className="form-control"
                                                        name="fc_distributoraddress"
                                                        id="fc_distributoraddress"
                                                        onChange={
                                                            (e) => {
                                                                setInputData ({
                                                                    ...inputData,
                                                                    fc_distributoraddress: e.target.value
                                                                })
                                                            }
                                                        }
                                                    ></textarea>
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
                                                        onChange={
                                                            (e) => {
                                                                setInputData ({
                                                                    ...inputData,
                                                                    fv_distributordescription: e.target.value
                                                                })
                                                            }
                                                        }
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

            <SweetAlertLoading show={showLoading} />

            <SweetAlertSuccess
                show={showSuccess}
                message="Berhasil menambahkan distributor!"
                onClose={handleSuccessAlertClose}
            />

            <SweetAlertError
                    show={showError}
                    message="Menambahkan distributor gagal!."
                    onClose={handleErrorAlertClose}
            />

        </>
    );
}

export default ModalDistributor;