import React from "react";



const ModalBrand = (props) => {
    return (
        <>
            <div
            className="modal fade"
            id={props.id}
            tabIndex="-1"
            role="dialog"
            aria-labelledby="addModalBrandLabel">
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                 <div className="modal-header">
                        <h5 className="modal-title" id="editModalLabel">
                            Tambah Master Brand
                        </h5>
                        <button
                            type="button"
                            className="close"
                            data-dismiss="modal"
                            aria-label="Close"
                        >
                            <span aria-hidden="true">&times;</span>
                        </button>
                  </div>

                  <div className="modal-body">
                    <form>
                        <div className="form-group">
                            <label htmlFor="fc_branch">Cabang</label>
                            <input type="text" className="form-control" id="fc_divisioncode" hidden />
                            <input type="text" className="form-control" id="fc_branch"  />
                        </div>
                        <div className="form-group">
                            <label htmlFor="fc_brand">Brand</label>
                            <input type="text" className="form-control" id="fc_brand"  />
                        </div>
                        <div className="form-group">
                            <label htmlFor="fc_group">Group</label>
                            <input type="text" className="form-control" id="fc_group" name="fc_group" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="fc_subgroup">Sub Group</label>
                            <input type="text" className="form-control" id="fc_subgroup"  />
                        </div>

                    </form>
                  </div> 
                    <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-dismiss="modal">
                                Tutup
                            </button>
                            <button type="submit" className="btn btn-primary" id="saveChangesBtn">
                                Simpan
                            </button>
                        </div>
                </div>
                
            </div>
            </div>
        </>
    );
}


export default ModalBrand;