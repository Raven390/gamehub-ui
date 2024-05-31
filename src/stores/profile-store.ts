import { Instance, SnapshotOut, types } from "mobx-state-tree";
import { parseJwt } from "../utils/parse-jwt";
import { setCookie } from "../services/clientStorage";
import keycloak from "../services/keycloak";

// Модель хранилища профиля
export const ProfileStoreModel = types
    .model('ProfileStore')
    .props({
        // Пользовательские данные
        user: types.maybe(types.model({
            objectId: types.string,
            shortName: types.string
        })),
        // Роли пользователя
        roles: types.optional(types.array(types.string), [])
    })
    .views(self => ({
        // Получение краткого имени пользователя
        get userShortName() {
            return self.user?.shortName;
        },
        // Получение идентификатора пользователя
        get userObjectId() {
            return self.user?.objectId;
        },
        // Проверка наличия роли у пользователя
        isInRole(role: string) {
            return self.roles.includes(role);
        },
    }))
    .actions(self => ({
        // Установка данных профиля на основе JWT токена
        setData(jwtToken: string) {
            // Расшифровываем JWT токен
            const userJson = parseJwt(jwtToken);
            console.log(userJson);
            // Устанавливаем URL для перенаправления после выхода из системы
            void setCookie('redirectUrl', keycloak.createLogoutUrl());
            // Устанавливаем данные пользователя
            self.user = {
                objectId: userJson.sub,
                shortName: userJson.preferred_username
            };
            console.log(self.user);
            // Устанавливаем роли пользователя
            self.roles = userJson?.realm_access?.roles ?? [];
        }
    }));

// Интерфейс для экземпляра хранилища профиля
export interface IProfileStore extends Instance<typeof ProfileStoreModel> {}
// Интерфейс для снимка хранилища профиля
export interface IProfileStoreSnapshot extends SnapshotOut<typeof ProfileStoreModel> {}

// Функция создания модели по умолчанию для хранилища профиля
export const createProfileStoreDefaultModel = () => types.optional(ProfileStoreModel, {});
