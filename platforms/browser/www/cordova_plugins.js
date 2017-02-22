cordova.define('cordova/plugin_list', function(require, exports, module) {
module.exports = [
    {
        "file": "plugins/cordova-plugin-statusbar/www/statusbar.js",
        "id": "cordova-plugin-statusbar.statusbar",
        "pluginId": "cordova-plugin-statusbar",
        "clobbers": [
            "window.StatusBar"
        ]
    },
    {
        "file": "plugins/me.rahul.plugins.audio-picker/www/iOSAudioPicker.js",
        "id": "me.rahul.plugins.audio-picker.iOSAudioPicker",
        "pluginId": "me.rahul.plugins.audio-picker",
        "clobbers": [
            "window.plugins.iOSAudioPicker"
        ]
    },
    {
        "file": "plugins/me.rahul.plugins.mediapicker/www/MediaPicker.js",
        "id": "me.rahul.plugins.mediapicker.MediaPicker",
        "pluginId": "me.rahul.plugins.mediapicker",
        "clobbers": [
            "window.plugins.mediapicker"
        ]
    },
    {
        "file": "plugins/cordova-plugin-device/www/device.js",
        "id": "cordova-plugin-device.device",
        "pluginId": "cordova-plugin-device",
        "clobbers": [
            "device"
        ]
    },
    {
        "file": "plugins/cordova-plugin-device/src/browser/DeviceProxy.js",
        "id": "cordova-plugin-device.DeviceProxy",
        "pluginId": "cordova-plugin-device",
        "runs": true
    }
];
module.exports.metadata = 
// TOP OF METADATA
{
    "cordova-plugin-whitelist": "1.2.2",
    "cordova-plugin-console": "1.0.5",
    "cordova-plugin-statusbar": "1.0.1",
    "me.rahul.plugins.audio-picker": "0.0.8",
    "me.rahul.plugins.mediapicker": "0.0.1",
    "cordova-plugin-device": "1.1.4"
}
// BOTTOM OF METADATA
});