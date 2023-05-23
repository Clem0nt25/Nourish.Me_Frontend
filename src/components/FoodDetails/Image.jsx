import { Image } from "@chakra-ui/react";

function FoodImage({ src, alt }) {
  return (
    <Image
      src={src}
      alt={alt}
      borderRadius="8px"
      boxShadow="lg"
      marginTop="10px"
      objectFit="cover"
      height="auto"
    />
  );
}

export default FoodImage;
