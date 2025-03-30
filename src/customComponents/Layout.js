import styled from 'styled-components';
// import Navbar from './Navbar';

const Container = styled.div`
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 20px;
`;

const Layout = ({ children }) => {
    return (
        <>
            {/*<Navbar />*/}
            <Container>{children}</Container>
        </>
    );
};

export default Layout;