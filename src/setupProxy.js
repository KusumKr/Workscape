const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api/weather',
    createProxyMiddleware({
      target: 'https://api.openweathermap.org',
      changeOrigin: true,
      pathRewrite: {
        '^/api/weather': '/data/2.5/weather'
      },
      onProxyReq: (proxyReq, req, res) => {
        console.log('Proxying request:', req.originalUrl);
      },
      onError: (err, req, res) => {
        console.error('Proxy error:', err);
        res.status(500).json({ error: 'Proxy error', details: err.message });
      }
    })
  );
};
