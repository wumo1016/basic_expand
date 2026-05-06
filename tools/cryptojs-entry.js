import * as CryptoJSImport from "crypto-js";

// crypto-js is CommonJS; keep interop robust across bundlers/runtimes
const CryptoJS = CryptoJSImport.default ?? CryptoJSImport;

export default CryptoJS;
export { CryptoJS };

