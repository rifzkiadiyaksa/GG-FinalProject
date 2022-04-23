import React, { useState } from 'react';

interface IProps {
  url: string;
  title: string;
  artist: string;
  select: boolean;
  toggle: () => void;
}

const Track: React.FC<IProps> = ({ url, title, artist, select, toggle }) => {
  const [isSelected, setIsSelected] = useState<boolean>(select);

  const handleSelect: () => void = () => {
    setIsSelected(!isSelected);
    toggle();
  };

  return (
    <div className="card-tracks">
      <img src={url} alt="Track Playlist" aria-label="image-track" />
      <div className="card-information">
        <h4 aria-label="title-track">{title}</h4>
        <p aria-label="artist-track">{artist}</p>
      </div>
      <button
        aria-label="button-track"
        className={`btn btn-select ${
          isSelected ? 'btn-one' : 'btn-second'
        }`}
        onClick={handleSelect}
      >
        {isSelected ? 'Deselect' : 'Select'}
      </button>
    </div>
  );
};

export default Track;
