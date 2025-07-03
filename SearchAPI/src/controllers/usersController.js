const logger = require('../utils/logger');

// Importar usuários do authController (em um projeto real, isso seria um banco de dados)
const { users } = require('./authController');

/**
 * Listar todos os usuários (apenas admin)
 */
function listUsers(req, res) {
  try {
    const usersWithoutPassword = users.map(user => ({
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role
    }));

    logger.info('Lista de usuários consultada', { 
      adminId: req.user.id,
      totalUsers: usersWithoutPassword.length 
    });

    res.json({
      users: usersWithoutPassword,
      total: usersWithoutPassword.length
    });
  } catch (error) {
    logger.error('Erro ao listar usuários', { error: error.message });
    res.status(500).json({
      error: 'Erro interno do servidor'
    });
  }
}

/**
 * Obter detalhes de um usuário específico
 */
function getUser(req, res) {
  try {
    const userId = parseInt(req.params.userId);
    const user = users.find(u => u.id === userId);

    if (!user) {
      return res.status(404).json({
        error: 'Usuário não encontrado'
      });
    }

    const userWithoutPassword = {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role
    };

    logger.info('Detalhes do usuário consultados', { 
      requestedUserId: userId,
      requesterId: req.user.id 
    });

    res.json({ user: userWithoutPassword });
  } catch (error) {
    logger.error('Erro ao obter usuário', { error: error.message });
    res.status(500).json({
      error: 'Erro interno do servidor'
    });
  }
}

/**
 * Atualizar papel de um usuário (apenas admin)
 */
function updateUserRole(req, res) {
  try {
    const userId = parseInt(req.params.userId);
    const { role } = req.body;

    if (!role || !['admin', 'user'].includes(role)) {
      return res.status(400).json({
        error: 'Papel inválido. Use "admin" ou "user"'
      });
    }

    const userIndex = users.findIndex(u => u.id === userId);
    
    if (userIndex === -1) {
      return res.status(404).json({
        error: 'Usuário não encontrado'
      });
    }

    // Não permitir que o usuário altere seu próprio papel
    if (userId === req.user.id) {
      return res.status(403).json({
        error: 'Você não pode alterar seu próprio papel'
      });
    }

    users[userIndex].role = role;

    logger.info('Papel do usuário atualizado', { 
      targetUserId: userId,
      newRole: role,
      adminId: req.user.id 
    });

    res.json({
      message: 'Papel do usuário atualizado com sucesso',
      user: {
        id: users[userIndex].id,
        email: users[userIndex].email,
        name: users[userIndex].name,
        role: users[userIndex].role
      }
    });
  } catch (error) {
    logger.error('Erro ao atualizar papel do usuário', { error: error.message });
    res.status(500).json({
      error: 'Erro interno do servidor'
    });
  }
}

module.exports = {
  listUsers,
  getUser,
  updateUserRole
};
