'use server'

import { mkdir, writeFile } from "fs/promises";
import path from "path";


const uploadImage = async (formData: FormData) => {

    const file = formData.get('image') as File;

    if (!file || !file.name) throw new Error("No image provided");
    if (!file.type.startsWith("image/")) throw new Error("File must be an image");

    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes);

    const ext = path.extname(file.name)
    const baseName = path.basename(file.name, ext).replace(/[^a-z0-9]/gi, "-").toLowerCase();

    const filename = `${Date.now()}-${baseName}${ext}`;
    const uploadDir = path.join(process.cwd(), 'public', 'images');

    await mkdir(uploadDir, { recursive: true });
    await writeFile(path.join(uploadDir, filename), buffer);
    return `/images/${filename}`;

}



export async function createPost(formData: FormData) {

    const imageUrl = await uploadImage(formData) 
    const author = (formData.get('author') as string).trim();
    const tagsRaw = (formData.get('tags') as string) ?? "";


    const newPost = {
        imageUrl,
        title: (formData.get('title') as string).trim(),
        author,
        avatar: author.charAt(0).toUpperCase(),
        description: (formData.get('description') as string).trim(),
        tags: tagsRaw.split(",").map(t => t.trim()).filter(Boolean),
        likes: 0,
        createdAt: new Date().toISOString()
    }


    const res = await fetch('http://localhost:4000/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newPost)
    })
    if (!res.ok) throw new Error("Failed to save post");


    return await res.json();

}