import React from 'react';
import Modal from 'react-modal';
import Typevalue from "./Typevalue";
import { http, createConfig, useWalletClient } from "wagmi";
import { mainnet, sepolia, goerli } from "wagmi/chains";
import { ethers } from "ethers";

const customModalStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        backgroundColor: '#f8f9fa',
        border: '1px solid #ced4da',
        borderRadius: '8px',
        padding: '20px',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
        maxWidth: '300px',
        width: '100%'
    }
};

const config = createConfig({
    chains: [mainnet, sepolia, goerli],
    transports: {
        [mainnet.id]: http(),
        [sepolia.id]: http(),
        [goerli.id]: http(),
    },
});

interface ModalProps {
    isOpen: boolean;
    closeModal: () => void;
    modalData: any[];
    referraltype: string;
}


const ReferralModal: React.FC<ModalProps> = ({ isOpen, closeModal, modalData, referraltype }) => {
    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={closeModal}
            style={customModalStyles}
        >
            <h2 className='modaltitle'>Level {referraltype}</h2>
            <div className='referrals'>
                {modalData.map((ref: any, index: number) => (
                    <Typevalue key={index} type={ref ? `${String(ref.ref).substring(0, 4)}...${String(ref.ref).substring(38, 42)}` : ''} value={ref ? `${ethers.formatEther(ref.refAmount)} ETH` : '0 ETH'} />
                ))}
            </div>
            <div className='modalclose'>
                <button className='closebutton' onClick={closeModal}>Close Modal</button>
            </div>
        </Modal>
    );
};

export default ReferralModal;
