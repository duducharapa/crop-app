import { useCallback, useEffect, useState } from 'react'
import Cropper from 'react-easy-crop'
import { getImage } from './functions/buffer'

function App() {
  const [crop, setCrop] = useState({ x: 0, y: 0 })
  const [zoom, setZoom] = useState(1)
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null)
  const [croppedImage, setCroppedImage] = useState(null)
  
  const [url, setUrl] = useState('')
  const [image, setImage] = useState('')

  useCallback(async () => {
    if (url) {
      const imageLoaded = await getImage(url)
      setImage(imageLoaded)
    }
  }, [url])

  const onCropComplete = (croppedArea, croppedAreaPixels) => {
  }

  return (
    <>
      {
        image ? (
          <Cropper
            crop={crop}
            zoom={zoom}
            aspect={1 / 1}
            onCropChange={setCrop}
            onCropComplete={onCropComplete}
            onZoomChange={setZoom}
            image={image}
          />
        ) : (
          <input
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="Enter image URL"
          />
        )
      }
    </>
  )
}

export default App
