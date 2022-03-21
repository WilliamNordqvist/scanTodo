import React, { useEffect, useState } from "react";
import { TIcon } from "./iconType";
import { Star, StarBorder } from "@mui/icons-material";
import styled from "styled-components";

export const StarIcon: React.VFC<TIcon & { intVal?: boolean }> = ({
  intVal = false,
  onClick,
}) => {
  const [filled, toggle] = useState(intVal);
  const Wrapper = styled.div`
    cursor: pointer;
    svg {
      fill: ${({ theme }) => theme.color.starIcon};
      font-size: 25px;
    }
  `;

  const onStarClick = () => {
    toggle(!filled);
    onClick();
  };

  useEffect(() => {
    toggle(intVal);
  }, [intVal]);

  return (
    <Wrapper onClick={onStarClick}>
      {filled ? <Star /> : <StarBorder />}
    </Wrapper>
  );
};
