import React, { Component } from 'react';

const RoomContentItemImageBody = ({body}) => {
    const imageUrl = body;

    return (
        <div className="room-content-item__body__image" style={{backgroundImage:`url(${imageUrl})`}}></div>
    );
};

RoomContentItemImageBody.canDisplay = (body) => /^data:image\/]/.test(body);

RoomContentItemImageBody.propTypes = {
    body: React.PropTypes.string.isRequired
};

export default RoomContentItemImageBody;