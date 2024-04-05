import ConnectWalletSec from "./ConnectWalletSec";

const Navbar = () => {
  return (
    <section className="navbar">
      <div className="logodiv">
        <div>
          <img alt="twitter" src="https://heliobeam.xyz/wp-content/uploads/2024/02/twitter.png" className="link-twitter icon" onClick={() => {
            const tweetUrl = `https://twitter.com/rasedonblast`;
            window.open(tweetUrl, '_blank');
          }} />
          <img alt="dicord" src="https://heliobeam.xyz/wp-content/uploads/2024/02/discord.png" className="link-discord icon" onClick={() => {
            const tweetUrl = `https://discord.gg/rasedonblast`;
            window.open(tweetUrl, '_blank');
          }} />
        </div>
        <div className="ul">
          <h1 className="navbar-link faq" onClick={() => {
            window.open('https://rased-miner.gitbook.io/rased-miner');
          }}>Documentation</h1>
        </div>
      </div>
      <ConnectWalletSec />
    </section>
  );
};

export default Navbar;
