import styled from 'styled-components';

const Title = styled.h1`
  color: #333;
  margin-top: 2rem;
`;

function Home() {
    return (
        <div>
            <Title>Welcome to our Home Page</Title>
            <p>This is a basic example using React Router and Styled Components.</p>
        </div>
    );
}

export default Home;