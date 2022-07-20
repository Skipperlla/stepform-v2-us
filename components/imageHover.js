import React from 'react';

export default function ImageHover({img, imgHover, alt, check}) {

    return (
        <>
            <div>
                {!check ?
                    <img
                        src={img}
                        alt={alt}
                        height="auto"
                        className='image__relative__bottom_7'
                    />
                    : <img
                        src={imgHover}
                        alt={alt}
                        height="auto"
                    />}
            </div>
        </>
    );
}
