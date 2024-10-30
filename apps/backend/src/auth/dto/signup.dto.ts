import { IsEmail, IsString, MinLength, MaxLength, Matches } from 'class-validator';

export class SignupDto {
  @IsEmail({}, { message: 'Please enter a valid email address.' })
  email: string;

  @IsString({ message: 'Password must be a string.' })
  @MinLength(8, { message: 'Password must be at least 8 characters long.' })
  @MaxLength(20, { message: 'Password cannot exceed 20 characters.' })
  @Matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/, {
    message: 'Password must contain at least one uppercase letter, one lowercase letter, and one number.',
  })
  password: string;

  @IsString({ message: 'Name must be a string.' })
  @MaxLength(50, { message: 'Name cannot exceed 50 characters.' })
  name: string;
}
