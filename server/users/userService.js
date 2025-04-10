const User = require('./userModel');

exports.getUserProfile = async (userId) => {
  const user = await User.findByPk(userId, {
    attributes: ['id', 'username', 'email', 'role']
  });
  if (!user) {
    throw new Error('User not found');
  }
  return user;
};

exports.updateUserProfile = async (userId, updateData) => {
  const user = await User.findByPk(userId);
  if (!user) {
    throw new Error('User not found');
  }

  if (updateData.email && updateData.email !== user.email) {
    const existingUser = await User.findOne({ where: { email: updateData.email } });
    if (existingUser) {
      throw new Error('Email already in use');
    }
  }

  await user.update(updateData);
  return {
    id: user.id,
    username: user.username,
    email: user.email,
    role: user.role
  };
};

exports.deleteUserProfile = async (userId) => {
  const user = await User.findByPk(userId);
  if (!user) {
    throw new Error('User not found');
  }
  await user.destroy();
};