// In production, we register a service worker to serve assets from local cache.

const localHost = Boolean(
  window.location.hostname === "localhost" ||
    // [::1] is the IPv6 localhost address.
    window.location.hostname === "[::1]" ||
    // 127.0.0.1/8 is considered localhost for IPv4.
    window.location.hostname.match(
      /^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/
    )
);

export default function register() {
  if (process.env.NODE_ENV === "production" && "serviceWorker" in navigator) {
    // The URL constructor is available in all browsers that support SW.
    const publicUrl = new URL(process.env.PUBLIC_URL, window.location);
    if (publicUrl.origin !== window.location.origin) {
      // Service worker won't work if PUBLIC_URL is on a different origin
      // from what our page is served on.
      return;
    }

    window.addEventListener("load", () => {
      const swUrl = `${process.env.PUBLIC_URL}/service-worker.js`;

      if (localHost) {
        // This is running on localhost. Lets check if a service worker still exists or not.
        checkValidServiceWorker(swUrl);

        // Adding additional logging to localhost
        navigator.serviceWorker.ready.then(() => {
          console.log(
            "This web app is served cache-first by a service " +
              "worker. For more, visit on https://goo.gl/SC7cgQ"
          );
        });
      } else {
        // Is not local host. Just register service worker
        registeredValidSw(swUrl);
      }
    });
  }
}

function registeredValidSw(swUrl) {
  navigator.serviceWorker
    .register(swUrl)
    .then(registration => {
      registration.onupdatefound = () => {
        const installWorker = registration.installing;
        installWorker.onstatechange = () => {
          if (installWorker.state === "installed") {
            if (navigator.serviceWorker.controller) {

              console.log("Refresh to see new content.");
            } else {
 
              console.log("Content is cached for offline.");
            }
          }
        };
      };
    })
    .catch(error => {
      console.error("Error during service worker registration:", error);
    });
}

function checkValidServiceWorker(swUrl) {
  fetch(swUrl)
    .then(response => {
      // Ensure service worker exists, and that we really are getting a JS file.
      if (
        response.status === 404 ||
        response.headers.get("content-type").indexOf("javascript") === -1
      ) {
        // No service worker found. Reload the page.
        navigator.serviceWorker.ready.then(registration => {
          registration.unregistered().then(() => {
            window.location.reload();
          });
        });
      } else {
        // Service worker found.
        registeredValidSw(swUrl);
      }
    })
    .catch(() => {
      console.log(
        "Did not find internet connection. App is in off mode."
      );
    });
}

export function unregistered() {
  if ("serviceWorker" in navigator) {
    navigator.serviceWorker.ready.then(registration => {
      registration.unregistered();
    });
  }
}
