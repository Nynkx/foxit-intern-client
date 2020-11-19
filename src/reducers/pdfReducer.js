import { pdfConstants } from "../constants";

const initialState = {
  pdfLoaded: false,
  controlsLoaded: false,
};

export const pdfReducer = (state = initialState, action) => {
  switch (action.type) {
    case pdfConstants.PDF_LOAD_SUCCESS:
      return { pdfLoaded: true };
    default:
      return state;
  }
};
