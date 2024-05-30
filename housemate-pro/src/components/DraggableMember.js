import React from 'react';
import Draggable from 'react-draggable';

const memberStyle = {
    width: '100px',
    height: '100px',
    borderRadius: '50%',
    cursor: 'pointer',
};

const DraggableMember = ({ member , onStart, onStop}) => {
    
    return (
        <Draggable onStart={onStart} onStop={onStop}>
                <img
                    src={member.imgSrc}
                    alt={member.name}
                    style={memberStyle}
                />

        </Draggable>
    );
};

export default DraggableMember;