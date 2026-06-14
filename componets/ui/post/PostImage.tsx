
'use client';

import { SyntheticEvent, useEffect, useRef, useState } from "react";


const PostImage = ({ src, alt }: { src: string, alt: string }) => {
    const [sizeClass, setSizeClass] = useState('w-full')
    const imgRef = useRef<HTMLImageElement>(null);
    useEffect(() => {
        const img = imgRef.current;
        if (!img) return;

        if (img.complete && img.naturalWidth > 0) {
            updateSize(img)
        }
    }, [])

    const updateSize = (img: HTMLImageElement) => {
        if (img.naturalHeight > img.naturalWidth) {
            setSizeClass('h-full')
        }
        else {
            setSizeClass('w-full')
        }
    }

    const handleLoaded = (e: SyntheticEvent<HTMLImageElement, Event>) => {

        const img = imgRef.current;
        if (!img) return;

        if (img.complete && img.naturalWidth > 0) {
            updateSize(img)
        }


    }
    return (
        <img ref={imgRef} onLoad={(e) => handleLoaded(e)} src={src} alt={alt} className={` rounded-2xl object-center  object-cover ${sizeClass}`} />
    )
}

export default PostImage