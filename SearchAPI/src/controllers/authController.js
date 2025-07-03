const { generateToken, hashPassword, comparePassword, verifyToken } = require('../utils/jwt');
const logger = require('../utils/logger');

// Simulação de banco de dados em memória (substitua por um banco real)
const users = [
  {
    id: 1,
    email: 'admin@bestpromo.live',
    password: '$2b$12$L0bei8dLap8486Iw4uIv6uG7BIr2yWLeZBun7fX5AqvPfmFGWElyu', // senha: admin123
    name: 'Administrador',
    role: 'admin'
  },
  {
    id: 2,
    email: 'user@bestpromo.live',
    password: '$2b$12$HWlqidFJwa8bxUe6Hzusy.k/chfIiqjGSMrBCNftWS/ixoBcH1ltG', // senha: user123
    name: 'Usuário',
    role: 'user'
  }
];

/**
 * Endpoint de login
 */
async function login(req, res) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        error: 'Email e senha são obrigatórios'
      });
    }

    // Buscar usuário por email
    const user = users.find(u => u.email === email);
    
    if (!user) {
      logger.warn('Tentativa de login com email não encontrado', { email });
      return res.status(401).json({
        error: 'Credenciais inválidas'
      });
    }

    // Verificar senha
    const isValidPassword = await comparePassword(password, user.password);
    
    if (!isValidPassword) {
      logger.warn('Tentativa de login com senha incorreta', { email });
      return res.status(401).json({
        error: 'Credenciais inválidas'
      });
    }

    // Gerar tokens
    const accessToken = generateToken(
      { 
        id: user.id, 
        email: user.email, 
        name: user.name, 
        role: user.role 
      },
      '15m' // Token de acesso expira em 15 minutos
    );

    const refreshToken = generateToken(
      { 
        id: user.id, 
        type: 'refresh' 
      },
      '7d' // Token de refresh expira em 7 dias
    );

    logger.info('Login realizado com sucesso', { 
      userId: user.id, 
      email: user.email 
    });

    res.json({
      message: 'Login realizado com sucesso',
      accessToken,
      refreshToken,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role
      }
    });

  } catch (error) {
    logger.error('Erro no login', { error: error.message });
    res.status(500).json({
      error: 'Erro interno do servidor'
    });
  }
}

/**
 * Endpoint de registro
 */
async function register(req, res) {
  try {
    const { email, password, name } = req.body;

    if (!email || !password || !name) {
      return res.status(400).json({
        error: 'Email, senha e nome são obrigatórios'
      });
    }

    // Verificar se o usuário já existe
    const existingUser = users.find(u => u.email === email);
    if (existingUser) {
      return res.status(409).json({
        error: 'Usuário já existe com este email'
      });
    }

    // Criar novo usuário
    const hashedPassword = await hashPassword(password);
    const newUser = {
      id: users.length + 1,
      email,
      password: hashedPassword,
      name,
      role: 'user'
    };

    users.push(newUser);

    logger.info('Usuário registrado com sucesso', { 
      userId: newUser.id, 
      email: newUser.email 
    });

    res.status(201).json({
      message: 'Usuário registrado com sucesso',
      user: {
        id: newUser.id,
        email: newUser.email,
        name: newUser.name,
        role: newUser.role
      }
    });

  } catch (error) {
    logger.error('Erro no registro', { error: error.message });
    res.status(500).json({
      error: 'Erro interno do servidor'
    });
  }
}

/**
 * Endpoint de refresh token
 */
async function refreshToken(req, res) {
  try {
    const { refreshToken } = req.body;

    if (!refreshToken) {
      return res.status(400).json({
        error: 'Refresh token é obrigatório'
      });
    }

    const decoded = verifyToken(refreshToken);
    
    if (decoded.type !== 'refresh') {
      return res.status(403).json({
        error: 'Token inválido'
      });
    }

    // Buscar usuário
    const user = users.find(u => u.id === decoded.id);
    if (!user) {
      return res.status(403).json({
        error: 'Usuário não encontrado'
      });
    }

    // Gerar novo access token
    const newAccessToken = generateToken(
      { 
        id: user.id, 
        email: user.email, 
        name: user.name, 
        role: user.role 
      },
      '15m'
    );

    logger.info('Token renovado com sucesso', { 
      userId: user.id, 
      email: user.email 
    });

    res.json({
      accessToken: newAccessToken
    });

  } catch (error) {
    logger.error('Erro no refresh token', { error: error.message });
    res.status(403).json({
      error: 'Refresh token inválido ou expirado'
    });
  }
}

/**
 * Endpoint de informações do usuário
 */
function me(req, res) {
  res.json({
    user: req.user
  });
}

module.exports = {
  login,
  register,
  refreshToken,
  me,
  users // Exportar usuários para outros controllers
};
