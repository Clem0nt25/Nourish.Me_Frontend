import { useState, useContext, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { SessionContext } from "../contexts/SessionContext";
import {
  Box,
  Button,
  Flex,
  Image,
  AspectRatio,
  Link as ChakraLink,
  IconButton,
  useDisclosure,
  Drawer,
  DrawerBody,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useMediaQuery,
} from "@chakra-ui/react";
import {
  RiLogoutBoxLine,
  RiLoginBoxLine,
  RiProfileLine,
  RiBook3Line,
} from "react-icons/ri";
import { HamburgerIcon } from "@chakra-ui/icons";
import LogoImage from "../assets/logo-nav.png";

function Navbar() {
  const location = useLocation();
  const { isLoggedInSt, logout } = useContext(SessionContext);

  const [isLargerThan768] = useMediaQuery("(min-width: 768px)");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef();

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
          {isLargerThan768 ? (
            <>
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
            </>
          ) : (
            <>
              <IconButton
                ref={btnRef}
                colorScheme="teal"
                aria-label="Open Menu"
                size="lg"
                icon={<HamburgerIcon />}
                onClick={onOpen}
                bg={"#FF9400"}
                boxShadow={"md"}
              />

              <Drawer
                isOpen={isOpen}
                placement="right"
                onClose={onClose}
                finalFocusRef={btnRef}
              >
                <DrawerOverlay />
                <DrawerContent bg={"#FFFCF6"}>
                  <DrawerCloseButton />
                  <DrawerBody>
                    {isLoggedInSt ? (
                      <>
                        <Link to="/daily-diary" onClick={onClose}>
                          <Button
                            variant="button-primary"
                            bg="#FF9400"
                            color="white"
                            _hover={{ color: "#292F36", bgColor: "white" }}
                            my={1}
                            w="80%"
                            leftIcon={<RiBook3Line />}
                            mb={4}
                            mt={7}
                          >
                            Diary
                          </Button>
                        </Link>
                        <Link to="/profile" onClick={onClose}>
                          <Button
                            variant="button-primary"
                            bg="#FF9400"
                            color="white"
                            _hover={{ color: "#292F36", bgColor: "white" }}
                            my={1}
                            w="80%"
                            leftIcon={<RiProfileLine />}
                            mb={4}
                          >
                            Profile
                          </Button>
                        </Link>
                        <Button
                          variant="button-primary"
                          bg="#FF9400"
                          color="white"
                          _hover={{ color: "#292F36", bgColor: "white" }}
                          my={1}
                          w="80%"
                          onClick={() => {
                            logout();
                            onClose();
                          }}
                          leftIcon={<RiLogoutBoxLine />}
                        >
                          Logout
                        </Button>
                      </>
                    ) : (
                      <Link to="/login" onClick={onClose}>
                        <Button
                          variant="button-primary"
                          bg="#FF9400"
                          color="white"
                          _hover={{ color: "#292F36", bgColor: "white" }}
                          my={1}
                          w="80%"
                          leftIcon={<RiLoginBoxLine />}
                        >
                          Login
                        </Button>
                      </Link>
                    )}
                  </DrawerBody>
                </DrawerContent>
              </Drawer>
            </>
          )}
        </Box>
      )}
    </Flex>
  );
}

export default Navbar;
