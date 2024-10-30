import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from '../auth/auth.module'; // Import AuthModule here

/**
 * AppModule imports ConfigModule for environment management,
 * MongooseModule for database connection, and AuthModule for authentication.
 */
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // Makes environment variables globally available
    }),
    MongooseModule.forRoot(process.env.MONGODB_URI), // Connect to MongoDB
    AuthModule, // Import AuthModule for authentication routes and services
  ],
})
export class AppModule {}
