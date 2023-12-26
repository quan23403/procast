import './Modal.css'
import { useRef } from 'react';
// import { useState } from 'react';
import ManualImport from './ManualImport';
import ImportByExcel from './ImportByExcel';
interface ModalProps {
    closeModal: (value: boolean) => void;
  }
  const Modal: React.FC<ModalProps> = ({ closeModal }) => {
    
    const ref = useRef<HTMLDivElement | null>(null);
    const ref1 = useRef<HTMLDivElement | null>(null);
const manualImport = document.getElementsByClassName("manual-import") as HTMLCollectionOf<HTMLElement>;
const importByExcel = document.getElementsByClassName("import-by-excel") as HTMLCollectionOf<HTMLElement>;
const handleClickManual = () => {
    // Assuming setSelectedManual is a state-setting function
    // Uncomment and use it as needed
    // setSelectedManual(false);
  
    // Assuming ref and ref1 are React refs pointing to DOM elements
    if (ref.current && ref1.current) {
      // Toggle the display property of elements
      ref.current.style.display = 'block';
      ref1.current.style.display = 'none';
  
      // Assuming manualImport and importByExcel are also refs or elements
      manualImport[0].style.backgroundColor = "red";
      importByExcel[0].style.backgroundColor = "#e9e9e9";
    }
  };
  
  const handleClickImport = () => {
    // Assuming setSelectedManual is a state-setting function
    // Uncomment and use it as needed
    // setSelectedManual(true);
  
    // Assuming ref and ref1 are React refs pointing to DOM elements
    if (ref.current && ref1.current) {
      // Toggle the display property of elements
      ref.current.style.display = 'none';
      ref1.current.style.display = 'block';
  
      // Assuming manualImport and importByExcel are also refs or elements
      manualImport[0].style.backgroundColor = "#e9e9e9";
      importByExcel[0].style.backgroundColor = "red";
    }
  };
  
    return (
        <div className="modalBackground"
            onClick={() => { closeModal(false); }}>
            <div className="modalContainer"
                onClick={e => {
                    // do not close modal if anything inside modal content is clicked
                    e.stopPropagation();
                }}
            >
                {/* <button onClick={() => closeModal(false)}> X </button> */}
                <div className='title-add-std'>
                    <p>Thêm học viên</p>
                </div>
                <div className='option-add-std'>
                    <div className='manual-import' onClick={handleClickManual}>
                        <p>Manual import</p>
                    </div>
                    <div className='import-by-excel' onClick={handleClickImport}>
                        <p>Import by excel</p>
                    </div>
                </div>
                <div className='content-form-add-std'>
                    <div ref={ref} className='content-manual-import'>
                        <ManualImport closeModal={closeModal}/>
                    </div>
                    <div ref={ref1} className='content-import-by-excel'>
                        <ImportByExcel closeModal={closeModal}/>
                        {/* <p>Button</p> */}
                    </div>
                </div>
            </div>
        </div>
    );
}
export default Modal;