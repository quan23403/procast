import { Button } from 'antd';
import './ManualImport.css'
function ManualImport() {
    return (
        <div className="manual-content">
            <div className="manual-item">
                <label>Name</label><br></br>
                <input type="text" className='item-manual-content'></input>
            </div>
            <div className="manual-item">
                <label>Date of birth</label><br></br>
                <input type="text" className='item-manual-content'></input>
            </div>
            <div className="manual-item">
                <label>Email</label><br></br>
                <input type="email" className='item-manual-content'></input>
            </div>
            <div className="manual-item">
                <label>Phone number</label><br></br>
                <input type="text" className='item-manual-content'></input>
            </div>
            <div className='manual-submit-item'>
                <Button>Submit</Button>
            </div>
        </div>
    )
}

export default ManualImport;