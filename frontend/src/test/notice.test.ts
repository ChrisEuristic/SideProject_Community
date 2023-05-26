import { Connection, createConnection } from "mysql2/promise";
import { addNoticePosting, getConnection, getNoticeAll, killConnection } from '../function/database/notice';

jest.mock('mysql2/promise');

const mockExecute = jest.fn();
(createConnection as jest.Mock).mockResolvedValue({
  execute: mockExecute,
  end: jest.fn(),
});

const getRandomString = (length: number) => {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
};

describe('DB Connection Test', () => {
  it('should establish and kill the connection 100 times', async () => {
    for (let i = 0; i < 100; i++) {
      const connection: Connection = await getConnection();
      expect(createConnection).toBeCalledTimes(i + 1);
      await killConnection(connection);
      expect(connection.end).toBeCalledTimes(i + 1);
    }
  });
});

// describe('Notice Test', () => {
//   it('should fetch and insert notice 100 times', async () => {
//     for (let i = 0; i < 100; i++) {
//       mockExecute.mockResolvedValueOnce([{ title: 'test', content: 'test' }, null]);

//       const notices = await getNoticeAll();
//       // expect(notices).toHaveLength(1);
//       mockExecute.mockResolvedValueOnce([[{ title: 'test', content: 'test' }], null]);
//       expect(notices[0]).toEqual({ title: 'test', content: 'test' });

//       const randomTitle = getRandomString(10);
//       const randomContent = getRandomString(50);
//       await addNoticePosting({ title: randomTitle, content: randomContent });
//       expect(mockExecute).toBeCalledWith(`INSERT INTO NOTICE(\`title\`,\`content\`,\`writer\`) VALUES('${randomTitle}','${randomContent}','admin')`);
//     }
//   });
// });

describe('Notice Test', () => {
  it('should fetch and insert notice 100 times', async () => {
    for (let i = 0; i < 100; i++) {
      mockExecute.mockResolvedValueOnce([[{ id: i, title: 'test', content: 'test' }], null]);

      const notices = await getNoticeAll();
      expect(notices).toHaveLength(1);
      expect(notices[0]).toEqual({ id: i, title: 'test', content: 'test' });

      const randomTitle = getRandomString(10);
      const randomContent = getRandomString(50);
      await addNoticePosting({ title: randomTitle, content: randomContent });
      expect(mockExecute).toBeCalledWith(`INSERT INTO NOTICE(\`title\`,\`content\`,\`writer\`) VALUES('${randomTitle}','${randomContent}','admin')`);

      mockExecute.mockClear();
    }
  });
});
