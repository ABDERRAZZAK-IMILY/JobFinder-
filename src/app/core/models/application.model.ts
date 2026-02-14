export interface Application {
  id?: string;
  jobId: string;
  userId: string;
  jobTitle: string;
  companyName: string;
  status: 'Pending' | 'Accepted' | 'Rejected';
  notes: string;
  appliedDate: string;
}