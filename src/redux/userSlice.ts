import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  id: '',
  email: '',
  username: '',
  full_name: '',
  avatar_url: '',
  steps: 0,
};

const userSlice = createSlice({
  name: 'user',
  initialState: initialState,
  reducers: {
    setUser: (state, { payload }) => {
      console.log(payload);

      return {
        id: payload.id,
        email: payload.email,
        username: payload.user_metadata.username,
        full_name: payload.user_metadata.full_name,
        avatar_url: payload.user_metadata.avatar_url,
        steps: payload.user_metadata.steps || 0,
      };
    },
  },
});

export const { setUser } = userSlice.actions;

export default userSlice.reducer;
