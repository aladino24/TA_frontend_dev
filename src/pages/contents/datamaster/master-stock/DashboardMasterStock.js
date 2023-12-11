import axios from "axios";
import React, { useEffect, useRef } from "react";
import Config from "../../../../config";
import $ from "jquery";

const DashboardMasterStock = () => {
    const tableRef = useRef(null);

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

    function detailEditStock(data){
        if(data){
            console.log(data);
            $('#fc_branch').val(data.branch.fv_description);
            $('#fc_stockcode').val(data.fc_stockcode);
            $('#fc_nameshort').val(data.fc_nameshort);
            $('#fc_namelong').val(data.fc_namelong);

         
            const unityApiUrl = 'http://127.0.0.1:8001/api/get-unity';
            axios.get(unityApiUrl)
                .then(response => {
                    const unityData = response.data.data;
                    unityData.forEach(item => {
                        const isSelected = item.fc_kode === data.fc_namepack;
                        $('#fc_namepack').append(`<option ${isSelected ? 'selected' : ''} value="${item.fc_kode}">${item.fv_description}</option>`);
                    });
    
                })
                .catch(error => {
                    console.error('Error fetching Unity data:', error);
                });

        }
    }


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
                                            <label>Branch</label>
                                            <input type="text" className="form-control" name="fc_branch" id="fc_branch" value="" readOnly />
                                        </div>
                                    </div>
                                    <div className="col-8">
                                        <div className="form-group">
                                            <label>Stock Code</label>
                                            <input type="text" className="form-control" name="fc_stockcode" id="fc_stockcode" value="" readOnly />
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-4">
                                            <div className="form-group required">
                                                <label>Nama Pendek</label>
                                                <input type="text" className="form-control" name="fc_nameshort" id="fc_nameshort" value=""/>
                                            </div>
                                    </div>
                                    <div className="col-5">
                                            <div className="form-group required">
                                                <label>Nama Panjang</label>
                                                <input type="text" className="form-control" name="fc_namelong" id="fc_namelong" value=""/>
                                            </div>
                                    </div>
                                    <div className="col-3">
                                            <div className="form-group">
                                                <label>Namepack</label>
                                                <select className="form-control" name="fc_namepack" id="fc_namepack">
                                              
                                                </select>
                                            </div>
                                    </div>
                                </div>
                                <div className="row">
                                 <div className="col-3">
                                            <div className="form-group">
                                                <label>Brand</label>
                                                <select className="form-control" name="fc_namepack" id="fc_namepack">
                                              
                                                </select>
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