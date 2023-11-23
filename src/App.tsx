import styled from "styled-components";
import BoardBox from "./components/BoardBox";
import InputBox from "./components/InputBox";

const App = () => {
  return (
    <Wrapper>
      <InputBox />
      <BoardBox />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100vw;
  margin: 0 auto;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

export default App;
