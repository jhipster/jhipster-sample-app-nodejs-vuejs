import axios from 'axios';
import buildPaginationQueryOpts from '@/shared/sort/sorts';

export default class UserManagementService {
  public get(userId: string): Promise<any> {
    return axios.get(`api/admin/users/${userId}`);
  }

  public create(user): Promise<any> {
    return axios.post('api/admin/users', user);
  }

  public update(user): Promise<any> {
    return axios.put('api/admin/users', user);
  }

  public remove(userId: string): Promise<any> {
    return axios.delete(`api/admin/users/${userId}`);
  }

  public retrieve(req?: any): Promise<any> {
    return axios.get(`api/admin/users?${buildPaginationQueryOpts(req)}`);
  }

  public retrieveAuthorities(): Promise<any> {
    return axios.get('api/authorities');
  }
}
