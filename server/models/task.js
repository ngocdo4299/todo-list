class Task {
  constructor(id, name, description, location = 'Estonia', completed = false, createdBy = null, completedBy) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.location = location;
    this.completed = completed;
    this.createdBy = createdBy;
    this.completedBy = completedBy;
    this.createdAt = new Date().toISOString();
  }
}

module.exports = Task;
