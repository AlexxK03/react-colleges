import * as React from "react";
import Dropdown from "@mui/joy/Dropdown";
import Menu from "@mui/joy/Menu";
import MenuButton from "@mui/joy/MenuButton";
import MenuItem from "@mui/joy/MenuItem";
import { Button } from "@mui/joy";
import { Link, useNavigate } from "react-router-dom";

const Navbar = ({ authenticated, onAuthenticated }) => {
  const navigate = useNavigate();

  const Logout = () => {
    onAuthenticated(false);
    navigate('/');
    console.log("logged out");
  };

  console.log(authenticated)

  return (
    <>
      <Dropdown>
        <MenuButton>Menu</MenuButton>
        <Menu>
          <MenuItem>
            <Link to="/">Home</Link>
          </MenuItem>
          <MenuItem>
            <Link to="/courses">Courses</Link>
          </MenuItem>
          <MenuItem>
            <Link to="/lecturers">Lecturers</Link>
          </MenuItem>
          <MenuItem>
            <Link to="/enrolments">Enrolments</Link>
          </MenuItem>
          <MenuItem>
          {(authenticated) ? (<Button onClick= {Logout}>Log out</Button>) : "not"}
          </MenuItem>
        </Menu>
      </Dropdown>
    </>
  );
};

export default Navbar;
