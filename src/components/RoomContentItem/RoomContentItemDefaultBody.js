import React, { Component } from 'react';

const RoomContentItemDefaultBody = ({body}) => (
    <span className="room-content-item__body__default">{{body}}</span>
);

RoomContentItemDefaultBody.propTypes = {
    body: React.PropTypes.string.isRequired
};

export default RoomContentItemDefaultBody;