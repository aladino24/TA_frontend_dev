import React from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";

const BarangDialog = ({ isVisible, onHide, data }) => {

  const rowIndexTemplate = (rowData, column) => {
    return column.rowIndex + 1;
  };

  const formatRupiah = (value) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(value);
  };

  const hargaTemplate = (rowData) => {
    return formatRupiah(rowData.fm_sales);
  };

  const actionTemplate = (rowData) => {
    return (
      <div className="text-center">
        <Button label="Pilih" icon="pi pi-check" className="p-button-info rounded" style={{ padding: '0.25rem 0.5rem' }} onClick={() => handleSelect(rowData)} />
      </div>
    );
  };

  const handleSelect = (rowData) => {
    // Handle the selection action here
    onHide(rowData);
  };

  const renderHeaderDialog = () => {
    return (
      <div className="d-flex justify-content-between p-2">
        <h4>Pilih Item</h4>
        <div className="input-group" style={{ maxWidth: '200px' }}>
          <input
            type="text"
            className="form-control"
            placeholder="Keyword Search"
            aria-label="Keyword Search"
            aria-describedby="basic-addon2"
            onChange={(e) => { }}
          />
          <div className="input-group-append">
            <span className="input-group-text" id="basic-addon2">
              <i className="pi pi-search"></i>
            </span>
          </div>
        </div>
      </div>
    );
  };

  const headerDialog = renderHeaderDialog();

  return (
    <Dialog 
      header={headerDialog} 
      visible={isVisible} 
      style={{ width: '70vw', height: '30vw' }} 
      modal 
      onHide={() => onHide(null)}
    >
      {data.length > 0 ? (
        <DataTable 
          value={data} 
          style={{ padding: '20px' }}
          paginator 
          rows={10}
        >
          <Column body={rowIndexTemplate} header="No" />
          <Column field="fc_stockcode" header="Kode Barang" />
          <Column field="fv_namestock" header="Nama Produk" />
          <Column field="brand.fv_brandname" header="Brand" />
          <Column field="brand.fv_brandname" header="Sub Group" />
          <Column field="fc_namepack" header="Satuan" />
          <Column body={hargaTemplate} header="Harga" />
          <Column body={actionTemplate} header="Action" />
        </DataTable>
      ) : (
        <div className="text-center p-4">
          <p>No items to display</p>
        </div>
      )}
    </Dialog>
  );
};

export default BarangDialog;
