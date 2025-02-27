const userRepository = require('../repositories/user.repository');

class UserService {
  async getAllUsers() {
    return await userRepository.findAll();
  }

  async getUserById(id) {
    return await userRepository.findById(id);
  }

  async createUser(userData) {
    return await userRepository.create(userData);
  }
}

module.exports = new UserService();