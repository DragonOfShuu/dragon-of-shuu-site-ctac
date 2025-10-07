/** @type {import('next').NextConfig} */
const nextConfig = {
    turbopack: {
        rules: {
            '*.svg': {
                loaders: ['@svgr/webpack'],
                as: '*.js'
            }
        }
    },
    transpilePackages: ['three'],
    async redirects() {
        return [
            {
                source: '/minis/:slug*',
                destination: '/projects/:slug*',
                permanent: true,
            }
        ]
    },
    serverExternalPackages: ["mjml"],
};

export default nextConfig;
