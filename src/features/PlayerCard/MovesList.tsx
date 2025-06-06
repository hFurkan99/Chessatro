import styled, { css } from "styled-components";
import { keyframes } from "styled-components";

const glow = keyframes`
  0% {
    box-shadow: 0 0 5px 2px rgba(72, 187, 120, 0.6);
  }
  50% {
    box-shadow: 0 0 10px 4px rgba(72, 187, 120, 1);
  }
  100% {
    box-shadow: 0 0 5px 2px rgba(72, 187, 120, 0.6);
  }
`;

const MovesContainer = styled.div`
  text-align: left;
  overflow-y: scroll;
  padding: 8px;
  border-radius: 4px;
  background-color: #05041d;
  max-height: 45rem;
  padding-right: 16px;

  /* Scrollbar stilleri (Webkit) */
  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-track {
    background: #e0e0fb; /* scroll bar arkası */
    border-radius: 4px;
  }

  &::-webkit-scrollbar-thumb {
    background: #d7d9e2; /* scroll bar kendisi */
    border-radius: 4px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: #6b73a9; /* hover olunca */
  }

  /* Firefox (scrollbar-color ve scrollbar-width) */
  scrollbar-width: thin;
  scrollbar-color: #05041d #05041d;
`;

const MovesListStyled = styled.ol`
  margin: 0;
  padding-left: 20px;
  font-size: 0.9rem;
  color: #333;
  user-select: none;
`;

interface MoveItemProps {
  highlight?: boolean;
}

const MoveItem = styled.div.withConfig({
  shouldForwardProp: (prop) => prop !== "highlight",
})<MoveItemProps>`
  background: #080850; /* koyu mavi/menekşe */
  color: #f0f0f5; /* açık renk */
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  font-size: 1rem;
  padding: 10px 15px;
  margin-bottom: 8px;
  border-radius: 8px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.4);
  transition: background 0.3s ease, box-shadow 0.6s ease;
  text-align: center;

  ${({ highlight }) =>
    highlight &&
    css`
      background: #48bb78; /* yeşil ton */
      color: #01150a; /* koyu metin için */
      font-weight: 600;
      box-shadow: 0 0 8px 2px rgba(72, 187, 120, 0.8);
      animation: ${glow} 1.5s infinite alternate;
    `}
  &:hover {
    color: #f0f0f5; /* metin rengi */
  }
`;

interface Props {
  moves: string[];
}

const MovesList = ({ moves }: Props) => {
  return (
    <MovesContainer>
      <MovesListStyled>
        {moves
          .slice()
          .reverse()
          .map((move, index) => (
            <MoveItem key={index} highlight={move.includes("pts")}>
              {move}
            </MoveItem>
          ))}
      </MovesListStyled>
    </MovesContainer>
  );
};

export default MovesList;
