export {};

declare global {
  interface Window {
    __webpack_nonce__: string; // whatever type you want to give. (any,number,float etc)
  }
}
