import { useEffect, useState } from 'react'
import type { Point, Area } from 'react-easy-crop'
import Cropper from 'react-easy-crop'

import { generateDownload } from './functions/crop-image'

import './App.css'
import { fetchImage } from './functions/load-image'

function App() {
  const [image, setImage] = useState<string>('')
  const [url, setUrl] = useState<string>('')

  const [crop, setCrop] = useState<Point>({ x: 0, y: 0 })
  const [zoom, setZoom] = useState(1)
  const [croppedArea, setCroppedArea] = useState<Area>(null as unknown as Area)

  const handleUrlChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUrl(event.target.value);
  }
  
  const onLoadImage = async () => {
    const image = await fetchImage(url)
    setImage(image)
  }

  const onCropComplete = (_: any, croppedAreaPixels: Area) => {
    setCroppedArea(croppedAreaPixels);
  }

  const onDownload = async () => {
    await generateDownload(image, croppedArea)
  }

  return (
    <div className='container'>
      <div className='container-cropper'>
        {
          image ? (
            <>
              <div className='cropper'>
                <Cropper
                  image={image}
                  crop={crop}
                  zoom={zoom}
                  aspect={1}
                  onCropChange={setCrop}
                  onZoomChange={setZoom}
                  onCropComplete={onCropComplete}
                />
              </div>
            </>
          ) : null
        }

        <div className="container-controls">
          <input className="input" type="text" placeholder="URL da imagem" onChange={handleUrlChange} />
          <button className="btn" onClick={onLoadImage}>Carregar Imagem</button>

          <button className="btn btn-download" onClick={onDownload} disabled={!image}>Download</button>
        </div>
      </div>
    </div>
  )
}

export default App
