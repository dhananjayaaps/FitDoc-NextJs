import React, { useEffect, useState } from "react";
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, Button } from "@nextui-org/react";
import axios from "axios"; // Import axios

export default function App() {
  const [thisUser, setThisUser] = useState({});
  const [username, setUsername] = useState('');
  const [userLink, setLink] = useState('');

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userDetailsResponse = await axios.get(`http://localhost:8080/user/details`, { withCredentials: true });
        setThisUser(userDetailsResponse.data);
        console.log("User data fetched successfully:", userDetailsResponse.data); // Log user data to the
        var email = userDetailsResponse.data.email;
        var thatusername = email.substring(0, email.lastIndexOf("@"));
        setUsername(thatusername)
        var linkuser = "/Profile?user=" + thatusername;
        setLink(linkuser);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);

  return (
    <Navbar isBordered>
      <NavbarBrand>
        <p className="font-bold text-inherit">ACME</p>
      </NavbarBrand>
      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarItem>
          <Link color="foreground" href={userLink}>
            Profile
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link href="/" aria-current="page">
            Timeline
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
