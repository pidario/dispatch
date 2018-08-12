import padStart from 'lodash/padStart';

export { findBreakpoints, messageHeight } from './messageHeight';
export { default as linkify } from './linkify';

export function normalizeChannel(channel) {
  if (channel.indexOf('#') !== 0) {
    return channel;
  }

  return channel
    .split('#')
    .join('')
    .toLowerCase();
}

export function isChannel(name) {
  // TODO: Handle other channel types
  if (typeof name === 'object') {
    ({ name } = name);
  }
  return typeof name === 'string' && name[0] === '#';
}

export function stringifyTab(server, name) {
  if (typeof server === 'object') {
    if (server.name) {
      return `${server.server};${server.name}`;
    }
    return server.server;
  }
  if (name) {
    return `${server};${name}`;
  }
  return server;
}

function isString(s, maxLength) {
  if (!s || typeof s !== 'string') {
    return false;
  }
  if (maxLength && s.length > maxLength) {
    return false;
  }
  return true;
}

// RFC 2812
// nickname = ( letter / special ) *( letter / digit / special / "-" )
// letter   = A-Z / a-z
// digit    = 0-9
// special  = "[", "]", "\", "`", "_", "^", "{", "|", "}"
export function isValidNick(nick, maxLength = 30) {
  if (!isString(nick, maxLength)) {
    return false;
  }

  for (let i = 0; i < nick.length; i++) {
    const char = nick.charCodeAt(i);
    if (
      (i > 0 && char < 45) ||
      (char > 45 && char < 48) ||
      (char > 57 && char < 65) ||
      char > 125
    ) {
      return false;
    }
    if ((i === 0 && char < 65) || char > 125) {
      return false;
    }
  }

  return true;
}

// chanstring = any octet except NUL, BELL, CR, LF, " ", "," and ":"
export function isValidChannel(channel, requirePrefix = true) {
  if (!isString(channel)) {
    return false;
  }

  if (requirePrefix && channel[0] !== '#') {
    return false;
  }

  for (let i = 0; i < channel.length; i++) {
    const char = channel.charCodeAt(i);
    if (
      char === 0 ||
      char === 7 ||
      char === 10 ||
      char === 13 ||
      char === 32 ||
      char === 44 ||
      char === 58
    ) {
      return false;
    }
  }

  return true;
}

// user = any octet except NUL, CR, LF, " " and "@"
export function isValidUsername(username) {
  if (!isString(username)) {
    return false;
  }

  for (let i = 0; i < username.length; i++) {
    const char = username.charCodeAt(i);
    if (
      char === 0 ||
      char === 10 ||
      char === 13 ||
      char === 32 ||
      char === 64
    ) {
      return false;
    }
  }

  return true;
}

export function isInt(i, min, max) {
  if (i < min || i > max || Math.floor(i) !== i) {
    return false;
  }

  return true;
}

export function timestamp(date = new Date()) {
  const h = padStart(date.getHours(), 2, '0');
  const m = padStart(date.getMinutes(), 2, '0');
  return `${h}:${m}`;
}

const canvas = document.createElement('canvas');
const ctx = canvas.getContext('2d');

export function stringWidth(str, font) {
  ctx.font = font;
  return ctx.measureText(str).width;
}

export function measureScrollBarWidth() {
  const outer = document.createElement('div');
  outer.style.visibility = 'hidden';
  outer.style.width = '100px';

  document.body.appendChild(outer);

  const widthNoScroll = outer.offsetWidth;
  outer.style.overflow = 'scroll';

  const inner = document.createElement('div');
  inner.style.width = '100%';
  outer.appendChild(inner);

  const widthWithScroll = inner.offsetWidth;

  outer.parentNode.removeChild(outer);

  return widthNoScroll - widthWithScroll;
}

export function findIndex(arr, pred) {
  if (!arr) {
    return -1;
  }

  for (let i = 0; i < arr.length; i++) {
    if (pred(arr[i])) {
      return i;
    }
  }

  return -1;
}

export function find(arr, pred) {
  const i = findIndex(arr, pred);
  if (i !== -1) {
    return arr[i];
  }
  return null;
}
