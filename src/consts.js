// eslint-disable-next-line no-unused-vars
function getRelativeAPI(host, port, path, https) {
    console.log(host)
    console.log(port)
    console.log(path)
    console.log(https)
    
    const hostWithoutPort = host.replace(/:\d{1,6}\/?$/, "");
    const httpStart = https == null ? "//" : https+ "//";
    // const httpStart = https == null ? "//" : (https ? "https://" : "http://");
    return `${httpStart}${hostWithoutPort}${port ? `:${port}` : ""}${path || ""}`;
}

const consts = {

    api: getRelativeAPI(window.location.host, 8000, "/api",window.location.protocol),
    //api: "http://127.0.0.1:8000/api",
    // api: "https://d3.ltw-global.com/api",
    
    // issues: PropTypes.shape({
    //     data: issueArray.isRequired,
    //     dataBuckets: PropTypes.arrayOf(issueArray).isRequired,
    // }),
    // defaultDate: {
    //     from: { year: 2007, month: 7 },
    //     to: { year: today.getYear() + 1900, month: today.getMonth() + 1 },
    // },
    // articles: PropTypes.arrayOf(articleProp),
    // drillDownMinArticles: 20,
    // articleRoot: "https://timreview.ca/article/",
    // issueRoot: "https://timreview.ca/issue/",
    // months: ["January", "February", "March", "April", "May", "June",
    //     "July", "August", "September", "October", "November", "December"],
    // sentryDSN: "https://7e46bf2d9c0d4242bcaec5ac059c8d26@sentry.io/196110",
    // trackingID: "UA-108628273-1",
};

export default consts;