import { useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { SessionContext } from "../contexts/SessionContext";
import { Box, Button, Flex, Image, Link as ChakraLink } from "@chakra-ui/react";

function Navbar() {
  const location = useLocation();
  const { isLoggedInSt, logout } = useContext(SessionContext);

  return (
    <Flex
      as="nav"
      bg="#98FB98"
      color="#292F36"
      align="center"
      p={4}
      boxShadow="md"
      borderBottomRadius={8}
    >
      <Link to="/">
        <Image
          className="logo"
          //temporary logo placeholder
          src="https://w7.pngwing.com/pngs/309/348/png-transparent-diane-s-365-nutrition-logo-design.png"
          alt="logo"
          width={50}
          borderRadius={8}
        />
      </Link>

      {location.pathname !== "/signup" && location.pathname !== "/login" && (
        <Box ml="auto">
          {isLoggedInSt ? (
            <>
              <Link to="/daily-diary">
                <Button
                  variant="link"
                  colorScheme="teal"
                  color="#292F36"
                  _hover={{ color: "white" }}
                  mr={4}
                >
                  Diary
                </Button>
              </Link>
              <Link to="/profile">
                <Button
                  variant="link"
                  colorScheme="teal"
                  color="#292F36"
                  _hover={{ color: "white" }}
                  mr={4}
                >
                  Profile
                </Button>
              </Link>
              <Button
                variant="link"
                colorScheme="teal"
                color="#292F36"
                _hover={{ color: "white" }}
                onClick={logout}
              >
                Logout
              </Button>
            </>
          ) : (
            <Link to="/login">
              <Button
                variant="link"
                colorScheme="teal"
                color="#292F36"
                _hover={{ color: "white" }}
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
