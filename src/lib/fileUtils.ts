import { DANGEROUS_EXTENSIONS } from '../constants/fileTypes';

export const getFileExtension = (filename: string): string => {
  const lastDotIndex = filename.lastIndexOf('.');
  return lastDotIndex !== -1 ? filename.substring(lastDotIndex).toLowerCase() : '';
};

export const formatBytes = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`;
};

export const isSuspiciousFileName = (filename: string): boolean => {
  const fileExtension = getFileExtension(filename).toLowerCase();
  const hasDangerousExtension = DANGEROUS_EXTENSIONS.some(
    (ext: string) => fileExtension === `.${ext}`,
  );

  if (hasDangerousExtension) return true;

  const suspiciousPatterns = [
    /^\./, // Hidden files
    /[<>:"|?*]/, // Invalid characters
    /\.{2,}/, // Multiple dots
    /^\.+$/, // Only dots
    /\.(exe|bat|cmd|com|scr|pif|vbs|js|jar|php|asp|aspx|jsp)$/i,
    /\.(sh|bash|zsh|fish|ps1|psm1)$/i,
    /\.(sql|db|sqlite|sqlite3)$/i,
    /\.(log|tmp|temp|bak|backup)$/i,
  ];

  return suspiciousPatterns.some(pattern => pattern.test(filename));
};
