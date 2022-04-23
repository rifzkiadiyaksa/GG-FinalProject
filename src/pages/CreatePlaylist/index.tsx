import React, { useEffect, useState } from 'react';
import Track from '../../components/Track';
import SearchBar from '../../components/SearchBar';
import FormCreatePlaylist from '../../components/FormCreatePlaylist';
import NavigationBar from '../../components/NavigationBar';
import { Track as ITrack } from '../../types/spotify';

const CreatePlaylist: React.FC = () => {
  const [tracks, setTracks] = useState<ITrack[]>([]);
  const [selectedTrackURI, setSelectedTrackURI] = useState<string[]>([]);
  const [selectedTracks, setSelectedTracks] = useState<ITrack[]>([]);
  const [isSearch, setIsSearch] = useState<boolean>(false);

  useEffect(() => {
    if (!isSearch) {
      const selectedTracks: ITrack[] = filterSelectedTracks();

      setTracks(selectedTracks);
    }
  }, [selectedTrackURI]);

  const filterSelectedTracks: () => ITrack[] = () =>
    tracks.filter((track) => selectedTrackURI.includes(track.uri));

  const handleSuccessSearch: (searchTracks: ITrack[]) => void = (
    searchTracks
  ) => {
    setIsSearch(true);

    const selectedSearchTracks = searchTracks.filter((data: any) =>
      selectedTrackURI.includes(data.uri)
    );

    setTracks([...new Set([...selectedSearchTracks, ...searchTracks])]);
  };

  const clearSearch: () => void = () => {
    setTracks(selectedTracks);
    setIsSearch(false);
  };

  const toggleSelect: (track: ITrack) => void = (track) => {
    const { uri } = track;

    if (selectedTrackURI.includes(uri)) {
      setSelectedTrackURI(
        selectedTrackURI.filter((item: string) => item !== uri)
      );
      setSelectedTracks(
        selectedTracks.filter((item: ITrack) => item.uri !== uri)
      );
    } else {
      setSelectedTrackURI([...selectedTrackURI, uri]);
      setSelectedTracks([...selectedTracks, track]);
    }
  };

  return (
    <>
      <NavigationBar />
      <FormCreatePlaylist uris={selectedTrackURI} />

      <hr />
      <SearchBar
        onSuccess={(tracks) => handleSuccessSearch(tracks)}
        onClearSearch={clearSearch}
      />

      {tracks.length === 0 && <p>No tracks</p>}

      <div className="track-list">
        {tracks.map((track) => (
          <Track
            key={track.id}
            url={track.album.images[0].url}
            title={track.name}
            artist={track.artists[0].name}
            select={selectedTrackURI.includes(track.uri)}
            toggle={() => toggleSelect(track)}
          />
        ))}
      </div>
    </>
  );
};

export default CreatePlaylist;