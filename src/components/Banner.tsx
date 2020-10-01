import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
} from "@chakra-ui/core";

export type BannerProps = {
  status?: "error" | "success" | "warning" | "info";
  title: string;
  message: string;
};

export const Banner: React.FC<BannerProps> = ({ status, title, message }) => {
  return (
    <Alert status={status}>
      <AlertIcon />
      <AlertTitle mr={2}>{title}</AlertTitle>
      <AlertDescription>{message}</AlertDescription>
    </Alert>
  );
};

export default Banner;
