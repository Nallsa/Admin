import type { PayloadAction } from '@reduxjs/toolkit'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import { useNavigate } from 'react-router'
import { Iui } from '../../dto/ui.dto'

const redirect = createAsyncThunk(
  //action type string
  'ui/redirect',
  // callback function
  async thunkAPI => {
    const navigate = useNavigate()
    navigate('/auth')
  }
)

const initialState: Iui = {
  sidebarState: false,
  sidebarWidth: 280,
  borderRadius: 12,
  activeMenuItem: '',
}

export const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setSidebar: (state, action: PayloadAction<boolean>): void => {
      state.sidebarState = action.payload
    },
    setActiveMenuItem: (state, action: PayloadAction<string>): void => {
      state.activeMenuItem = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const uiActions = { ...uiSlice.actions, redirect }

export default uiSlice.reducer
