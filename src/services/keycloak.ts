import Keycloak from 'keycloak-js';

const keycloak = new Keycloak({
    url: "http://localhost",
    realm: "gamehub",
    clientId: "gamehub_web",
});

export default keycloak;
