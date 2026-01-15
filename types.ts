
export type Language = 'uz' | 'ru' | 'en';

export enum UserStatus {
  STUDENT = 'TALABA',
  WORKER = 'ISHCHI',
  PUPIL = 'O\'QUVCHI'
}

// Added missing AppRole enum used in Sidebar and DashboardView
export enum AppRole {
  ADMIN = 'ADMIN',
  STUDENT = 'STUDENT'
}

// Added missing RequestType enum used across various quiz creation and analysis components
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
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: {
    A: string;
    B: string;
    C: string;
    D: string;
    // Added index signature to allow dynamic access to options as seen in QuizCreator
    [key: string]: string;
  };
  correct_answer: string;
  explanation: string;
  // Added optional property used for question illustrations
  image_url?: string;
}

export interface QuizPackage {
  id: string;
  title: string;
  subject: string;
  questions: QuizQuestion[];
  created_at: string;
  // Added missing properties difficulty and language used in AdminDashboard and QuizCreator
  difficulty: 'easy' | 'medium' | 'hard';
  language: Language;
}

// Added missing StudentAnalysis interface used in AnalysisResult component
export interface StudentAnalysis {
  summary: {
    accuracy: number;
    strong_topics: string[];
    weak_topics: string[];
  };
  recommendations: string[];
}

// Added missing UserResult interface used for tracking student performance
export interface UserResult {
  quiz_id: string;
  score: number;
  total: number;
  date: string;
}

// Added missing CertSubject interface for certificate preparation view
export interface CertSubject {
  id: string;
  name: string;
  icon: string;
  total_questions: number;
  questions: QuizQuestion[];
}
