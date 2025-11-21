/** @type {import('next').NextConfig} */
const nextConfig = {
    webpack: (config, { isServer, nextRuntime }) => {
        if (isServer && nextRuntime === "edge") {
            config.resolve.alias = {
                ...config.resolve.alias,
                "bcryptjs": false,
            };
        }
        return config;
    },
};

export default nextConfig;
