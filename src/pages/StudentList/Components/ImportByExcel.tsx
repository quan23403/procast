// import 'antd/dist/antd.css';
import {Button, Upload, UploadFile, UploadProps} from "antd";
import './ImportByExcel.css'
import { useState } from "react";
import classDeltailApi from "~/apis/classDetail.api";
import { useParams } from "react-router-dom";
import { RcFile } from "antd/es/upload";
function ImportByExcel() {
    const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [uploading, setUploading] = useState(false);
    const {id} = useParams()
  const handleUpload = () => {
    const formData = new FormData();
    if(fileList.length === 1) {
        setUploading(true);
        console.log(fileList[0] as RcFile)
        formData.append('file', fileList[0] as RcFile)
        classDeltailApi.importStudentExcel(formData, id).finally(()=> setUploading(false))
    }
    
    
  };

  const props: UploadProps = {
    onRemove: (file) => {
      const index = fileList.indexOf(file);
      const newFileList = fileList.slice();
      newFileList.splice(index, 1);
      setFileList(newFileList);
    },
    beforeUpload: (file) => {
      setFileList([...fileList, file]);

      return false;
    },
    fileList,
  };
    return(
        <div className="upload-container">
            <Upload.Dragger {...props} multiple 
            >
                Drag files here OR <br />
                <Button>Click Upload</Button>
            </Upload.Dragger>
            <Button type="primary"
        onClick={handleUpload}
        disabled={fileList.length !== 1}
        loading={uploading}
        style={{
                bottom: "-80px", backgroundColor:'rgb(22, 119, 255)'
            }}>Submit</Button>
        </div>
    )
}

export default ImportByExcel;