// Permissions class based on the user's role.

// Data could be stored inside a permissions db table as well, instead of hardcoded here,
// if more flexibility and management from the CMS would be required.

class Permissions {
  constructor(role) {
    this.role = role;
    this.roles = [
      'admin',
      'manager',
      'user', // Default role, could be called 'member' or 'customer' as well.
      'guest',
    ];
  }

  canView() {
    return this.role === 'admin' || this.role === 'user';
  }

  canEdit() {
    return this.role === 'admin';
  }
}

class Permissions {
  constructor(role) {
    this.role = role;
    this.permissions = {
      // Define permissions for each resource and action.
      // Admins can access all records, users only their own records.
      users: {
        view: ['admin', 'user'],
        create: ['admin'],
        edit: ['admin'],
        delete: ['admin'],
      },
      posts: {
        view: ['admin', 'user', 'guest'],
        create: ['admin', 'user'],
        edit: ['admin', 'user'],
        delete: ['admin'],
      },
      // Add more resources and their permissions as needed...
    };
  }

  // Check if the role can perform an action on a resource.
  canPerformAction(resource, action) {
    if (this.permissions[resource] && this.permissions[resource][action]) {
      return this.permissions[resource][action].includes(this.role);
    }
    return false; // Return false if the resource or action is not defined.
  }

  canView(resource) {
    return this.canPerformAction(resource, 'view');
  }

  canCreate(resource) {
    return this.canPerformAction(resource, 'create');
  }

  canEdit(resource) {
    return this.canPerformAction(resource, 'edit');
  }

  canDelete(resource) {
    return this.canPerformAction(resource, 'delete');
  }
}

module.exports = Permissions;

// Usage:
// const user = new Permissions('user');
// console.log(user.canView()); // true

// const permissions = new Permissions('user');
// console.log(permissions.canView('resource1')); // true or false based on the permissions setup
// console.log(permissions.canEdit('resource1')); // true or false
// console.log(permissions.canDelete('resource1')); // true or false

// const adminPermissions = new Permissions('admin');
// console.log(adminPermissions.canView('resource2')); // true
// console.log(adminPermissions.canEdit('resource2')); // true
// console.log(adminPermissions.canDelete('resource2')); // true
