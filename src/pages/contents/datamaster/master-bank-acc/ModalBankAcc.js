import React, { useEffect, useState } from "react";
import Config from "../../../../config";
import Select from 'react-select';
import axios from "axios";
import SweetAlertLoading from "../../../../components/SweetAlertLoading";
import SweetAlertSuccess from "../../../../components/SweetAlertSuccess";
import SweetAlertError from "../../../../components/SweetAlertError";

const ModalBankAcc = (props) => {
    const [banknameOptions, setBanknameOptions] = useState([]);
    const [showLoading, setShowLoading] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const [showError, setShowError] = useState(false);
    const banktypeOptions = [
        {value: "1", label: "1"},
        {value: "2", label: "2"}
    ];
    const bankholdOptions = [
        {value: "T", label: "Ya"},
        {value: "F", label: "Tidak"}
    ];
    const [inputData, setInputData] = useState({
        fc_divisioncode: "",
        fc_branch: "",
        fv_bankname: "",
        fc_banktype: "",
        fc_bankcode: "",
        fv_bankbranch: "",
        fv_bankusername: "",
        fv_bankaddress1: "",
        fv_bankaddress2: "",
        fl_bankhold: ""
    });

    useEffect(() => {
        const fetchData = async () => {
        try {
            const token = localStorage.getItem("token");
            // const sessionData = Config.api.server1 + "check-token";
            //     const response = await axios.get(sessionData, {
            //         headers: {
            //             Authorization: `Bearer ${token}`,
            //         },
            //     });
           

            //     // console.log(response.data.user.branch);
            //     const sessionBranchData = response.data.user.branch;
            //     const sessionDivisionCodeData = response.data.user.divisioncode;

            //     setInputData(prevInputData => ({
            //         ...prevInputData,
            //         fc_branch: sessionBranchData,
            //     }));

            //     setInputData(prevInputData => ({
            //         ...prevInputData,
            //         fc_divisioncode: sessionDivisionCodeData,
            //     }));
            const checkTokenApiUrl = Config.api.server1 + "check-token";
            const bankNameApiUrl = Config.api.server2 + "get-data-where-field-id-get/TransaksiType/fc_trx/BANKNAME";

            const [
                sessionDataResponse,
                banknameResponse
            ] = await Promise.all([
                axios.get(checkTokenApiUrl, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },}
                ),
                axios.get(bankNameApiUrl)
            ])

            const sessionBranchData = sessionDataResponse.data.user.branch;
            const sessionDivisionCodeData = sessionDataResponse.data.user.divisioncode;
            const banknameData = banknameResponse.data.data;

            setInputData(prevInputData => ({
                    ...prevInputData,
                    fc_branch: sessionBranchData,
                }));

            setInputData(prevInputData => ({
                    ...prevInputData,
                    fc_divisioncode: sessionDivisionCodeData,
                }));
            
            const banknameOptions = banknameData.map((item) => ({
                value : item.fv_description,
                label: item.fv_description
            }));
            setBanknameOptions(banknameOptions) 
          
        } catch (error) {
            console.log(error);
        }
      }

      fetchData();
    }, []);

    const handleBanktypeChange = (selectedOption) => {
        setInputData(prevInputData => ({
            ...prevInputData,
            fc_banktype: selectedOption.value,
        }));
    }
    
    const handleBanknameChange = (selectedOption) => {
        setInputData(prevInputData => ({
            ...prevInputData,
            fv_bankname: selectedOption.value,
        }));
    }

    const handleBankholdChange = (selectedOption) => {
        setInputData(prevInputData => ({
            ...prevInputData,
            fl_bankhold: selectedOption.value,
        }));
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const token = localStorage.getItem("token");
        setShowLoading(true);

        try {
            const apiInsertBankAccUrl = Config.api.server2 + "master/bank-acc";
            const response = await axios({  
                method: "post",
                url: apiInsertBankAccUrl,
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                data: inputData
            });
            

            if (response.status === 200) {
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
        window.location.reload();
    }

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
            aria-labelledby="addModalBrandLabel">
            <div className="modal-dialog modal-lg" role="document">
                <div className="modal-content">
                 <div className="modal-header">
                        <h5 className="modal-title" id="editModalLabel">
                            Tambah Master Brand
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
                        <div className="form-group">
                                <label htmlFor="fc_branch">Cabang</label>
                                <input type="text" className="form-control" id="fc_divisioncode" defaultValue={inputData.fc_divisioncode} hidden />
                                <input type="text" className="form-control" id="fc_branch" defaultValue={inputData.fc_branch} readOnly/>
                               
                        </div>
                       <div className="row">
                        <div className="col-md-5">
                            <div className="form-group">
                                    <label htmlFor="fc_brand">Nama Bank</label>
                                    {/* <input 
                                        type="text" 
                                        className="form-control" 
                                        id="fv_bankname"
                                        name="fv_bankname"  
                                        onChange={
                                            (e) => setInputData({
                                                ...inputData,
                                                fv_bankname: e.target.value
                                            })
                                        }
                                    /> */}
                                     <Select 
                                        options={banknameOptions} 
                                        name="fv_bankname"
                                        onChange={
                                            handleBanknameChange
                                        }
                                        required
                                    />
                            </div>
                         </div>
                         <div className="col-md-3">
                            <div className="form-group">
                                    <label htmlFor="fc_group">Tipe Bank</label>
                                    {/* <input 
                                        type="text" 
                                        className="form-control" 
                                        id="fc_group" 
                                        name="fc_group" 
                                        onChange={
                                            console.log('onChange')
                                        }
                                    /> */}
                                    <Select 
                                        options={banktypeOptions} 
                                        name="fc_banktype"
                                        onChange={handleBanktypeChange}
                                        required
                                    />
                            </div>
                         </div>
                         <div className="col-md-4">
                           <div className="form-group">
                                    <label htmlFor="fc_brand">No Rekening</label>
                                    <input 
                                        type="text" 
                                        className="form-control" 
                                        id="fc_bankcode"
                                        name="fc_bankcode"  
                                        onChange={
                                            (e) => setInputData({
                                                ...inputData,
                                                fc_bankcode: e.target.value
                                            })
                                        }
                                    />
                            </div>
                         </div>
                        </div>
                        <div className="row">
                         <div className="col-md-5">
                            <div className="form-group">
                                    <label htmlFor="fc_group">Nama Pemilik Rekening </label>
                                    <input 
                                        type="text" 
                                        className="form-control" 
                                        id="fv_bankusername" 
                                        name="fv_bankusername" 
                                        onChange={
                                            (e) => setInputData({
                                                ...inputData,
                                                fv_bankusername: e.target.value
                                            })
                                        }
                                    />
                            </div>
                         </div>
                         <div className="col-md-3">
                            <div className="form-group">
                                    <label htmlFor="fc_group">Bank Terkunci</label>
                                    <Select 
                                        options={bankholdOptions} 
                                        name="fl_bankhold"
                                        id="fl_bankhold"
                                        onChange={handleBankholdChange}
                                        required
                                    />
                            </div>
                         </div>
                         <div className="col-md-4">
                            <div className="form-group">
                                        <label htmlFor="fc_brand">Cabang Bank</label>
                                        <input 
                                         type="text" 
                                         className="form-control" 
                                         id="fv_bankbranch"
                                         name="fv_bankbranch"  
                                         onChange={
                                            (e) => setInputData({
                                                ...inputData,
                                                fv_bankbranch: e.target.value
                                            })
                                         }
                                        />
                             </div>
                         </div>
                        </div>
                        <div className="row">
                            <div className="col-md-12">
                                <label htmlFor="fc_group">Alamat Bank 1</label>
                                <textarea
                                    className="form-control"
                                    id="fv_bankaddress1"
                                    name="fv_bankaddress1"
                                    onChange={
                                        (e) => setInputData({
                                            ...inputData,
                                            fv_bankaddress1: e.target.value
                                        })
                                    }
                                />
                            </div>
                        </div>
                        <div className="row mt-3">
                            <div className="col-md-12">
                                <label htmlFor="fc_group">Alamat Bank 2</label>
                                <textarea
                                    className="form-control"
                                    id="fv_bankaddress2"
                                    name="fv_bankaddress2"
                                    onChange={
                                        (e) => setInputData({
                                            ...inputData,
                                            fv_bankaddress2: e.target.value
                                        })
                                    }
                                />
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
                message="Menambahkan bank account berhasil!"
                onClose={handleSuccessAlertClose}
            />

            <SweetAlertError
                    show={showError}
                    message="Menambahkan bank account gagal!."
                    onClose={handleErrorAlertClose}
            />
        </>
    );

};

export default ModalBankAcc;