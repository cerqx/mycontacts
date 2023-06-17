import styled from "styled-components";

export const EmptyListContainer = styled.div`
  margin-top: 16px;
  display: flex;
  flex-direction: column;
  align-items: center;

  p {
    font-size: 16px;
    text-align: center;
    margin-top: 8px;
    color: ${({ theme }) => theme.colors.gray[200]};
  }

  strong {
    color: ${({ theme }) => theme.colors.primary.main};
  }
`;
