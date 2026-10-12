export enum UserRole {
  CANDIDATE = 'candidate',
  EMPLOYER = 'employer',
  ADMIN = 'admin',
}

export enum EmploymentType {
  FULL_TIME = 'full-time',
  PART_TIME = 'part-time',
  CONTRACT = 'contract',
  FREELANCE = 'freelance',
  INTERNSHIP = 'internship',
}

export enum WorkSchedule {
  OFFICE = 'office',
  REMOTE = 'remote',
  HYBRID = 'hybrid',
}

export enum Gender {
  MALE = 'male',
  FEMALE = 'female',
  OTHER = 'other',
}

export enum RequestStatus {
  PENDING = 'pending',
  ACCEPTED = 'accepted',
  REJECTED = 'rejected',
  INTERVIEW = 'interview',
}

export enum VacancyStatus {
  ACTIVE = 'active',
  PAUSED = 'paused',
  CLOSED = 'closed',
}

export enum CandidateVacancyStatus {
  RECOMMENDED = 'recommended',
  POTENTIAL = 'potential',
  REJECTED = 'rejected',
  NEW = 'new',
}

export enum InterviewType {
  SCREENING = 'screening',
  TECHNICAL = 'technical',
  HR = 'hr',
  FINAL = 'final',
}

export enum InterviewStatus {
  SCHEDULED = 'scheduled',
  COMPLETED = 'completed',
  CANCELLED = 'cancelled',
  RESCHEDULED = 'rescheduled',
}

export enum MeetingType {
  GOOGLE_MEET = 'google_meet',
  ZOOM = 'zoom',
  TEAMS = 'teams',
  OFFLINE = 'offline',
}

export enum SenderType {
  EMPLOYER = 'employer',
  CANDIDATE = 'candidate',
}

export enum TestType {
  TECHNICAL = 'technical',
  SOFT_SKILLS = 'soft_skills',
  LANGUAGE = 'language',
  LOGIC = 'logic',
}

export enum CandidateTestStatus {
  NOT_STARTED = 'not_started',
  IN_PROGRESS = 'in_progress',
  COMPLETED = 'completed',
}

export enum ApplicationStatus {
  SENT = 'sent',
  VIEWED = 'viewed',
  INTERVIEW = 'interview',
  OFFER = 'offer',
  REJECTED = 'rejected',
  ACCEPTED = 'accepted',
}
