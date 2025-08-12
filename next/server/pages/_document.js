"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(() => {
var exports = {};
exports.id = "pages/_document";
exports.ids = ["pages/_document"];
exports.modules = {

/***/ "(pages-dir-node)/./src/pages/_document.tsx":
/*!*********************************!*\
  !*** ./src/pages/_document.tsx ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ CustomDocument)\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"react/jsx-dev-runtime\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_document__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/document */ \"(pages-dir-node)/./node_modules/next/document.js\");\n/* harmony import */ var next_document__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(next_document__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _utils_gtag__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/utils/gtag */ \"(pages-dir-node)/./src/utils/gtag.ts\");\n\n\n\nclass CustomDocument extends (next_document__WEBPACK_IMPORTED_MODULE_1___default()) {\n    static async getInitialProps(ctx) {\n        const initialProps = await next_document__WEBPACK_IMPORTED_MODULE_1___default().getInitialProps(ctx);\n        // Check if in production\n        const isProduction = \"development\" === \"production\";\n        return {\n            ...initialProps,\n            isProduction\n        };\n    }\n    render() {\n        const { isProduction } = this.props;\n        return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(next_document__WEBPACK_IMPORTED_MODULE_1__.Html, {\n            lang: \"en\",\n            children: [\n                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(next_document__WEBPACK_IMPORTED_MODULE_1__.Head, {\n                    children: isProduction && /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {\n                        children: [\n                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"script\", {\n                                async: true,\n                                src: `https://www.googletagmanager.com/gtag/js?id=${_utils_gtag__WEBPACK_IMPORTED_MODULE_2__.GA_TRACKING_ID}`\n                            }, void 0, false, {\n                                fileName: \"/Users/nitinsingh/Downloads/perfume-ecom/src/pages/_document.tsx\",\n                                lineNumber: 33,\n                                columnNumber: 15\n                            }, this),\n                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"script\", {\n                                dangerouslySetInnerHTML: {\n                                    __html: `\n                    window.dataLayer = window.dataLayer || [];\n                    function gtag(){dataLayer.push(arguments);}\n                    gtag('js', new Date());\n\n                    gtag('config', '${_utils_gtag__WEBPACK_IMPORTED_MODULE_2__.GA_TRACKING_ID}', {\n                      page_path: window.location.pathname,\n                    });\n                  `\n                                }\n                            }, void 0, false, {\n                                fileName: \"/Users/nitinsingh/Downloads/perfume-ecom/src/pages/_document.tsx\",\n                                lineNumber: 37,\n                                columnNumber: 15\n                            }, this)\n                        ]\n                    }, void 0, true)\n                }, void 0, false, {\n                    fileName: \"/Users/nitinsingh/Downloads/perfume-ecom/src/pages/_document.tsx\",\n                    lineNumber: 28,\n                    columnNumber: 9\n                }, this),\n                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"body\", {\n                    children: [\n                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(next_document__WEBPACK_IMPORTED_MODULE_1__.Main, {}, void 0, false, {\n                            fileName: \"/Users/nitinsingh/Downloads/perfume-ecom/src/pages/_document.tsx\",\n                            lineNumber: 54,\n                            columnNumber: 11\n                        }, this),\n                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(next_document__WEBPACK_IMPORTED_MODULE_1__.NextScript, {}, void 0, false, {\n                            fileName: \"/Users/nitinsingh/Downloads/perfume-ecom/src/pages/_document.tsx\",\n                            lineNumber: 55,\n                            columnNumber: 11\n                        }, this)\n                    ]\n                }, void 0, true, {\n                    fileName: \"/Users/nitinsingh/Downloads/perfume-ecom/src/pages/_document.tsx\",\n                    lineNumber: 53,\n                    columnNumber: 9\n                }, this)\n            ]\n        }, void 0, true, {\n            fileName: \"/Users/nitinsingh/Downloads/perfume-ecom/src/pages/_document.tsx\",\n            lineNumber: 27,\n            columnNumber: 7\n        }, this);\n    }\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHBhZ2VzLWRpci1ub2RlKS8uL3NyYy9wYWdlcy9fZG9jdW1lbnQudHN4IiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFDdUU7QUFFekI7QUFNL0IsTUFBTU0sdUJBQXVCTixzREFBUUE7SUFDbEQsYUFBYU8sZ0JBQWdCQyxHQUFvQixFQUEwQjtRQUN6RSxNQUFNQyxlQUFlLE1BQU1ULG9FQUF3QixDQUFDUTtRQUVwRCx5QkFBeUI7UUFDekIsTUFBTUUsZUFBZUMsa0JBQXlCO1FBRTlDLE9BQU87WUFDTCxHQUFHRixZQUFZO1lBQ2ZDO1FBQ0Y7SUFDRjtJQUVBRSxTQUFTO1FBQ1AsTUFBTSxFQUFFRixZQUFZLEVBQUUsR0FBRyxJQUFJLENBQUNHLEtBQUs7UUFFbkMscUJBQ0UsOERBQUNYLCtDQUFJQTtZQUFDWSxNQUFLOzs4QkFDVCw4REFBQ2IsK0NBQUlBOzhCQUVGUyw4QkFDQzs7MENBRUUsOERBQUNLO2dDQUNDQyxLQUFLO2dDQUNMQyxLQUFLLENBQUMsNENBQTRDLEVBQUVaLHVEQUFjQSxFQUFFOzs7Ozs7MENBRXRFLDhEQUFDVTtnQ0FDQ0cseUJBQXlCO29DQUN2QkMsUUFBUSxDQUFDOzs7OztvQ0FLUyxFQUFFZCx1REFBY0EsQ0FBQzs7O2tCQUduQyxDQUFDO2dDQUNIOzs7Ozs7Ozs7Ozs7OzhCQUtSLDhEQUFDZTs7c0NBQ0MsOERBQUNqQiwrQ0FBSUE7Ozs7O3NDQUNMLDhEQUFDQyxxREFBVUE7Ozs7Ozs7Ozs7Ozs7Ozs7O0lBSW5CO0FBQ0YiLCJzb3VyY2VzIjpbIi9Vc2Vycy9uaXRpbnNpbmdoL0Rvd25sb2Fkcy9wZXJmdW1lLWVjb20vc3JjL3BhZ2VzL19kb2N1bWVudC50c3giXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHR5cGUgeyBEb2N1bWVudENvbnRleHQsIERvY3VtZW50SW5pdGlhbFByb3BzIH0gZnJvbSBcIm5leHQvZG9jdW1lbnRcIjtcbmltcG9ydCBEb2N1bWVudCwgeyBIZWFkLCBIdG1sLCBNYWluLCBOZXh0U2NyaXB0IH0gZnJvbSBcIm5leHQvZG9jdW1lbnRcIjtcblxuaW1wb3J0IHsgR0FfVFJBQ0tJTkdfSUQgfSBmcm9tIFwiQC91dGlscy9ndGFnXCI7XG5cbmludGVyZmFjZSBEb2N1bWVudFByb3BzIGV4dGVuZHMgRG9jdW1lbnRJbml0aWFsUHJvcHMge1xuICBpc1Byb2R1Y3Rpb246IGJvb2xlYW47XG59XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEN1c3RvbURvY3VtZW50IGV4dGVuZHMgRG9jdW1lbnQ8RG9jdW1lbnRQcm9wcz4ge1xuICBzdGF0aWMgYXN5bmMgZ2V0SW5pdGlhbFByb3BzKGN0eDogRG9jdW1lbnRDb250ZXh0KTogUHJvbWlzZTxEb2N1bWVudFByb3BzPiB7XG4gICAgY29uc3QgaW5pdGlhbFByb3BzID0gYXdhaXQgRG9jdW1lbnQuZ2V0SW5pdGlhbFByb3BzKGN0eCk7XG5cbiAgICAvLyBDaGVjayBpZiBpbiBwcm9kdWN0aW9uXG4gICAgY29uc3QgaXNQcm9kdWN0aW9uID0gcHJvY2Vzcy5lbnYuTk9ERV9FTlYgPT09IFwicHJvZHVjdGlvblwiO1xuXG4gICAgcmV0dXJuIHtcbiAgICAgIC4uLmluaXRpYWxQcm9wcyxcbiAgICAgIGlzUHJvZHVjdGlvbixcbiAgICB9O1xuICB9XG5cbiAgcmVuZGVyKCkge1xuICAgIGNvbnN0IHsgaXNQcm9kdWN0aW9uIH0gPSB0aGlzLnByb3BzO1xuXG4gICAgcmV0dXJuIChcbiAgICAgIDxIdG1sIGxhbmc9XCJlblwiPlxuICAgICAgICA8SGVhZD5cbiAgICAgICAgICB7LyogV2Ugb25seSB3YW50IHRvIGFkZCB0aGUgc2NyaXB0cyBpZiBpbiBwcm9kdWN0aW9uICovfVxuICAgICAgICAgIHtpc1Byb2R1Y3Rpb24gJiYgKFxuICAgICAgICAgICAgPD5cbiAgICAgICAgICAgICAgey8qIEdsb2JhbCBTaXRlIFRhZyAoZ3RhZy5qcykgLSBHb29nbGUgQW5hbHl0aWNzICovfVxuICAgICAgICAgICAgICA8c2NyaXB0XG4gICAgICAgICAgICAgICAgYXN5bmNcbiAgICAgICAgICAgICAgICBzcmM9e2BodHRwczovL3d3dy5nb29nbGV0YWdtYW5hZ2VyLmNvbS9ndGFnL2pzP2lkPSR7R0FfVFJBQ0tJTkdfSUR9YH1cbiAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgPHNjcmlwdFxuICAgICAgICAgICAgICAgIGRhbmdlcm91c2x5U2V0SW5uZXJIVE1MPXt7XG4gICAgICAgICAgICAgICAgICBfX2h0bWw6IGBcbiAgICAgICAgICAgICAgICAgICAgd2luZG93LmRhdGFMYXllciA9IHdpbmRvdy5kYXRhTGF5ZXIgfHwgW107XG4gICAgICAgICAgICAgICAgICAgIGZ1bmN0aW9uIGd0YWcoKXtkYXRhTGF5ZXIucHVzaChhcmd1bWVudHMpO31cbiAgICAgICAgICAgICAgICAgICAgZ3RhZygnanMnLCBuZXcgRGF0ZSgpKTtcblxuICAgICAgICAgICAgICAgICAgICBndGFnKCdjb25maWcnLCAnJHtHQV9UUkFDS0lOR19JRH0nLCB7XG4gICAgICAgICAgICAgICAgICAgICAgcGFnZV9wYXRoOiB3aW5kb3cubG9jYXRpb24ucGF0aG5hbWUsXG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgYCxcbiAgICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgPC8+XG4gICAgICAgICAgKX1cbiAgICAgICAgPC9IZWFkPlxuICAgICAgICA8Ym9keT5cbiAgICAgICAgICA8TWFpbiAvPlxuICAgICAgICAgIDxOZXh0U2NyaXB0IC8+XG4gICAgICAgIDwvYm9keT5cbiAgICAgIDwvSHRtbD5cbiAgICApO1xuICB9XG59XG4iXSwibmFtZXMiOlsiRG9jdW1lbnQiLCJIZWFkIiwiSHRtbCIsIk1haW4iLCJOZXh0U2NyaXB0IiwiR0FfVFJBQ0tJTkdfSUQiLCJDdXN0b21Eb2N1bWVudCIsImdldEluaXRpYWxQcm9wcyIsImN0eCIsImluaXRpYWxQcm9wcyIsImlzUHJvZHVjdGlvbiIsInByb2Nlc3MiLCJyZW5kZXIiLCJwcm9wcyIsImxhbmciLCJzY3JpcHQiLCJhc3luYyIsInNyYyIsImRhbmdlcm91c2x5U2V0SW5uZXJIVE1MIiwiX19odG1sIiwiYm9keSJdLCJpZ25vcmVMaXN0IjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(pages-dir-node)/./src/pages/_document.tsx\n");

/***/ }),

/***/ "(pages-dir-node)/./src/utils/gtag.ts":
/*!***************************!*\
  !*** ./src/utils/gtag.ts ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   GA_TRACKING_ID: () => (/* binding */ GA_TRACKING_ID),\n/* harmony export */   event: () => (/* binding */ event),\n/* harmony export */   pageview: () => (/* binding */ pageview)\n/* harmony export */ });\nconst GA_TRACKING_ID = process.env.NEXT_PUBLIC_ANALYTICS_ID; // This is your GA Tracking ID\n// https://developers.google.com/analytics/devguides/collection/gtagjs/pages\nconst pageview = (url)=>{\n    window.gtag(\"config\", GA_TRACKING_ID, {\n        page_path: url\n    });\n};\n// https://developers.google.com/analytics/devguides/collection/gtagjs/events\nconst event = ({ action, category, label, value })=>{\n    window.gtag(\"event\", action, {\n        event_category: category,\n        event_label: label,\n        value: value\n    });\n};\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHBhZ2VzLWRpci1ub2RlKS8uL3NyYy91dGlscy9ndGFnLnRzIiwibWFwcGluZ3MiOiI7Ozs7OztBQUVPLE1BQU1BLGlCQUFpQkMsUUFBUUMsR0FBRyxDQUFDQyx3QkFBd0IsQ0FBQyxDQUFDLDhCQUE4QjtBQUtsRyw0RUFBNEU7QUFDckUsTUFBTUMsV0FBVyxDQUFDQztJQUN2QkMsT0FBT0MsSUFBSSxDQUFDLFVBQVVQLGdCQUFnQjtRQUNwQ1EsV0FBV0g7SUFDYjtBQUNGLEVBQUU7QUFFRiw2RUFBNkU7QUFDdEUsTUFBTUksUUFBUSxDQUFDLEVBQUVDLE1BQU0sRUFBRUMsUUFBUSxFQUFFQyxLQUFLLEVBQUVDLEtBQUssRUFBaUI7SUFDckVQLE9BQU9DLElBQUksQ0FBQyxTQUFTRyxRQUFRO1FBQzNCSSxnQkFBZ0JIO1FBQ2hCSSxhQUFhSDtRQUNiQyxPQUFPQTtJQUNUO0FBQ0YsRUFBRSIsInNvdXJjZXMiOlsiL1VzZXJzL25pdGluc2luZ2gvRG93bmxvYWRzL3BlcmZ1bWUtZWNvbS9zcmMvdXRpbHMvZ3RhZy50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgdHlwZSB7IEd0YWdFdmVudFR5cGUgfSBmcm9tIFwiQC90eXBlc1wiO1xuXG5leHBvcnQgY29uc3QgR0FfVFJBQ0tJTkdfSUQgPSBwcm9jZXNzLmVudi5ORVhUX1BVQkxJQ19BTkFMWVRJQ1NfSUQ7IC8vIFRoaXMgaXMgeW91ciBHQSBUcmFja2luZyBJRFxuXG4vLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLWV4cGxpY2l0LWFueVxuZGVjbGFyZSBsZXQgd2luZG93OiBXaW5kb3cgJiB7IGd0YWc6IGFueSB9O1xuXG4vLyBodHRwczovL2RldmVsb3BlcnMuZ29vZ2xlLmNvbS9hbmFseXRpY3MvZGV2Z3VpZGVzL2NvbGxlY3Rpb24vZ3RhZ2pzL3BhZ2VzXG5leHBvcnQgY29uc3QgcGFnZXZpZXcgPSAodXJsOiBzdHJpbmcpID0+IHtcbiAgd2luZG93Lmd0YWcoXCJjb25maWdcIiwgR0FfVFJBQ0tJTkdfSUQsIHtcbiAgICBwYWdlX3BhdGg6IHVybCxcbiAgfSk7XG59O1xuXG4vLyBodHRwczovL2RldmVsb3BlcnMuZ29vZ2xlLmNvbS9hbmFseXRpY3MvZGV2Z3VpZGVzL2NvbGxlY3Rpb24vZ3RhZ2pzL2V2ZW50c1xuZXhwb3J0IGNvbnN0IGV2ZW50ID0gKHsgYWN0aW9uLCBjYXRlZ29yeSwgbGFiZWwsIHZhbHVlIH06IEd0YWdFdmVudFR5cGUpID0+IHtcbiAgd2luZG93Lmd0YWcoXCJldmVudFwiLCBhY3Rpb24sIHtcbiAgICBldmVudF9jYXRlZ29yeTogY2F0ZWdvcnksXG4gICAgZXZlbnRfbGFiZWw6IGxhYmVsLFxuICAgIHZhbHVlOiB2YWx1ZSxcbiAgfSk7XG59O1xuIl0sIm5hbWVzIjpbIkdBX1RSQUNLSU5HX0lEIiwicHJvY2VzcyIsImVudiIsIk5FWFRfUFVCTElDX0FOQUxZVElDU19JRCIsInBhZ2V2aWV3IiwidXJsIiwid2luZG93IiwiZ3RhZyIsInBhZ2VfcGF0aCIsImV2ZW50IiwiYWN0aW9uIiwiY2F0ZWdvcnkiLCJsYWJlbCIsInZhbHVlIiwiZXZlbnRfY2F0ZWdvcnkiLCJldmVudF9sYWJlbCJdLCJpZ25vcmVMaXN0IjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(pages-dir-node)/./src/utils/gtag.ts\n");

/***/ }),

/***/ "next/dist/compiled/next-server/pages.runtime.dev.js":
/*!**********************************************************************!*\
  !*** external "next/dist/compiled/next-server/pages.runtime.dev.js" ***!
  \**********************************************************************/
/***/ ((module) => {

module.exports = require("next/dist/compiled/next-server/pages.runtime.dev.js");

/***/ }),

/***/ "path":
/*!***********************!*\
  !*** external "path" ***!
  \***********************/
/***/ ((module) => {

module.exports = require("path");

/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "react" ***!
  \************************/
/***/ ((module) => {

module.exports = require("react");

/***/ }),

/***/ "react/jsx-dev-runtime":
/*!****************************************!*\
  !*** external "react/jsx-dev-runtime" ***!
  \****************************************/
/***/ ((module) => {

module.exports = require("react/jsx-dev-runtime");

/***/ }),

/***/ "react/jsx-runtime":
/*!************************************!*\
  !*** external "react/jsx-runtime" ***!
  \************************************/
/***/ ((module) => {

module.exports = require("react/jsx-runtime");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, ["vendor-chunks/next","vendor-chunks/@swc"], () => (__webpack_exec__("(pages-dir-node)/./src/pages/_document.tsx")));
module.exports = __webpack_exports__;

})();