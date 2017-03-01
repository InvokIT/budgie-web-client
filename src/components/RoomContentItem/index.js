import React, { Component } from 'react';
import RoomContentItemDefaultBody from "./RoomContentItemDefaultBody";
import RoomContentItemHtmlBody from "./RoomContentItemHtmlBody";
import RoomContentItemImageBody from "./RoomContentItemImageBody";

const bodyComponents = [RoomContentItemHtmlBody, RoomContentItemImageBody];

const formatContentBody = (body) => {
    const BodyComponent = (bodyComponents.find(bc => bc.canDisplay(body)) || RoomContentItemDefaultBody);

    return <BodyComponent body={body} />;
};

const RoomContentItem = ({avatarUrl, nickname, body}) => {
    const contentElement = formatContentBody(body);

    return (
    <div className="room-content-item">
        <div className="room-content-item__avatar" style={{"background-image":`url(${avatarUrl})`}}>
        </div>
        <div className="room-content-item__nickname"><span>{{nickname}}</span></div>
        <div className="room-content-item__body">{{contentElement}}</div>
    </div>
    );
};


export default RoomContentItem;