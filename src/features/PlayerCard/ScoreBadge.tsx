import styled from "styled-components";

const Badge = styled.div`
  color: #ffffff;
  font-weight: 700;
  font-size: 6rem;
  display: flex;
  justify-content: center;
`;

interface Props {
  score: number;
}

const ScoreBadge = ({ score }: Props) => {
  return <Badge>{score}</Badge>;
};

export default ScoreBadge;
