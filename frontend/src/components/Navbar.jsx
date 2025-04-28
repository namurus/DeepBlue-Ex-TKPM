
import { Navbar, NavbarBrand, NavbarCollapse, NavbarLink, NavbarToggle } from "flowbite-react";
import { Link } from "react-router-dom";

export function MyNavbar() {
  return (
    // <Navbar fluid rounded className="bg-gradient-to-r from-teal-200 to-lime-200">
    <Navbar fluid rounded className="bg-gray-900 py-3">
      <NavbarBrand as={Link} to="https://github.com/sitrismart/DeepBlue-Ex-TKPM" target="_blank">
      <div class="bg-blue-500 rounded mr-3">
      <img src="/deepblue.svg" className="h-6 sm:h-9" alt="DeepBlue Logo" />
      </div>
        
        <span className="self-center whitespace-nowrap text-xl font-bold text-white">DeepBlue</span>
      </NavbarBrand>
      <NavbarToggle />
      <NavbarCollapse>
        <NavbarLink as={Link} to="/" active className="font-bold text-white">Trang chủ</NavbarLink>
        <NavbarLink as={Link} to="/students" className="font-bold text-white">Sinh viên</NavbarLink>
        <NavbarLink as={Link} to="/courses" className="font-bold text-white">Khóa học</NavbarLink>
        <NavbarLink as={Link} to="/classes" className="font-bold text-white">Lớp học</NavbarLink>
        <div className="flex items-center space-x-4 font-bold text-white">Đổi ngôn ngữ</div>
      </NavbarCollapse>
    </Navbar>
  );
}
