import * as userApi from './api';

describe('users', () => {
  describe('user(id: String!): User', () => {
    it('returns a user when user can be found', async () => {
      const result = await userApi.user({ id: '1' });

      expect(result.data).toMatchSnapshot();
    });
    it('returns null when user cannot be found', async () => {
      const result = await userApi.user({ id: '42' });

      expect(result.data).toMatchSnapshot();
    });
  });

  describe('deleteUser(id: String!): Boolean!', () => {
    it('returns an error because only admins can delete a user', async () => {
      const {
        data: {
          data: {
            signIn: { token }
          }
        }
      } = await userApi.signIn({
        login: 'ddavids',
        password: 'ddavids'
      });

      const {
        data: { errors },
      } = await userApi.deleteUser({ id: '1' }, token);

      expect(errors[0].message).toEqual('Not authorized as admin.');

    });
  });
});
