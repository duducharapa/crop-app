import axios from 'axios'

async function getImageBuffer(url: string): Promise<ArrayBuffer> {
    const response = await axios.get(url, {responseType: 'arraybuffer'})
    return response.data
}

export async function getImage(url: string): Promise<string> {
    const buffer = await getImageBuffer(url)
    const bytes = new Uint8Array(buffer)
    let binary = ''
    for (let i = 0; i < bytes.byteLength; i++) {
        binary += String.fromCharCode(bytes[i])
    }
    const base64 = btoa(binary)
    return `data:image/png;base64,${base64}`
}