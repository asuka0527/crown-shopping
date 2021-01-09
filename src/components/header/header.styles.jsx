import styled from "styled-components";
import { Link } from "react-router-dom";

export const HeaderContainer = styled.div`
  height: 70px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin-bottom: 25px;
`;

// For Link components
export const LogoContainer = styled(Link)`
  height: 100%;
  width: 70px;
  padding: 25px;
`;

// for html components : div, a, img, button
export const OptionsContainer = styled.div`
  width: 50%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

// using {css} - allows us to write a block is css that can be shared into styled components like below

// OPTION 1
// const OptionContainerStyles = css`
//   padding: 10px 15px;
//   cursor: pointer;
// `;

// export const OptionLink = styled(Link)`
//   ${OptionContainerStyles}
// `;

// export const OptionDiv = styled.div`
//   ${OptionContainerStyles}
// `;

// OPTION 2

export const OptionLink = styled(Link)`
  padding: 10px 15px;
  cursor: pointer;
`;
