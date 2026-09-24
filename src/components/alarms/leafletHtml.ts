import { initialCenter, initialZoom } from '@/data/alarms';

const LEAFLET_VERSION = '1.9.4';

// Mosaicos CARTO Voyager (datos de OpenStreetMap): estilo claro parecido al del mockup.
// Uso gratuito no comercial; la atribución es obligatoria.
const TILE_URL = 'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png';
const ATTRIBUTION =
  '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>';

/**
 * Página que corre dentro del WebView. Expone en `window` las funciones que React Native
 * invoca con `injectJavaScript` (setMarkers, zoomIn, zoomOut, setUserLocation) y avisa con
 * `postMessage('ready')` cuando el mapa está listo.
 */
export const leafletHtml = `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" />
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/leaflet@${LEAFLET_VERSION}/dist/leaflet.css" />
  <script src="https://cdn.jsdelivr.net/npm/leaflet@${LEAFLET_VERSION}/dist/leaflet.js"></script>
  <style>
    html, body, #map { height: 100%; margin: 0; padding: 0; background: #F2EFE9; }
    .leaflet-control-attribution { font-size: 9px; background: rgba(255, 255, 255, 0.7) !important; }
    .pin { background: none; border: none; }
    .pin svg { display: block; filter: drop-shadow(0 2px 2px rgba(0, 0, 0, 0.25)); }
    .leaflet-popup-content { font-family: sans-serif; font-size: 13px; margin: 8px 12px; }
  </style>
</head>
<body>
  <div id="map"></div>
  <script>
    var map = L.map('map', { zoomControl: false, attributionControl: true })
      .setView([${initialCenter.latitude}, ${initialCenter.longitude}], ${initialZoom});
    map.attributionControl.setPrefix(false);

    L.tileLayer('${TILE_URL}', {
      attribution: '${ATTRIBUTION}',
      subdomains: 'abcd',
      maxZoom: 20
    }).addTo(map);

    var markersLayer = L.layerGroup().addTo(map);
    var userMarker = null;

    function escapeHtml(text) {
      var div = document.createElement('div');
      div.textContent = text;
      return div.innerHTML;
    }

    // markers: [{ id, lat, lng, name, address, svg, width, height }]
    window.setMarkers = function (markers) {
      markersLayer.clearLayers();
      markers.forEach(function (m) {
        var icon = L.divIcon({
          className: 'pin',
          html: m.svg,
          iconSize: [m.width, m.height],
          iconAnchor: [m.width / 2, m.height],
          popupAnchor: [0, -m.height]
        });
        L.marker([m.lat, m.lng], { icon: icon })
          .bindPopup('<b>' + escapeHtml(m.name) + '</b><br/>' + escapeHtml(m.address))
          .on('click', function () { window.ReactNativeWebView.postMessage('alarm:' + m.id); })
          .addTo(markersLayer);
      });
    };

    window.zoomIn = function () { map.zoomIn(); };
    window.zoomOut = function () { map.zoomOut(); };

    window.setUserLocation = function (lat, lng, center) {
      if (!userMarker) {
        userMarker = L.circleMarker([lat, lng], {
          radius: 8, color: '#FFFFFF', weight: 3, fillColor: '#2563EB', fillOpacity: 1
        }).addTo(map);
      } else {
        userMarker.setLatLng([lat, lng]);
      }
      if (center) map.flyTo([lat, lng], Math.max(map.getZoom(), 16), { duration: 0.5 });
    };

    window.ReactNativeWebView.postMessage('ready');
  </script>
</body>
</html>`;
