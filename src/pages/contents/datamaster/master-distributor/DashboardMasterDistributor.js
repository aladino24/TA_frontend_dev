import React from "react";
import ModalDistributor from "./ModalDistributor";

const DashboardMasterDistributor = () => {
    return (
        <>
            <div className="container-fluid">
                <div className="d-sm-flex align-items-center justify-content-between mb-4">
                    <h1 className="h3 mb-0 text-gray-900">Master Distributor</h1>
                    <div>
                    <button className="ml-2 btn btn-sm btn-success shadow-sm" data-toggle="modal" data-target="#addModalDistributor"><i className="fa fa-plus"></i> Tambahkan Distributor</button>
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-12">
                    <div className="card shadow mb-4">
                    <div className="card-body">
                        <div className="table-responsive">
                        <table
                            className="table table-bordered"
                            id="dataTable"
                            width="100%"
                            cellSpacing="0"
                        >
                            <thead>
                            <tr>
                                <th>No</th>
                                <th>Division</th>
                                <th>Cabang</th>
                                <th>Kode Distributor</th>
                                <th>Legal Status Distributor</th>
                                <th>Nama Distributor</th>
                                <th>No. HP Distributor</th>
                                <th>Email Distributor</th>
                                <th>Kebangsaan Distributor</th>
                                <th>Distributor Forex</th>
                                <th>Tipe Bisnis Distributor</th>
                                <th>Tipe Cabang Distributor</th>
                                <th>Distributor Reseller</th>
                                <th>Kode Pajak Distributor</th>
                                <th>NPWP Distributor</th>
                                <th>Nama NPWP Distributor</th>
                                <th>Alamat NPWP Distributor</th>
                                <th>Hutang Distributor</th>
                                <th>Masa Hutang Distributor</th>
                                <th>Kunci Distributor</th>
                                <th>Nama PIC Distributor</th>
                                <th>No.HP PIC Distributor</th>
                                <th>Jabatan PIC Distributor</th>
                                <th>Tanggal Join Distributor</th>
                                <th>Distributor Expired</th>
                                <th>Bank Distributor</th>
                                <th>VirtualACC Distributor</th>
                                <th>Norek Distributor</th>
                                <th>Deskripsi</th>
                                <th>Action</th>
                            </tr>
                            </thead>
                            <tfoot>
                            <tr>
                            <th>No</th>
                                <th>Division</th>
                                <th>Cabang</th>
                                <th>Kode Distributor</th>
                                <th>Legal Status Distributor</th>
                                <th>Nama Distributor</th>
                                <th>No. HP Distributor</th>
                                <th>Email Distributor</th>
                                <th>Kebangsaan Distributor</th>
                                <th>Distributor Forex</th>
                                <th>Tipe Bisnis Distributor</th>
                                <th>Tipe Cabang Distributor</th>
                                <th>Distributor Reseller</th>
                                <th>Kode Pajak Distributor</th>
                                <th>NPWP Distributor</th>
                                <th>Nama NPWP Distributor</th>
                                <th>Alamat NPWP Distributor</th>
                                <th>Hutang Distributor</th>
                                <th>Masa Hutang Distributor</th>
                                <th>Kunci Distributor</th>
                                <th>Nama PIC Distributor</th>
                                <th>No.HP PIC Distributor</th>
                                <th>Jabatan PIC Distributor</th>
                                <th>Tanggal Join Distributor</th>
                                <th>Distributor Expired</th>
                                <th>Bank Distributor</th>
                                <th>VirtualACC Distributor</th>
                                <th>Norek Distributor</th>
                                <th>Deskripsi</th>
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

            <ModalDistributor id="addModalDistributor" />
        </>
    );
}

export default DashboardMasterDistributor;