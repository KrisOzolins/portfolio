// PM2 ecosystem file.

module.exports = {
  apps: [
    {
      name: "nextjs-app",
      script: "npm",
      args: "start",
      cwd: "/path/to/project_root",
      env: {
        NODE_ENV: "production",
      },
    },
    {
      name: "express-api",
      script: "index.js",
      cwd: "/path/to/project_root/server",
      env: {
        NODE_ENV: "production",
      },
    },
  ],
};

// Usage: pm2 start ecosystem.config.js || pm2 reload ecosystem.config.js.
// For more information, visit https://pm2.keymetrics.io/docs/usage/application-declaration/.
