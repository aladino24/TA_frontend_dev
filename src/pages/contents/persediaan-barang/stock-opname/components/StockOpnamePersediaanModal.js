import React from 'react';
import { Dialog } from 'primereact/dialog';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';

const StockOpnamePersediaanModal = ({ isOpen, products, onHide }) => {
    const dialogFooterTemplate = () => {
        return (
            <button className="p-button p-component mr-2 mb-2 pl-2 pr-2 rounded" onClick={onHide}>
                <i className="fa fa-check mr-2"></i>
                <span className="p-button-label p-c">Ok</span>
            </button>
        );
    };

    const renderHeader = () => {
        return (
            <div className="table-header p-2">
                <h5>Ketersediaan Stock</h5>
            </div>
        );
    }

    const header = renderHeader();

    return (
        <Dialog
            header={header}
            visible={isOpen}
            style={{ width: '75vw' }}
            maximizable
            modal
            contentStyle={{ height: '300px' }}
            onHide={onHide}
            footer={dialogFooterTemplate}
        >
            <DataTable
                value={products}
                paginator
                rows={15}
                tableStyle={{ minWidth: '50rem' }}
                scrollable
                scrollHeight="flex"
                rowsPerPageOptions={[5, 10, 20, 30, 40 ,50]}
                style={{ 
                    padding: '20px'
                 }}
            >
                <Column align={'center'} field="DT_RowIndex" header="No"></Column>
                <Column align={'center'} field="fc_stockcode" header="Kode Barang"></Column>
                <Column align={'center'} field="stock.fc_namelong" header="Nama Barang"></Column>
                <Column align={'center'} field="stock.fc_brand" header="Brand"></Column>
                <Column align={'center'} field="stock.fc_subgroup" header="Sub Group"></Column>
                <Column align={'center'} field="stock.fc_namepack" header="Satuan"></Column>
                <Column align={'center'} field="stock.fc_typestock1" header="Tipe Stock"></Column>
                <Column align={'center'} field="fc_batch" header="Batch"></Column>
                <Column align={'center'} field="fd_expired" header="Exp.Date"></Column>
                <Column align={'center'} field="fn_quantity" header="Qty"></Column>
            </DataTable>
        </Dialog>
    );
}

export default StockOpnamePersediaanModal;
