import React from "react";
import {Link, Button} from "@nextui-org/react";
import axios from "axios";

const handleLogout = async () => {
  try {
    // Make a request to the logout URL
    await axios.get("http://localhost:8080/logout");

    window.location.href = "/Login";
  } catch (error) {
    console.error("Logout failed:", error);
  }
};

const LogoutButton = () => {
  return (
    <Button
      color="primary"
      component={Link}
      onClick={handleLogout}
      variant="flat"
    >
      Log Out
    </Button>
  );
};

export default LogoutButton;
