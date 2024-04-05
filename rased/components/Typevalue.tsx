import { useState } from "react";

function Typevalue({ type, value }: any) {
    return (
        <div className="blast_info">
            <p className="blast_title">{type}</p>
            <p className="blast_value">{value}<br /></p>
        </div>
    )
}

export default Typevalue;