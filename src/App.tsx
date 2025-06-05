import { useRef, useState } from 'react'
import type { Point, Area } from 'react-easy-crop'
import Cropper from 'react-easy-crop'

import { generateDownload } from './functions/crop-image'

import './App.css'

function App() {
  const [image, setImage] = useState<string>('')
  const [crop, setCrop] = useState<Point>({ x: 0, y: 0 })
  const [zoom, setZoom] = useState(1)
  const [croppedArea, setCroppedArea] = useState<Area>(null as unknown as Area)

  const inputRef = useRef<HTMLInputElement>(null)

  const onSelectFile = (event) => {
		if (event.target.files && event.target.files.length > 0) {
			const reader = new FileReader();
			reader.readAsDataURL(event.target.files[0]);
			reader.addEventListener("load", () => {
				setImage(reader.result as string);
			});
		}
  }	
  
  const triggerFileSelectPopup = () => inputRef.current?.click();

  const onCropComplete = (_: any, croppedAreaPixels: Area) => {
    setCroppedArea(croppedAreaPixels);
  }

  const onDownload = async () => {
    await generateDownload(image, croppedArea, "PRODUCT")
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

        <div className="container-buttons">
          <input
            type='file'
            accept='image/*'
            ref={inputRef}
            onChange={onSelectFile}
            style={{ display: 'none' }}  
          />
          <button onClick={triggerFileSelectPopup}>Select Image</button>
          <button onClick={onDownload}>Download</button>
        </div>
      </div>
    </div>
  )
}

export default App
