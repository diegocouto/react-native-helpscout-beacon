"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HelpscoutBeaconModule = void 0;
const react_native_1 = require("react-native");
exports.HelpscoutBeaconModule = react_native_1.NativeModules.HelpscoutBeacon;
/**
 * Identify the user
 *
 * @param {String} email
 * @param {String} name
 */
const identify = (email, name) => {
    if (email === null) {
        // console.error('[identify] Missing parameter: email');
        return;
    }
    if (react_native_1.Platform.OS === 'ios') {
        exports.HelpscoutBeaconModule.identify(email, name);
    }
    else {
        if (name === undefined) {
            exports.HelpscoutBeaconModule.identify(email);
        }
        else {
            exports.HelpscoutBeaconModule.identifyWithEmailAndName(email, name);
        }
    }
};
/**
 * Convenience method to login via setting an attribute with key 'userId'
 *
 * @param {String} email
 * @param {String} name
 * @param {String} userId
 */
const login = (email, name, userId) => {
    if (!email || !name || !userId) {
        // console.error(
        //   "[login] Missing parameter. Either 'email', 'name', 'userId' or several of them are missing."
        // );
        return;
    }
    identify(email, name);
    exports.HelpscoutBeaconModule.addAttributeWithKey('userId', userId);
};
/**
 * Convenience method to login via setting an attribute with key 'userId' and
 * opening the Helpscout beacon (with optional signature).
 *
 * @param {String} email
 * @param {String} name
 * @param {String} userId
 * @param {String} signature
 */
const loginAndOpen = (email, name, userId, signature) => {
    login(email, name, userId);
    if (signature === undefined) {
        exports.HelpscoutBeaconModule.open(null);
    }
    else {
        exports.HelpscoutBeaconModule.open(signature);
    }
};
/**
 * Display the Beacon user interface.
 *
 * @param {String} signature
 */
const open = (signature) => {
    if (signature === undefined) {
        exports.HelpscoutBeaconModule.open(null);
    }
    else {
        exports.HelpscoutBeaconModule.open(signature);
    }
};
/**
 * Display a specific page in the Helpscout beacon. On Android, these paths
 * are supported:
 * - "/ask/message/"
 * - "/ask/chat/"
 * - "/answers/"
 *
 * iOS supports additional paths e.g. "/" which displays the initial state
 * of the beacon. Find supported path values here:
 * - https://developer.helpscout.com/beacon-2/ios/#navigate-to-a-specific-screen
 *
 * @param {String} path
 */
const navigate = (path) => {
    if (!path) {
        // console.error('[navigate] Missing parameter: path');
        return;
    }
    exports.HelpscoutBeaconModule.navigate(path);
};
const HSBeacon = {
    init: exports.HelpscoutBeaconModule.init,
    identify,
    login,
    loginAndOpen,
    open,
    navigate,
    logout: exports.HelpscoutBeaconModule.logout,
    addAttributeWithKey: exports.HelpscoutBeaconModule.addAttributeWithKey,
    openArticle: exports.HelpscoutBeaconModule.openArticle,
    suggestArticles: exports.HelpscoutBeaconModule.suggestArticles,
    resetSuggestions: exports.HelpscoutBeaconModule.resetSuggestions,
};
exports.default = HSBeacon;
