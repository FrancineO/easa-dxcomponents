/* eslint-disable import/prefer-default-export */
export const suggestionsHandler = (accepted: boolean, pConn: any, setStatus: any) => {
  if (accepted) {
    pConn.acceptSuggestion();
    setStatus('success');
  } else {
    pConn.ignoreSuggestion();
    setStatus(undefined);
  }
};
