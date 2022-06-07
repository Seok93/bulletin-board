import styled from 'styled-components';

export const RegisterWrapper = styled.section`
  width: 300px;
  margin: 0 auto;
  form {
    display: flex;
    flex-direction: column;
    padding: 30px;
    border: 1px solid #c6c6c6;
    border-radius: 15px;
    h1 {
      font-size: 1.5rem;
      line-height: 1.75rem;
      font-weight: bold;
    }
    h1,
    label,
    input,
    button {
      background-color: inherit;
      margin-bottom: 0.5rem;
    }
    input {
      border: 1px solid #c6c6c6;
      border-radius: 10px;
      padding: 5px 10px;
      &:focus,
      &:active {
        outline-color: #bdf2d5;
      }
    }
    button {
      border: 1px solid #c6c6c6;
      border-radius: 10px;
      padding: 5px 0px;
      font-weight: 700;
      cursor: pointer;
      &:hover,
      &:active {
        color: white;
        background-color: black;
        border-color: black;
      }
      &:disabled,
      &[disabled] {
        color: gray;
        background-color: #c6c6c6;
      }
    }
    span {
      font-size: 0.75rem;
      margin-bottom: 10px;
      font-weight: bold;
    }
    .warning {
      color: red;
    }
    .success {
      color: #87d289;
    }
  }
`;
