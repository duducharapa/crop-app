import axios from 'axios'

async function getImageBuffer(url: string): Promise<Buffer> {
    const response = await axios.get(url, {responseType: 'arraybuffer'})
    return Buffer.from(response.data, 'binary')
}

export async function getImage(url: string): Promise<string> {
    const buffer = await getImageBuffer(url)
    return `data:image/png;base64,${buffer.toString('base64')}`
}