import { AppDataSource } from '../db/config';

beforeAll(async () => {
  // Initialize the database connection
  await AppDataSource.initialize();
});

afterAll(async () => {
  // Close the database connection
  if (AppDataSource.isInitialized) {
    await AppDataSource.destroy();
  }
}); 