import styled from 'styled-components';
import {Layout} from "antd";
import Header from "../components/Header";

const Title = styled.h1`
  color: #333;
  margin-top: 2rem;
`;

function Home() {
    return (
        <Layout>
            <Title>Welcome to our Home Page</Title>
            <p>This is a basic example using React Router and Styled Components.</p>
            <Header/>
        </Layout>
    );
}

export default Home;