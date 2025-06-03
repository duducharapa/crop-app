import sharp from 'sharp'

export async function cropImage(inputBuffer: any, crop: any): Promise<Buffer> {
    return await sharp(inputBuffer)
        .extract({
            left: crop.x,
            top: crop.y,
            width: crop.width,
            height: crop.height
        })
        .toBuffer();
}