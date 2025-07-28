import { UserInfo } from '@/types/types';
import { BaseApiClient } from '../base-api';

class UserApiClient extends BaseApiClient {
  async getUserInfo(): Promise<UserInfo> {
    return this.request<UserInfo>('/users/userinfo');
  }

  async updateUserInfo(data: Partial<UserInfo>): Promise<UserInfo> {
    return this.request<UserInfo>('/users/userinfo', {
      method: 'PATCH',
      body: JSON.stringify(data),
    });
  }
}

export const userApi = new UserApiClient();