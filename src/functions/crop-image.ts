import type { Area } from "react-easy-crop"
import type { ImageType } from "../types/image-type"

const createImage = (url: string): Promise<HTMLImageElement> =>
	new Promise((resolve, reject) => {
		const image = new Image()
		image.addEventListener("load", () => resolve(image))
		image.addEventListener("error", (error) => reject(error))
		image.src = url
	})

export default async function getCroppedImg(imageSrc: string, pixelCrop: Area, imageType: ImageType) {
	const image = await createImage(imageSrc)
	const canvas = document.createElement("canvas")
	const ctx: CanvasRenderingContext2D | null = canvas.getContext("2d")

	const outputRatio = imageType === "PRODUCT" ? 200 : 140
	canvas.width = outputRatio
	canvas.height = outputRatio

	ctx?.drawImage(
		image,
		pixelCrop.x,
		pixelCrop.y,
		pixelCrop.width,
		pixelCrop.height,
		0,
		0,
		outputRatio,
		outputRatio
	)

	return canvas
}

export const generateDownload = async (imageSrc: string, crop: Area, imageType: ImageType) => {
	console.log("generateDownload", imageSrc, crop)
    if (!crop || !imageSrc) {
		return
	}

	const canvas = await getCroppedImg(imageSrc, crop, imageType)

	canvas.toBlob(
		(blob) => {
			if (!blob) return

			const previewUrl = window.URL.createObjectURL(blob)

			const anchor = document.createElement("a")
			anchor.download = "image.png"
			anchor.href = previewUrl
			anchor.click()

			window.URL.revokeObjectURL(previewUrl)
		},
		"image/png",
		1.0
	)
}
