importScripts('Scripts/workbox-sw.js');

if (workbox) {
    console.log(`Yay! Workbox is loaded 🎉`);
} else {
    console.log(`Boo! Workbox didn't load 😬`);
}
var staticAssets = [
    './'
];
workbox.precaching.precacheAndRoute([
    { url: 'index.html', revision: 'abcd1234' },
    // ... other entries ...
]);
workbox.routing.registerRoute(
    new RegExp('.*\.js'),
    new workbox.strategies.CacheFirst()
);
workbox.routing.registerRoute(
    new RegExp('.*\.css'),
    new workbox.strategies.CacheFirst()
);