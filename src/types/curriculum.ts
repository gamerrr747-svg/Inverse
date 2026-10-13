export type Language = 'en' | 'kk';

export interface LearningObjective {
  code: string;
  en: string;
  kk: string;
}

export interface LessonStage {
  nameEn: string;
  nameKk: string;
  timeMinutes: number;
  teacherActivityEn: string;
  teacherActivityKk: string;
  learnerActivityEn: string;
  learnerActivityKk: string;
  assessmentEn: string;
  assessmentKk: string;
}

export interface WorksheetQuestion {
  id: string;
  section: string;
  prompt: string;
  promptKk?: string;
  options?: string[];
  correctAnswer: string;
  acceptableAnswers?: string[];
  explanationEn: string;
  explanationKk: string;
  hintEn?: string;
  hintKk?: string;
  hasInput?: boolean;
}

export interface WorksheetData {
  lessonId: number;
  titleEn: string;
  titleKk: string;
  sections: {
    name: string;
    descriptionEn: string;
    descriptionKk: string;
    questions: WorksheetQuestion[];
  }[];
}

export interface MatchingCard {
  id: string;
  type: 'expression' | 'angle';
  content: string;
  matchId: string;
}

export interface Misconception {
  id: string;
  titleEn: string;
  titleKk: string;
  wrongEn: string;
  wrongKk: string;
  rightEn: string;
  rightKk: string;
  explanationEn: string;
  explanationKk: string;
}

export interface RubricDescriptor {
  criterionEn: string;
  criterionKk: string;
  task: string;
  descriptorEn: string;
  descriptorKk: string;
  mark: number;
}

export interface AssessmentTask {
  number: string;
  promptEn: string;
  promptKk: string;
  marks: number;
  solutionEn: string;
  solutionKk: string;
  subtasks?: {
    label: string;
    promptEn: string;
    promptKk: string;
    answer: string;
    explanationEn: string;
    explanationKk: string;
  }[];
}

export interface AssessmentVariant {
  variantNumber: 1 | 2;
  tasks: AssessmentTask[];
}
