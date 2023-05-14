/** @type {import('next').NextConfig} */
const nextConfig = {};

module.exports = nextConfig;

module.exports = {
  env: {
    MY_VARIABLE: process.env.TESTPASSWORD,
    // Füge hier weitere Umgebungsvariablen hinzu, die du verwenden möchtest
  },
};
