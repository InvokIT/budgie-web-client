import React, { Component } from 'react';
import { decode as utf8Decode } from "utf8";
import { decode as b64Decode } from "base-64";

const formatBody = (body) => {
    let [, base64, content] = /^data:text\/html(;base64)?,(.*)$/.exec(body);

    if (base64) {
        content = utf8Decode(b64Decode(content));
    } else {
        content = decodeURIComponent(content);
    }

    return content;
};

const RoomContentItemHtmlBody = ({body}) => {
    const formattedBody = formatBody(body);

    return (
    <span className="room-content-item__body__html" dangerouslySetInnerHTML={{__html:formattedBody}}></span>
    );
};

RoomContentItemHtmlBody.canDisplay = (body) => /^data:text\/html/.test(body);

RoomContentItemHtmlBody.propTypes = {
    body: React.PropTypes.string.isRequired
};

export default RoomContentItemHtmlBody;