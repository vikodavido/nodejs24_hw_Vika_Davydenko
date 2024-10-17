import { DatabaseConfig } from './database-config.type';

const databaseConfig = (): DatabaseConfig => {
  return {
    isDocumentDatabase: true,
  };
};

export default databaseConfig;
