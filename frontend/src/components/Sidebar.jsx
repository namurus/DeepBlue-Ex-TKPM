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
              Home
            </SidebarItem>

            {/* Student Section */}
            <SidebarCollapse
              icon={HiUserGroup}
              label="Student"
              open={openCollapse === "student"}
              onClick={() => handleCollapse("student")}
            >
              <SidebarItem as={Link} to="/students">View Students</SidebarItem>
              <SidebarItem as={Link} to="/add-student">Add Student</SidebarItem>
            </SidebarCollapse>

            {/* Course Section */}
            <SidebarCollapse
              icon={HiBookOpen}
              label="Course"
              open={openCollapse === "course"}
              onClick={() => handleCollapse("course")}
            >
              <SidebarItem as={Link} to="/courses">View Courses</SidebarItem>
              <SidebarItem as={Link} to="/add-course">Add Course</SidebarItem>
            </SidebarCollapse>

            {/* Class Section */}
            <SidebarCollapse
              icon={HiAcademicCap}
              label="Class"
              open={openCollapse === "class"}
              onClick={() => handleCollapse("class")}
            >
              <SidebarItem as={Link} to="/classes">View Classes</SidebarItem>
              <SidebarItem as={Link} to="/add-class">Add Class</SidebarItem>
              <SidebarItem as={Link} to="/add-student-to-class">Add Student To Class</SidebarItem>
            </SidebarCollapse>

          </SidebarItemGroup>
        </SidebarItems>
      </Sidebar>
    </div>
  );
}
