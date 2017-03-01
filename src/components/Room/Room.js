import React, { Component } from 'react';

const Room = ({title, content}) => (
    <div className="room">
        <RoomContent content={content} />
    </div>
);


export default Room;