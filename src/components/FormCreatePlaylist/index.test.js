import React from 'react';
import { render, screen, cleanup } from '@testing-library/react';
import store from '../../redux/store';
import { Provider } from 'react-redux';
import FormCreatePlaylist from './index';
import userEvent from '@testing-library/user-event';

const setup = () =>
  render(
    <Provider store={store}>
      <FormCreatePlaylist />
    </Provider>
  );

describe('Form Create Playlist should be render', () => {
  beforeEach(setup);
  afterEach(cleanup);

  it('Success render Create Playlist Form', () => {
    expect(screen.getByText(/create playlist/i)).toBeInTheDocument();
    expect(screen.getByLabelText('input-title')).toBeInTheDocument();
    expect(screen.getByLabelText('input-description')).toBeInTheDocument();
    expect(screen.getByText('Create')).toBeInTheDocument();
  });

  it('Type in form Create Playlist', () => {
    const titleInput = screen.getByLabelText('input-title');
    const descriptionInput = screen.getByLabelText('input-description');

    userEvent.type(titleInput, 'Title Playlist');
    userEvent.type(descriptionInput, 'Playlist Description');

    expect(titleInput).toHaveValue('Title Playlist');
    expect(descriptionInput).toHaveValue('Playlist Description');
  });
});
