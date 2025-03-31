import { PrismaClient } from '@prisma/client';
import { hashPassword } from '../src/utils/handleHashing';
import { Role } from 'src/enums/Role';

const prisma = new PrismaClient();

const categories = [
  'General Knowledge',
  'Science',
  'History',
  'Geography',
  'Science and Technology',
  'Art and Culture',
  'Sports',
  'Music',
  'Movies and TV Shows',
];

async function main() {
  console.log('Seeding database...');

  const createdCategories = await Promise.all(
    categories.map((categoryName) =>
      prisma.category.create({
        data: { name: categoryName },
      }),
    ),
  );

  const scienceQuiz = await prisma.quiz.create({
    data: {
      name: 'Physics Basics',
      categoryId: createdCategories[1].id,
      questions: {
        create: [
          {
            text: 'What is the speed of light?',
            type: 'MULTIPLE_CHOICE',
            options: ['299,792 km/s', '150,000 km/s', '1,000 km/s'],
            answer: '299,792 km/s',
          },
          {
            text: 'Is gravity a force?',
            type: 'TRUE_FALSE',
            options: ['True', 'False'],
            answer: 'True',
          },
          {
            text: 'What is the formula for force?',
            type: 'SHORT_ANSWER',
            options: [],
            answer: 'F = ma',
          },
          {
            text: 'What is the atomic number of Carbon?',
            type: 'MULTIPLE_CHOICE',
            options: ['6', '12', '14'],
            answer: '6',
          },
          {
            text: 'Is the Earth flat?',
            type: 'TRUE_FALSE',
            options: ['True', 'False'],
            answer: 'False',
          },
        ],
      },
    },
  });

  const historyQuiz = await prisma.quiz.create({
    data: {
      name: 'World War II',
      categoryId: createdCategories[2].id,
      questions: {
        create: [
          {
            text: 'In which year did World War II start?',
            type: 'MULTIPLE_CHOICE',
            options: ['1914', '1939', '1945'],
            answer: '1939',
          },
          {
            text: 'Who was the Prime Minister of the UK during most of WWII?',
            type: 'SHORT_ANSWER',
            options: [],
            answer: 'Winston Churchill',
          },
          {
            text: 'Which country was invaded first in WWII?',
            type: 'MULTIPLE_CHOICE',
            options: ['Poland', 'France', 'Belgium'],
            answer: 'Poland',
          },
          {
            text: 'Was the attack on Pearl Harbor in 1941?',
            type: 'TRUE_FALSE',
            options: ['True', 'False'],
            answer: 'True',
          },
          {
            text: 'Who was the leader of Nazi Germany during WWII?',
            type: 'SHORT_ANSWER',
            options: [],
            answer: 'Adolf Hitler',
          },
        ],
      },
    },
  });

  const user = await prisma.user.create({
    data: {
      username: 'mate',
      email: 'mate@gmail.com',
      password: await hashPassword('test123'),
      points: 175,
      quizResults: {
        create: [
          { quizId: scienceQuiz.id, score: 85 },
          { quizId: historyQuiz.id, score: 90 },
        ],
      },
    },
  });

  const admin = await prisma.user.create({
    data: {
      username: 'admin',
      email: 'admin@admin.com',
      password: await hashPassword('admin123'),
      role: 'Admin',
    },
  });

  console.log('Seeding finished!');
}

main()
  .catch((e) => {
    console.error('Error seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
