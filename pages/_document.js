import React from 'react'
import Document, {Html, Head, Main, NextScript} from 'next/document'
import {ServerStyleSheet} from 'styled-components'
import {ServerStyleSheets} from '@material-ui/styles'

export default class MyDocument extends Document {

    render() {
        return (
            <Html lang="de">
                <Head>
                    <head dangerouslySetInnerHTML={{
                        __html: '<!-- This site was created by  https://www.nlpc.de -->\n' +
                            '<!-- Email: dev@nlpc.de -->'
                    }}/>
                    <script dangerouslySetInnerHTML={{
                        __html: `
                 (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','GTM-PVWDF8K')`
                    }}/>

                    <meta property="og:locale" content={"de_DE"}/>
                    <meta property="og:type" content={"website"}/>
                    <meta name="twitter:card" content={"summary_large_image"}/>
                    <meta name="description"
                          content="Hair Transplantation Turkey in Istanbul - German speaking top doctor Dr.Levent Acar performs state of the art FUE and DHI Sapphire hair transplants"/>
                    <link rel="preconnect" href="https://fonts.googleapis.com"/>
                    <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin/>
                    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600&display=swap"
                          rel="stylesheet"/>
                    <link rel="icon"
                          href="https://de.cosmedica.com/wp-content/uploads/2020/11/Cosmedica-Favicon-144x144-1.png"
                          sizes="32x32"/>

                    <script async
                            src="https://www.googletagmanager.com/gtag/js?id=UA-74415580-1"/>

                    <script dangerouslySetInnerHTML={{
                        __html: `
                 window.dataLayer = window.dataLayer || [];function gtag(){dataLayer.push(arguments);}gtag('js', new Date());gtag('config', 'UA-74415580-1');`
                    }}/>

                    <script dangerouslySetInnerHTML={{
                        __html: `
                 !function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window, document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init', '3740400059419377');fbq('track', 'PageView');`
                    }}/>


                </Head>
                <body>
                <noscript dangerouslySetInnerHTML={{
                    __html: `
         <img  height="1" width="1" style="display:none"
src="https://www.facebook.com/tr?id=3740400059419377&ev=PageView&noscript=1" alt=''/>`
                }}/>
                <noscript dangerouslySetInnerHTML={{
                    __html: `
           <iframe src="https://www.googletagmanager.com/ns.html?id=GTM-PVWDF8K"
height="0" width="0" style="display:none;visibility:hidden"/>`
                }}/>
                <Main/>
                <NextScript/>
                </body>
            </Html>
        )
    }
}

// `getInitialProps` belongs to `_document` (instead of `_app`),
// it's compatible with server-side generation (SSG).
MyDocument.getInitialProps = async (ctx) => {
    // Resolution order
    //
    // On the server:
    // 1. app.getInitialProps
    // 2. page.getInitialProps
    // 3. document.getInitialProps
    // 4. app.render
    // 5. page.render
    // 6. document.render
    //
    // On the server with error:
    // 1. document.getInitialProps
    // 2. app.render
    // 3. page.render
    // 4. document.render
    //
    // On the client
    // 1. app.getInitialProps
    // 2. page.getInitialProps
    // 3. app.render
    // 4. page.render

    // Render app and page and get the context of the page with collected side effects.
    const styledComponentsSheet = new ServerStyleSheet()
    const sheets = new ServerStyleSheets()
    const originalRenderPage = ctx.renderPage

    try {
        ctx.renderPage = () =>
            originalRenderPage({
                enhanceApp: (App) => (props) =>
                    styledComponentsSheet.collectStyles(
                        sheets.collect(<App {...props} />)
                    ),
            })

        const initialProps = await Document.getInitialProps(ctx)

        return {
            ...initialProps,
            // Styles fragment is rendered after the app and page rendering finish.
            styles: [
                ...React.Children.toArray(initialProps.styles),
                sheets.getStyleElement(),
            ],
        }
    } finally {
        await styledComponentsSheet.seal()
    }
}
