import { createSlice } from '@reduxjs/toolkit'

const session = createSlice({
  name: 'jwt',
  initialState: {
    value: '',
  },
  reducers: {
    incremented: (state, action) => {
      state.value = action.payload.jwt
    },
  },
})

export const { incremented } = session.actions
export default session.reducer
