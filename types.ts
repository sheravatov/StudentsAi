
export type Language = 'uz' | 'ru' | 'en';

export enum UserStatus {
  STUDENT = 'TALABA',
  WORKER = 'ISHCHI',
  PUPIL = 'O\'QUVCHI'
}

// Added AppRole used in Sidebar.tsx and DashboardView.tsx
export enum AppRole {
  ADMIN = 'ADMIN',
  STUDENT = 'STUDENT'
}

// Added RequestType used in DashboardView.tsx, QuizForm.tsx, etc.
export enum RequestType {
  DOCUMENT_PARSE = 'DOCUMENT_PARSE',
  ADMIN_REQUEST = 'ADMIN_REQUEST',
  CERTIFICATE_QUIZ = 'CERTIFICATE_QUIZ',
  STUDENT_ANALYSIS = 'STUDENT_ANALYSIS'
}

export interface UserProfile {
  id: number;
  username: string;
  full_name: string;
  phone?: string;
  location?: string;
  status?: UserStatus;
  is_blocked: boolean;
  score: number;
  solved_quizzes: number;
  rank: number;
  joined_date: string;
  is_admin: boolean;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: {
    A: string;
    B: string;
    C: string;
    D: string;
  };
  correct_answer: string;
  explanation: string;
  image_url?: string;
}

export interface QuizPackage {
  id: string;
  title: string;
  subject: string;
  questions: QuizQuestion[];
  created_at: string;
  difficulty: 'easy' | 'medium' | 'hard';
  language: Language;
}

// Added UserResult for tracking test performance
export interface UserResult {
  quiz_id: string;
  score: number;
  total: number;
  date: string;
}

// Added StudentAnalysis for performance feedback visualization
export interface StudentAnalysis {
  summary: {
    accuracy: number;
    strong_topics: string[];
    weak_topics: string[];
  };
  recommendations: string[];
}

// Added CertSubject for National Certificate modules
export interface CertSubject {
  id: string;
  name: string;
  icon: string;
  total_questions: number;
  questions: any[];
}
