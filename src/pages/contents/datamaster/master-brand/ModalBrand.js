import React, { useEffect, useState } from "react";
import Config from "../../../../config";
import axios from "axios";
import SweetAlertError from "../../../../components/SweetAlertError";
import SweetAlertSuccess from "../../../../components/SweetAlertSuccess";
import SweetAlertLoading from "../../../../components/SweetAlertLoading";


const ModalBrand = (props) => {
    const [showLoading, setShowLoading] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const [showError, setShowError] = useState(false);
    const [inputData, setInputData] = useState({
        fc_divisioncode: "",
        fc_branch: "",
        fc_brand: "",
        fc_group: "",
        fc_subgroup: ""
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

    const handleSubmit = async(e) => {
        e.preventDefault();
        // console.log(inputData);

        setShowLoading(true);
        const token = localStorage.getItem("token");
        try {
            const response = await axios({
                method: "post",
                url: Config.api.server2 + "master/brand",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                data: {
                    fc_divisioncode: inputData.fc_divisioncode,
                    fc_branch: inputData.fc_branch,
                    fc_brand: inputData.fc_brand,
                    fc_group: inputData.fc_group,
                    fc_subgroup: inputData.fc_subgroup
                },
            });

            if(response.status === 200) {
                setShowSuccess(true);
                setShowLoading(false);
               }else{
                    setShowError(true);
                    setShowLoading(false);
               }
            
            // console.log(response);
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
            aria-labelledby="addModalBrandLabel">
            <div className="modal-dialog" role="document">
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
                        <div className="form-group">
                            <label htmlFor="fc_brand">Brand</label>
                            <input 
                                type="text" 
                                className="form-control" 
                                id="fc_brand"
                                name="fc_brand"  
                                onChange={
                                    (e) => setInputData(prevInputData => ({
                                        ...prevInputData,
                                        fc_brand: e.target.value,
                                    }))
                                }
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="fc_group">Group</label>
                            <input 
                                type="text" 
                                className="form-control" 
                                id="fc_group" 
                                name="fc_group" 
                                onChange={
                                    e => setInputData(prevInputData => ({
                                        ...prevInputData,
                                        fc_group: e.target.value,
                                    }))
                                }
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="fc_subgroup">Sub Group</label>
                            <input 
                                type="text" 
                                className="form-control" 
                                id="fc_subgroup"  
                                name="fc_subgroup"
                                onChange={
                                    e => setInputData(prevInputData => ({
                                        ...prevInputData,
                                        fc_subgroup: e.target.value,
                                    }))
                                }
                            />
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


export default ModalBrand;