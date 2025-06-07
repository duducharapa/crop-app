import axios from "axios"

export const fetchImage = async (url: string): Promise<string> => {
    const PROXY_KEY = import.meta.env.VITE_PROXY_KEY as string

    const proxyUrl = `https://corsproxy.io/?key=${PROXY_KEY}&url=${encodeURIComponent(url)}`
    const response = await axios.get(proxyUrl, {
        responseType: 'blob'})
    const blob = await response.data

    return new Promise((resolve, reject) => {
        const reader =  new FileReader()
        reader.onloadend = () => resolve(reader.result as string)
        reader.onerror = reject
        reader.readAsDataURL(blob)
    })
}