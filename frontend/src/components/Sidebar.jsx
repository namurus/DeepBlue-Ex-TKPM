import { Sidebar, SidebarCollapse, SidebarItem, SidebarItemGroup, SidebarItems } from "flowbite-react";
import { HiHome, HiUserGroup, HiBookOpen, HiAcademicCap } from "react-icons/hi";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useTranslation } from "react-i18next";

export function MySidebar() {
  const [openCollapse, setOpenCollapse] = useState("");

  const handleCollapse = (name) => {
    setOpenCollapse((prev) => (prev === name ? "" : name));
  };

  const { t } = useTranslation();

  return (
    <div className="fixed top-14 left-0 bottom-0 w-64 text-white">
      <Sidebar aria-label="Sidebar with multi-level dropdown example">
        <SidebarItems>
          <SidebarItemGroup>

            {/* Home */}
            <SidebarItem as={Link} to="/" icon={HiHome}>
              {t("sidebar.home")}
            </SidebarItem>

            {/* Student Section */}
            <SidebarCollapse
              icon={HiUserGroup}
              label={t("sidebar.student")}
              open={openCollapse === "student"}
              onClick={() => handleCollapse("student")}
            >
              <SidebarItem as={Link} to="/students">{t("sidebar.studentList")}</SidebarItem>
              <SidebarItem as={Link} to="/add-student"> {t("sidebar.addStudent")}</SidebarItem>
            </SidebarCollapse>

            {/* Course Section */}
            <SidebarCollapse
              icon={HiBookOpen}
              label={t("sidebar.course")}
              open={openCollapse === "course"}
              onClick={() => handleCollapse("course")}
            >
              <SidebarItem as={Link} to="/courses"> {t("sidebar.courseList")}</SidebarItem>
              <SidebarItem as={Link} to="/add-course">{t("sidebar.addCourse")}</SidebarItem>
            </SidebarCollapse>

            {/* Class Section */}
            <SidebarCollapse
              icon={HiAcademicCap}
              label={t("sidebar.class")}
              open={openCollapse === "class"}
              onClick={() => handleCollapse("class")}
            >
              <SidebarItem as={Link} to="/classes">{t("sidebar.classList")}</SidebarItem>
              <SidebarItem as={Link} to="/add-class">{t("sidebar.addClass")}</SidebarItem>
              <SidebarItem as={Link} to="/add-student-to-class">{t("sidebar.addStudentToClass")}</SidebarItem>
            </SidebarCollapse>

          </SidebarItemGroup>
        </SidebarItems>
      </Sidebar>
    </div>
  );
}
