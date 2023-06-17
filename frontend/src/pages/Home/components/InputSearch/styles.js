import styled from "styled-components";

export const InputSearchContainer = styled.div`
  width: 100%;

  input {
    height: 50px;
    width: 100%;
    background: #fff;
    border-radius: 25px;
    border: none;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.04);
    outline: 0;
    padding: 0 16px;

    &::placeholder {
      color: #bcbcbc;
    }
  }
`;
