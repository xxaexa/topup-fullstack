import { createSlice } from '@reduxjs/toolkit'

type ThemeState = {
  mode: 'light' | 'dark'
}

const initialState: ThemeState = {
  mode: localStorage.getItem('theme') === 'dark' ? 'dark' : 'light',
}

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    toggleTheme: (state) => {
      state.mode = state.mode === 'light' ? 'dark' : 'light'
      localStorage.setItem('theme', state.mode)
      document.documentElement.classList.toggle('dark', state.mode === 'dark')
    },
  },
})

export const { toggleTheme } = themeSlice.actions
export default themeSlice.reducer
