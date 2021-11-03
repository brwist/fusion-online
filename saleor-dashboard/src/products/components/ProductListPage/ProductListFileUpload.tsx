import React, {useState, useRef} from 'react';
import Button from '@material-ui/core/Button'

export interface ProductListFileUploadProps {

}

export const ProductListFileUpload: React.FC<ProductListFileUploadProps> = props => {
  const uploadInputRef = useRef(null);
  const [uploadedFile, setUploadedFile] = useState(null)
  const onFileUpload = () => {
    console.log(uploadedFile)
  }
  return (
    <>
      <input
        ref={uploadInputRef}
        type="file"
        onChange={(event) => setUploadedFile(event.target.files[0])}
      />
      <Button
        onClick={onFileUpload}
        variant="contained"
      >
        Upload
      </Button>
    </>
  );

}