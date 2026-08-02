import type { UserDataForm } from '../types/FormTypes';

const generateLargeUserList = (count: number): UserDataForm[] => {
  const firstNames = [
    'James',
    'Mary',
    'John',
    'Patricia',
    'Robert',
    'Jennifer',
    'Michael',
    'Linda',
    'William',
    'Elizabeth',
  ];
  const lastNames = [
    'Smith',
    'Johnson',
    'Williams',
    'Brown',
    'Jones',
    'Garcia',
    'Miller',
    'Davis',
    'Rodriguez',
    'Martinez',
  ];
  const roles = [
    'Developer',
    'Designer',
    'Manager',
    'QA Engineer',
    'DevOps',
    'Data Scientist',
    'Admin',
  ];

  const users: UserDataForm[] = [];

  for (let i = 1; i <= count; i++) {
    const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
    const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
    const role = roles[Math.floor(Math.random() * roles.length)];

    users.push({
      id: i,
      name: `${firstName} ${lastName}`,
      role: role,
    });
  }

  return users;
};

export const USER_DATA = generateLargeUserList(2000);
