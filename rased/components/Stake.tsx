import { useEffect, useState } from "react";
import { useAccount, useBalance } from "wagmi";
import Typevalue from "./Typevalue";
import { contractABI, contractAddress } from "../constant/constant";
import { http, createConfig, useWalletClient } from "wagmi";
import { mainnet, sepolia, goerli } from "wagmi/chains";
import { useWriteContract } from "wagmi";
import { readContract } from "@wagmi/core";
import { ethers } from "ethers";

const config = createConfig({
  chains: [mainnet, sepolia, goerli],
  transports: {
    [mainnet.id]: http(),
    [sepolia.id]: http(),
    [goerli.id]: http(),
  },
});
function Stake() {
  const { writeContract } = useWriteContract();
  const [raise, setRaise] = useState("0");
  const [reward, setReward] = useState("");
  const [amount, setAmount] = useState("0");
  const { address } = useAccount();
  const [ref_address, setRef] = useState('');



  const userResult = useBalance({
    address,
  });
  const walletResult = useBalance({
    address: contractAddress,
  });

  useEffect(() => {

    const urlParams = new URLSearchParams(window.location.search);
    const ref = urlParams.get('ref');

    if (ref) {
      setRef(ref);
    } else {
      // Set to zero address if no referral is found
      setRef('0x0000000000000000000000000000000000000000');
    }

    if (address) {
      const fetchData = async () => {
        const data: any = await readContract(config, {
          address: contractAddress,
          abi: contractABI,
          functionName: "getMyCompounders",
          args: [address],
        });

        setRaise(String(data));
      };
      const fetchReward = async () => {
        const reward: any = await readContract(config, {
          address: contractAddress,
          abi: contractABI,
          functionName: "tokenRewards",
          args: [address],
        });

        setReward(ethers.formatEther(reward));
      };
      // const
      fetchData()
        // make sure to catch any error
        .catch(() => setRaise("0"));
      fetchReward()
        // make sure to catch any error
        .catch(() => setReward("0"));


    }
  }, [address]);

  const onStack = async () => {
    if (address) {
      if (Number(amount) > 0) {
        if (Number(amount) >= Number(userResult.data?.formatted)) {
          alert("influcient amount");
        } else {
          const result = writeContract({
            abi: contractABI,
            address: contractAddress,
            functionName: "buyRased",
            args: [ref_address],
            value: ethers.parseEther(amount.toString()),
          });
          console.log(result);
        }
      } else {
        alert("input amount");
      }
    } else {
      alert("connect wallet");
    }
  };
  const onReStack = async () => {
    if (address) {
      if (Number(amount) > 0) {
        if (Number(amount) >= Number(userResult.data?.formatted)) {
          alert("influcient amount");
        } else {
          const result = writeContract({
            abi: contractABI,
            address: contractAddress,
            functionName: "compoundRased",
            args: [ref_address],
          });
          console.log(result);
        }
      } else {
        alert("input amount");
      }
    } else {
      alert("connect wallet");
    }
  };
  const onWithdraw = async () => {
    if (address) {
      // alert("reward is 0");
      if (Number(reward) > 0) {
        try {
          const result = await writeContract({
            address: contractAddress,
            abi: contractABI,
            functionName: "sellRased",
          });
          console.log(result);
        } catch (error) {
          alert("can't withdraw");
        }
      } else {
        alert("reward is 0");
      }
    } else {
      alert("connect wallet");
    }
  };
  return (
    <div className="container" style={{ margin: "20px auto" }}>
      <div className="card">
        <div className="stake_details_info">
          <Typevalue
            type={"Contract"}
            value={address ? `${Number(Number(walletResult.data?.formatted).toFixed(3))} ETH` : `0 ETH`}
          />
          <Typevalue
            type={"Wallet"}
            value={address ? `${Number(Number(userResult.data?.formatted).toFixed(3))} ETH` : `0 ETH`}
          />
          <Typevalue
            type={"Your stake"}
            value={address ? `${raise} RASED` : "0 RASED"}
          />
        </div>
        <div className="stake_to_mine">
          <div className="input_button">
            <input
              className="stake_value"
              type="number"
              placeholder="100 ETH  "
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
            <button className="stake_button" onClick={() => onStack()}>
              STAKE TO MINE
              <br />
            </button>
          </div>
        </div>
        <div className="rewards_block">
          <div className="reward_info">
            <h1 className="reward_title">Your rewards<br /></h1>
            <h1 className="reward_ETH">
              {address ? `${reward} ETH` : "0 ETH"}
            </h1>
          </div>
        </div>
        <div className="stake_reward">
          <div className="restake-withdraw">
            <button className="re_stake_button" onClick={() => onReStack()}>
              RE-STAKE
              <br />
            </button>
            <button className="withdraw_button" onClick={() => onWithdraw()}>
              WITHDRAW
              <br />
            </button>
          </div>
        </div>
        <div className="stake_option">
          <p className="stake_title">Reward information</p>
          <Typevalue type={"Daily Return"} value={"8%"} />
          <Typevalue type={"APR"} value={"2,920%"} />
          <Typevalue type={"Dev Fee"} value={"3%"} />
          <Typevalue type={"Referral Bonus (Level 1)"} value={"5%"} />
          <Typevalue type={"Referral Bonus (Level 2)"} value={"3%"} />
          <Typevalue type={"Referral Bonus (Level 3)"} value={"1%"} />
        </div>
      </div>
    </div>
  );
}

export default Stake;
