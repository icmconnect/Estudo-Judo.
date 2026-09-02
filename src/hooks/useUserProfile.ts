import { useState, useEffect, useCallback } from 'react';
import { UserProfile, StudyPlanGoals, DiagnosticResult } from '../types';
import { DojoStorageService } from '../services/storageService';

const DEFAULT_PROFILE: UserProfile = {
  name: 'Judoca Praticante',
  ageGroup: '18-39',
  grade: 'Branca (6º Kyu)',
  mainGoal: 'fundamentos',
  weeklyHours: 3,
  interests: ['fundamentos', 'recreativo', 'filosofia'],
  role: 'aluno',
  createdAt: new Date().toISOString(),
  lastUpdated: new Date().toISOString(),
  parentConsentApproved: true
};

export function useUserProfile() {
  const [profile, setProfileState] = useState<UserProfile>(() => 
    DojoStorageService.getProfile(DEFAULT_PROFILE)
  );

  const [diagnosticResult, setDiagnosticResultState] = useState<DiagnosticResult | null>(() => 
    DojoStorageService.getDiagnostic()
  );

  const [studyMinutes, setStudyMinutesState] = useState<number>(() => 
    DojoStorageService.getStudyMinutes(45)
  );

  // Sincronização multi-aba
  useEffect(() => {
    const handleStorageChange = () => {
      setProfileState(DojoStorageService.getProfile(DEFAULT_PROFILE));
      setDiagnosticResultState(DojoStorageService.getDiagnostic());
      setStudyMinutesState(DojoStorageService.getStudyMinutes(45));
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const updateProfile = useCallback((updates: Partial<UserProfile>) => {
    setProfileState((prev) => {
      const updated: UserProfile = {
        ...prev,
        ...updates,
        lastUpdated: new Date().toISOString()
      };
      DojoStorageService.saveProfile(updated);
      return updated;
    });
  }, []);

  const saveDiagnosticResult = useCallback((result: DiagnosticResult) => {
    setDiagnosticResultState(result);
    DojoStorageService.saveDiagnostic(result);
  }, []);

  const addStudyMinutes = useCallback((minutes: number) => {
    const newVal = DojoStorageService.addStudyMinutes(minutes);
    setStudyMinutesState(newVal);
  }, []);

  const getStudyGoals = useCallback((): StudyPlanGoals => {
    const weeklyLessons = Math.max(2, Math.min(8, Math.round((profile.weeklyHours || 3) * 1.5)));
    const dailyMins = Math.max(10, Math.min(45, Math.round(((profile.weeklyHours || 3) * 60) / 5)));
    return {
      weeklyLessonsTarget: weeklyLessons,
      dailyMinutesTarget: dailyMins,
      weeklyQuizzesTarget: Math.max(1, Math.round(weeklyLessons / 2)),
      weeklyReviewsTarget: Math.max(3, weeklyLessons * 2)
    };
  }, [profile.weeklyHours]);

  return {
    profile,
    updateProfile,
    diagnosticResult,
    saveDiagnosticResult,
    studyMinutes,
    addStudyMinutes,
    studyGoals: getStudyGoals()
  };
}
