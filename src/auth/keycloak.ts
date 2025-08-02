import Keycloak from 'keycloak-js';

let kcInstance: Keycloak.KeycloakInstance | undefined = undefined;

const getKeycloak = () => {
    if (!kcInstance) {
        kcInstance = new Keycloak({
            url: 'http://localhost:80',
            realm: 'gamehub',
            clientId: 'frontend-app',
        });
    }
    return kcInstance;
};

export default getKeycloak();
