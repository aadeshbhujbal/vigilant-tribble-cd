// Document and organization types

export interface Document {
  id: string;
  fileName: string;
  originalName: string;
  fileType: 'pdf' | 'docx' | 'txt' | 'other';
  fileSize: number; // in bytes
  uploadedAt: Date;
  uploadedBy: string;
  organization: string;
  status: 'uploaded' | 'processing' | 'processed' | 'failed' | 'archived';
  processingDetails?: {
    chunks: number;
    embeddings: number;
    processingTime: number;
    pythonServiceId: string;
  };
  metadata: {
    title?: string;
    author?: string;
    creationDate?: Date;
    lastModified?: Date;
    pageCount?: number;
    language?: string;
    keywords?: string[];
  };
  tags: string[];
  isPublic: boolean;
}

export interface Organization {
  id: string;
  name: string;
  type: 'financial-institution' | 'corporation' | 'government' | 'non-profit' | 'other';
  industry: string;
  size: 'small' | 'medium' | 'large' | 'enterprise';
  region: string;
  country: string;
  climateRiskProfile: 'low' | 'medium' | 'high' | 'critical';
  complianceRequirements: string[];
  createdAt: Date;
  updatedAt: Date;
  status: 'active' | 'inactive' | 'suspended';
  contactInfo: {
    primaryContact: string;
    email: string;
    phone?: string;
    address?: string;
  };
  subscription: {
    plan: 'basic' | 'professional' | 'enterprise';
    startDate: Date;
    endDate: Date;
    features: string[];
    limits: {
      maxDocuments: number;
      maxSubmissions: number;
      maxUsers: number;
      storageLimit: number; // in GB
    };
  };
}

export interface User {
  id: string;
  username: string;
  email: string;
  fullName: string;
  organizationId: string;
  role: 'admin' | 'manager' | 'analyst' | 'viewer';
  permissions: string[];
  lastLogin?: Date;
  createdAt: Date;
  updatedAt: Date;
  status: 'active' | 'inactive' | 'suspended';
  preferences: {
    language: string;
    timezone: string;
    notifications: {
      email: boolean;
      push: boolean;
      sms: boolean;
    };
    theme: 'light' | 'dark' | 'auto';
  };
}
