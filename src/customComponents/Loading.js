import React from 'react';
import {Spin} from "antd";

function Loading({loading}) {
    if (loading) {
        return (
            <Spin spinning fullscreen/>
        )
    }
}

export default Loading;