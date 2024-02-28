const INTERVAL = 10 * 1000;

const SENSORS = JSON.parse(document.getElementById('sensors').textContent);

const container = document.getElementById('container');
const iframes = SENSORS.map((scriptLink, index) => {
  const src = new URL('./widget.html', window.location.href);
  src.searchParams.set('url', scriptLink);
  const iframe = document.createElement('iframe');
  iframe.src = src.href;
  iframe.style.zIndex = SENSORS.length - index;
  container.append(iframe);
  return iframe;
});

setInterval(() => {
  iframes.unshift(iframes.pop());
  iframes.forEach((iframe, index) => {
    iframe.style.zIndex = SENSORS.length - index;
    if (index === 0) {
      iframe.classList.add('slide');
    } else {
      iframe.classList.remove('slide');
    }
  });
}, INTERVAL);