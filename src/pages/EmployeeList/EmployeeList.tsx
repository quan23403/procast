import { Button } from "antd";
import { useState } from "react";

export default function () {
    const nameHeaderTable = ["#", "Họ và tên", "Ngày sinh", "Giới tính", "Email"];
    const teacherList = [
        { name: "Nguyễn Cao A", dob: "1", gender: "Nữ", email: "abc@gmail.com" },
        { name: "Nguyễn Cao B", dob: "2", gender: "Nữ", email: "abc@gmail.com" },
        { name: "Nguyễn Cao C", dob: "3", gender: "Nữ", email: "abc@gmail.com" },
        { name: "Nguyễn Cao D", dob: "4", gender: "Nữ", email: "abc@gmail.com" },
        { name: "Nguyễn Cao Thanh", dob: "5", gender: "Nữ", email: "abc@gmail.com" }
    ];
    const teachingassistantList = [
        { name: "Tống Đức A", dob: "1", gender: "Nữ", email: "abc@gmail.com" },
        { name: "Tống Đức B", dob: "2", gender: "Nữ", email: "abc@gmail.com" },
        { name: "Tống Đức C", dob: "3", gender: "Nữ", email: "abc@gmail.com" },
        { name: "Tống Đức D", dob: "4", gender: "Nữ", email: "abc@gmail.com" },
        { name: "Tống Đức E", dob: "4", gender: "Nữ", email: "abc@gmail.com" },
        { name: "Tống Đức Minh", dob: "5", gender: "Nữ", email: "abc@gmail.com" }
    ];
    const [list, setList] = useState(teacherList);
    return (
        <div className="container-employee-list">
            <div className="title-list" style={{ padding: "20px", backgroundColor: "white" }}>
                <h1>Danh sách nhân viên</h1>
            </div>
            <div className="container-main-content" style={{ backgroundColor: "#E3E3E3", padding: "20px" }}>
                <div className="maint-content" style={{ backgroundColor: "white", padding: "10px" }}>
                    <div className="option-employee-list" style={{ marginBottom: "10px" }}>
                        <Button style={{ backgroundColor: "#E4E4E4", marginRight: "15px" }}
                        onClick={()=> {setList(teacherList)}}
                        >Danh sách giáo viên</Button>
                        <Button style={{ backgroundColor: "#E4E4E4" }}
                        onClick={() => {setList(teachingassistantList)}}
                        >Danh sách TA</Button>
                    </div>
                    <div className="employee-list">
                        <table style={{ width: "100%", borderCollapse: "collapse", fontFamily:"Open Sans"}}>
                            <thead>
                                <tr>
                                    {nameHeaderTable.map((header) => (
                                        <th style={{ border: "solid 1px #ddd" }}>
                                            {header}
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {list.map((data, index) => (
                                    <tr><th style={{ border: "solid 1px #ddd",fontWeight:"normal"}}>{index + 1}</th>
                                        <th style={{ border: "solid 1px #ddd",fontWeight:"normal", width:"30%", textAlign:"left", paddingLeft:"10px"}}>{data.name}</th>
                                        <th style={{ border: "solid 1px #ddd",fontWeight:"normal" }}>{data.dob}</th>
                                        <th style={{ border: "solid 1px #ddd",fontWeight:"normal" }}>{data.gender}</th>
                                        <th style={{ border: "solid 1px #ddd",fontWeight:"normal", width:"30%", textAlign:"left", paddingLeft:"10px"}}>{data.email}</th>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

            </div>
        </div>
    )
}