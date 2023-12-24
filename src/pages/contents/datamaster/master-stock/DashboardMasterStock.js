import axios from "axios";
import React, { useEffect, useRef } from "react";
import Config from "../../../../config";
import $, { data } from "jquery";
import Select from 'react-select'
import { useState } from "react";
import RadioButtons from "../../../../components/RadioButton";

const DashboardMasterStock = () => {
    const tableRef = useRef(null);
    const [brandOptions, setBrandOptions] = useState([]);
    const [groupByBrandOptions,setGroupByBrandOptions] = useState([]);
    const [selectedGroupByBrand, setSelectedGroupByBrand] = useState([]);
    const [subGroupByGroupOptions, setSubGroupByGroupOptions] = useState([]);
    const [selectedSubGroupByGroup, setSelectedSubGroupByGroup] = useState([]);
    const [selectedBrand, setSelectedBrand] = useState(null);
    const [typeStock1Options, setTypeStock1Options] = useState([]);
    const [selectedTypeStock1, setSelectedTypeStock1] = useState([]);
    const [typeStock2Options, setTypeStock2Options] = useState([]);
    const [selectedTypeStock2, setSelectedTypeStock2] = useState([]);
    const [batchValue, setBatchValue] = useState('');
    const [expiredValue, setExpiredValue] = useState('');
    const [serialnumberValue, setSerialnumberValue] = useState('');
    const [statusCatNumberValue, setStatusCatNumberValue] = useState('');
    const [blacklistValue, setBlacklistValue] = useState('');
    const [taxtypeValue, setTaxtypeValue] = useState('');
    const [repsupplierValue, setRepsupplierValue] = useState('');
    const [flDiscDate, setflDiscDate] = useState('');
    const [flDiscTime, setflDiscTime] = useState('');
    const [inputData, setInputData] = useState(
        {
            fc_stockcode: '',
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
            fv_stockdescription: ''
        }
    );

    useEffect(()=> {
        const fetchData = async () => {
            try {
                const token = localStorage.getItem('token');
                const axiosConfig = {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                };
                const response = await axios.get(Config.api.server2 + "master/stock", axiosConfig);
                const responseData = response.data.data;
                if ($.fn.DataTable.isDataTable("#dataTable")) {
                    // If it is initialized, destroy it before reinitializing
                    const existingTable = $(tableRef.current).DataTable();
                    existingTable.destroy();
                  }

                const formattedData = responseData.map((user, index) => ({
                    ...user,
                    no: index + 1,
                  }));
                  
                  const table = $(tableRef.current).DataTable({
                    responsive: true,
                    processing: true,
                    serverSide: false, // Ubah menjadi true jika ingin implementasi server-side processing
                    data: formattedData,
                    columnDefs: [
                      {
                        // target all column
                        targets: 43,
                        width: "300px",
                      },
                    ],
                    columns: [
                        {data: "no"},{data: "fc_divisioncode"},
                        {data: "fc_branch"},{data: "fc_stockcode"},
                        {data: "fc_barcode"},{data: "fc_nameshort"},
                        {data: 'fc_namelong'},
                        {
                            data: 'fc_hold',
                            render: function(data, type, row) {
                                if(data === 'T'){
                                    return `<span class="badge badge-success">Yes</span>`;
                                }else{
                                    return `<span class="badge badge-danger">No</span>`;
                                }
                            }
                        },
                        {
                            data: 'fl_batch',
                            render: function(data, type, row) {
                                if(data === 'T'){
                                    return `<span class="badge badge-success">Yes</span>`;
                                }else{
                                    return `<span class="badge badge-danger">No</span>`;
                                }
                            }
                        },
                        {
                            data: 'fl_expired',
                            render: function(data, type, row) {
                                if(data === 'T'){
                                    return `<span class="badge badge-success">Yes</span>`;
                                }else{
                                    return `<span class="badge badge-danger">No</span>`;
                                }
                            }
                        },
                        {
                            data: "fl_serialnumber",
                            render: function(data, type, row) {
                                if(data === 'T'){
                                    return `<span class="badge badge-success">Yes</span>`;
                                }else{
                                    return `<span class="badge badge-danger">No</span>`;
                                }
                            }
                        },
                        {
                            data: "fl_catnumber",
                            render: function(data, type, row) {
                                if(data === 'T'){
                                    return `<span class="badge badge-success">Yes</span>`;
                                }else{
                                    return `<span class="badge badge-danger">No</span>`;
                                }
                            }
                        },
                        {data: "fc_catnumber"},
                        {
                            data: "fl_blacklist",
                            render: function(data, type, row) {
                                if(data === 'T'){
                                    return `<span class="badge badge-success">Yes</span>`;
                                }else{
                                    return `<span class="badge badge-danger">No</span>`;
                                }
                            }
                        },
                        {
                            data: "fl_taxtype",
                            render: function(data, type, row) {
                                if(data === 'T'){
                                    return `<span class="badge badge-success">Yes</span>`;
                                }else{
                                    return `<span class="badge badge-danger">No</span>`;
                                }
                            }
                        },
                        {
                            data: "fl_repsupplier",
                            render: function(data, type, row) {
                                if(data === 'T'){
                                    return `<span class="badge badge-success">Yes</span>`;
                                }else{
                                    return `<span class="badge badge-danger">No</span>`;
                                }
                            }
                        },
                        {data: "fc_brand"},{data: "fc_group"},
                        {data: "fc_subgroup"},{data: "fc_typestock1"},
                        {data: "fc_typestock2"},{data: "fc_namepack"},
                        {data: "fn_reorderlevel"},{data: "fn_maxonhand"},
                        {data: "fm_cogs"},{data: "fm_purchase"},
                        {data: "fm_salesprice"},
                        {
                            data: "fl_disc_date",
                            render: function(data, type, row) {
                                if(data === 'T'){
                                    return `<span class="badge badge-success">Yes</span>`;
                                }else{
                                    return `<span class="badge badge-danger">No</span>`;
                                }
                            }
                        },
                        {data: "fd_disc_begin"},{data: "fd_disc_end"},
                        {data: "fm_disc_rp"},{data: "fm_disc_pr"},
                        { 
                            data: "fl_disc_time",
                            render: function(data, type, row) {
                                if(data === 'T'){
                                    return `<span class="badge badge-success">Yes</span>`;
                                }else{
                                    return `<span class="badge badge-danger">No</span>`;
                                }
                            }
                        },{data: "ft_disc_begin"},
                        {data: "ft_disc_end"},{data: "fm_time_disc_rp"},
                        {data: "fm_time_disc_pr"},{data: "fm_price_default"},
                        {data: "fm_price_distributor"},{data: "fm_price_project"},
                        {data: "fm_price_dealer"},{data: "fm_price_enduser"},
                        {data: "fv_stockdescription"},{data: null},
                    ],
                    rowCallback: function(row, data) {
                        const actionBtns = `
                        <button class="btn btn-sm btn-warning" id="holdBtn">Hold</button>
                        <button class="btn btn-sm btn-primary" id="editBtn">Edit</button>
                        `;
                        $("td:eq(43)", row).html(actionBtns);
                    }
                  },);

                  $(tableRef.current).on("click", "#editBtn", function () {
                    const rowData = table.row($(this).closest("tr")).data();
                    // console.log(rowData);
                    detailEditStock(rowData);
                    //modal show
                    window.$('#editModal').modal('show');
                  });

                if(response.data.success){
                    // console.log(responseData);
                }else{
                    throw new Error(response.data.error);
                }
            } catch (error) {
                console.log(error.message);
            }
        }

        fetchData();
        return () => {
            // Hancurkan DataTable saat komponen dilepas
            const existingTable = $(tableRef.current).DataTable();
            existingTable.destroy();
          };
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


    const handleBrandChange = (selectedOption) => {
        setSelectedBrand(selectedOption);
        setSelectedGroupByBrand(null); // Menetapkan nilai grup menjadi null ketika merek diubah
        setSelectedSubGroupByGroup(null);
        fetchGroupsByBrand(selectedOption);
    };

    const handleGroupByBrandChange = (selectedOption) => {
        setSelectedGroupByBrand(selectedOption);
        setSelectedSubGroupByGroup(null);
        fetchSubGroupByGroup(selectedOption);
    }

    const handleTypeStock1Change = (value) => {
        setSelectedTypeStock1(value);
        // fetchTypeStock1()
        // console.log(typeStockOptions);
    }

    const handleTypeStock2Change = (value) => {
        setSelectedTypeStock2(value);
        // fetchTypeStock2();
    }


    async function detailEditStock(data) {
        const token = localStorage.getItem('token');
    
        if (data) {
            setInputData({
                fc_divisioncode: data.fc_divisioncode,
                fc_branch: data.branch.fv_description,
                fc_stockcode: data.fc_stockcode,
                fc_nameshort: data.fc_nameshort,
                fc_namelong: data.fc_namelong,
                fl_batch: data.fl_batch,
                fc_catnumber: data.fc_catnumber,
                fc_typestock1: data.fc_typestock1,
                fc_typestock2: data.fc_typestock2,
                fn_reorderlevel: data.fn_reorderlevel,
                fn_maxonhand: data.fn_maxonhand,
                fl_blacklist: data.fl_blacklist,
                fm_purchase: data.fm_purchase,
                fm_cogs: data.fm_cogs,
                fm_salesprice: data.fm_salesprice,
                fl_disc_date: data.fl_disc_date,
                fl_disc_time: data.fl_disc_time,
                fd_disc_begin: data.fd_disc_begin,
                fd_disc_end: data.fd_disc_end,
                fm_disc_rp: data.fm_disc_rp,
                fm_disc_pr: data.fm_disc_pr,
                ft_disc_begin: data.ft_disc_begin,
                ft_disc_end: data.ft_disc_end,
                fm_time_disc_rp: data.fm_time_disc_rp,
                fm_time_disc_pr: data.fm_time_disc_pr,
                fm_price_default: data.fm_price_default,
                fm_price_distributor: data.fm_price_distributor,
                fm_price_project: data.fm_price_project,
                fm_price_dealer: data.fm_price_dealer,
                fm_price_enduser: data.fm_price_enduser,
                fv_stockdescription: data.fv_stockdescription
            });
    
            try {
                const unityApiUrl = Config.api.server2 + 'get-unity';
                const brandApiUrl = Config.api.server2 + 'get-brand';
                const groupByBrandApiUrl = Config.api.server2 + 'stock-group-by-unity';
                const subGroupByGroupApiUrl = Config.api.server2 + 'stock-subgroup-by-group';
                const typestock1ApiUrl = Config.api.server2 + 'get-data-where-field-id-get/TransaksiType/fc_trx/GOODSMATERY';
                const typestock2ApiUrl = Config.api.server2 + 'get-data-where-field-id-get/TransaksiType/fc_trx/GOODSTRANS';
    
                const [
                    unityResponse, 
                    brandResponse, 
                    groupByBrandResponse, 
                    subGroupByGroupResponse,
                    typestock1Response,
                    typestock2Response
                ] = await Promise.all([
                    axios.get(unityApiUrl),
                    axios.get(brandApiUrl),
                    axios.get(groupByBrandApiUrl, {
                        params: {
                            fc_brand: data.fc_brand,
                        }
                    }),
                    axios.get(subGroupByGroupApiUrl,{
                        params: {
                            fc_group: data.fc_group,
                        }
                    }),
                    axios.get(typestock1ApiUrl),
                    axios.get(typestock2ApiUrl)
                ]);
    
                const unityData = unityResponse.data.data;
                const brandData = brandResponse.data.data;
                const groupByBrandData = groupByBrandResponse.data.data;
                const subGroupByGrupData = subGroupByGroupResponse.data.data;
                const typestock1Data = typestock1Response.data.data;
                const typestock2Data = typestock2Response.data.data;

                // Render UnityData options
                unityData.forEach(item => {
                    const isSelected = item.fc_kode === data.fc_namepack;
                    $('#fc_namepack').append(`<option ${isSelected ? 'selected' : ''} value="${item.fc_kode}">${item.fv_description}</option>`);
                });
    
                // Set BrandOptions and SelectedBrand
                const options = brandData.map(item => ({
                    value: item.fc_brand,
                    label: item.fc_brand,
                }));
                setBrandOptions(options);
                const selectedOption = options.find(option => option.value === data.fc_brand);
                setSelectedBrand(selectedOption);
    
                // Set GroupByBrandOptions and SelectedGroupByBrand
                const groupByBrandOptions = groupByBrandData.map(item => ({
                    value: item.fc_group,
                    label: item.fc_group,
                }));
                setGroupByBrandOptions(groupByBrandOptions);
                const selectedGroupByBrandOption = groupByBrandOptions.find(option => option.value === data.fc_group);
                setSelectedGroupByBrand(selectedGroupByBrandOption);
                // console.log(groupByBrandData);

                const subGroupByGrupOptions = subGroupByGrupData.map(item => ({
                    value: item.fc_subgroup,
                    label: item.fc_subgroup
                }));

                setSubGroupByGroupOptions(subGroupByGroupOptions);
                const selectedSubGroupByGroupOption = subGroupByGrupOptions.find(option => option.value === data.fc_subgroup);
                setSelectedSubGroupByGroup(selectedSubGroupByGroupOption);

                // Set Typestock1Options and SelectedTypestock1
                const typestock1Options = typestock1Data.map(item => ({
                    value: item.fc_kode,
                    label: item.fc_kode,
                }));

                setTypeStock1Options(typestock1Options);
                const selectedTypestock1Option = typestock1Options.find(option => option.value === data.fc_typestock1);
                setSelectedTypeStock1(selectedTypestock1Option);
                // console.log(typestock1Data);

                // Set Typestock2Options and SelectedTypestock2
                const typestock2Option = typestock2Data.map(item => ({
                    value: item.fc_kode,
                    label: item.fc_kode,
                }));

                setTypeStock2Options(typestock2Option);
                const selectedTypestock2Option = typestock2Option.find(option => option.value === data.fc_typestock2);
                setSelectedTypeStock2(selectedTypestock2Option);
                // console.log(typestock2Options);
            } catch (error) {
                console.error('Error:', error);
                // Handle errors here
            }
        }
    }
    
    const handleBatchChange = (value) => {
        setBatchValue(value);
      };

    const handleExpiredChange = (value) => {
        setExpiredValue(value);
    }

    const handleSerialnumberChange = (value) => {
        setSerialnumberValue(value);
    }

    const handleStatusCatNumberChange = (value) => {
        setStatusCatNumberValue(value);
    }

    const handleBlacklistChange = (value) => {
        setBlacklistValue(value);
    }

    const handleTaxtypeChange = (value) => {
        setTaxtypeValue(value);
    }
    
    const handleRepsupplierChange = (value) => {
        setRepsupplierValue(value);
    }

    const handleDiscDate = (value) => {
        setflDiscDate(value);
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

    const handleDiscTime = (value) => {
        setflDiscTime(value);
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

    // console.log(typeStock2Options);

    return (
        <div>
            <div className="container-fluid">
                {/*  <!-- Page Heading --> */}
                <div className="d-sm-flex align-items-center justify-content-between mb-4">
                <h1 className="h3 mb-0 text-gray-800">Master Stock</h1>
                <a
                    href="#"
                    className="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm"
                >
                    <i className="fas fa-download fa-sm text-white-50"></i> Generate
                    Report
                </a>
                </div>

            
                <div className="row">
                <div className="col-lg-12">
                    <div className="card shadow mb-4">
                    <div className="card-body">
                        <div className="table-responsive">
                        <table
                        ref={tableRef}
                            className="table table-bordered"
                            id="dataTable"
                            width="100%"
                            cellSpacing="0"
                        >
                            <thead>
                            <tr>
                                <th>No</th>
                                <th>Division Code</th>
                                <th>Branch</th>
                                <th>Kode Stock</th>
                                <th>Barcode</th>
                                <th>Nama Pendek</th>
                                <th>Nama Panjang</th>
                                <th>Hold</th>
                                <th>Batch</th>
                                <th>Expired</th>
                                <th>Serial Number</th>
                                <th>Status Cat Number</th>
                                <th>Cat Number</th>
                                <th>Blacklist</th>
                                <th>Taxtype</th>
                                <th>Resupplier</th>
                                <th>Brand</th>
                                <th>Group</th>
                                <th>Sub Group</th>
                                <th>Tipe Stock 1</th>
                                <th>Tipe Stock 2</th>
                                <th>Name Pack</th>
                                <th>Reorder Level</th>
                                <th>Max</th>
                                <th>COGS</th>
                                <th>Purchase</th>
                                <th>Sales Price</th>
                                <th>FL Disc Date</th>
                                <th>FD Disc Begin</th>
                                <th>FD Disc End</th>
                                <th>FM Disc RP</th>
                                <th>FM Disc PR</th>
                                <th>FL Disc Time</th>
                                <th>FT Disc Begin</th>
                                <th>FT Disc End</th>
                                <th>FM Time Disc RP</th>
                                <th>FM Time Disc PR</th>
                                <th>Price Default</th>
                                <th>Price Distributor</th>
                                <th>Price Project</th>
                                <th>Price Dealer</th>
                                <th>Price End User</th>
                                <th>Stock Description</th>
                                <th>Action</th>
                            </tr>
                            </thead>
                            <tfoot>
                            <tr>
                            <th>No</th>
                                <th>Division Code</th>
                                <th>Branch</th>
                                <th>Kode Stock</th>
                                <th>Barcode</th>
                                <th>Nama Pendek</th>
                                <th>Nama Panjang</th>
                                <th>Hold</th>
                                <th>Batch</th>
                                <th>Expired</th>
                                <th>Serial Number</th>
                                <th>Status Cat Number</th>
                                <th>Cat Number</th>
                                <th>Blacklist</th>
                                <th>Taxtype</th>
                                <th>Resupplier</th>
                                <th>Brand</th>
                                <th>Group</th>
                                <th>Sub Group</th>
                                <th>Tipe Stock 1</th>
                                <th>Tipe Stock 2</th>
                                <th>Name Pack</th>
                                <th>Reorder Level</th>
                                <th>Max</th>
                                <th>COGS</th>
                                <th>Purchase</th>
                                <th>Sales Price</th>
                                <th>FL Disc Date</th>
                                <th>FD Disc Begin</th>
                                <th>FD Disc End</th>
                                <th>FM Disc RP</th>
                                <th>FM Disc PR</th>
                                <th>FL Disc Time</th>
                                <th>FT Disc Begin</th>
                                <th>FT Disc End</th>
                                <th>FM Time Disc RP</th>
                                <th>FM Time Disc PR</th>
                                <th>Price Default</th>
                                <th>Price Distributor</th>
                                <th>Price Project</th>
                                <th>Price Dealer</th>
                                <th>Price End User</th>
                                <th>Stock Description</th>
                                <th>Action</th>
                            </tr>
                            </tfoot>
                        </table>
                        </div>
                    </div>
                    </div>
                </div>
                </div>

            </div>
             {/* Edit Modal */}
             <div className="modal fade" id="editModal" tabIndex="-1" role="dialog" aria-labelledby="editModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-lg" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="editModalLabel">
                                Edit Data
                            </h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <form id="editForm">
                                <div className="row">
                                    {/* Add more input fields as needed */}
                                    <div className="col-4">
                                        <div className="form-group">
                                            <label style={{ fontSize: '12px' }}>Branch</label>
                                            <input type="text" className="form-control" name="fc_branch" id="fc_branch" value={inputData.fc_branch} readOnly />
                                        </div>
                                    </div>
                                    <div className="col-8">
                                        <div className="form-group">
                                            <label style={{ fontSize: '12px' }}>Stock Code</label>
                                            <input type="text" className="form-control" name="fc_stockcode" id="fc_stockcode" value={inputData.fc_stockcode} readOnly />
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-4">
                                            <div className="form-group required">
                                                <label style={{ fontSize: '12px' }}>Nama Pendek</label>
                                                <input type="text" className="form-control" name="fc_nameshort" id="fc_nameshort" value={inputData.fc_nameshort}/>
                                            </div>
                                    </div>
                                    <div className="col-5">
                                            <div className="form-group required">
                                                <label style={{ fontSize: '12px' }}>Nama Panjang</label>
                                                <input type="text" className="form-control" name="fc_namelong" id="fc_namelong" value={inputData.fc_namelong}/>
                                            </div>
                                    </div>
                                    <div className="col-3">
                                            <div className="form-group">
                                                <label style={{ fontSize: '12px' }}>Namepack</label>
                                                <select className="form-control" name="fc_namepack" id="fc_namepack">
                                              
                                                </select>
                                            </div>
                                    </div>
                                </div>
                                <div className="row">
                                 <div className="col-4">
                                            <div className="form-group">
                                                <label style={{ fontSize: '12px' }}>Brand</label>
                                                <Select
                                                    options={brandOptions}
                                                    value={selectedBrand}
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
                                                    onChange={(selectedOption) => setSelectedSubGroupByGroup(selectedOption)}
                                                />
                                            </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-sm-6 col-md-3">
                                        <div className="form-group">
                                            <label style={{ fontSize: '12px' }}>Batch</label>
                                            <RadioButtons name="fl_batch" value={inputData.fl_batch === 'T' ? 'T' : 'F'} onChange={handleBatchChange} />
                                        </div>
                                    </div>
                                    <div className="col-sm-6 col-md-3">
                                        <div className="form-group">
                                            <label style={{ fontSize: '12px' }}>Expired Date</label>
                                            <RadioButtons name="fl_expired" value={inputData.fl_expired === 'T' ? 'T' : 'F'} onChange={handleExpiredChange} />
                                        </div>
                                    </div>
                                    <div className="col-sm-6 col-md-3">
                                        <div className="form-group">
                                            <label style={{ fontSize: '12px' }}>Serial Number</label>
                                            <RadioButtons name="fl_serialnumber" value={inputData.fl_serialnumber === 'T' ? 'T' : 'F'} onChange={handleSerialnumberChange} />
                                        </div>
                                    </div>
                                    <div className="col-sm-6 col-md-3">
                                        <div className="form-group">
                                            <label style={{ fontSize: '12px' }}>Status Cat Number</label>
                                            <RadioButtons name="fl_catnumber" value={inputData.fl_catnumber === 'T' ? 'T' : 'F'} onChange={handleStatusCatNumberChange} />
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-sm-6 col-md-3">
                                            <div className="form-group">
                                                <label style={{ fontSize: '12px' }}>Blacklist</label>
                                                <RadioButtons name="fl_blacklist" value={inputData.fl_blacklist === 'T' ? 'T' : 'F'} onChange={handleBlacklistChange} />
                                            </div>
                                    </div>
                                    <div className="col-sm-6 col-md-3">
                                            <div className="form-group">
                                                <label style={{ fontSize: '12px' }}>Tax Type</label>
                                                <RadioButtons name="fl_taxtype" value={inputData.fl_taxtype === 'T' ? 'T' : 'F'} onChange={handleTaxtypeChange} />
                                            </div>
                                    </div>
                                    <div className="col-sm-6 col-md-3">
                                            <div className="form-group">
                                                <label style={{ fontSize: '12px' }}>Report Supplier</label>
                                                <RadioButtons name="fl_repsupplier" value={inputData.fl_repsupplier === 'T' ? 'T' : 'F'} onChange={handleRepsupplierChange} />
                                            </div>
                                    </div>
                                    <div className="col-sm-6 col-md-3">
                                            <div className="form-group">
                                                <label style={{ fontSize: '12px' }}>Detail CAT Number</label>
                                                <input type="text" className="form-control" name="fc_catnumber" id="fc_catnumber" value={inputData.fc_catnumber}/>
                                            </div>
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col-md-3">
                                        <div className="form-group">
                                             <label style={{ fontSize: '12px' }}>Tipe Stock 1</label>
                                                <Select
                                                    options={typeStock1Options}
                                                    value={selectedTypeStock1}
                                                    onChange={handleTypeStock1Change}
                                                    name="fc_typestock1"
                                                    required
                                                />

                                        </div>
                                    </div>
                                    <div className="col-md-3">
                                        <div className="form-group">
                                            <label style={{ fontSize: '12px' }}>Tipe Stock 2</label>
                                                <Select
                                                    options={typeStock2Options}
                                                    value={selectedTypeStock2}
                                                    onChange={handleTypeStock2Change}
                                                    name="fc_typestock2"
                                                    required
                                                />
                                        </div>
                                    </div>
                                    <div className="col-md-3">
                                        <div className="form-group">
                                            <label style={{ fontSize: '12px' }}>Reorder Level</label>
                                            <input type="number" className="form-control" name="fn_reorderlevel" id="fn_reorderlevel" value={inputData.fn_reorderlevel}/>
                                        </div>
                                    </div>
                                    <div className="col-md-3">
                                        <div className="form-group">
                                            <label style={{ fontSize: '12px' }}>Max On Hand</label>
                                            <input type="number" className="form-control" name="fn_maxonhand" id="fn_maxonhand" value={inputData.fn_maxonhand}/>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-3">
                                            <div className="form-group">
                                                <label style={{ fontSize: '12px' }}>Purchase</label>
                                                <input type="number" className="form-control" name="fm_purchase" id="fm_purchase" value={inputData.fm_purchase} required/>
                                            </div>
                                    </div>
                                    <div className="col-md-3">
                                            <div className="form-group">
                                                <label style={{ fontSize: '12px' }}>COGS</label>
                                                <input type="number" className="form-control" name="fm_cogs" id="fm_cogs" value={inputData.fm_cogs} required/>
                                            </div>
                                    </div>
                                    <div className="col-md-3">
                                            <div className="form-group">
                                                <label style={{ fontSize: '12px' }}>Sales Price</label>
                                                <input type="number" className="form-control" name="fm_salesprice" id="fm_salesprice" value={inputData.fm_salesprice} required/>
                                            </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-sm-6 col-md-2">
                                            <div className="form-group">
                                                <label style={{ fontSize: '12px' }}>Diskon Tanggal</label>
                                                <RadioButtons name="fl_disc_date" value={inputData.fl_disc_date === 'T' ? 'T' : 'F'} onChange={(value) => handleDiscDate(value)} />
                                            </div>
                                    </div>
                                    <div className={`col-sm-6 col-md-2 col-lg-2 place_diskon_tanggal ${flDiscDate === 'F' ? 'hidden' : ''}`}>
                                            <div className="form-group">
                                                <label style={{ fontSize: '12px' }}>Tanggal Start</label>
                                                <input type="date" className="form-control" name="fd_disc_begin" id="fd_disc_begin" value={inputData.fd_disc_begin} />
                                            </div>
                                    </div>  
                                    <div className={`col-sm-6 col-md-2 col-lg-2 place_diskon_tanggal ${flDiscDate === 'F' ? 'hidden' : ''}`}>
                                            <div className="form-group">
                                                <label style={{ fontSize: '12px' }}>Tanggal End</label>
                                                <input type="date" className="form-control" name="fd_disc_end" id="fd_disc_end" value={inputData.fd_disc_end} />
                                            </div>
                                    </div>
                                    <div className={`col-sm-6 col-md-3 col-lg-3 place_diskon_tanggal ${flDiscDate === 'F' ? 'hidden' : ''}`}>
                                        <div className="form-group">
                                            <label style={{ fontSize: '12px' }}>Rupiah</label>
                                            <input type="number" className="form-control" name="fm_disc_rp" id="fm_disc_rp" value={inputData.fm_disc_rp}/>
                                        </div>
                                    </div>
                                    <div className={`col-sm-6 col-md-3 col-lg-3 place_diskon_tanggal ${flDiscDate === 'F' ? 'hidden' : ''}`}>
                                        <div className="form-group">
                                            <label style={{ fontSize: '12px' }}>Persentase</label>
                                            <input type="number" className="form-control" name="fm_disc_pr" id="fm_disc_pr" value={inputData.fm_disc_pr}/>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-sm-6 col-md-2">
                                            <div className="form-group">
                                                <label style={{ fontSize: '12px' }}>Diskon Waktu</label>
                                                <RadioButtons name="fl_disc_time" value={inputData.fl_disc_time === 'T' ? 'T' : 'F'} onChange={(value) => handleDiscTime(value)} />
                                            </div>
                                    </div>
                                    <div className={`col-sm-6 col-md-2 col-lg-2 place_diskon_waktu ${flDiscTime === 'F' ? 'hidden' : ''}`}>
                                        <div className="form-group">
                                            <label style={{ fontSize: '12px' }}>Waktu Start</label>
                                            <input type="time" className="form-control" name="ft_disc_begin" id="ft_disc_begin" maxlength="5" value={inputData.ft_disc_begin}/>
                                        </div>
                                    </div>
                                    <div className={`col-sm-6 col-md-2 col-lg-2 place_diskon_waktu ${flDiscTime === 'F' ? 'hidden' : ''}`}>
                                        <div className="form-group">
                                            <label style={{ fontSize: '12px' }}>Waktu End</label>
                                            <input type="time" className="form-control" name="ft_disc_end" id="ft_disc_end" maxlength="5" value={inputData.ft_disc_end}/>
                                        </div>
                                    </div>
                                    <div className={`col-sm-6 col-md-3 col-lg-3 place_diskon_waktu ${flDiscTime === 'F' ? 'hidden' : ''}`}>
                                        <div className="form-group">
                                            <label style={{ fontSize: '12px' }}>Rupiah</label>
                                            <input type="number" className="form-control" name="fm_time_disc_rp" id="fm_time_disc_rp" value={inputData.fm_time_disc_rp}/>
                                        </div>
                                    </div>
                                    <div className={`col-sm-6 col-md-3 col-lg-3 place_diskon_waktu ${flDiscTime === 'F' ? 'hidden' : ''}`}>
                                        <div className="form-group">
                                            <label style={{ fontSize: '12px' }}>Persentase</label>
                                            <input type="number" className="form-control" name="fm_time_disc_pr" id="fm_time_disc_pr" value={inputData.fm_time_disc_pr}/>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-sm-6 col-md-2 col-lg-2">
                                        <div className="form-group">
                                            <label style={{ fontSize: '12px' }}>Price</label>
                                            <input type="number" className="form-control" name="fm_price_default" id="fm_price_default" value={inputData.fm_price_default}/>
                                        </div>
                                    </div>
                                    <div className="col-sm-6 col-md-2 col-lg-2">
                                        <div className="form-group">
                                            <label style={{ fontSize: '12px' }}>Price Distributor</label>
                                            <input type="number" className="form-control" name="fm_price_distributor" id="fm_price_distributor" value={inputData.fm_price_distributor}/>
                                        </div>
                                    </div>
                                    <div className="col-sm-6 col-md-2 col-lg-2">
                                        <div className="form-group">
                                            <label style={{ fontSize: '12px' }}>Price Project</label>
                                            <input type="number" className="form-control" name="fm_price_project" id="fm_price_project" value={inputData.fm_price_project}/>
                                        </div>
                                    </div>
                                    <div className="col-sm-6 col-md-2 col-lg-2">
                                        <div className="form-group">
                                            <label style={{ fontSize: '12px' }}>Price Dealer</label>
                                            <input type="number" className="form-control" name="fm_price_dealer" id="fm_price_dealer" value={inputData.fm_price_dealer}/>
                                        </div>
                                    </div>
                                    <div className="col-sm-6 col-md-2 col-lg-2">
                                        <div className="form-group">
                                            <label style={{ fontSize: '12px' }}>Price Enduser</label>
                                            <input type="number" className="form-control" name="fm_price_enduser" id="fm_price_enduser" value={inputData.fm_price_enduser}/>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-sm-12 col-md-12 col-lg-12">
                                        <div className="form-group">
                                            <label style={{ fontSize: '12px' }}>Description</label>
                                            <textarea className="form-control" name="fv_stockdescription" id="fv_stockdescription" rows="3" value={inputData.fv_stockdescription}></textarea>
                                        </div>
                                    </div>
                                </div>
                                {/* Add more input fields as needed */}
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-dismiss="modal">
                                Close
                            </button>
                            <button type="button" className="btn btn-primary" id="saveChangesBtn">
                                Save Changes
                            </button>
                        </div>
                    </div>
                </div>
            </div>

    </div>
    );
};

export default DashboardMasterStock;