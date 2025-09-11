import {
  Navbar,
  NavbarBrand,
  NavbarToggle,
  NavbarCollapse,
  NavbarLink,
  Button,
} from "flowbite-react";
import favicon from "../assets/favicon.png";
import { useLocation } from "react-router-dom";

const Header = () => {
  const path = useLocation().pathname;

  return (
    <Navbar className="fixed top-0 left-0 w-full z-50 border-b-2 bg-white dark:bg-gray-800">
      <NavbarBrand>
        <img src={favicon} className="mr-3 h-6 sm:h-9 rounded-xl" alt="Logo" />
        <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
          Devguru's Techtalk
        </span>
      </NavbarBrand>
      <div className="flex md:order-2">
        <NavbarToggle className="ml-2" />
      </div>
      <NavbarCollapse>
        <NavbarLink href="/" active={path === "/"}>
          Home
        </NavbarLink>
        <NavbarLink href="/about" active={path === "/about"}>
          About
        </NavbarLink>
        <NavbarLink href="#" active={path === "/contact"}>
          Contact
        </NavbarLink>
      </NavbarCollapse>
    </Navbar>
  );
};

export default Header;
