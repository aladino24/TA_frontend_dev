// PenerimaanForm.js
import React from "react";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { Calendar } from "primereact/calendar";
import { InputTextarea } from "primereact/inputtextarea";

const ModalFormPenerimaan = ({ visible, formData, setFormData, onHide, onConfirm }) => {
    return (
        <Dialog 
            header="Konfirmasi Penerimaan" 
            headerStyle={{ paddingLeft: '16px'}}
            visible={visible} 
            style={{ width: '50vw', height: '50vh'}} 
            footer={() => (
                <div className="p-2">
                    <Button label="Cancel" icon="pi pi-times" onClick={onHide} className="p-button-text mr-2" />
                    <Button label="Confirm" icon="pi pi-check" onClick={onConfirm} className="rounded p-1" autoFocus />
                </div>
            )} 
            onHide={onHide}
        >
            <div className="p-fluid container">
                <div className="p-field">
                    <label htmlFor="fc_custreceiver">Nama Penerima</label>
                    <InputText id="fc_custreceiver" className="pl-2" value={formData.fc_custreceiver} onChange={(e) => setFormData({ ...formData, fc_custreceiver: e.target.value })} />
                </div>
                <div className="p-field">
                    <label htmlFor="fd_doarrivaldate">Tanggal Diterima</label>
                    <Calendar id="fd_doarrivaldate" value={formData.fd_doarrivaldate} onChange={(e) => setFormData({ ...formData, fd_doarrivaldate: e.value })} showIcon />
                </div>
                <div className="p-field">
                    <label htmlFor="ft_description">Deskripsi</label>
                    <InputTextarea id="ft_description" className="pl-2" value={formData.ft_description} onChange={(e) => setFormData({ ...formData, ft_description: e.target.value })} rows={3} />
                </div>
            </div>
        </Dialog>
    );
};

export default ModalFormPenerimaan;
