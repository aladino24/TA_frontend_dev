import React, { useEffect } from "react";
import RadioButtons from "../../../../components/RadioButton";
import Select from 'react-select'
import { useState } from "react";
import Config from "../../../../config";
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
    
    const [inputData, setInputData] = useState(
        {
            fc_stockcode: '',
            fc_barcode: '',
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

                const [
                    getBranchResponse,
                    unityResponse,
                    brandResponse,
                    groupByBrandResponse, 

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
                ]);

                const branchData = getBranchResponse.data.user.branch;
                const unityData = unityResponse.data.data;
                const brandData = brandResponse.data.data;

                setInputData(prevInputData => ({
                    ...prevInputData,
                    fc_branch: branchData,
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
  
    return (
       <>
            <div
            className="modal fade"
            id="addModal"
            tabIndex="-1"
            role="dialog"
            aria-labelledby="editModalLabel"
            aria-hidden={!props.isOpen}
        >
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
                    <form>
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
                                                />
                                            </div>
                                    </div>
                            </div>
                            <div className="row">
                                    <div className="col-md-3">
                                        <div className="form-group">
                                             <label style={{ fontSize: '12px' }}>Tipe Stock 1</label>
                                                <Select
                                                    options={namepackOptions}
                                                    name="fc_typestock1"
                                                    required
                                                />

                                        </div>
                                    </div>
                                    <div className="col-md-3">
                                        <div className="form-group">
                                            <label style={{ fontSize: '12px' }}>Tipe Stock 2</label>
                                                <Select
                                                    options={namepackOptions}
                                                    name="fc_typestock2"
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
                                                    onChange={
                                                        (value) => {
                                                            if(value !== discDateValue){
                                                                setInputData(prevInput => ({
                                                                    ...prevInput,
                                                                    fl_disc_date:value
                                                                }));
                                                                setDiscDateValue(value);
                                                            }
                                                        }
                                                    } 
                                                />
                                            </div>
                                    </div>
                                    <div className={`col-sm-6 col-md-2 col-lg-2 place_diskon_tanggal hidden}`}>
                                            <div className="form-group">
                                                <label style={{ fontSize: '12px' }}>Tanggal Start</label>
                                                <input 
                                                    type="date" 
                                                    className="form-control" 
                                                    name="fd_disc_begin" 
                                                    id="fd_disc_begin"
                                                />
                                            </div>
                                    </div>  
                                    <div className={`col-sm-6 col-md-2 col-lg-2 place_diskon_tanggal hidden}`}>
                                            <div className="form-group">
                                                <label style={{ fontSize: '12px' }}>Tanggal End</label>
                                                <input 
                                                    type="date" 
                                                    className="form-control" 
                                                    name="fd_disc_end" 
                                                    id="fd_disc_end" 
                                                />
                                            </div>
                                    </div>
                                    <div className={`col-sm-6 col-md-3 col-lg-3 place_diskon_tanggal hidden}`}>
                                        <div className="form-group">
                                            <label style={{ fontSize: '12px' }}>Rupiah</label>
                                            <input 
                                                type="number" 
                                                className="form-control" 
                                                name="fm_disc_rp" 
                                                id="fm_disc_rp" 
                                            />
                                        </div>
                                    </div>
                                    <div className={`col-sm-6 col-md-3 col-lg-3 place_diskon_tanggal hidden}`}>
                                        <div className="form-group">
                                            <label style={{ fontSize: '12px' }}>Persentase</label>
                                            <input 
                                                type="number" 
                                                className="form-control" 
                                                name="fm_disc_pr" 
                                                id="fm_disc_pr" 
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
                                                    onChange={
                                                        (value) => {
                                                            if(value !== discTimeValue){
                                                                setInputData(prevInput => ({
                                                                    ...prevInput,
                                                                    fl_disc_time:value
                                                                }));
                                                                setDiscTimeValue(value);
                                                            }
                                                        }
                                                    } 
                                                />
                                            </div>
                                    </div>
                                    <div className={`col-sm-6 col-md-2 col-lg-2 place_diskon_waktu hidden}`}>
                                        <div className="form-group">
                                            <label style={{ fontSize: '12px' }}>Waktu Start</label>
                                            <input 
                                                type="time" 
                                                className="form-control" 
                                                name="ft_disc_begin" 
                                                id="ft_disc_begin" 
                                                maxLength="5" 
                                            />
                                        </div>
                                    </div>
                                    <div className={`col-sm-6 col-md-2 col-lg-2 place_diskon_waktu hidden}`}>
                                        <div className="form-group">
                                            <label style={{ fontSize: '12px' }}>Waktu End</label>
                                            <input 
                                                type="time" 
                                                className="form-control" 
                                                name="ft_disc_end" 
                                                id="ft_disc_end" 
                                                maxLength="5" 
                                            />
                                        </div>
                                    </div>
                                    <div className={`col-sm-6 col-md-3 col-lg-3 place_diskon_waktu hidden}`}>
                                        <div className="form-group">
                                            <label style={{ fontSize: '12px' }}>Rupiah</label>
                                            <input 
                                                type="number" 
                                                className="form-control" 
                                                name="fm_time_disc_rp" 
                                                id="fm_time_disc_rp" 
                                            />
                                        </div>
                                    </div>
                                    <div className={`col-sm-6 col-md-3 col-lg-3 place_diskon_waktu hidden}`}>
                                        <div className="form-group">
                                            <label style={{ fontSize: '12px' }}>Persentase</label>
                                            <input 
                                                type="number" 
                                                className="form-control" 
                                                name="fm_time_disc_pr" 
                                                id="fm_time_disc_pr" 
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
                                                name="fm_price_default" 
                                                id="fm_price_default"
                                            />
                                        </div>
                                    </div>
                                    <div className="col-sm-6 col-md-2 col-lg-2">
                                        <div className="form-group">
                                            <label style={{ fontSize: '12px' }}>Price Distributor</label>
                                            <input 
                                                type="number" 
                                                className="form-control" 
                                                name="fm_price_distributor" 
                                                id="fm_price_distributor"
                                            />
                                        </div>
                                    </div>
                                    <div className="col-sm-6 col-md-2 col-lg-2">
                                        <div className="form-group">
                                            <label style={{ fontSize: '12px' }}>Price Project</label>
                                            <input 
                                                type="number" 
                                                className="form-control" 
                                                name="fm_price_project" 
                                                id="fm_price_project" 
                                            />
                                        </div>
                                    </div>
                                    <div className="col-sm-6 col-md-2 col-lg-2">
                                        <div className="form-group">
                                            <label style={{ fontSize: '12px' }}>Price Dealer</label>
                                            <input 
                                                type="number" 
                                                className="form-control" 
                                                name="fm_price_dealer" 
                                                id="fm_price_dealer"
                                            />
                                        </div>
                                    </div>
                                    <div className="col-sm-6 col-md-2 col-lg-2">
                                        <div className="form-group">
                                            <label style={{ fontSize: '12px' }}>Price Enduser</label>
                                            <input 
                                                type="number" 
                                                className="form-control" 
                                                name="fm_price_enduser" 
                                                id="fm_price_enduser" 
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
                                            ></textarea>
                                        </div>
                                    </div>
                                </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
       </>
    );
}


export default ModalStock;