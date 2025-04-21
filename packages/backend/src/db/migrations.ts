import { AppDataSource } from './config';

const runMigrations = async () => {
  try {
    await AppDataSource.initialize();
    await AppDataSource.runMigrations();
    console.log('Migrations completed successfully!');
  } catch (error) {
    console.error('Error running migrations:', error);
  } finally {
    await AppDataSource.destroy();
  }
};

runMigrations(); 