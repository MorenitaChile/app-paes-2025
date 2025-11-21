/** @type {import('next').NextConfig} */
const nextConfig = {
    ERROR_INTENCIONAL_PARA_DEBUG: , // Esto causará error de sintaxis

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
