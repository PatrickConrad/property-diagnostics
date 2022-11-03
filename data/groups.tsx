import { Group } from "../types/dataTypes";

export const groups: Group[] = [
    {
        id: '0',
        name: 'test',
        members: [{id: '1', status: "active"}, {id: '5', status: "active"}]
    },
    {
        id: '1',
        name: 'Test2',
        members: [{id: '4', status: "active"}, {id: '5', status: "active"}, {id: '3', status: "active"}]
    },
    {
        id: '2',
        name: 'Test8',
        members: [{id: '4', status: "active"}, {id: '3', status: "active"}]
    },
    {
        id: '3',
        name: 'Test4',
        members: [{id: '3', status: "active"}, {id: '4', status: "active"}, {id: '5', status: "active"}]
    },
    {
        id: '4',
        name: 'Test5',
        members: [{id: '3', status: "active"}, {id: '5', status: "active"}]
    }
]