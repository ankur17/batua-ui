import {Segmented} from "antd";
import {PAGE_STATE} from "../Services/constants";
import styled from "styled-components";
const optionNames = Object.keys(PAGE_STATE)

const Container = styled.div`
    display: flex;
    justify-content: center;
`;

function PageToggle({setPageState}) {
    return (
        <Container>
            <Segmented
                itemactivebg={"red"}
                options={optionNames}
                onChange={value => setPageState(value)}
            />
        </Container>
    )

}

export default PageToggle;