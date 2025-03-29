import React from 'react';
import {Input} from "antd";
import {useSearch} from "../customComponents/customHooks";
import {transactionSearch} from "../Services/apiCall";
import styled from "styled-components";

const {Search} = Input;

const SearchContainer = styled.div`
    margin: 2rem auto;
    max-width: 1000px;
`

// Styled component for the sticky note card
const StickyNoteCard = styled.div`
    width: 200px; /* Square aspect ratio */
    height: 200px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    padding: 16px;
    margin: 16px;
    border-radius: 10px;
    background-color: ${(props) => (props.type === "DEBIT" ? "#ffe6e6" : "#e6ffe6")};
    box-shadow: 5px 5px 15px rgba(0, 0, 0, 0.2); /* Soft shadow for depth */
    transform: rotate(-3deg); /* Slight rotation for sticky note effect */
    border: 1px solid #e1e1a8; /* Light border for definition */
`;

const NoteHeader = styled.div`
    font-size: 18px;
    font-weight: bold;
    color: #333;
    text-align: center;
`;

const NoteBody = styled.div`
    font-size: 16px;
    color: #555;
    text-align: center;
`;

const NoteFooter = styled.div`
    font-size: 14px;
    color: #777;
    text-align: center;
`;

const StickyNote = ({data}) => {
    return (
        <StickyNoteCard type={data.type}>
            <NoteHeader>{data.description}</NoteHeader>
            <NoteBody>Amount: ₹{Math.abs(data.amount)}</NoteBody>
            <NoteFooter>{new Date(data.createdAt).toLocaleDateString("en-US")}</NoteFooter>
        </StickyNoteCard>
    );
};

const StickyNoteGrid = styled.div`
    display: flex;
    flex-wrap: wrap; /* Arrange cards in a grid-like pattern */
    gap: 16px;
    justify-content: center;
    padding: 16px;
`;

function TransactionSearch() {
    const {
        setSearchText, // Expose setter for searchText
        fetchSearch,   // Expose the API call function
        results,
        isLoading,
        error,
    } = useSearch(transactionSearch);
    return (
        <SearchContainer>
            <Search
                placeholder="input search text"
                allowClear
                enterButton="Search"
                size="large"
                onSearch={fetchSearch}
            />

            <StickyNoteGrid>
                {results.map(({_id, ...data}) => (
                    <StickyNote key={_id} data={data}/>
                ))}
            </StickyNoteGrid>
        </SearchContainer>
    )

}

export default TransactionSearch;