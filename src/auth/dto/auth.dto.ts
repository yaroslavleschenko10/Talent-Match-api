import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEmail, IsEnum, IsOptional, IsString, MinLength } from 'class-validator';
import { UserRole } from '../../common/enums';

export class RegisterDto {
  @ApiProperty({ example: 'user@example.com' })
  @IsEmail()
  email!: string;

  @ApiProperty({ example: 'password123', minLength: 6 })
  @IsString()
  @MinLength(6)
  password!: string;

  @ApiProperty({ enum: UserRole, example: UserRole.CANDIDATE })
  @IsEnum(UserRole)
  role!: UserRole;

  @ApiPropertyOptional({ example: 'Олена' })
  @IsOptional()
  @IsString()
  firstName?: string;

  @ApiPropertyOptional({ example: 'Коваленко' })
  @IsOptional()
  @IsString()
  lastName?: string;

  @ApiPropertyOptional({ example: 'Frontend Developer' })
  @IsOptional()
  @IsString()
  position?: string;

  @ApiPropertyOptional({ example: 'Київ' })
  @IsOptional()
  @IsString()
  location?: string;

  @ApiPropertyOptional({ example: 'TechCorp Ukraine' })
  @IsOptional()
  @IsString()
  companyName?: string;

  @ApiPropertyOptional({ example: 'Олександр Іваненко' })
  @IsOptional()
  @IsString()
  contactPerson?: string;
}

export class LoginDto {
  @ApiProperty({ example: 'olena@example.com' })
  @IsEmail()
  email!: string;

  @ApiProperty({ example: 'password123' })
  @IsString()
  password!: string;
}
