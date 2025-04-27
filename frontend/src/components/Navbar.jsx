
import { Navbar, NavbarBrand, NavbarCollapse, NavbarLink, NavbarToggle } from "flowbite-react";
import { Link } from "react-router-dom";

export function MyNavbar() {
  return (
    // <Navbar fluid rounded className="bg-gradient-to-r from-teal-200 to-lime-200">
    <Navbar fluid rounded className="bg-gray-900 py-3">
      <NavbarBrand as={Link} to="https://github.com/sitrismart/DeepBlue-Ex-TKPM" target="_blank">
        <img src="/deepblue.png" className="mr-3 h-6 sm:h-9" alt="DeepBlue Logo" />
        <span className="self-center whitespace-nowrap text-xl font-bold text-white">DeepBlue</span>
      </NavbarBrand>
      <NavbarToggle />
      <NavbarCollapse>
        <NavbarLink as={Link} to="#" active className="font-bold text-white">Home</NavbarLink>
        <NavbarLink as={Link} to="#" className="font-bold text-white">About</NavbarLink>
        <NavbarLink as={Link} to="#" className="font-bold text-white">Student</NavbarLink>
        <NavbarLink as={Link} to="#" className="font-bold text-white">Faculty</NavbarLink>
        <NavbarLink as={Link} to="#" className="font-bold text-white">Class</NavbarLink>
      </NavbarCollapse>
    </Navbar>
  );
}
