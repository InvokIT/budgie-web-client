import React, { Component } from 'react';
import { decode as utf8Decode } from "utf8";
import { decode as b64Decode } from "base-64";

const parseBody = (body) => {
    let [, base64, content] = /^data:application\/json(;base64)?,(.*)$/.exec(body);

    if (base64) {
        content = utf8Decode(b64Decode(content));
    } else {
        content = decodeURIComponent(content);
    }

    return undefined; // TODO
};

const formatBody = (body) => {
    let [, base64, content] = /^data:text\/html(;base64)?,(.*)$/.exec(body);

    if (base64) {
        content = utf8Decode(b64Decode(content));
    } else {
        content = decodeURIComponent(content);
    }

    return content;
};

const RoomContentItemJsonBody = ({body}) => {
    const formattedBody = formatBody(body);
    const parsedBody = parseBody(body);

    return (
    <span className="room-content-item__body__json"></span>
    );
};

RoomContentItemJsonBody.canDisplay = (body) => /^data:application\/json/.test(body);

RoomContentItemJsonBody.propTypes = {
    body: React.PropTypes.string.isRequired
};

export default RoomContentItemJsonBody;