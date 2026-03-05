import dotenv from 'dotenv';
dotenv.config();

import { connectDB } from '../src/server/utils/db';
import { seedRoles } from './role.seeder';
import { seedUsers } from './user.seeder';

const run = async () => {
    await connectDB();

    await seedRoles();
    await seedUsers();

    process.exit(0);
};

run();