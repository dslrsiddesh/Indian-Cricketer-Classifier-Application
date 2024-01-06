import { useRef, useState } from 'react';
import axios from 'axios';

const ImageUpload = () => {
  const inputRef = useRef(null);
  const [fileName, setFileName] = useState('');
  const [imageUrl, setImageUrl] = useState(null);
  const [base64String, setBase64String] = useState('');

  const handleFileChange = (e) => {
    const file = e.target.files[0];

    if (file && isImage(file)) {
      setFileName(file.name);

      const reader = new FileReader();

      reader.onload = (event) => {
        const imageUrl = URL.createObjectURL(file);
        const base64 = event.target.result;
        
        setImageUrl(imageUrl);
        setBase64String(base64);
      };

      reader.readAsDataURL(file);
      console.log('Valid image file:', file);
    } else {
      setFileName('');
      setImageUrl(null);
      setBase64String('');
      console.error('Invalid image file');
    }

    inputRef.current.value = null;
  };

  const isImage = (file) => {
    const acceptedImageTypes = ['image/jpeg', 'image/png', 'image/gif'];
    return file && acceptedImageTypes.includes(file.type);
  };

  function handleClassify() {
    if(base64String) {
      console.log('Classifying image')
      console.log(typeof base64String)
      try {
        axios.post('http://127.0.0.1:8000/classify', { base64String }, {
        headers: {
          'Content-Type': 'application/json'
        }
      })
        .then(response => {
          console.log('Classification result: ', response.data);
        })
      }
      catch(error) {
        console.error('Failed to classify image', error);
      }
    }
    else {
      console.log('No base64 to classify i.e. no image uploaded');
    }
  }

  return (
    <div className='choose-area'>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
      />
      {imageUrl && <img src={imageUrl} className='uploaded-image' alt="Uploaded Image" />}
      {fileName && <p>{fileName}</p>}
      {base64String && 
      <button onClick={handleClassify}>
        Classify
      </button>}
    </div>
  );
};

export default ImageUpload;
