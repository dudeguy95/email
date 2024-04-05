import { useState } from "react";
function Footer() {
    return (
        <section id="section-13-278" className="footer">
            <img alt="twitter" src="https://heliobeam.xyz/wp-content/uploads/2024/02/twitter.png" className="link-twitter icon" onClick={() => {
                const tweetUrl = `https://twitter.com/rasedonblast`;
                window.open(tweetUrl, '_blank');
            }} />
            <img alt="dicord" src="https://heliobeam.xyz/wp-content/uploads/2024/02/discord.png" className="link-discord icon" onClick={() => {
                const tweetUrl = `https://discord.gg/rasedonblast`;
                window.open(tweetUrl, '_blank');
            }} />
        </section>
    );
}

export default Footer;