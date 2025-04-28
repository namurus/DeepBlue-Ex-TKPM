import { Sidebar, SidebarCollapse, SidebarItem, SidebarItemGroup, SidebarItems } from "flowbite-react";
import { HiHome, HiUserGroup, HiBookOpen, HiAcademicCap } from "react-icons/hi";
import { Link } from "react-router-dom";
import { useState } from "react";

export function MySidebar() {
  const [openCollapse, setOpenCollapse] = useState("");

  const handleCollapse = (name) => {
    setOpenCollapse((prev) => (prev === name ? "" : name));
  };

  return (
    <div className="fixed top-14 left-0 bottom-0 w-64 text-white">
      <Sidebar aria-label="Sidebar with multi-level dropdown example">
        <SidebarItems>
          <SidebarItemGroup>

            {/* Home */}
            <SidebarItem as={Link} to="/" icon={HiHome}>
              Trang chủ
            </SidebarItem>

            {/* Student Section */}
            <SidebarCollapse
              icon={HiUserGroup}
              label="Sinh viên"
              open={openCollapse === "student"}
              onClick={() => handleCollapse("student")}
            >
              <SidebarItem as={Link} to="/students">Danh sách sinh viên</SidebarItem>
              <SidebarItem as={Link} to="/add-student">Thêm sinh viên</SidebarItem>
            </SidebarCollapse>

            {/* Course Section */}
            <SidebarCollapse
              icon={HiBookOpen}
              label="Khóa học"
              open={openCollapse === "course"}
              onClick={() => handleCollapse("course")}
            >
              <SidebarItem as={Link} to="/courses">Danh sách khóa học</SidebarItem>
              <SidebarItem as={Link} to="/add-course">Thêm khóa học</SidebarItem>
            </SidebarCollapse>

            {/* Class Section */}
            <SidebarCollapse
              icon={HiAcademicCap}
              label="Lớp học"
              open={openCollapse === "class"}
              onClick={() => handleCollapse("class")}
            >
              <SidebarItem as={Link} to="/classes">Danh sách lớp học</SidebarItem>
              <SidebarItem as={Link} to="/add-class">Thêm lớp học</SidebarItem>
              <SidebarItem as={Link} to="/add-student-to-class">Thêm sinh viên vào lớp</SidebarItem>
            </SidebarCollapse>

          </SidebarItemGroup>
        </SidebarItems>
      </Sidebar>
    </div>
  );
}
