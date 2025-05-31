import styled from "styled-components";

const StyledName = styled.h3`
  font-size: 1.8rem;
  font-weight: 700;
  color: #2d3748;
  display: flex;
  align-items: center;
  justify-content: center;
`;

interface Props {
  name: string;
}

const PlayerName = ({ name }: Props) => {
  return <StyledName>{name}</StyledName>;
};

export default PlayerName;
