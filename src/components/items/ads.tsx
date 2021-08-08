import React from 'react'

export function HorzAd() {
    
    return (
    <div>
        <ins className="adsbygoogle"
        style={{display: "block", border: '1px solid green', minHeight: 100}}
        data-ad-client="ca-pub-3903271828101712"
        data-ad-slot="9658018810"
        data-ad-format="auto"
        data-adtest={process.env.NODE_ENV === 'development' ? 'on' : 'off'}
        data-full-width-responsive="true" />
    </div>
    )
}