import React, { useEffect, useState } from "react";
import { ReactKeycloakProvider } from "@react-keycloak/web";
import keycloak from "./services/keycloak";
import { RootStore } from "./stores/root-store/root-store";
import { setupRootStore } from "./stores/root-store/setup-root-store";
import { RootStoreProvider } from "./stores/root-store/root-store-context";
import MainBrowserRouter from "./MainBrowserRouter";
import { getCookie, removeCookie } from "./services/clientStorage";

function App() {
  // Стейт для хранения rootStore и флага готовности keycloak
  const [rootStore, setRootStore] = useState<RootStore | undefined>(undefined);
  const [keycloakReady, setKeycloakReady] = useState(false);

  useEffect(() => {
    // Загрузка rootStore при монтировании компонента
    setupRootStore()
        .then(setRootStore)
        .catch((ex) => console.log("setupRootStore", ex));
    console.log("Root store loaded");
  }, []);

  // Если rootStore еще не загружен или не завершена его загрузка, возвращаем null
  if (rootStore == null || !rootStore?.isLoaded) {
    return null;
  }

  // Обработчик событий keycloak
  const handleKeycloakEvent = (eventType: string) => {
    switch (eventType) {
        // В случае ошибки обновления токена, производим выход и удаляем сохраненный URL
      case "onAuthRefreshError": {
        console.log("1");
        const url = getCookie("redirectUrl");
        void keycloak.logout({
          redirectUri: url ?? keycloak.createLoginUrl(),
        });
        void removeCookie("redirectUrl");
        break;
      }

        // После успешной инициализации keycloak
      case "onReady":
        console.log("2");
        // Устанавливаем флаг готовности keycloak
        setKeycloakReady(true);
        // Если пользователь не аутентифицирован, выполняем вход
        if (!keycloak.authenticated) {
          void keycloak.login();
        }
        break;

        // После успешной аутентификации или обновления токена
      case "onAuthSuccess":
      case "onAuthRefreshSuccess":
        console.log("3");
        // Если токен доступен, обновляем данные профиля
        if (keycloak.token != null) {
          rootStore.profileStore.setData(keycloak.token);
        }
        break;

        // В случае ошибки аутентификации
      case "onAuthError":
        console.log("onAuthError");
        break;

        // После выхода из системы
      case "onAuthLogout":
        // Сбрасываем состояние приложения
        rootStore.reset();
        break;
    }
  };

  return (
      // Оборачиваем приложение в ReactKeycloakProvider для работы с аутентификацией
      <ReactKeycloakProvider
          authClient={keycloak}
          initOptions={{ onLoad: "login-required" }}
          onEvent={handleKeycloakEvent}
      >
        {/* Предоставляем корневое хранилище (rootStore) для всех компонентов */}
        <RootStoreProvider value={rootStore}>
          {/* Передаем флаг готовности keycloak в основной роутер */}
          {MainBrowserRouter(keycloakReady)}
        </RootStoreProvider>
      </ReactKeycloakProvider>
  );
}

export default App;
