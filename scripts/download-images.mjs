import { writeFileSync, mkdirSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))

const posts = [
  { id: 1,  url: 'https://i.pinimg.com/474x/dc/77/f8/dc77f861e5cadfc67b40f5f2e19fa6cd.jpg' },
  { id: 2,  url: 'https://i.pinimg.com/474x/0c/45/34/0c4534119fc15843d05aceb640ce0ee7.jpg' },
  { id: 3,  url: 'https://i.pinimg.com/webp/474x/41/a6/f2/41a6f24ced48d4ba2a136bf7230df74e.webp' },
  { id: 4,  url: 'https://i.pinimg.com/474x/d2/c8/15/d2c81581a20c4cd9baf9e953a3b0441c.jpg' },
  { id: 5,  url: 'https://i.pinimg.com/474x/07/ce/64/07ce64526b15fd99bdbab5e199b9c9f9.jpg' },
  { id: 6,  url: 'https://i.pinimg.com/736x/57/94/a6/5794a65c845b1aff96db5a9fd585e00a.jpg' },
  { id: 7,  url: 'https://i.pinimg.com/webp/1200x/37/d4/25/37d42508263aa9baf80eebd95dea5c84.webp' },
  { id: 8,  url: 'https://i.pinimg.com/736x/9d/25/32/9d2532d20bebb520f4731bc15d0bfd5f.jpg' },
  { id: 9,  url: 'https://i.pinimg.com/1200x/71/ca/4d/71ca4df725a0585a72c66ae1cf5aa7e8.jpg' },
  { id: 10, url: 'https://i.pinimg.com/736x/b2/cd/01/b2cd01c6375efde8a66cbe76107a4ad5.jpg' },
  { id: 11, url: 'https://i.pinimg.com/webp/736x/6e/cc/a8/6ecca8011931b428e137ba9fe4139817.webp' },
  { id: 12, url: 'https://i.pinimg.com/webp/1200x/9b/f2/b0/9bf2b081e48d47f3cc8def44277ddaca.webp' },
]

// Save to public/images so Next.js can also serve them directly
const outputDir = join(__dirname, '..', 'public', 'images')
mkdirSync(outputDir, { recursive: true })

for (const post of posts) {
  const ext = post.url.endsWith('.webp') ? 'webp' : 'jpg'
  const filename = `post-${post.id}.${ext}`
  const filepath = join(outputDir, filename)

  console.log(`Downloading post ${post.id}...`)

  const res = await fetch(post.url)
  const buffer = await res.arrayBuffer()
  writeFileSync(filepath, Buffer.from(buffer))

  console.log(`  ✓ saved to public/images/${filename}`)
}

console.log('\nAll done! Update db.json imageUrl fields to use /images/post-N.jpg')