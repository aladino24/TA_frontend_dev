import React, { useEffect, useState } from "react";
import Config from "../../../../config";
import Select from 'react-select'
import axios from "axios";

const ModalBankAcc = (props) => {
    const [inputData, setInputData] = useState({
        fc_divisioncode: "",
        fc_branch: "",
        fv_bankname: "",
        fc_banktype: "",
        fv_bankbrach: "",
        fv_bankusername: "",
        fv_bankaddress1: "",
        fv_bankaddress2: "",
        fl_bankhold: ""
    });

    useEffect(() => {
        const fetchData = async () => {
        try {
            const token = localStorage.getItem("token");
            const sessionData = Config.api.server1 + "check-token";
                const response = await axios.get(sessionData, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
           

                // console.log(response.data.user.branch);
                const sessionBranchData = response.data.user.branch;
                const sessionDivisionCodeData = response.data.user.divisioncode;

                setInputData(prevInputData => ({
                    ...prevInputData,
                    fc_branch: sessionBranchData,
                }));

                setInputData(prevInputData => ({
                    ...prevInputData,
                    fc_divisioncode: sessionDivisionCodeData,
                }));
          
        } catch (error) {
            console.log(error);
        }
      }

      fetchData();
    }, []);
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

                <form>
                  <div className="modal-body">
                        <div className="form-group">
                                <label htmlFor="fc_branch">Cabang</label>
                                <input type="text" className="form-control" id="fc_divisioncode" defaultValue={inputData.fc_divisioncode} hidden />
                                <input type="text" className="form-control" id="fc_branch" defaultValue={inputData.fc_branch} readOnly/>
                                <Select />
                        </div>
                       <div className="row">
                        <div className="col-md-5">
                            <div className="form-group">
                                    <label htmlFor="fc_brand">Nama Bank</label>
                                    <input 
                                        type="text" 
                                        className="form-control" 
                                        id="fc_brand"
                                        name="fc_brand"  
                                        onChange={
                                            console.log('onChange')
                                        }
                                    />
                            </div>
                         </div>
                         <div className="col-md-3">
                            <div className="form-group">
                                    <label htmlFor="fc_group">Tipe Bank</label>
                                    <input 
                                        type="text" 
                                        className="form-control" 
                                        id="fc_group" 
                                        name="fc_group" 
                                        onChange={
                                            console.log('onChange')
                                        }
                                    />
                            </div>
                         </div>
                         <div className="col-md-4">
                           <div className="form-group">
                                    <label htmlFor="fc_brand">No Rekening</label>
                                    <input 
                                        type="text" 
                                        className="form-control" 
                                        id="fc_brand"
                                        name="fc_brand"  
                                        onChange={
                                            console.log('onChange')
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
                                        id="fc_group" 
                                        name="fc_group" 
                                        onChange={
                                            console.log('onChange')
                                        }
                                    />
                            </div>
                         </div>
                         <div className="col-md-3">
                            <div className="form-group">
                                    <label htmlFor="fc_group">Bank Terkunci</label>
                                    <input 
                                        type="text" 
                                        className="form-control" 
                                        id="fc_group" 
                                        name="fc_group" 
                                        onChange={
                                            console.log('onChange')
                                        }
                                    />
                            </div>
                         </div>
                         <div className="col-md-4">
                            <div className="form-group">
                                        <label htmlFor="fc_brand">Cabang Bank</label>
                                        <input 
                                         type="text" 
                                         className="form-control" 
                                         id="fc_brand"
                                         name="fc_brand"  
                                         onChange={
                                              console.log('onChange')
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
                                    id="fc_group"
                                    name="fc_group"
                                    onChange={
                                        console.log('onChange')
                                    }
                                />
                            </div>
                        </div>
                        <div className="row mt-3">
                            <div className="col-md-12">
                                <label htmlFor="fc_group">Alamat Bank 2</label>
                                <textarea
                                    className="form-control"
                                    id="fc_group"
                                    name="fc_group"
                                    onChange={
                                        console.log('onChange')
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
        </>
    );

};

export default ModalBankAcc;