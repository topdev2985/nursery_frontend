import React, {useRef} from "react";
import { useSelector, useDispatch } from "react-redux";
import ReactDOM from 'react-dom';
import { StyledModal } from './ModalStyles';
import { Container, Title, Text, CtaGroup } from './ModalStyles';

function Message(props) {
    const modalRef = useRef();
    const focusTrap = (event) => {
        if (event.key === 'Escape') toggleModal();
        if (event.key !== 'Tab') return;

        const modalElements = modalRef.current.querySelectorAll('button');
        const firstElement = modalElements[0];
        const lastElement = modalElements[modalElements.length - 1];

        // if going forward by pressing tab and lastElement is active shift focus to first focusable element
        if (!event.shiftKey && document.activeElement === lastElement) {
            firstElement.focus();
            event.preventDefault();
        }

        // if going backward by pressing tab and firstElement is active shift focus to last focusable element
        if (event.shiftKey && document.activeElement === firstElement) {
            lastElement.focus();
            event.preventDefault();
        }
    };

    /**
     * Function to hide Modal component after user click outside Modal contaienr.
     */
    const handleClickOutsideModal = (event) => {
        const target = event.target;
        if (target === modalRef.current) toggleModal();
    };

    // Side effect to add event listeners and disable page scrolling.
    // Removing the event listener in the return function in order to avoid memory leaks.
    useEffect(() => {
        document.addEventListener('keydown', focusTrap);
        document.addEventListener('click', handleClickOutsideModal);
        modalRef.current.focus();
        document.body.style.overflow = 'hidden';

        return () => {
            document.removeEventListener('keydown', focusTrap);
            document.removeEventListener('click', handleClickOutsideModal);
            document.body.style.overflow = 'unset';
        };
    }, []);
    const modal= (
        <>
            <StyledModal
                aria-modal
                aria-label="Confirmation"
                tabIndex={-1}
                role="dialog"
                ref={modalRef}
                variants={variant('modal')}
                initial="hidden"
                animate="visible"
                exit="exit"
            >
                <Container variants={variants}>
                    <Title>Confirm Deletion</Title>
                    <Text>
                        Are you sure you want to delete child #
                       This action cannot be undone.
                    </Text>
                    <CtaGroup>
                        <Button type="button" $secondary onClick={()=>{}}>
                            Cancel
                        </Button>
                        <Button
                            type="button"
                            $delete
                            onClick={() => {
                            }}
                        >
                            Delete
                        </Button>
                    </CtaGroup>
                </Container>
            </StyledModal>
        </>
    );
    return ReactDOM.createPortal(modal, document.body);

}

export default Message;