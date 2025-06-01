import { createSlice } from "@reduxjs/toolkit";

interface TutorialPopupState {
  hasSeenTutorial: boolean;
}

const initialState: TutorialPopupState = {
  hasSeenTutorial: false,
};

const tutorialPopupSlice = createSlice({
  name: "tutorialPopup",
  initialState,
  reducers: {
    markTutorialAsSeen: (state) => {
      state.hasSeenTutorial = true;
    },
  },
});

export const { markTutorialAsSeen } = tutorialPopupSlice.actions;
export default tutorialPopupSlice.reducer;