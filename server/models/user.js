class User {
  constructor(id, username, password, role) {
    this.id = id;
    this.username = username;
    this.password = password;
    this.role = role; // 'admin' or 'user'
  }
}

module.exports = User;