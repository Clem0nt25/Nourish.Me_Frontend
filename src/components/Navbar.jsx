import { useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { SessionContext } from "../contexts/SessionContext";
import {
  Box,
  Button,
  Flex,
  Image,
  AspectRatio,
  Link as ChakraLink,
} from "@chakra-ui/react";
import {
  RiLogoutBoxLine,
  RiLoginBoxLine,
  RiProfileLine,
  RiBook3Line,
} from "react-icons/ri";

import LogoImage from "../assets/logo-nav.png";

function Navbar() {
  const location = useLocation();
  const { isLoggedInSt, logout } = useContext(SessionContext);

  return (
    <Flex
      as="nav"
      bg=" #98FB98"
      color="#292F36"
      align="center"
      p={4}
      boxShadow="md"
    >
      <Link to="/">
        <AspectRatio ratio={1 / 1} width={"50px"}>
          <Image
            className="logo"
            src={LogoImage}
            borderRadius={50}
            objectFit="cover"
            boxShadow="0px 10px 15px rgba(0, 0, 0, 0.1)"
          />
        </AspectRatio>
      </Link>

      {location.pathname !== "/signup" && location.pathname !== "/login" && (
        <Box ml="auto">
          {isLoggedInSt ? (
            <>
              <Link to="/daily-diary">
                <Button
                  variant="button-primary"
                  bg="#FF9400"
                  color="white"
                  _hover={{ color: "#292F36", bgColor: "white" }}
                  mr={4}
                  leftIcon={<RiBook3Line />}
                  size={"sm"}
                >
                  Diary
                </Button>
              </Link>
              <Link to="/profile">
                <Button
                  variant="button-primary"
                  bg="#FF9400"
                  color="white"
                  _hover={{ color: "#292F36", bgColor: "white" }}
                  mr={4}
                  leftIcon={<RiProfileLine />}
                  size={"sm"}
                >
                  Profile
                </Button>
              </Link>
              <Button
                variant="button-primary"
                bg="#FF9400"
                color="white"
                _hover={{ color: "#292F36", bgColor: "white" }}
                onClick={logout}
                leftIcon={<RiLogoutBoxLine />}
                size={"sm"}
              >
                Logout
              </Button>
            </>
          ) : (
            <Link to="/login">
              <Button
                variant="button-primary"
                bg="#FF9400"
                color="white"
                _hover={{ color: "#292F36", bgColor: "white" }}
                leftIcon={<RiLoginBoxLine />}
                size={"sm"}
              >
                Login
              </Button>
            </Link>
          )}
        </Box>
      )}
    </Flex>
  );
}

export default Navbar;
