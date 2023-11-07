// import 'antd/dist/antd.css';
import {Button, Upload} from "antd";
import './ImportByExcel.css'
function ImportByExcel() {
    return(
        <div className="upload-container">
            <Upload.Dragger multiple action={"http://localhost:3000/"}
            >
                Drag files here OR <br />
                <Button>Click Upload</Button>
            </Upload.Dragger>
        </div>
    )
}

export default ImportByExcel;