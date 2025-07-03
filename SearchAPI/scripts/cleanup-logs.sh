#!/bin/bash

# Script de limpeza de logs
# Mantém apenas os logs dos últimos 7 dias

LOG_DIR="./logs"
DAYS_TO_KEEP=7

echo "🧹 Limpando logs antigos..."
echo "Diretório: $LOG_DIR"
echo "Mantendo logs dos últimos $DAYS_TO_KEEP dias"

# Backup dos logs atuais
if [ -f "$LOG_DIR/combined.log" ]; then
    cp "$LOG_DIR/combined.log" "$LOG_DIR/combined-$(date +%Y%m%d).log"
    echo "✅ Backup criado: combined-$(date +%Y%m%d).log"
fi

if [ -f "$LOG_DIR/error.log" ]; then
    cp "$LOG_DIR/error.log" "$LOG_DIR/error-$(date +%Y%m%d).log"
    echo "✅ Backup criado: error-$(date +%Y%m%d).log"
fi

# Limpar logs atuais
> "$LOG_DIR/combined.log"
> "$LOG_DIR/error.log"

# Remover backups antigos
find "$LOG_DIR" -name "*.log" -mtime +$DAYS_TO_KEEP -delete

echo "🎉 Limpeza concluída!"
