export function getTokensFromUrl() {
    const hash = window.location.hash.startsWith("#") ? window.location.hash.slice(1) : window.location.hash;
    const params = new URLSearchParams(hash);
    return {
        id_token: params.get("id_token"),
        access_token: params.get("access_token"),
        expires_in: params.get("expires_in"),
        token_type: params.get("token_type"),
    };
}