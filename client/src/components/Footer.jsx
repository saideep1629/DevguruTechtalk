import { Footer, FooterBrand, FooterCopyright, FooterDivider, FooterLink, FooterLinkGroup } from "flowbite-react";
import favicon from '../assets/favicon.png'

function FooterComp() {
  const date = new Date();
  const currentYear = date.getFullYear();

  return (
    <Footer container className="rounded-none mb-[-25px]">
      <div className="w-full text-center">
        <div className="w-full justify-between sm:flex sm:items-center sm:justify-between">
          <FooterBrand
            href="/"
            src={favicon}
            alt="Devguru's Techtalk Logo"
            name="Devguru's Techtalk"
          />
          <FooterLinkGroup>
            <FooterLink href="#">About</FooterLink>
            <FooterLink href="#">Privacy Policy</FooterLink>
            <FooterLink href="#">Contact</FooterLink>
          </FooterLinkGroup>
        </div>
        <FooterDivider />
        <FooterCopyright href="#" by="Devguru's Techtalk™" year={currentYear} />
      </div>
    </Footer>
  )
}

export default FooterComp
