import dotenv from 'dotenv';
dotenv.config();

import { connectDB } from '../server/utils/db';
import { seedRoles } from './role.seeder';

const run = async () => {
    await connectDB();
    await seedRoles();
    process.exit(0);
};

run();