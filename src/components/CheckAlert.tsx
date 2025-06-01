// src/components/CheckAlert.tsx
import styled, { keyframes } from "styled-components";

const pulse = keyframes`
    0% { transform: translateX(-50%) scale(1); opacity: 0.8; }
    50% { transform: translateX(-50%) scale(1.2); opacity: 1; }
    100% { transform: translateX(-50%) scale(1); opacity: 0.8; }
`;

const AlertWrapper = styled.div`
  position: absolute;
  top: 16px;
  left: 50%;
  background: #7a1e1e;
  color: #ececec;
  font-weight: bold;
  font-size: 1.2rem;
  padding: 12px 24px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  animation: ${pulse} 1.2s infinite;
  z-index: 999;
`;

interface Props {
  playerName: string;
}

const CheckAlert = ({ playerName }: Props) => {
  return <AlertWrapper>⚠️ {playerName}'s king is in check!</AlertWrapper>;
};

export default CheckAlert;
