import type {
  DocumentUpload,
  PythonProcessingRequest,
  ProcessingStatus,
} from '../types/questionnaire';

// Utility functions for data operations

export const getDocumentUploadById = (
  id: string,
  documents: DocumentUpload[],
): DocumentUpload | undefined => {
  return documents.find(doc => doc.id === id);
};

export const getProcessingRequestById = (
  id: string,
  requests: PythonProcessingRequest[],
): PythonProcessingRequest | undefined => {
  return requests.find(req => req.id === id);
};

export const getProcessingStatusById = (
  requestId: string,
  statuses: ProcessingStatus[],
): ProcessingStatus | undefined => {
  return statuses.find(status => status.requestId === requestId);
};

export const getDocumentsByStatus = (
  status: string,
  documents: DocumentUpload[],
): DocumentUpload[] => {
  return documents.filter(doc => doc.status === status);
};

export const getProcessingRequestsByStatus = (
  status: string,
  requests: PythonProcessingRequest[],
): PythonProcessingRequest[] => {
  return requests.filter(req => req.status === status);
};

export const getProcessingRequestsByOrganization = (
  organization: string,
  requests: PythonProcessingRequest[],
): PythonProcessingRequest[] => {
  return requests.filter(req => req.organization === organization);
};

export const getCompletedRequests = (
  requests: PythonProcessingRequest[],
): PythonProcessingRequest[] => {
  return requests.filter(req => req.status === 'completed');
};

export const getPendingRequests = (
  requests: PythonProcessingRequest[],
): PythonProcessingRequest[] => {
  return requests.filter(req => req.status === 'pending');
};

export const getProcessingRequests = (
  requests: PythonProcessingRequest[],
): PythonProcessingRequest[] => {
  return requests.filter(req => req.status === 'processing');
};

export const getFailedRequests = (
  requests: PythonProcessingRequest[],
): PythonProcessingRequest[] => {
  return requests.filter(req => req.status === 'failed');
};

export const getTotalProcessingTime = (requests: PythonProcessingRequest[]): number => {
  return requests
    .filter(req => req.pythonResponse?.processingTime)
    .reduce((total, req) => total + (req.pythonResponse?.processingTime || 0), 0);
};

export const getAverageProcessingTime = (requests: PythonProcessingRequest[]): number => {
  const completedRequests = requests.filter(req => req.pythonResponse?.processingTime);
  if (completedRequests.length === 0) return 0;

  const totalTime = getTotalProcessingTime(requests);
  return totalTime / completedRequests.length;
};

export const getDocumentsByFileType = (
  fileType: string,
  documents: DocumentUpload[],
): DocumentUpload[] => {
  return documents.filter(doc => doc.fileType === fileType);
};

export const getTotalFileSize = (documents: DocumentUpload[]): number => {
  return documents.reduce((total, doc) => total + doc.fileSize, 0);
};

export const getAverageFileSize = (documents: DocumentUpload[]): number => {
  if (documents.length === 0) return 0;
  return getTotalFileSize(documents) / documents.length;
};
