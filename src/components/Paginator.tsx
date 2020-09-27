import {
  Button,
  ButtonGroup,
  ButtonGroupProps,
  ButtonProps,
} from "@chakra-ui/core";
import React from "react";

export type PageType = {
  currentPage: number;
  maxPage: number;
};
type Paginator = ButtonGroupProps & {
  page: PageType;
  setPage: React.Dispatch<React.SetStateAction<PageType>>;
};

export const Paginator: React.FC<Paginator> = ({
  page: { currentPage, maxPage },
  setPage,
  ...props
}) => {
  const hiddenProps = { opacity: 0, zIndex: -1 };
  let rightProps,
    leftProps = {};
  if (currentPage === maxPage) {
    rightProps = hiddenProps;
  }
  if (currentPage === 1) {
    leftProps = hiddenProps;
  }
  const onClickHandler = (type: number) => {
    return (event: React.MouseEvent<ButtonProps, MouseEvent>) => {
      let toPage: number = 1;
      switch (type) {
        case 0:
          toPage = 1;
          break;
        case 1:
          toPage = currentPage - 1;
          break;
        case 2:
          toPage = currentPage + 1;
          break;
        case 3:
          toPage = maxPage;
          break;
      }
      setPage((val) => {
        console.log(val);
        return { ...val, currentPage: toPage };
      });
    };
  };

  return (
    <ButtonGroup {...props}>
      <Button onClick={onClickHandler(0)} {...leftProps}>
        {"<<"}
      </Button>
      <Button onClick={onClickHandler(1)} {...leftProps}>
        {" "}
        {"<"}
      </Button>
      <Button>{currentPage}</Button>
      <Button onClick={onClickHandler(2)} {...rightProps}>
        {">"}
      </Button>
      <Button onClick={onClickHandler(3)} {...rightProps}>
        {">>"}
      </Button>
    </ButtonGroup>
  );
};
