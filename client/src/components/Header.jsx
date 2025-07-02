import { Navbar, NavbarBrand, NavbarToggle, NavbarCollapse, NavbarLink, Button} from 'flowbite-react';
import favicon from '../assets/favicon.png'
import { FaMoon } from "react-icons/fa";
import { useLocation } from 'react-router-dom';
import { use } from 'react';


const Header = () => {
   const path = useLocation().pathname;

  return (
    <Navbar className="border-b-2">
      <NavbarBrand>
        <img src={favicon} className="mr-3 h-6 sm:h-9 rounded-xl" alt="Logo"/>
        <span className='self-center whitespace-nowrap text-xl font-semibold dark:text-white'>Devguru's Techtalk</span>
      </NavbarBrand>
      <div className="flex md:order-2">
        <Button className="w-12 h-10 mr-3" color='gray' pill>
          <FaMoon />
        </Button>
        {/* <Dropdown
          arrowIcon={false}
          inline
          label={
            <Avatar alt="User settings" img="https://flowbite.com/docs/images/people/profile-picture-5.jpg" rounded />
          }
        >
          <DropdownHeader>
            <span className="block text-sm">Bonnie Green</span>
            <span className="block truncate text-sm font-medium">name@flowbite.com</span>
          </DropdownHeader>
          <DropdownItem>Dashboard</DropdownItem>
          <DropdownItem>Settings</DropdownItem>
          <DropdownItem>Earnings</DropdownItem>
          <DropdownDivider />
          <DropdownItem>Sign out</DropdownItem>
        </Dropdown> */}
        {/* <Button>Sign In</Button> */}
        <NavbarToggle className='ml-2'/>
      </div>
      <NavbarCollapse>
        <NavbarLink href="/" active={path === "/"}>
          Home
        </NavbarLink>
        <NavbarLink href="/about" active={path === "/about"}>About</NavbarLink>
        <NavbarLink href="#" active={path === "/services"}>Services</NavbarLink>
        <NavbarLink href="#" active={path === "/pricing"}>Pricing</NavbarLink>
        <NavbarLink href="#" active={path === "/contact"}>Contact</NavbarLink>
      </NavbarCollapse>
      
    </Navbar>
    
  )
}

export default Header
