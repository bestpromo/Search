# Changelog

## [1.1.0] - 2025-07-03

### Added
- ✅ **Redis Cache** - Sistema de cache com TTL configurável
- ✅ **Cache Management** - Endpoints para administração de cache
- ✅ **Remote Redis Support** - Suporte para Redis remoto com autenticação
- ✅ **Cache Headers** - Headers X-Cache para identificar HIT/MISS
- ✅ **Scripts de Utilidade** - Scripts para limpeza e geração de hash

### Changed
- 🔄 **Middleware de Cache** - Implementação robusta com fallback
- 🔄 **Logs Detalhados** - Logging de cache hits/misses
- 🔄 **Documentação** - README atualizado com informações de cache

### Removed
- 🗑️ **redis-fallback.js** - Arquivo não utilizado
- 🗑️ **test-redis.js** - Script de teste sem autenticação

### Fixed
- 🔧 **Porta do Servidor** - Scripts atualizados para porta 3001
- 🔧 **Configuração Redis** - Suporte melhorado para Redis remoto

## [1.0.0] - 2025-07-02

### Added
- ✅ **JWT Authentication** - Sistema completo de autenticação
- ✅ **Multi-marketplace Search** - Busca em Amazon e Shopee
- ✅ **Role-based Access** - Controle de acesso admin/user
- ✅ **User Management** - Gerenciamento de usuários
- ✅ **Winston Logging** - Sistema de logs estruturado
- ✅ **Security Middleware** - Middleware de segurança personalizado
