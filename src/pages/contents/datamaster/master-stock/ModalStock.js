import React, { useEffect } from "react";
import RadioButtons from "../../../../components/RadioButton";
import Select from 'react-select'
import { useState } from "react";
import Config from "../../../../config";
import SweetAlertError from "../../../../components/SweetAlertError";
import SweetAlertSuccess from "../../../../components/SweetAlertSuccess";
import SweetAlertLoading from "../../../../components/SweetAlertLoading";
import axios from "axios";
import { event } from "jquery";

const ModalStock = (props) => {
    const [namepackOptions, setNamepackOptions] = useState([]);
    const [brandOptions, setBrandOptions] = useState([]);
    const [selectedBrand, setSelectedBrand] = useState("");
    const [groupByBrandOptions,setGroupByBrandOptions] = useState([]);
    const [selectedGroupByBrand, setSelectedGroupByBrand] = useState([]);
    const [subGroupByGroupOptions, setSubGroupByGroupOptions] = useState([]);
    const [selectedSubGroupByGroup, setSelectedSubGroupByGroup] = useState([]);
    const [batchValue, setBatchValue] = useState('');
    const [expiredValue, setExpiredValue] = useState('');
    const [serialNumberValue, setSerialNumberValue] = useState('');
    const [statusCatNumberValue, setStatusCatNumberValue] = useState('');
    const [blacklistValue, setBlacklistValue] = useState('');
    const [taxtypeValue, setTaxtypeValue] = useState('');
    const [repsupplierValue, setRepsupplierValue] = useState('');
    const [discDateValue, setDiscDateValue] = useState('');
    const [discTimeValue, setDiscTimeValue] = useState('');
    const [typeStock1Options, setTypeStock1Options] = useState([]);
    const [typeStock2Options, setTypeStock2Options] = useState([]);
    const [showLoading, setShowLoading] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const [showError, setShowError] = useState(false);
    const [flDiscDate, setflDiscDate] = useState('');
    const [flDiscTime, setflDiscTime] = useState('');
    
    const [inputData, setInputData] = useState(
        {
            fc_stockcode: '',
            fc_barcode: 'fc_barcode',
            fc_nameshort: '',
            fc_namelong: '',
            fc_branch: '',
            fc_divisioncode: '',
            fl_batch: '',
            fc_catnumber: '',
            fc_typestock1: '',
            fc_typestock2: '',
            fn_reorderlevel: '',
            fn_maxonhand: '',
            fl_blacklist: '',
            fm_purchase: '',
            fm_cogs: '',
            fm_salesprice: '',
            fl_disc_date: '',
            fl_disc_time: '',
            fd_disc_begin: '',
            fd_disc_end: '',
            fm_disc_rp: '',
            fm_disc_pr: '',
            ft_disc_begin: '',
            ft_disc_end: '',
            fm_time_disc_rp: '',
            fm_time_disc_pr: '',
            fm_price_dealer: '',
            fm_price_default: '',
            fm_price_distributor: '',
            fm_price_project: '',
            fm_price_dealer: '',
            fm_price_enduser: '',
            fv_stockdescription: '',
            fl_repsupplier: '',
            fc_brand: '',
            fl_catnumber: '',
            fl_serialnumber: '',
            fl_expired: '',
            fl_taxtype: '',
        }
    );
    // const namepackOptions = [
    //         { value: '1', label: '1' },
    //         { value: '2', label: '2' },
    // ];
   

    // const handleBatchChangeCopy = (value) => {
    //     console.log(value);
    //   };
    

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = localStorage.getItem("token");
                const unityApiUrl = Config.api.server2 + 'get-unity';
                const brandApiUrl = Config.api.server2 + 'get-brand';
                const groupByBrandApiUrl = Config.api.server2 + 'stock-group-by-unity';
                const typestock1ApiUrl = Config.api.server2 + 'get-data-where-field-id-get/TransaksiType/fc_trx/GOODSMATERY';
                const typestock2ApiUrl = Config.api.server2 + 'get-data-where-field-id-get/TransaksiType/fc_trx/GOODSTRANS';

                const [
                    getSessionDataResponse,
                    unityResponse,
                    brandResponse,
                    groupByBrandResponse, 
                    typestock1Response,
                    typestock2Response
                ] = await Promise.all([
                    axios.get(Config.api.server1 + "check-token", {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }),
                    axios.get(unityApiUrl),
                    axios.get(brandApiUrl),
                    axios.get(groupByBrandApiUrl, {
                        params: {
                            fc_brand: inputData.fc_brand,
                        }
                    }),
                    axios.get(typestock1ApiUrl),
                    axios.get(typestock2ApiUrl),
                ]);

                const sessionBranchData = getSessionDataResponse.data.user.branch;
                const sessionDivisionCodeData = getSessionDataResponse.data.user.divisioncode;
                const unityData = unityResponse.data.data;
                const brandData = brandResponse.data.data;
                const groupByBrandData = groupByBrandResponse.data.data;
                const typestock1Data = typestock1Response.data.data;
                const typestock2Data = typestock2Response.data.data;

                setInputData(prevInputData => ({
                    ...prevInputData,
                    fc_branch: sessionBranchData,
                }));

                setInputData(prevInputData => ({
                    ...prevInputData,
                    fc_divisioncode: sessionDivisionCodeData,
                }));

                const unityOptions = unityData.map((item) => ({
                    value: item.fc_kode,
                    label: item.fv_description,
                }));
                setNamepackOptions(unityOptions);

                const brandOptions = brandData.map((item) => ({
                    value: item.fc_brand,
                    label: item.fc_brand,
                }));
                setBrandOptions(brandOptions);

                const typestock1Options = typestock1Data.map(item => ({
                    value: item.fc_kode,
                    label: item.fv_description,
                }));

                setTypeStock1Options(typestock1Options);

                const typestock2Options = typestock2Data.map(item => ({
                    value: item.fc_kode,
                    label: item.fv_description,
                }));

                setTypeStock2Options(typestock2Options);
                // console.log(typestock2Data);
            } catch (error) {
                console.error(error);
            }
        };
        fetchData();

    }, []);

    const fetchGroupsByBrand = async (selectedBrand) => {
        try {
            // const token = localStorage.getItem('token');
            const groupByBrandApiUrl = Config.api.server2 + 'stock-group-by-unity';

            const response = await axios.get(groupByBrandApiUrl, {
                params: {
                    fc_brand: selectedBrand.value,
                }
            });

            const groupByBrandData = response.data.data;

            const options = groupByBrandData.map(item => ({
                value: item.fc_group,
                label: item.fc_group,
            }));
            setGroupByBrandOptions(options);
        } catch (error) {
            console.error('Error fetching groups:', error);
        }
    };

    const fetchSubGroupByGroup = async (selectedGroup) => {
        try {
            // const token = localStorage.getItem('token');
            const subGroupByGroupApiUrl = Config.api.server2 + 'stock-subgroup-by-group';

            const response = await axios.get(subGroupByGroupApiUrl, {
                params: {
                    fc_group: selectedGroup.value,
                }
            });

            const subGroupByGroupData = response.data.data;

            const options = subGroupByGroupData.map(item => ({
                value: item.fc_subgroup,
                label: item.fc_subgroup,
            }));
            setSubGroupByGroupOptions(options);
        } catch (error) {
            console.error('Error fetching subgroups:', error);
        }
    }

    const handleNamepackChange = (event) => {
        setInputData(prevInputData => ({
            ...prevInputData,
            fc_namepack: event.value,
        }));
    };
    
    const handleBrandChange = (event) => {
        setSelectedBrand(event);
        setInputData(prevInputData => ({
            ...prevInputData,
            fc_brand: event.value,
        }));
        setSelectedGroupByBrand(null); // Menetapkan nilai grup menjadi null ketika merek diubah
        setSelectedSubGroupByGroup(null);
        fetchGroupsByBrand(event);
    };

    

    const handleGroupByBrandChange = (event) => {
        setSelectedGroupByBrand(event);
        // setInputData
        setInputData(prevInputData => {
            return {
                ...prevInputData,
                fc_group: event.value,
            }
        })
        setSelectedSubGroupByGroup(null);
        fetchSubGroupByGroup(event);
    }

    const handleDiscDate = (value) => {
        if (value !== flDiscDate) {
        setflDiscDate(value);
        setInputData(prevInputData => ({
            ...prevInputData,
            fl_disc_date: value
        }));
        const placeDiskonTanggalElements = document.querySelectorAll('.place_diskon_tanggal');
        if (value === 'T') {
            placeDiskonTanggalElements.forEach(element => {
                element.removeAttribute('hidden');
            });
        } else {
            placeDiskonTanggalElements.forEach(element => {
                element.setAttribute('hidden', true);
            });
        }
        }
    }

    const handleDiscTime = (value) => {
        if (value !== flDiscTime) {
        setflDiscTime(value);
        setInputData(prevInputData => ({
            ...prevInputData,
            fl_disc_time: value
         }));
        const placeDiskonWaktuElements = document.querySelectorAll('.place_diskon_waktu');
        if(value === 'T'){
            placeDiskonWaktuElements.forEach(element => {
                element.removeAttribute('hidden');
            });
        }else{
            placeDiskonWaktuElements.forEach(element => {
                element.setAttribute('hidden', true);
            });
        }
     }
    }

    const handleSubmit = async(e) => {
        e.preventDefault();

        // console.log(inputData);
        setShowLoading(true);
        const token = localStorage.getItem('token');
        try {
            const apiInsertStockUrl = Config.api.server2 + 'master/stock';

            const response = await axios({
                method: 'post',
                url: apiInsertStockUrl,
                data: inputData,
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            // console.log(response);
            // console.log(response.data.status === 200);
            if (response.data.status === 200) {
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
            aria-labelledby="editModalLabel"
            aria-hidden={!props.isOpen}>
            <div className="modal-dialog modal-lg" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="editModalLabel">
                            Tambah Master Stock
                        </h5>
                        <button
                            type="button"
                            className="close"
                            data-dismiss="modal"
                            aria-label="Close"
                            onClick={props.onClose}
                        >
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <form onSubmit={handleSubmit}>
                        <div className="modal-body">
                             <div className="row">
                                    {/* Add more input fields as needed */}
                                    <div className="col-4">
                                        <div className="form-group">
                                            <label style={{ fontSize: '12px' }}>Branch</label>
                                            <input 
                                                type="text" 
                                                className="form-control" 
                                                name="fc_branch" 
                                                id="fc_branch" 
                                                value={inputData.fc_branch} readOnly 
                                            />
                                        </div>
                                    </div>
                                    <div className="col-8">
                                        <div className="form-group">
                                            <label style={{ fontSize: '12px' }}>Stock Code</label>
                                            <input 
                                                type="text" 
                                                className="form-control" 
                                                name="fc_stockcode" 
                                                id="fc_stockcode" 
                                                onChange={(e) => {
                                                    setInputData(prevInputData => ({
                                                        ...prevInputData,
                                                        fc_stockcode: e.target.value,
                                                    }));
                                                }} 
                                            />
                                        </div>
                                    </div>
                            </div>
                            <div className="row">
                                    <div className="col-4">
                                            <div className="form-group required">
                                                <label style={{ fontSize: '12px' }}>Nama Pendek</label>
                                                <input 
                                                    type="text" 
                                                    className="form-control" 
                                                    name="fc_nameshort" 
                                                    id="fc_nameshort" 
                                                    onChange={(e) => {
                                                        setInputData(prevInputData => ({
                                                            ...prevInputData,
                                                            fc_nameshort: e.target.value,
                                                        }))
                                                    }}
                                                />
                                            </div>
                                    </div>
                                    <div className="col-5">
                                            <div className="form-group required">
                                                <label style={{ fontSize: '12px' }}>Nama Panjang</label>
                                                <input 
                                                    type="text" 
                                                    className="form-control" 
                                                    name="fc_namelong" 
                                                    id="fc_namelong" 
                                                    onChange={(e) => {
                                                        setInputData(prevInputData => ({
                                                            ...prevInputData,
                                                            fc_namelong: e.target.value,
                                                        }))
                                                    }}
                                                />
                                            </div>
                                    </div>
                                    <div className="col-3">
                                            <div className="form-group">
                                                <label style={{ fontSize: '12px' }}>Namepack</label>
                                                <Select 
                                                    options={namepackOptions}
                                                    onChange={handleNamepackChange}
                                                    required
                                                />
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                 <div className="col-4">
                                            <div className="form-group">
                                                <label style={{ fontSize: '12px' }}>Brand</label>
                                                <Select
                                                    options={brandOptions}
                                                    name="fc_brand"
                                                    onChange={handleBrandChange}
                                                    required
                                                />
                                            </div>
                                    </div>
                                    <div className="col-4">
                                            <div className="form-group">
                                                <label style={{ fontSize: '12px' }}>Group</label>
                                                <Select 
                                                options={groupByBrandOptions}
                                                value={selectedGroupByBrand}
                                                onChange={handleGroupByBrandChange}
                                                required
                                                />
                                            </div>
                                    </div>
                                    <div className="col-4">
                                            <div className="form-group">
                                                <label style={{ fontSize: '12px' }}>Sub Group</label>
                                                <Select 
                                                     options={subGroupByGroupOptions}
                                                    value={selectedSubGroupByGroup}
                                                    onChange={(event) => setSelectedSubGroupByGroup(event)}
                                                />
                                            </div>
                                    </div>
                            </div>
                            <div className="row">
                                    <div className="col-sm-6 col-md-3">
                                        <div className="form-group">
                                            <label style={{ fontSize: '12px' }}>Batch</label>
                                            <RadioButtons 
                                                name="fl_batch_add"
                                                onChange={
                                                    (value) => {
                                                        if(value !== batchValue){
                                                            setInputData(prevInputData => ({
                                                                ...prevInputData,
                                                                fl_batch: value,
                                                            })
                                                        );
                                                         setBatchValue(value);
                                                        }
                                                    }
                                                } 
                                                options1="Yes"
                                                options2="No"
                                            />
                                        </div>
                                    </div>
                                    <div className="col-sm-6 col-md-3">
                                        <div className="form-group">
                                            <label style={{ fontSize: '12px' }}>Expired Date</label>
                                            <RadioButtons 
                                                name="fl_expired_add" 
                                                onChange={
                                                    (value) => {
                                                        if(value !== expiredValue){
                                                            setInputData(prevInputData => ({
                                                                ...prevInputData,
                                                                fl_expired: value,
                                                            })
                                                        );
                                                         setExpiredValue(value);
                                                        }
                                                    }
                                                }
                                                options1="Yes"
                                                options2="No"
                                            />
                                        </div>
                                    </div>
                                    <div className="col-sm-6 col-md-3">
                                        <div className="form-group">
                                            <label style={{ fontSize: '12px' }}>Serial Number</label>
                                            <RadioButtons 
                                                name="fl_serialnumber_add"  
                                                onChange={
                                                    (value) => {
                                                        if(value !== serialNumberValue){
                                                            setInputData(prevInput => ({
                                                                ...prevInput,
                                                                fl_serialnumber:value
                                                            }));
                                                            setSerialNumberValue(value);
                                                        }
                                                    }
                                                } 
                                                options1="Yes"
                                                options2="No"
                                            />
                                        </div>
                                    </div>
                                    <div className="col-sm-6 col-md-3">
                                        <div className="form-group">
                                            <label style={{ fontSize: '12px' }}>Status Cat Number</label>
                                            <RadioButtons 
                                                name="fl_catnumber_add"  
                                                onChange={
                                                    (value) => {
                                                        if(value !== statusCatNumberValue){
                                                            setInputData(prevInput => ({
                                                                ...prevInput,
                                                                fl_catnumber:value
                                                            }));
                                                            setStatusCatNumberValue(value);
                                                        }
                                                    }
                                                } 
                                                options1="Yes"
                                                options2="No"
                                            />
                                        </div>
                                    </div>
                            </div>
                            <div className="row">
                                    <div className="col-sm-6 col-md-3">
                                            <div className="form-group">
                                                <label style={{ fontSize: '12px' }}>Blacklist</label>
                                                <RadioButtons 
                                                    name="fl_blacklist_add" 
                                                    onChange={
                                                        (value) => {
                                                            if(value !== blacklistValue){
                                                                setInputData(prevInput => ({
                                                                    ...prevInput,
                                                                    fl_blacklist:value
                                                                }));
                                                                setBlacklistValue(value);
                                                            }
                                                        }
                                                    } 
                                                    options1="Yes"
                                                    options2="No"
                                                />
                                            </div>
                                    </div>
                                    <div className="col-sm-6 col-md-3">
                                            <div className="form-group">
                                                <label style={{ fontSize: '12px' }}>Tax Type</label>
                                                <RadioButtons 
                                                    name="fl_taxtype_add" 
                                                    onChange={
                                                        (value) => {
                                                            if(value !== taxtypeValue){
                                                                setInputData(prevInput => ({
                                                                    ...prevInput,
                                                                    fl_taxtype:value
                                                                }));
                                                                setTaxtypeValue(value);
                                                            }
                                                        }
                                                    } 
                                                    options1="Yes"
                                                      options2="No"
                                                />
                                            </div>
                                    </div>
                                    <div className="col-sm-6 col-md-3">
                                            <div className="form-group">
                                                <label style={{ fontSize: '12px' }}>Report Supplier</label>
                                                <RadioButtons 
                                                    name="fl_repsupplier_add" 
                                                    onChange={
                                                        (value) => {
                                                            if(value !== repsupplierValue){
                                                                setInputData(prevInput => ({
                                                                    ...prevInput,
                                                                    fl_repsupplier:value
                                                                }));
                                                                setRepsupplierValue(value);
                                                            }
                                                        }
                                                    } 
                                                    options1="Yes"
                                                    options2="No"
                                                />
                                            </div>
                                    </div>
                                    <div className="col-sm-6 col-md-3">
                                            <div className="form-group">
                                                <label style={{ fontSize: '12px' }}>Detail CAT Number</label>
                                                <input 
                                                    type="text" 
                                                    className="form-control" 
                                                    name="fc_catnumber" 
                                                    id="fc_catnumber" 
                                                    onChange={
                                                        (e) => {
                                                            setInputData(prevInput => ({
                                                                ...prevInput,
                                                                fc_catnumber:e.target.value
                                                            }));
                                                        }
                                                    }
                                                />
                                            </div>
                                    </div>
                            </div>
                            <div className="row">
                                    <div className="col-md-3">
                                        <div className="form-group">
                                             <label style={{ fontSize: '12px' }}>Tipe Stock 1</label>
                                                <Select
                                                    options={typeStock1Options}
                                                    name="fc_typestock1"
                                                    onChange={
                                                        (event) => {
                                                            setInputData(prevInputData => ({
                                                                ...prevInputData,
                                                                fc_typestock1: event.value
                                                            }))
                                                        }
                                                    }
                                                    required
                                                />

                                        </div>
                                    </div>
                                    <div className="col-md-3">
                                        <div className="form-group">
                                            <label style={{ fontSize: '12px' }}>Tipe Stock 2</label>
                                                <Select
                                                    options={typeStock2Options}
                                                    name="fc_typestock2_add"
                                                    onChange={
                                                        (event) => {
                                                            setInputData(prevInputData => ({
                                                                ...prevInputData,
                                                                fc_typestock2: event.value
                                                            }))
                                                        }
                                                    }
                                                    required
                                                />
                                        </div>
                                    </div>
                                    <div className="col-md-3">
                                        <div className="form-group">
                                            <label style={{ fontSize: '12px' }}>Reorder Level</label>
                                            <input 
                                                type="number" 
                                                className="form-control" 
                                                name="fn_reorderlevel" 
                                                id="fn_reorderlevel"
                                                onChange={(e) => {
                                                    setInputData(prevInputData => ({
                                                        ...prevInputData,
                                                        fn_reorderlevel: e.target.value
                                                    }))
                                                }}
                                            />
                                        </div>
                                    </div>
                                    <div className="col-md-3">
                                        <div className="form-group">
                                            <label style={{ fontSize: '12px' }}>Max On Hand</label>
                                            <input 
                                                type="number" 
                                                className="form-control" 
                                                name="fn_maxonhand" 
                                                id="fn_maxonhand" 
                                                onChange={(e) => {
                                                    setInputData(prevInputData => ({
                                                        ...prevInputData,
                                                        fn_maxonhand: e.target.value
                                                    }))
                                                }}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-3">
                                            <div className="form-group">
                                                <label style={{ fontSize: '12px' }}>Purchase</label>
                                                <input 
                                                    type="number" 
                                                    className="form-control" 
                                                    name="fm_purchase" 
                                                    id="fm_purchase" 
                                                    onChange={(e) => {
                                                        setInputData(prevInputData => ({
                                                            ...prevInputData,
                                                            fm_purchase: e.target.value
                                                        }))
                                                    }}
                                                    required
                                                />
                                            </div>
                                    </div>
                                    <div className="col-md-3">
                                            <div className="form-group">
                                                <label style={{ fontSize: '12px' }}>COGS</label>
                                                <input 
                                                    type="number" 
                                                    className="form-control" 
                                                    name="fm_cogs" 
                                                    id="fm_cogs"
                                                    onChange={(e) => {
                                                        setInputData(prevInputData => ({
                                                            ...prevInputData,
                                                            fm_cogs: e.target.value
                                                        }))
                                                    }}
                                                    required
                                                />
                                            </div>
                                    </div>
                                    <div className="col-md-3">
                                            <div className="form-group">
                                                <label style={{ fontSize: '12px' }}>Sales Price</label>
                                                <input 
                                                    type="number" 
                                                    className="form-control" 
                                                    name="fm_salesprice" 
                                                    id="fm_salesprice" 
                                                    onChange={(e) => {
                                                        setInputData(prevInputData => ({
                                                            ...prevInputData,
                                                            fm_salesprice: e.target.value
                                                        }))
                                                    }}
                                                    required
                                                />
                                            </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-sm-6 col-md-2">
                                            <div className="form-group">
                                                <label style={{ fontSize: '12px' }}>Diskon Tanggal</label>
                                                <RadioButtons 
                                                    name="fl_disc_date_add"  
                                                    value={inputData.fl_disc_date === 'T' ? 'T' : 'F'}
                                                    onChange={(value) => handleDiscDate(value)}
                                                    options1="Yes"
                                                    options2="No" 
                                                />
                                            </div>
                                    </div>
                                    <div className={`col-sm-6 col-md-2 col-lg-2 place_diskon_tanggal hidden}`}>
                                            <div className="form-group">
                                                <label style={{ fontSize: '12px' }}>Tanggal Start</label>
                                                <input 
                                                    type="date" 
                                                    className="form-control" 
                                                    name="fd_disc_begin_add" 
                                                    id="fd_disc_begin"
                                                    onChange={(e) => {
                                                        setInputData(prevInputData => ({
                                                            ...prevInputData,
                                                            fd_disc_begin: e.target.value
                                                        }))
                                                    }}
                                                />
                                            </div>
                                    </div>  
                                    <div className={`col-sm-6 col-md-2 col-lg-2 place_diskon_tanggal hidden}`}>
                                            <div className="form-group">
                                                <label style={{ fontSize: '12px' }}>Tanggal End</label>
                                                <input 
                                                    type="date" 
                                                    className="form-control" 
                                                    name="fd_disc_end_add" 
                                                    id="fd_disc_end" 
                                                    onChange={(e) => {
                                                        setInputData(prevInputData => ({
                                                            ...prevInputData,
                                                            fd_disc_end: e.target.value
                                                        }))
                                                    }}
                                                />
                                            </div>
                                    </div>
                                    <div className={`col-sm-6 col-md-3 col-lg-3 place_diskon_tanggal hidden}`}>
                                        <div className="form-group">
                                            <label style={{ fontSize: '12px' }}>Rupiah</label>
                                            <input 
                                                type="number" 
                                                className="form-control" 
                                                name="fm_disc_rp_add" 
                                                id="fm_disc_rp" 
                                                onChange={(e) => {
                                                    setInputData(prevInputData => ({
                                                        ...prevInputData,
                                                        fm_disc_rp: e.target.value
                                                    }))
                                                }}
                                            />
                                        </div>
                                    </div>
                                    <div className={`col-sm-6 col-md-3 col-lg-3 place_diskon_tanggal hidden}`}>
                                        <div className="form-group">
                                            <label style={{ fontSize: '12px' }}>Persentase</label>
                                            <input 
                                                type="number" 
                                                className="form-control" 
                                                name="fm_disc_pr_add" 
                                                id="fm_disc_pr"
                                                onChange={(e) => {
                                                    setInputData(prevInputData => ({
                                                        ...prevInputData,
                                                        fm_disc_pr: e.target.value
                                                    }))
                                                }} 
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-sm-6 col-md-2">
                                            <div className="form-group">
                                                <label style={{ fontSize: '12px' }}>Diskon Waktu</label>
                                                <RadioButtons 
                                                    name="fl_disc_time_add" 
                                                    value={inputData.fl_disc_time === 'T' ? 'T' : 'F'} 
                                                    onChange={(value) => handleDiscTime(value)} 
                                                    options1="Yes"
                                                    options2="No"
                                                />
                                            </div>
                                    </div>
                                    <div className={`col-sm-6 col-md-2 col-lg-2 place_diskon_waktu hidden}`}>
                                        <div className="form-group">
                                            <label style={{ fontSize: '12px' }}>Waktu Start</label>
                                            <input 
                                                type="time" 
                                                className="form-control" 
                                                name="ft_disc_begin_add" 
                                                id="ft_disc_begin" 
                                                maxLength="5"
                                                onChange={(e) => {
                                                    setInputData(prevInputData => ({
                                                        ...prevInputData,
                                                        ft_disc_begin: e.target.value
                                                    }))
                                                }} 
                                            />
                                        </div>
                                    </div>
                                    <div className={`col-sm-6 col-md-2 col-lg-2 place_diskon_waktu hidden}`}>
                                        <div className="form-group">
                                            <label style={{ fontSize: '12px' }}>Waktu End</label>
                                            <input 
                                                type="time" 
                                                className="form-control" 
                                                name="ft_disc_end_add" 
                                                id="ft_disc_end" 
                                                maxLength="5" 
                                                onChange={(e) => {
                                                    setInputData(prevInputData => ({
                                                        ...prevInputData,
                                                        ft_disc_end: e.target.value
                                                    }))
                                                }}
                                            />
                                        </div>
                                    </div>
                                    <div className={`col-sm-6 col-md-3 col-lg-3 place_diskon_waktu hidden}`}>
                                        <div className="form-group">
                                            <label style={{ fontSize: '12px' }}>Rupiah</label>
                                            <input 
                                                type="number" 
                                                className="form-control" 
                                                name="fm_time_disc_rp_add" 
                                                id="fm_time_disc_rp" 
                                                onChange={(e) => {
                                                    setInputData(prevInputData => ({
                                                        ...prevInputData,
                                                        fm_time_disc_rp: e.target.value
                                                    }))
                                                }}
                                            />
                                        </div>
                                    </div>
                                    <div className={`col-sm-6 col-md-3 col-lg-3 place_diskon_waktu hidden}`}>
                                        <div className="form-group">
                                            <label style={{ fontSize: '12px' }}>Persentase</label>
                                            <input 
                                                type="number" 
                                                className="form-control" 
                                                name="fm_time_disc_pr_add" 
                                                id="fm_time_disc_pr" 
                                                onChange={
                                                    (e) => {
                                                        setInputData(prevInputData => ({
                                                            ...prevInputData,
                                                            fm_time_disc_pr: e.target.value
                                                        }))
                                                    }
                                                }
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-sm-6 col-md-2 col-lg-2">
                                        <div className="form-group">
                                            <label style={{ fontSize: '12px' }}>Price</label>
                                            <input 
                                                type="number" 
                                                className="form-control" 
                                                name="fm_price_default_add" 
                                                id="fm_price_default"
                                                onChange={(e) => {
                                                    setInputData(prevInputData => ({
                                                        ...prevInputData,
                                                        fm_price_default: e.target.value
                                                    }))
                                                }}
                                            />
                                        </div>
                                    </div>
                                    <div className="col-sm-6 col-md-2 col-lg-2">
                                        <div className="form-group">
                                            <label style={{ fontSize: '12px' }}>Price Distributor</label>
                                            <input 
                                                type="number" 
                                                className="form-control" 
                                                name="fm_price_distributor_add" 
                                                id="fm_price_distributor"
                                                onChange={(e) => {
                                                    setInputData(prevInputData => ({
                                                        ...prevInputData,
                                                        fm_price_distributor: e.target.value
                                                    }))
                                                }}
                                            />
                                        </div>
                                    </div>
                                    <div className="col-sm-6 col-md-2 col-lg-2">
                                        <div className="form-group">
                                            <label style={{ fontSize: '12px' }}>Price Project</label>
                                            <input 
                                                type="number" 
                                                className="form-control" 
                                                name="fm_price_project_add" 
                                                id="fm_price_project" 
                                                onChange={(e) => {
                                                    setInputData(prevInputData => ({
                                                        ...prevInputData,
                                                        fm_price_project: e.target.value
                                                    }))
                                                }}
                                            />
                                        </div>
                                    </div>
                                    <div className="col-sm-6 col-md-2 col-lg-2">
                                        <div className="form-group">
                                            <label style={{ fontSize: '12px' }}>Price Dealer</label>
                                            <input 
                                                type="number" 
                                                className="form-control" 
                                                name="fm_price_dealer_add" 
                                                id="fm_price_dealer"
                                                onChange={(e) => {
                                                    setInputData(prevInputData => ({
                                                        ...prevInputData,
                                                        fm_price_dealer: e.target.value
                                                    }))
                                                }}
                                            />
                                        </div>
                                    </div>
                                    <div className="col-sm-6 col-md-2 col-lg-2">
                                        <div className="form-group">
                                            <label style={{ fontSize: '12px' }}>Price Enduser</label>
                                            <input 
                                                type="number" 
                                                className="form-control" 
                                                name="fm_price_enduser_add" 
                                                id="fm_price_enduser" 
                                                onChange={(e) => {
                                                    setInputData(prevInputData => ({
                                                        ...prevInputData,
                                                        fm_price_enduser: e.target.value
                                                    }))
                                                }}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-sm-12 col-md-12 col-lg-12">
                                        <div className="form-group">
                                            <label style={{ fontSize: '12px' }}>Description</label>
                                            <textarea 
                                                className="form-control" 
                                                name="fv_stockdescription" 
                                                id="fv_stockdescription" 
                                                rows="3" 
                                                onChange={(e) => {
                                                    setInputData(prevInputData => ({
                                                        ...prevInputData,
                                                        fv_stockdescription: e.target.value
                                                    }))
                                                }}
                                            ></textarea>
                                        </div>
                                    </div>
                                </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-dismiss="modal">
                                Close
                            </button>
                            <button type="submit" className="btn btn-primary" id="saveChangesBtn">
                                Save Changes
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


export default ModalStock;