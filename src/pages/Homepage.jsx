import { Link, Navigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { SessionContext } from "../contexts/SessionContext";
import { VStack, Button, Flex, chakra, useMediaQuery } from "@chakra-ui/react";
import { motion, useAnimation } from "framer-motion";
import indexImage from "../assets/index.jpg";
import indexImageLarge from "../assets/large-bg.jpg";

const MotionBox = motion(chakra.div);

function Homepage() {
  const { isLoggedInSt } = useContext(SessionContext);
  const controls = useAnimation();
  const [colorIndex, setColorIndex] = useState(0);
  const [isIncrementing, setIsIncrementing] = useState(true);

  const [isLargerThan1024] = useMediaQuery("(min-width: 1024px)");

  const bgImageUrl = isLargerThan1024 ? indexImageLarge : indexImage;

  const colors = [
    "#98fb98",
    "#a2fba2",
    "#adfcad",
    "#b7fcb7",
    "#c1fdc1",
    "#ccfdcc",
    "#d6fdd6",
    "#e0fee0",
  ];

  useEffect(() => {
    const animateText = async () => {
      await controls.start({
        opacity: [0, 1],
        transition: { duration: 2 },
      });
    };
    animateText();
  }, [controls]);

  useEffect(() => {
    const colorInterval = setInterval(() => {
      if (isIncrementing) {
        if (colorIndex < colors.length - 1) {
          setColorIndex(colorIndex + 1);
        } else {
          setIsIncrementing(false);
        }
      } else {
        if (colorIndex > 0) {
          setColorIndex(colorIndex - 1);
        } else {
          setIsIncrementing(true);
        }
      }
    }, 200);

    return () => clearInterval(colorInterval);
  }, [colorIndex, isIncrementing]);

  if (isLoggedInSt) {
    return <Navigate to="/daily-diary" />;
  }

  return (
    <Flex
      direction="column"
      align="center"
      justify="center"
      minHeight="95vh"
      backgroundImage={`url(${bgImageUrl})`}
      backgroundSize="cover"
      backgroundPosition="center"
    >
      <VStack
        spacing={4}
        p={[2, 4, 6]}
        minHeight="160px"
        borderRadius="md"
        textAlign="center"
      >
        <MotionBox
          as="h1"
          fontSize="5xl"
          mb={2}
          mt={-4}
          fontWeight="extrabold"
          letterSpacing={2}
          textShadow="1px 1px 4px rgba(0, 0, 0, 0.2)"
          bg="linear-gradient(to right, #FF9400, #FFD700)"
          borderRadius={8}
          backdropFilter="blur(8px) saturate(120%)"
          display="inline-block"
          py={2}
          px={4}
          initial={{ opacity: 0, y: -20 }}
          animate={controls}
          color={"white"}
        >
          Nourish<span style={{ color: colors[colorIndex] }}>.Me</span>
        </MotionBox>

        <Link to="/signup">
          <Button
            variant="button-primary"
            bg="linear-gradient(to right, #FF9400, #FFD700)"
            color={"white"}
            letterSpacing={1}
            fontWeight={700}
            fontSize="xl"
            size="lg"
            _hover={{
              transform: "scale(1.05)",
              color: "white",
            }}
            transition="transform 0.3s ease"
            mt={6}
          >
            Join Today
          </Button>
        </Link>
      </VStack>
    </Flex>
  );
}

export default Homepage;
