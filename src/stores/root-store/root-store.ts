import {flow, Instance, SnapshotOut, types} from "mobx-state-tree";
import {clearAll} from "../../services/clientStorage";
import {ProfileStoreModel} from "../profile-store";
import {withEnvironment} from "../extensions/with-environment";

// Определяем модель корневого хранилища
export const RootStoreModel = types
    .model("RootStore")
    .props({
        // Создаем хранилище профиля
        profileStore: types.optional(
            types.late(() => ProfileStoreModel),
            {}
        ),
        // Флаг для отслеживания загрузки корневого хранилища
        isLoaded: types.optional(types.boolean, false),
    })
    // Расширяем корневое хранилище функционалом среды выполнения
    .extend(withEnvironment)
    .actions(self => ({
        // Метод сброса состояния корневого хранилища
        reset() {
            // Очищаем все данные клиентского хранилища
            void clearAll();
            // Создаем новое пустое хранилище профиля
            self.profileStore = ProfileStoreModel.create({});
        },
    }))
    .actions((self) => ({
        // Действие, выполняемое после создания корневого хранилища
        afterCreate: flow(function* () {
            // Устанавливаем флаг isLoaded в true после загрузки
            self.isLoaded = true;
        }),
    }));

// Определяем тип корневого хранилища
export interface RootStore extends Instance<typeof RootStoreModel> {
}

// Определяем тип снимка корневого хранилища
export interface RootStoreSnapshot extends SnapshotOut<typeof RootStoreModel> {
}
