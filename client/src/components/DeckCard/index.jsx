import React from 'react';
import { Link } from 'react-router-dom';

const linkStyle = {
    color: '#875053'
};

const DeckCard = ({ id, name, subject, tags, likes, image}) => {
    return (
        <div className='deck-card'>
            <h3><Link to={`/decks/${id}`} style={linkStyle}>{name}</Link></h3>
            <p>Subject: {subject}</p>
            <p>Tags: {tags.join(', ')}</p>
            <p>Likes: {likes}</p>
            {image && <img src={image} alt={name} />}
        </div>
    )
};

export default DeckCard;
