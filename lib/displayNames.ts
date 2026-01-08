// lib/displayNames.ts

import {
  StudentSkillLevel,
  StudentStatus,
  StudentRelationship,
  AccountRole,
  OfferingType,
  CoachStatus,
} from '@prisma/client';

// ---------------------------------------------
// Student Skill Levels
// ---------------------------------------------
export const STUDENT_SKILL_LEVEL_LABELS: Record<StudentSkillLevel, string> = {
  BEGINNER: 'Beginner',
  ADVANCED_BEGINNER: 'Advanced Beginner',
  INTERMEDIATE: 'Intermediate',
  ADVANCED_INTERMEDIATE: 'Advanced Intermediate',
  ADVANCED: 'Advanced',
  EXPERT: 'Expert',
  EXPERT_PRO: 'Expert Pro',
};

// ---------------------------------------------
// Student Status
// ---------------------------------------------
export const STUDENT_STATUS_LABELS: Record<StudentStatus, string> = {
  ACTIVE: 'Active',
  INACTIVE: 'Inactive',
  ARCHIVED: 'Archived',
};

// ---------------------------------------------
// Student Relationship (Account ↔ Student)
// ---------------------------------------------
export const STUDENT_RELATIONSHIP_LABELS: Record<StudentRelationship, string> = {
  SELF: 'Self',
  CHILD: 'Child',
  SPOUSE: 'Spouse',
  OTHER: 'Other',
};

// ---------------------------------------------
// Account Role
// ---------------------------------------------
export const ACCOUNT_ROLE_LABELS: Record<AccountRole, string> = {
  ADMIN: 'Admin',
  COACH: 'Coach',
  STUDENT: 'Student',
};

// ---------------------------------------------
// Offering Types
// ---------------------------------------------
export const OFFERING_TYPE_LABELS: Record<OfferingType, string> = {
  PRIVATE_LESSON: 'Private Lesson',
  GROUP_CLASS: 'Group Class',
  CLINIC: 'Clinic',
  RETREAT: 'Retreat',
};

// ---------------------------------------------
// Coach Status
// ---------------------------------------------
export const COACH_STATUS_LABELS: Record<CoachStatus, string> = {
  ACTIVE: 'Active',
  PENDING: 'Pending',
  INACTIVE: 'Inactive',
};

//
//example code
//{Object.entries(STUDENT_SKILL_LEVEL_LABELS).map(([value, label]) => (
//<option key={value} value={value}>
//    {label}
//  </option>
//))}
//
//const display = STUDENT_SKILL_LEVEL_LABELS[student.skillLevelCoach];


