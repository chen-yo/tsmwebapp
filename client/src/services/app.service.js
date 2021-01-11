import axios from 'axios';

class ReportService {
  instanceId = Math.random();

  getDistinctValues() {
    return axios.get('/api/filters/distinct').then(res => res.data);
  }

  getSelectedFilters() {
    return axios.get('/api/filters').then(res => res.data);
  }

  saveSelectedFilters(filters) {
    return axios.post('/api/filters', filters).then(res => res.data);
  }

  getCountryErDay() {
    return axios.get('/api/dashboard/country_er_day').then(res => res.data);
  }

  getUsers() {
    return axios.get('/api/users').then(res => res.data);
  }

  updateUser(modifiedUser) {
    return axios.put('/api/users', modifiedUser).then(res => res.data);
  }

  deleteUser(id) {
    return axios.delete('/api/users/' + id).then(res => res.data);
  }

  addUser(user) {
    return axios.post('/api/users', user).then(res => res.data);
  }
}

const service = new ReportService();

export default service;
