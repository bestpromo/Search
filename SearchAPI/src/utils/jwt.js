const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

/**
 * Gera um token JWT para o usuário
 * @param {Object} payload - Dados do usuário para incluir no token
 * @param {string} [expiresIn='24h'] - Tempo de expiração do token
 * @returns {string} Token JWT
 */
function generateToken(payload, expiresIn = '24h') {
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn });
}

/**
 * Verifica e decodifica um token JWT
 * @param {string} token - Token JWT para verificar
 * @returns {Object} Payload decodificado
 */
function verifyToken(token) {
  return jwt.verify(token, process.env.JWT_SECRET);
}

/**
 * Gera hash de uma senha
 * @param {string} password - Senha em texto plano
 * @returns {Promise<string>} Hash da senha
 */
async function hashPassword(password) {
  const saltRounds = 12;
  return bcrypt.hash(password, saltRounds);
}

/**
 * Compara uma senha com seu hash
 * @param {string} password - Senha em texto plano
 * @param {string} hash - Hash da senha
 * @returns {Promise<boolean>} True se as senhas coincidem
 */
async function comparePassword(password, hash) {
  return bcrypt.compare(password, hash);
}

module.exports = {
  generateToken,
  verifyToken,
  hashPassword,
  comparePassword
};
