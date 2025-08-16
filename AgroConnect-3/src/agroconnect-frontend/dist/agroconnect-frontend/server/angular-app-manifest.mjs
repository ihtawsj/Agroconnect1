
export default {
  bootstrap: () => import('./main.server.mjs').then(m => m.default),
  inlineCriticalCss: true,
  baseHref: '/',
  locale: undefined,
  routes: [
  {
    "renderMode": 2,
    "redirectTo": "/login",
    "route": "/"
  },
  {
    "renderMode": 2,
    "route": "/login"
  },
  {
    "renderMode": 2,
    "route": "/register"
  }
],
  entryPointToBrowserMapping: undefined,
  assets: {
    'index.csr.html': {size: 5044, hash: '1c5b2b55eedfa8717b86ede6d6e04d0026c41ff831d5a31e65e1494f2aea9cff', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 1016, hash: 'a3a2c7d6e503949ccdd69c404d65d2278d39dddda4bec6759bb92622cc844bba', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'login/index.html': {size: 12500, hash: 'd4ab75bc51ee1cf1dd2516ecbde2d0a2cf9f2fc1e83a1ac5d3f4435db9d9c877', text: () => import('./assets-chunks/login_index_html.mjs').then(m => m.default)},
    'register/index.html': {size: 12748, hash: 'f056840efc37fc1a17d853c2e50b76edf4236d7b3204a8b955000f8fe299d1a4', text: () => import('./assets-chunks/register_index_html.mjs').then(m => m.default)},
    'styles-BVJQD57C.css': {size: 230873, hash: 'YU+im7r2LDs', text: () => import('./assets-chunks/styles-BVJQD57C_css.mjs').then(m => m.default)}
  },
};
