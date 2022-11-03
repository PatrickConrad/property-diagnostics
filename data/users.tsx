import {IUser} from '../types/dataTypes'

export const users: IUser[] = [
    {
        id: '0',
        firstName: 'Admin',
        lastName: 'Tester',
        email: 'admin@pdi.com',
        password: 'adminPassword',
        roles: ['admin', 'user'],
    },
    {
        id: '1',
        firstName: 'Client',
        lastName: 'Test',
        email: 'client_test@gmail.com',
        password: 'password',
        roles: ['user']
    },
    {
        id: '2',
        firstName: 'John',
        lastName: 'Doe',
        email: 'John_Doe@gmail.com',
        password: 'password2',
        roles: ['user']
    },
    {
        id: '3',
        firstName: 'Client2',
        lastName: 'Test2',
        email: 'client_test2@gmail.com',
        password: 'password',
        roles: ['user']
    },
    {
        id: '4',
        firstName: 'John2',
        lastName: 'Do2e',
        email: 'John2_Doe2@gmail.com',
        password: 'password',
        roles: ['user']
    },
    {
        id: '5',
        firstName: 'Jonny',
        lastName: 'Doey',
        email: 'Jonny_Doey@gmail.com',
        password: 'password',
        roles: ['user']
    },
    {
        id: '6',
        firstName: 'Jack',
        lastName: 'Grimes',
        email: 'jack@gmail.com',
        password: 'jack',
        roles: ['user', 'owner']
    },
    {
        id: '7',
        firstName: 'Elizabeth',
        lastName: 'HarGrimes',
        email: 'elizabethk@gmail.com',
        password: 'elizabeth',
        roles: ['user', 'admin']
    },
    {
        id: '8',
        firstName: 'Bill',
        lastName: 'Grimes',
        email: 'bill@gmail.com',
        password: 'bill',
        roles: ['user', 'owner']
    }
]