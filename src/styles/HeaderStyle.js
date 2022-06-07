import styled from 'styled-components';

export const HeaderWrapper = styled.header`
  position: sticky;
  top: 0;
  color: white;
  background-color: black;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 50px;
  z-index: 1;
  .logo {
    height: 100%;
    img {
      height: 100%;
    }
  }
  .navigation {
    a {
      color: white;
      text-decoration: none;
      cursor: pointer;
      margin: 0px 10px;
    }
    a:first-child {
      margin-left: 0px;
    }
  }
`;
