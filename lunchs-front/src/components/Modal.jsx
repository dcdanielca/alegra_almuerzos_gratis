function Modal(props) {

    return (
        <div className="modal opacity-0 pointer-events-none fixed w-full h-full top-0 left-0 flex items-center justify-center">
            <div className="modal-overlay absolute w-full h-full bg-gray-900 opacity-50"></div>

            <div className="modal-container bg-white w-11/12 md:max-w-md mx-auto rounded shadow-lg z-50 overflow-y-auto">

                <div className="modal-content py-4 text-left px-6">

                    <p className="text-4xl font-bold text-blue-900 text-center mb-5">{props.message}</p>
                </div>
            </div>
        </div>
    )
}

export default Modal;