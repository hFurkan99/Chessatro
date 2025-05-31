import styled from "styled-components";

const Badge = styled.div`
  color: #000000ca;
  font-weight: 700;
  font-size: 5rem;
  display: flex;
  align-items: center;
  justify-content: center;
`;

interface Props {
  score: number;
}

const ScoreBadge = ({ score }: Props) => {
  return <Badge>{score}</Badge>;
};

export default ScoreBadge;
