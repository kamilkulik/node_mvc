import { MapperService } from '../mapper-service';

describe('MapperService', () => {
  describe('', () => {
    it('', () => {
      class User {
        constructor(public id: number, public username: string, public password: string) {}
      }

      class UserResponseDTO {
        public id: number;
        public username: string;
        constructor({ id, username }: UserResponseProps) {
          this.id = id;
          this.username = username;
        }
      }

      const user = new User(1, 'Doge', 'MuchWow');
      const mapper = new MapperService();
      const userResponse = mapper.mapToDTO<User, UserResponseDTO>(user, UserResponseDTO);

      expect(userResponse.id).toBe(user.id);
      expect(userResponse.username).toBe(user.username);
      // expect(userResponse.password).toBeUndefined();
    });
  });
});

type UserResponseProps = {
  id: number;
  username: string;
};
