
'use client';

import { SyntheticEvent, useState } from "react";


const PostImage = ({ src, alt }: { src: string, alt: string }) => {
    const [sizeClass, setSizeClass] = useState('w-full')

    const handleLoaded = (e: SyntheticEvent<HTMLImageElement, Event>) => {

        const img = e.currentTarget;
        if(img.naturalHeight > img.naturalWidth){
            setSizeClass('h-full')
        }
        else{
             setSizeClass('w-full')
        }

    }
    return (
        <img onLoad={(e) => handleLoaded(e)} src={src} alt={alt} className={` rounded-2xl object-center  object-cover ${sizeClass}`} />
    )
}

export default PostImage