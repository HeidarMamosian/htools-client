// eslint-disable-next-line no-unused-vars
function getRelativeAPI(host, port, path, https) {
    const hostWithoutPort = host.replace(/:\d{1,6}\/?$/, "");
    // const httpStart = https == null ? "//" : https + "//";
    const httpStart = https == null ? "//" : (https ? "https://" : "http://");
    return `${httpStart}${hostWithoutPort}${port ? `:${port}` : ""}${path || ""}`;
}

const consts = {
    api: process.env.NODE_ENV === "production" ? "/api" : getRelativeAPI(window.location.host, 8000, "/api"),
};

export default consts;