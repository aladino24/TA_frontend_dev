import React from "react";

const DashboardMasterBankAcc = () => {
    return (
        <>
            <div className="container-fluid">
                <div className="d-sm-flex align-items-center justify-content-between mb-4">
                    <h1 className="h3 mb-0 text-gray-900">Master Bank Acc</h1>
                    <div>
                    <button className="ml-2 btn btn-sm btn-success shadow-sm" data-toggle="modal" data-target="#addModalBrand"><i className="fa fa-plus"></i> Tambahkan Bank Account</button>
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-12">
                    <div className="card shadow mb-4">
                    <div className="card-body">
                        <div className="table-responsive">
                        <table
                            className="table table-bordered table-striped"
                            id="dataTable"
                            width="100%"
                            cellSpacing="0"
                        >
                            <thead>
                            <tr>
                                <th>No</th>
                                <th>Division</th>
                                <th>Cabang</th>
                                <th>Nama Bank</th>
                                <th>Tipe Bank</th>
                                <th>No Rekening</th>
                                <th>Cabang Bank</th>
                                <th>Username Bank</th>
                                <th>Bank Terkunci</th>
                                <th>Alamat Bank 1</th>
                                <th>Alamat Bank 2</th>
                                <th>Action</th>
                            </tr>
                            </thead>
                            <tfoot>
                            <tr>
                                 <th>No</th>
                                <th>Division</th>
                                <th>Cabang</th>
                                <th>Nama Bank</th>
                                <th>Tipe Bank</th>
                                <th>No Rekening</th>
                                <th>Cabang Bank</th>
                                <th>Username Bank</th>
                                <th>Bank Terkunci</th>
                                <th>Alamat Bank 1</th>
                                <th>Alamat Bank 2</th>
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
        </>
    );
}

export default DashboardMasterBankAcc;