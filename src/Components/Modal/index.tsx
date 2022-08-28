import * as React from 'react';
import { get } from 'lodash-es';
import ReactResponsiveModal from 'react-responsive-modal';

import { ModalContext } from './context';
import { DeviceServiceContext } from '../../Services/DeviceService';

import ModalPreloader from './Components/ModalPreloader';

import {
    getModalContentByType,
    getModalWidthByDevice,
} from './helpers';

import './styles.css';

const Modal: React.FC = (): JSX.Element => {
    const modalContext = React.useContext(ModalContext);
    const deviceServiceContext = React.useContext(DeviceServiceContext);
    const [modalWidth, setModalWidth] = React.useState<number>(getModalWidthByDevice(
        deviceServiceContext.isMobile,
        deviceServiceContext.isTablet,
        deviceServiceContext.layoutWidth,
    ));

    const ModalContent = getModalContentByType(modalContext.modalType);
    React.useEffect(() => {
        setModalWidth(getModalWidthByDevice(
            deviceServiceContext.isMobile,
            deviceServiceContext.isTablet,
            deviceServiceContext.layoutWidth,
        ));
    }, [deviceServiceContext]);

    return (
        <>
            {modalContext.isOpened && (
                <ReactResponsiveModal
                    open={modalContext.isOpened}
                    onClose={modalContext.handleCloseModal}
                    center
                    closeOnOverlayClick={false}
                    styles={{
                        modal: {
                            width: `${modalWidth}px`,
                            marginTop: '80px',
                        }
                    }}
                >
                    {(!!ModalContent) && (
                        <>
                            {modalContext.visiblePreloader && (
                                <ModalPreloader />
                            )}
                            <ModalContent />
                        </>
                    )}
                </ReactResponsiveModal>
            )}
        </>
    );
};

export default Modal;
