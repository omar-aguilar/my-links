type Environment = {
  DOMAIN: string;
  CSV_DB_URL: string;
  LOCAL_CSV_DB_URL: string;
};

const getEnvironment = (): Environment => {
  return {
    DOMAIN: process.env.DOMAIN || '',
    CSV_DB_URL: process.env.CSV_DB_URL || '',
    LOCAL_CSV_DB_URL: process.env.LOCAL_CSV_DB_URL || '',
  };
};

export default getEnvironment;
