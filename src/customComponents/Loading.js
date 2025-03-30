import React from 'react';
import {Spin} from "antd";

function Loading({loading}) {
    console.log("loading", loading);
    if (loading) {
        return (
            <Spin spinning fullscreen/>
        )
    }
}

export default Loading;