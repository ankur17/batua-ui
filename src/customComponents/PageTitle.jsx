import React from 'react';
import {Typography} from "antd";

const {Title} = Typography;

const PageTitle = ({title, defaultTitle}) => (
    <Title level={2} style={{textAlign: 'center', marginBottom: '2rem'}}>
        {title || defaultTitle}
    </Title>
);


export default PageTitle;