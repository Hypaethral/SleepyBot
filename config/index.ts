import * as ConfigNamespaceContainer from './localConfig';
const Settings = ConfigNamespaceContainer.Config.LocalConfig;
// const Settings = ConfigNamespaceContainer.Config.StagingConfig;
// const Settings = ConfigNamespaceContainer.Config.ProdConfig;

export * from './environmentConfigScheme';
export { Settings };