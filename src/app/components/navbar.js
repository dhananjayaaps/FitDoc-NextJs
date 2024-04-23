import React from "react";
import {Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, Button} from "@nextui-org/react";
// import {AcmeLogo} from "./AcmeLogo.jsx";

export default function App() {
  return (
    <Navbar isBordered>
      <NavbarBrand>
        {/* <AcmeLogo /> */}
        <p className="font-bold text-inherit">ACME</p>
      </NavbarBrand>
      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarItem>
          <Link color="foreground" href="/Profile">
            Profile
          </Link>
        </NavbarItem>
        <NavbarItem isActive>
          <Link href="#" aria-current="page">
            Timeline
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" href="#">
            Notifications
          </Link>
        </NavbarItem>
      </NavbarContent>
      <NavbarContent justify="end">
        <NavbarItem>
          <Button as={Link} color="primary" href="http://localhost:8080/logout" variant="flat">
            Log Out
          </Button>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
}
