import styled from "styled-components";

const TimerWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const TimeText = styled.div`
  font-size: 1.9rem;
  font-weight: 600;
  color: #276749;
  margin-bottom: 18px;
  user-select: none;
`;

const ProgressBarBackground = styled.div`
  width: 100%;
  max-width: 90%;
  height: 24px;
  background: #c6f6d5;
  border-radius: 6px;
  overflow: hidden;
  box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.1);
`;

const ProgressBarFiller = styled.div<{ progress: number }>`
  height: 100%;
  background: #48bb78;
  border-radius: 6px 0 0 6px;
  transition: width 0.4s ease;
  width: ${({ progress }) => progress}%;
`;

interface Props {
  timeLeft: number;
  totalTime: number;
}

const Timer = ({ timeLeft, totalTime }: Props) => {
  const progressPercent = (timeLeft / totalTime) * 100;

  return (
    <TimerWrapper>
      <TimeText>{timeLeft}s</TimeText>
      <ProgressBarBackground>
        <ProgressBarFiller progress={progressPercent} />
      </ProgressBarBackground>
    </TimerWrapper>
  );
};

export default Timer;
