import { inject, injectable } from 'inversify';
import { Constants } from '../../constants';
import UserEntity from '../../infrastructure/database/maria/entity/user/user';
import { IMariaDB } from '../../infrastructure/database/maria/interface';
import { IWinstonLogger } from '../../infrastructure/logger/interface';
import { TYPES } from '../../type';
import { IUserRepository } from './interface';

@injectable()
export default class UserRepository implements IUserRepository {
  @inject(TYPES.WinstonLogger) private logger: IWinstonLogger;
  @inject(TYPES.MariaDB) private mariaDB: IMariaDB;

  public insertUser = async (email: string, nickname: string) => {
    this.logger.debug(`UserRepository, insertUser, email: ${email}, nickname: ${nickname}`);
    return await this.mariaDB.insert<UserEntity>(Constants.USER_TABLE, {
      email,
      nickname,
      profileImage: 'https://velog.velcdn.com/images/ddalkigum/profile/cf4d440d-6dbf-4306-8ab7-2fe5073f8459/social.png',
    });
  };

  public getUserByID = async (userID: number) => {
    this.logger.debug(`UserRepository, getUserByID, userID: ${userID}`);
    return await this.mariaDB.findbyID<UserEntity>(Constants.USER_TABLE, userID);
  };

  public getUserByNickname = async (nickname: string) => {
    this.logger.debug(`UserRepository, getUserByNickname, nickname: ${nickname}`);
    return await this.mariaDB.findByColumn<UserEntity>(Constants.USER_TABLE, { nickname });
  };

  public getUserByEmail = async (email: string) => {
    this.logger.debug(`UserRepository, getUserByEmail, email: ${email}`);
    return await this.mariaDB.findByColumn<UserEntity>(Constants.USER_TABLE, { email });
  };

  public deleteUser = async (userID: number) => {
    this.logger.debug(`UserRepository, deleteUser, userID: ${userID}`);
    return await this.mariaDB.deleteByColumn<UserEntity>(Constants.USER_TABLE, { id: userID });
  };
}
