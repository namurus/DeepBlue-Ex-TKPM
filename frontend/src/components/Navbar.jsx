import { Navbar, NavbarBrand, NavbarCollapse, NavbarLink, NavbarToggle } from "flowbite-react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

export function MyNavbar() {
  const { t, i18n } = useTranslation();
   const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };
  return (
    <Navbar fluid rounded className="bg-gray-900 py-3">
      <NavbarBrand as={Link} to="https://github.com/sitrismart/DeepBlue-Ex-TKPM" target="_blank">
      <div class="bg-white rounded mr-3">
      <img src="/deepblue.svg" className="h-6 sm:h-9" alt="DeepBlue Logo" />
      </div>
        
        <span className="self-center whitespace-nowrap text-xl font-bold text-white">DeepBlue</span>
      </NavbarBrand>
      <NavbarToggle />
      <NavbarCollapse>
        <NavbarLink as={Link} to="/" active className="font-bold text-white">{t('navbar.home')}</NavbarLink>
        <NavbarLink as={Link} to="/students" className="font-bold text-white">{t('navbar.students')}</NavbarLink>
        <NavbarLink as={Link} to="/courses" className="font-bold text-white">{t('navbar.courses')}</NavbarLink>
        <NavbarLink as={Link} to="/classes" className="font-bold text-white"> {t('navbar.classes')}</NavbarLink>
        <div className="flex items-center space-x-4 font-bold text-white">
          <button onClick={() => changeLanguage('en')}>ENG</button>
          <button onClick={() => changeLanguage('vi')}>VIE</button>
        </div>
      </NavbarCollapse>
    </Navbar>
  );
}
