import Head from "next/head";
import image from "../assets/meta_card.png";
import React from "react";

export function MainLayout({children}) {

    return (
        <>

            <Head>

                {image && <meta name="twitter:image" content={image}/>}
                {image && <meta property="og:image" itemProp={'image'} content={image}/>}
                <title>Analyse des cheveux | Cosmedica Dr. Acar</title>
            </Head>
            <main>{children}</main>
        </>
    )
}