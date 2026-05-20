import { createPortal } from "react-dom"

function Modal({
    title,
    content,
    show,
    onClose,
    onConfirm,
    confirmText = "Conferma"
}) {

    if (!show) {
        return null;
    }
    return createPortal(
        <>
            <div className="modal d-block" tabindex={-1}>
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">{title}</h5>
                            <button type="button" className="btn-close" onClick={onClose}></button>
                        </div>
                        <div className="modal-body">
                            <p>{content}</p>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={onClose}>Annulla</button>
                            <button type="button" className="btn btn-success" onClick={onConfirm}>{confirmText}</button>
                        </div>
                    </div>
                </div>
            </div>
        </>, document.getElementById("modal-root")
    )
}

export default Modal