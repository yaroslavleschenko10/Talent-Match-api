/**
 * Seed script — run after DB is up:
 *   npx ts-node src/seed.ts
 */
import { DataSource } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { config } from 'dotenv';

config();

async function seed() {
  const ds = new DataSource({
    type: 'postgres',
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT || '5432', 10),
    username: process.env.DB_USERNAME || 'talentmatch',
    password: process.env.DB_PASSWORD || 'talentmatch',
    database: process.env.DB_DATABASE || 'talentmatch',
    entities: [__dirname + '/**/*.entity{.ts,.js}'],
    synchronize: true,
  });

  await ds.initialize();
  console.log('Connected. Seeding...');

  const hash = await bcrypt.hash('password123', 10);

  // Users
  const candUser = await ds.query(
    `INSERT INTO users (id, email, "passwordHash", role, "isActive", "createdAt", "updatedAt")
     VALUES (gen_random_uuid(), $1, $2, 'candidate', true, NOW(), NOW())
     ON CONFLICT (email) DO UPDATE SET email = EXCLUDED.email
     RETURNING id`,
    ['olena@example.com', hash],
  );

  const empUser = await ds.query(
    `INSERT INTO users (id, email, "passwordHash", role, "isActive", "createdAt", "updatedAt")
     VALUES (gen_random_uuid(), $1, $2, 'employer', true, NOW(), NOW())
     ON CONFLICT (email) DO UPDATE SET email = EXCLUDED.email
     RETURNING id`,
    ['hr@techcorp.ua', hash],
  );

  const candUserId = candUser[0]?.id;
  const empUserId = empUser[0]?.id;

  // Candidate profile
  const cand = await ds.query(
    `INSERT INTO candidate_profiles (
      id, "userId", "firstName", "lastName", "middleName", position, "experienceYears",
      location, skills, "employmentTypes", "workSchedules", languages, summary,
      available, "profileVisible", "showSalary", "showContacts", "salaryExpectation",
      "createdAt", "updatedAt"
    ) VALUES (
      gen_random_uuid(), $1, 'Олена', 'Коваленко', 'Іванівна', 'Frontend Developer', 4,
      'Київ', 'React,TypeScript,Next.js,Tailwind CSS', 'full-time,contract', 'remote,hybrid',
      $2::jsonb, $3, true, true, true, true, '80 000 - 100 000 грн', NOW(), NOW()
    )
    ON CONFLICT DO NOTHING
    RETURNING id`,
    [
      candUserId,
      JSON.stringify([
        { language: 'Українська', level: 'Рідна' },
        { language: 'Англійська', level: 'Upper-Intermediate' },
      ]),
      'Досвідчений Frontend розробник з 4+ роками досвіду.',
    ],
  );

  // Employer profile
  const emp = await ds.query(
    `INSERT INTO employer_profiles (
      id, "userId", "companyName", industry, size, location, website, description,
      "contactPerson", phone, "createdAt", "updatedAt"
    ) VALUES (
      gen_random_uuid(), $1, 'TechCorp Ukraine', 'IT', '50-200', 'Київ',
      'https://techcorp.ua', 'Провідна IT компанія України',
      'Олександр Іваненко', '+380 44 123 4567', NOW(), NOW()
    )
    ON CONFLICT DO NOTHING
    RETURNING id`,
    [empUserId],
  );

  const employerId = emp[0]?.id;
  const candidateId = cand[0]?.id;

  if (employerId) {
    // Pipeline stages
    const stages = [
      ['Нові', 1, '#8B5CF6'],
      ['Скринінг', 2, '#F59E0B'],
      ['Співбесіда', 3, '#3B82F6'],
      ['Тестове', 4, '#EC4899'],
      ['Оффер', 5, '#10B981'],
      ['Найнято', 6, '#22C55E'],
    ];
    for (const [name, order, color] of stages) {
      await ds.query(
        `INSERT INTO pipeline_stages (id, "employerId", name, "order", color)
         VALUES (gen_random_uuid(), $1, $2, $3, $4)`,
        [employerId, name, order, color],
      );
    }

    // Vacancy
    await ds.query(
      `INSERT INTO vacancies (
        id, "employerId", title, department, description, requirements, skills,
        "experienceMin", "experienceMax", "salaryMin", "salaryMax",
        "employmentType", "workSchedule", location, "isRemote", status,
        "createdAt", "updatedAt"
      ) VALUES (
        gen_random_uuid(), $1, 'Senior Frontend Developer', 'Engineering',
        'Шукаємо досвідченого Frontend розробника для SaaS платформи.',
        $2::jsonb, 'React,TypeScript,Next.js,Tailwind CSS,Jest',
        3, 7, 80000, 120000, 'full-time', 'hybrid', 'Київ', true, 'active',
        NOW(), NOW()
      )`,
      [
        employerId,
        JSON.stringify([
          { id: 'req1', name: 'React 3+ роки', required: true, weight: 10 },
          { id: 'req2', name: 'TypeScript', required: true, weight: 9 },
        ]),
      ],
    );
  }

  console.log('Seed complete.');
  console.log('Candidate login: olena@example.com / password123');
  console.log('Employer login:  hr@techcorp.ua / password123');
  await ds.destroy();
}

seed().catch((e) => {
  console.error(e);
  process.exit(1);
});
