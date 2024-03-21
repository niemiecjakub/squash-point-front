import { useEffect, useRef, useState } from "react";

interface ModalProps {
    title?: string;
    isOpen: boolean;
    hasCloseBtn?: boolean;
    onClose?: () => void;
    children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ title, isOpen, hasCloseBtn = true, onClose, children }) => {
    const [isModalOpen, setModalOpen] = useState(isOpen);
    const modalRef = useRef<HTMLDialogElement | null>(null);

    const handleCloseModal = () => {
        if (onClose) {
            onClose();
        }
        setModalOpen(false);
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLDialogElement>) => {
        if (event.key === "Escape") {
            handleCloseModal();
        }
    };

    useEffect(() => {
        setModalOpen(isOpen);
    }, [isOpen]);

    useEffect(() => {
        const modalElement = modalRef.current;

        if (modalElement) {
            if (isModalOpen) {
                modalElement.showModal();
            } else {
                modalElement.close();
            }
        }
    }, [isModalOpen]);

    return (
        <dialog
            ref={modalRef}
            onKeyDown={handleKeyDown}
            className="shadow-2xl fixed w-1/4 h-1/2 rounded-xl border-2 border-blue-400 px-5 py-4"
        >
            {hasCloseBtn && (
                <button
                    onClick={handleCloseModal}
                    className="absolute top-3 right-5 bg-red-400 w-24 rounded-full py-1 font-bold"
                >
                    Close
                </button>
            )}
            {title && <h1 className="absolute top-3 left-5 text-xl py-1 font-bold">{title}</h1>}
            <div className="my-12">{children}</div>
        </dialog>
    );
};

export default Modal;
