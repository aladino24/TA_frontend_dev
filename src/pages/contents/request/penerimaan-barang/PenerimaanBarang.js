import React, { useState, useEffect, useRef } from 'react';
import { DataTable } from 'primereact/datatable';
import { FilterMatchMode, FilterOperator } from 'primereact/api';
import { Column } from 'primereact/column';
import { Rating } from 'primereact/rating';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { IconField } from 'primereact/iconfield';
import { InputIcon } from 'primereact/inputicon';
import { Dropdown } from 'primereact/dropdown';
import { Tag } from 'primereact/tag';
import { Toast } from 'primereact/toast';
import { ProductService } from '../../../../service/ProductService';
import "primereact/resources/themes/lara-light-cyan/theme.css";
import 'primereact/resources/primereact.css';
import 'primereact/resources/primereact.min.css'

export default function RowExpansionDemo() {
    const [products, setProducts] = useState([]);
    const [expandedRows, setExpandedRows] = useState(null);
    const toast = useRef(null);
    const [filters, setFilters] = useState({
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
        name: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        'country.name': { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        representative: { value: null, matchMode: FilterMatchMode.IN },
        status: { value: null, matchMode: FilterMatchMode.EQUALS },
        verified: { value: null, matchMode: FilterMatchMode.EQUALS }
    });
    const [loading, setLoading] = useState(true);
    const [globalFilterValue, setGlobalFilterValue] = useState('');

    useEffect(() => {
        ProductService.getProductsWithOrdersSmall().then((data) => setProducts(data));
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    const onRowExpand = (event) => {
        toast.current.show({ severity: 'info', summary: 'Product Expanded', detail: event.data.name, life: 3000 });
    };

    const onRowCollapse = (event) => {
        toast.current.show({ severity: 'success', summary: 'Product Collapsed', detail: event.data.name, life: 3000 });
    };

    const expandAll = () => {
        let _expandedRows = {};

        products.forEach((p) => (_expandedRows[`${p.id}`] = true));

        setExpandedRows(_expandedRows);
    };

    const collapseAll = () => {
        setExpandedRows(null);
    };

    const renderHeader = () => {
        return (
            <div className="d-flex justify-content-between p-2">
                <h4>Daftar Request Dikirim</h4>
                <IconField iconPosition="left">
                    <InputIcon className="pi pi-search" />
                    <InputText value={globalFilterValue} onChange={onGlobalFilterChange} placeholder=" Keyword Search" />
                </IconField>
            </div>
        );
    };

    const onGlobalFilterChange = (e) => {
        const value = e.target.value;
        let _filters = { ...filters };

        _filters['global'].value = value;

        setFilters(_filters);
        setGlobalFilterValue(value);
    };


    const formatCurrency = (value) => {
        return value.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
    };

    const amountBodyTemplate = (rowData) => {
        return formatCurrency(rowData.amount);
    };

    const statusOrderBodyTemplate = (rowData) => {
        return <Tag value={rowData.status.toLowerCase()} severity={getOrderSeverity(rowData)}></Tag>;
    };

    const searchBodyTemplate = () => {
        return <Button icon="pi pi-search" />;
    };

    const imageBodyTemplate = (rowData) => {
        return ;
    };

    const priceBodyTemplate = (rowData) => {
        return formatCurrency(rowData.price);
    };

    const ratingBodyTemplate = (rowData) => {
        return <Rating value={rowData.rating} readOnly cancel={false} />;
    };

    const statusBodyTemplate = (rowData) => {
        return <Tag value={rowData.inventoryStatus} severity={getProductSeverity(rowData)}></Tag>;
    };

    const getProductSeverity = (product) => {
        switch (product.inventoryStatus) {
            case 'INSTOCK':
                return 'success';

            case 'LOWSTOCK':
                return 'warning';

            case 'OUTOFSTOCK':
                return 'danger';

            default:
                return null;
        }
    };

    const getOrderSeverity = (order) => {
        switch (order.status) {
            case 'DELIVERED':
                return 'success';

            case 'CANCELLED':
                return 'danger';

            case 'PENDING':
                return 'warning';

            case 'RETURNED':
                return 'info';

            default:
                return null;
        }
    };

    const allowExpansion = (rowData) => {
        return rowData.orders.length > 0;
    };

    const rowExpansionTemplate = (data) => {
        return (
            <div className="p-3">
                <h5>Orders for {data.name}</h5>
                <DataTable value={data.orders}>
                    <Column field="id" header="Id" sortable headerClassName="column-header" />
                    <Column field="customer" header="Customer" sortable headerClassName="column-header" />
                    <Column field="date" header="Date" sortable headerClassName="column-header" />
                    <Column field="amount" header="Amount" body={amountBodyTemplate} sortable headerClassName="column-header" />
                    <Column field="status" header="Status" body={statusOrderBodyTemplate} sortable headerClassName="column-header" />
                    <Column headerStyle={{ width: '4rem' }} body={searchBodyTemplate} headerClassName="column-header" />
                </DataTable>
            </div>
        );
    };

    const header = renderHeader();

    return (
        <div className='container-fluid'>
            <div className='row'>
                <div className="col-xl-12 col-lg-12">
                    <div className="card"> {/* Menambahkan kelas CSS di sini */}
                        <Toast ref={toast} />
                        <DataTable value={products} header={header} showGridlines size={'large'} paginator rows={10} expandedRows={expandedRows} onRowToggle={(e) => setExpandedRows(e.data)}
                            onRowExpand={onRowExpand}  onRowCollapse={onRowCollapse} rowExpansionTemplate={rowExpansionTemplate}
                            dataKey="id"  tableStyle={{ minWidth: '60rem', height: '10rem' }}>
                            <Column field='detail' header='Detail' align={'center'} expander={allowExpansion} style={{ width: '5rem' }} headerClassName="column-header" />
                            <Column field="name" header="Name" sortable align={'center'} headerClassName="column-header" />
                            <Column header="Image" body={imageBodyTemplate} align={'center'} headerClassName="column-header" />
                            <Column field="price" header="Price" sortable align={'center'} body={priceBodyTemplate} headerClassName="column-header" />
                            <Column field="category" header="Category" sortable align={'center'} headerClassName="column-header" />
                            <Column field="rating" header="Reviews" sortable align={'center'} body={ratingBodyTemplate} headerClassName="column-header" />
                            <Column field="inventoryStatus" header="Status" sortable align={'center'} body={statusBodyTemplate} headerClassName="column-header" />
                        </DataTable>
                    </div>
                </div>
            </div>
        </div>
    );
}
