const fs = require('fs');
const path = require('path');
const logger = require('./logger');

/**
 * Utilitário para rotação automática de logs
 * Monitora tamanho e idade dos arquivos de log
 */
class LogRotator {
  constructor() {
    this.logDir = path.join(__dirname, '../../logs');
    this.maxSizeMB = parseInt(process.env.LOG_MAX_SIZE_MB) || 50;
    this.maxDays = parseInt(process.env.LOG_MAX_DAYS) || 7;
    this.rotationEnabled = process.env.LOG_ROTATION_ENABLED !== 'false';
    this.logFiles = ['combined.log', 'error.log'];
  }

  /**
   * Converte MB para bytes
   */
  mbToBytes(mb) {
    return mb * 1024 * 1024;
  }

  /**
   * Converte dias para milissegundos
   */
  daysToMs(days) {
    return days * 24 * 60 * 60 * 1000;
  }

  /**
   * Gera nome do arquivo de backup com data
   */
  generateBackupName(originalName) {
    const now = new Date();
    const dateStr = now.toISOString().split('T')[0]; // YYYY-MM-DD
    const timeStr = now.toTimeString().split(' ')[0].replace(/:/g, '-'); // HH-MM-SS
    const ext = path.extname(originalName);
    const baseName = path.basename(originalName, ext);
    
    return `${baseName}-${dateStr}-${timeStr}${ext}`;
  }

  /**
   * Verifica se arquivo excede tamanho máximo
   */
  checkFileSize(filePath) {
    try {
      const stats = fs.statSync(filePath);
      const fileSizeBytes = stats.size;
      const maxSizeBytes = this.mbToBytes(this.maxSizeMB);
      
      return fileSizeBytes > maxSizeBytes;
    } catch (error) {
      return false;
    }
  }

  /**
   * Verifica se arquivo excede idade máxima
   */
  checkFileAge(filePath) {
    try {
      const stats = fs.statSync(filePath);
      const fileAge = Date.now() - stats.mtime.getTime();
      const maxAge = this.daysToMs(this.maxDays);
      
      return fileAge > maxAge;
    } catch (error) {
      return false;
    }
  }

  /**
   * Cria backup do arquivo e limpa o original
   */
  async rotateFile(filePath) {
    try {
      const fileName = path.basename(filePath);
      const backupName = this.generateBackupName(fileName);
      const backupPath = path.join(this.logDir, backupName);
      
      // Copiar arquivo para backup
      fs.copyFileSync(filePath, backupPath);
      
      // Limpar arquivo original
      fs.writeFileSync(filePath, '');
      
      logger.info('Log rotacionado', {
        original: fileName,
        backup: backupName,
        service: 'log-rotator'
      });
      
      return true;
    } catch (error) {
      logger.error('Erro ao rotacionar log', {
        filePath,
        error: error.message,
        service: 'log-rotator'
      });
      return false;
    }
  }

  /**
   * Remove backups antigos
   */
  async cleanOldBackups() {
    try {
      const files = fs.readdirSync(this.logDir);
      const backupFiles = files.filter(file => 
        file.includes('-') && 
        (file.includes('combined-') || file.includes('error-')) &&
        file.endsWith('.log')
      );
      
      const maxAge = this.daysToMs(this.maxDays * 2); // Manter backups por 2x o tempo
      let deletedCount = 0;
      
      for (const file of backupFiles) {
        const filePath = path.join(this.logDir, file);
        const stats = fs.statSync(filePath);
        const fileAge = Date.now() - stats.mtime.getTime();
        
        if (fileAge > maxAge) {
          fs.unlinkSync(filePath);
          deletedCount++;
        }
      }
      
      if (deletedCount > 0) {
        logger.info('Backups antigos removidos', {
          count: deletedCount,
          service: 'log-rotator'
        });
      }
    } catch (error) {
      logger.error('Erro ao limpar backups antigos', {
        error: error.message,
        service: 'log-rotator'
      });
    }
  }

  /**
   * Executa verificação e rotação se necessário
   */
  async checkAndRotate() {
    if (!this.rotationEnabled) {
      return;
    }

    try {
      // Criar diretório de logs se não existir
      if (!fs.existsSync(this.logDir)) {
        fs.mkdirSync(this.logDir, { recursive: true });
      }

      for (const fileName of this.logFiles) {
        const filePath = path.join(this.logDir, fileName);
        
        if (fs.existsSync(filePath)) {
          const exceedsSize = this.checkFileSize(filePath);
          const exceedsAge = this.checkFileAge(filePath);
          
          if (exceedsSize || exceedsAge) {
            const reason = exceedsSize ? 'tamanho' : 'idade';
            logger.info('Iniciando rotação de log', {
              file: fileName,
              reason,
              service: 'log-rotator'
            });
            
            await this.rotateFile(filePath);
          }
        }
      }
      
      // Limpar backups antigos
      await this.cleanOldBackups();
      
    } catch (error) {
      logger.error('Erro na verificação de rotação', {
        error: error.message,
        service: 'log-rotator'
      });
    }
  }

  /**
   * Inicia monitoramento automático
   */
  startAutoRotation(intervalMinutes = 60) {
    if (!this.rotationEnabled) {
      logger.info('Rotação automática de logs desabilitada');
      return;
    }

    logger.info('Iniciando rotação automática de logs', {
      maxSizeMB: this.maxSizeMB,
      maxDays: this.maxDays,
      intervalMinutes,
      service: 'log-rotator'
    });

    // Verificação inicial
    this.checkAndRotate();

    // Verificação periódica
    setInterval(() => {
      this.checkAndRotate();
    }, intervalMinutes * 60 * 1000);
  }

  /**
   * Obter estatísticas dos logs
   */
  getStats() {
    const stats = {
      enabled: this.rotationEnabled,
      config: {
        maxSizeMB: this.maxSizeMB,
        maxDays: this.maxDays
      },
      files: []
    };

    for (const fileName of this.logFiles) {
      const filePath = path.join(this.logDir, fileName);
      
      if (fs.existsSync(filePath)) {
        const fileStats = fs.statSync(filePath);
        const sizeMB = (fileStats.size / 1024 / 1024).toFixed(2);
        const ageHours = Math.floor((Date.now() - fileStats.mtime.getTime()) / (1000 * 60 * 60));
        
        stats.files.push({
          name: fileName,
          sizeMB: parseFloat(sizeMB),
          ageHours,
          needsRotation: this.checkFileSize(filePath) || this.checkFileAge(filePath)
        });
      }
    }

    return stats;
  }
}

// Criar instância única
const logRotator = new LogRotator();

module.exports = logRotator;
