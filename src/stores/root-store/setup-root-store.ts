import { RootStore, RootStoreModel } from "./root-store";
import { unprotect } from "mobx-state-tree";
import { Environment } from "../environment";

// Создаем окружение (environment) для приложения
export async function createEnvironment() {
  const env = new Environment();
  // Выполняем настройку окружения
  await env.setup();
  return env;
}

// Настройка корневого хранилища
export async function setupRootStore() {
  // Создаем окружение
  const env = await createEnvironment();

  // Создаем корневое хранилище с указанием окружения
  const rootStore: RootStore = RootStoreModel.create({}, env);

  // Разрешаем доступ к изменению состояния без учета защиты (unprotect)
  unprotect(rootStore);

  // Возвращаем настроенное корневое хранилище
  return rootStore;
}
