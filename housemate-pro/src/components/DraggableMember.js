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
            <div>
                <img
                    src={member.imgSrc}
                    alt={member.name}
                    style={memberStyle}
                />
            </div>
        </Draggable>
    );
};

export default DraggableMember;