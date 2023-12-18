import DetailNavbar from "~/pages/CourseDetail/DetailNavbar/DetailNavbar";

export default function DetailClassHeader() {
    return (
        <div>
            <div  style={{ width: "100%", backgroundColor: "white", padding: "32px 32px 32px", boxShadow: "0 4px 10px rgba(0, 0, 0, 0.25)" }}>
                <h1 style={{ fontSize: "36px", fontWeight: "700", lineHeight: "25px" }}>Chi tiết lớp học</h1>
            </div>
            <div style={{ backgroundColor: "white", marginTop: "20px", marginBottom: "20px" }}>
                <DetailNavbar></DetailNavbar>
            </div>
        </div>
    )
}