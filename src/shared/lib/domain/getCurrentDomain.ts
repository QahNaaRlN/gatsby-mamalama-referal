export const getCurrentDomain = () => {
    if (typeof window !== 'undefined') {
        return window.location.hostname;
    }
    return process.env.GATSBY_SITE_DOMAIN;
};
