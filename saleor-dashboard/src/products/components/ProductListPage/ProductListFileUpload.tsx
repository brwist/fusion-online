import React, {useState, useRef} from 'react';
import Button from '@material-ui/core/Button'
import axios from 'axios'

export interface ProductListFileUploadProps {

}

export const ProductListFileUpload: React.FC<ProductListFileUploadProps> = props => {
  const uploadInputRef = useRef(null);
  const [selectedFile, setSelectedFile] = useState(null)
  const onFileUpload = async () => {
    const formData = new FormData();
    formData.append(
      "productListFile",
      selectedFile,
      selectedFile.name
    )
    console.log("selectedFile", selectedFile)
    const response = await axios.post("http://localhost:8000/admin/product-upload", formData)
    console.log("response", response.data)

  }
  return (
    <>
      <input
        ref={uploadInputRef}
        type="file"
        onChange={(event) => setSelectedFile(event.target.files[0])}
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