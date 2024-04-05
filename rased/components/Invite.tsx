import { useEffect, useState, useCallback } from 'react';
import { useAccount, useBalance } from "wagmi";
import { contractABI, contractAddress } from "../constant/constant";
import { http, createConfig, useWalletClient } from "wagmi";
import { mainnet, sepolia, goerli } from "wagmi/chains";
import { readContract } from "@wagmi/core";
import ReferralModal from './ReferralModal';
import { ethers } from "ethers";

const config = createConfig({
    chains: [mainnet, sepolia, goerli],
    transports: {
        [mainnet.id]: http(),
        [sepolia.id]: http(),
        [goerli.id]: http(),
    },
});

function Invite() {
    const [modalData, setModalData] = useState<any[]>([]);
    const [refferaltype, setrefferalData] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [primaryRefList, setprimaryRef] = useState<any[]>([]);
    const [primaryRefSum, setprimarySum] = useState('0');
    const [secondaryRefList, setsecondaryRef] = useState<any[]>([]);
    const [secondaryRefSum, setsecondarySum] = useState('0');
    const [tertiaryRefList, settertiaryRef] = useState<any[]>([]);
    const [tertiaryRefSum, settertiarySum] = useState('0');

    const { address } = useAccount();

    const openModal = useCallback((modalType: any[], refferal: string) => {
        return () => {
            setIsModalOpen(true);
            setModalData(modalType);
            setrefferalData(refferal);
        };
    }, [setIsModalOpen, setModalData, setrefferalData]);

    const closeModal = () => {
        setIsModalOpen(false);
    };
    const copyToClipboard = () => {
        navigator.clipboard.writeText(address ? 'http://rased.xyz?ref=' + address : 'http://rased.xyz/XRL127')
            .then(() => {
                // Copy successful, trigger alarm
                alert('Your referral address copied to clipboard successfully!');
            })
            .catch((error) => {
                console.error('Failed to copy: ', error);
            });
    };

    useEffect(() => {
        if (address) {
            const fetchprimaryData = async () => {
                const data: any = await readContract(config, {
                    address: contractAddress,
                    abi: contractABI,
                    functionName: "getPrimaryRefList",
                    args: [address],
                });

                const sum = data.reduce((accumulator: number, referral: any) => {
                    return accumulator + Number(referral.refAmount);
                }, 0);

                // Update the state with the primaryRefList and the sum
                setprimaryRef(data);
                setprimarySum(ethers.formatEther(sum));
            };

            const fetchsecondaryData = async () => {
                const data: any = await readContract(config, {
                    address: contractAddress,
                    abi: contractABI,
                    functionName: "getSecondaryRefList",
                    args: [address],
                });

                const sum = data.reduce((accumulator: number, referral: any) => {
                    return accumulator + Number(referral.refAmount);
                }, 0);

                // Update the state with the primaryRefList and the sum
                setsecondarySum(ethers.formatEther(sum));
                setsecondaryRef(data);
            };

            const fetchTertiaryData = async () => {
                const data: any = await readContract(config, {
                    address: contractAddress,
                    abi: contractABI,
                    functionName: "getTertiaryRefList",
                    args: [address],
                });

                const sum = data.reduce((accumulator: number, referral: any) => {
                    return accumulator + Number(referral.refAmount);
                }, 0);

                // Update the state with the primaryRefList and the sum
                settertiarySum(ethers.formatEther(sum));
                settertiaryRef(data);
            };

            fetchprimaryData()
                .catch(() => setprimaryRef([]));

            fetchsecondaryData()
                .catch(() => setsecondaryRef([]));

            fetchTertiaryData()
                .catch(() => settertiaryRef([]));

        }

    }, [address]);

    return (
        <div className='container'>
            <div className="card">
                <div className='invite_info'>
                    <h1 className='content-title'>Invite to boost<br /></h1>
                    <p className='content-info'>Earn 12% of the BLAST used to mine tokens from anyone that uses your referral link<br /></p>
                </div>
                <div className='referral_link'>
                    <div className="address_group">
                        <h1 className='referral_address'>Your referral link<br /></h1>
                        <div className="address_icon" onClick={() => copyToClipboard()}>
                            <h1 className='address_name'>{address ? 'rased.xyz?ref=' + address.substring(0, 4) + '...' + address.substring(38, 42) : 'rased.xyz/XRL127'}<br /></h1>
                            <div>
                                <svg width="20" height="20">
                                    <use xlinkHref="#Lineariconsicon-link"></use>
                                </svg>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    xmlnsXlink="http://www.w3.org/1999/xlink"
                                    style={{ position: 'absolute', width: 0, height: 0, overflow: 'hidden', color: '#f86729' }}
                                    version="1.0">
                                    <defs>
                                        <symbol id="Lineariconsicon-link" viewBox="0 0 20 20">
                                            <title>link</title>
                                            <path className="path1"
                                                d="M10.682 12.998c-0.943 0-1.886-0.359-2.604-1.077-0.195-0.195-0.195-0.512 0-0.707s0.512-0.195 0.707 0c1.046 1.046 2.747 1.046 3.793 0l3.636-3.636c1.046-1.046 1.046-2.747 0-3.793s-2.747-1.046-3.793 0l-3.068 3.068c-0.195 0.195-0.512 0.195-0.707 0s-0.195-0.512 0-0.707l3.068-3.068c1.436-1.436 3.772-1.436 5.207 0s1.436 3.772 0 5.207l-3.636 3.636c-0.718 0.718-1.661 1.077-2.604 1.077z" />
                                            <path className="path2"
                                                d="M4.682 18.998c-0.943 0-1.886-0.359-2.604-1.077-1.436-1.436-1.436-3.772 0-5.207l3.636-3.636c1.436-1.436 3.772-1.436 5.207 0 0.195 0.195 0.195 0.512 0 0.707s-0.512 0.195-0.707 0c-1.046-1.046-2.747-1.046-3.793 0l-3.636 3.636c-1.046 1.046-1.046 2.747 0 3.793s2.747 1.046 3.793 0l3.068-3.068c0.195-0.195 0.512-0.195 0.707 0s0.195 0.512 0 0.707l-3.068 3.068c-0.718 0.718-1.661 1.077-2.604 1.077z" />
                                        </symbol>
                                    </defs>
                                </svg>
                            </div>
                        </div>
                    </div>
                    <div className="twt_link" onClick={() => {
                        const tweetText = "Come #BLAST off with me on Rased Miner🚀";
                        const referralLink = address ? 'http://rased.xyz?ref=' + address : 'http://rased.xyz/XRL127';
                        const tweetUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(tweetText)}&url=${encodeURIComponent(referralLink)}`;
                        window.open(tweetUrl, '_blank');
                    }}>
                        <img alt='twitter' className='twt_img'
                            src="https://heliobeam.xyz/wp-content/uploads/2024/02/twitter.png"
                            width='10'
                            height='10'
                        />
                        <h1 className='twt_name'>Tweet link<br /></h1>
                    </div>
                </div>
                <div className='referrals'>
                    <p className="referrals_title">Referrals</p>
                    <div className="blast_info">
                        <p className="blast_title">Level 1 Referrals (5%)</p>
                        <p className="blast_value" onClick={openModal(primaryRefList, '1 Referrals (5%)')}>
                            {address ? `x${String(primaryRefList.length)} ${Number(primaryRefSum).toFixed(5)}ETH` : 'x0 0ETH'}<br />
                        </p>
                    </div>
                    <div className="blast_info">
                        <p className="blast_title">Level 2 Referrals (3%)</p>
                        <p className="blast_value" onClick={openModal(secondaryRefList, '2 Referrals (3%)')}>
                            {address ? `x${String(secondaryRefList.length)} ${Number(secondaryRefSum).toFixed(5)}ETH` : 'x0 0ETH'}<br />
                        </p>
                    </div>
                    <div className="blast_info">
                        <p className="blast_title">Level 3 Referrals (1%)</p>
                        <p className="blast_value" onClick={openModal(tertiaryRefList, '3 Referrals (1%)')}>
                            {address ? `x${String(tertiaryRefList.length)} ${Number(tertiaryRefSum).toFixed(5)}ETH` : 'x0 0ETH'}<br />
                        </p>
                    </div>
                    <ReferralModal isOpen={isModalOpen} closeModal={closeModal} modalData={modalData} referraltype={refferaltype} />
                </div>
                <div className='referrals'>
                    <div className="blast_sum">
                        <p className="blast_sum_title">Total referral bonus</p>
                        <p className="blast_sum_value">
                            {address ? Number(Number(primaryRefSum) + Number(secondaryRefSum) + Number(tertiaryRefSum)).toFixed(5) + 'ETH' : '0 ETH'}<br />
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )

}

export default Invite;