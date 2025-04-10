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

  const generalKnowledgeQuiz = await prisma.quiz.create({
    data: {
      name: 'Trivia Time',
      categoryId: createdCategories[0].id,
      questions: {
        create: [
          {
            text: 'What is the capital of France?',
            type: 'MULTIPLE_CHOICE',
            options: ['Paris', 'Rome', 'Madrid'],
            answer: 'Paris',
          },
          {
            text: 'The sun rises in the west.',
            type: 'TRUE_FALSE',
            options: ['True', 'False'],
            answer: 'False',
          },
          {
            text: 'How many continents are there?',
            type: 'SHORT_ANSWER',
            options: [],
            answer: '7',
          },
          {
            text: 'Which planet is known as the Red Planet?',
            type: 'MULTIPLE_CHOICE',
            options: ['Mars', 'Jupiter', 'Saturn'],
            answer: 'Mars',
          },
          {
            text: 'Is water made up of hydrogen and oxygen?',
            type: 'TRUE_FALSE',
            options: ['True', 'False'],
            answer: 'True',
          },
        ],
      },
    },
  });

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

  const geographyQuiz = await prisma.quiz.create({
    data: {
      name: 'World Geography',
      categoryId: createdCategories[3].id,
      questions: {
        create: [
          {
            text: 'What is the largest ocean on Earth?',
            type: 'MULTIPLE_CHOICE',
            options: ['Pacific Ocean', 'Atlantic Ocean', 'Indian Ocean'],
            answer: 'Pacific Ocean',
          },
          {
            text: 'Mount Everest is the highest mountain in the world.',
            type: 'TRUE_FALSE',
            options: ['True', 'False'],
            answer: 'True',
          },
          {
            text: 'Which desert is the largest in the world?',
            type: 'SHORT_ANSWER',
            options: [],
            answer: 'Sahara',
          },
          {
            text: 'Which continent is the Nile River located in?',
            type: 'MULTIPLE_CHOICE',
            options: ['Africa', 'Asia', 'Europe'],
            answer: 'Africa',
          },
          {
            text: 'Is Australia both a country and a continent?',
            type: 'TRUE_FALSE',
            options: ['True', 'False'],
            answer: 'True',
          },
        ],
      },
    },
  });

  const technologyQuiz = await prisma.quiz.create({
    data: {
      name: 'Tech Talk',
      categoryId: createdCategories[4].id,
      questions: {
        create: [
          {
            text: 'What does CPU stand for?',
            type: 'SHORT_ANSWER',
            options: [],
            answer: 'Central Processing Unit',
          },
          {
            text: 'HTML is used for structuring web pages.',
            type: 'TRUE_FALSE',
            options: ['True', 'False'],
            answer: 'True',
          },
          {
            text: 'Which of these is a programming language?',
            type: 'MULTIPLE_CHOICE',
            options: ['Python', 'Snake', 'Cobra'],
            answer: 'Python',
          },
          {
            text: 'What does RAM stand for?',
            type: 'SHORT_ANSWER',
            options: [],
            answer: 'Random Access Memory',
          },
          {
            text: 'JavaScript can be used for both frontend and backend.',
            type: 'TRUE_FALSE',
            options: ['True', 'False'],
            answer: 'True',
          },
        ],
      },
    },
  });

  const artQuiz = await prisma.quiz.create({
    data: {
      name: 'Famous Paintings',
      categoryId: createdCategories[5].id,
      questions: {
        create: [
          {
            text: 'Who painted the Mona Lisa?',
            type: 'SHORT_ANSWER',
            options: [],
            answer: 'Leonardo da Vinci',
          },
          {
            text: 'Starry Night was painted by Vincent van Gogh.',
            type: 'TRUE_FALSE',
            options: ['True', 'False'],
            answer: 'True',
          },
          {
            text: 'The Persistence of Memory is a painting by?',
            type: 'MULTIPLE_CHOICE',
            options: ['Salvador Dalí', 'Pablo Picasso', 'Claude Monet'],
            answer: 'Salvador Dalí',
          },
          {
            text: 'Which artist cut off part of his own ear?',
            type: 'SHORT_ANSWER',
            options: [],
            answer: 'Vincent van Gogh',
          },
          {
            text: 'Is Guernica a painting by Pablo Picasso?',
            type: 'TRUE_FALSE',
            options: ['True', 'False'],
            answer: 'True',
          },
        ],
      },
    },
  });

  const sportsQuiz = await prisma.quiz.create({
    data: {
      name: 'Football Facts',
      categoryId: createdCategories[6].id,
      questions: {
        create: [
          {
            text: 'Which country won the 2018 FIFA World Cup?',
            type: 'MULTIPLE_CHOICE',
            options: ['France', 'Brazil', 'Germany'],
            answer: 'France',
          },
          {
            text: 'Cristiano Ronaldo is from Portugal.',
            type: 'TRUE_FALSE',
            options: ['True', 'False'],
            answer: 'True',
          },
          {
            text: 'How many players are on a football team?',
            type: 'SHORT_ANSWER',
            options: [],
            answer: '11',
          },
          {
            text: "Who has won the most Ballon d'Or awards?",
            type: 'MULTIPLE_CHOICE',
            options: ['Messi', 'Ronaldo', 'Zidane'],
            answer: 'Messi',
          },
          {
            text: 'Is the World Cup held every 4 years?',
            type: 'TRUE_FALSE',
            options: ['True', 'False'],
            answer: 'True',
          },
        ],
      },
    },
  });

  const musicQuiz = await prisma.quiz.create({
    data: {
      name: 'Pop Music Quiz',
      categoryId: createdCategories[7].id,
      questions: {
        create: [
          {
            text: 'Who sang "Shape of You"?',
            type: 'SHORT_ANSWER',
            options: [],
            answer: 'Ed Sheeran',
          },
          {
            text: 'Beyoncé was a member of Destiny’s Child.',
            type: 'TRUE_FALSE',
            options: ['True', 'False'],
            answer: 'True',
          },
          {
            text: 'Which of these is not a musical instrument?',
            type: 'MULTIPLE_CHOICE',
            options: ['Guitar', 'Drum', 'Laptop'],
            answer: 'Laptop',
          },
          {
            text: 'Which singer is known as the "Queen of Pop"?',
            type: 'MULTIPLE_CHOICE',
            options: ['Madonna', 'Lady Gaga', 'Britney Spears'],
            answer: 'Madonna',
          },
          {
            text: 'Is Billie Eilish a pop artist?',
            type: 'TRUE_FALSE',
            options: ['True', 'False'],
            answer: 'True',
          },
        ],
      },
    },
  });

  const moviesQuiz = await prisma.quiz.create({
    data: {
      name: 'Movie Mania',
      categoryId: createdCategories[8].id,
      questions: {
        create: [
          {
            text: 'Which movie features the character "Forrest Gump"?',
            type: 'MULTIPLE_CHOICE',
            options: ['Forrest Gump', 'Cast Away', 'Big'],
            answer: 'Forrest Gump',
          },
          {
            text: 'The Lord of the Rings was directed by Peter Jackson.',
            type: 'TRUE_FALSE',
            options: ['True', 'False'],
            answer: 'True',
          },
          {
            text: 'What is the name of the wizard in "Harry Potter"?',
            type: 'SHORT_ANSWER',
            options: [],
            answer: 'Dumbledore',
          },
          {
            text: 'Which of these is a Marvel superhero?',
            type: 'MULTIPLE_CHOICE',
            options: ['Iron Man', 'Batman', 'Superman'],
            answer: 'Iron Man',
          },
          {
            text: 'Is "Inception" directed by Christopher Nolan?',
            type: 'TRUE_FALSE',
            options: ['True', 'False'],
            answer: 'True',
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

  const user2 = await prisma.user.create({
    data: {
      username: 'ivana',
      email: 'ivana@gmail.com',
      password: await hashPassword('ivana123'),
      points: 120,
    },
  });

  const user3 = await prisma.user.create({
    data: {
      username: 'marko',
      email: 'marko@gmail.com',
      password: await hashPassword('marko123'),
      points: 60,
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
