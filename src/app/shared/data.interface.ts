export interface MedicalCondition {
    name: string;
    relatedMedical: [];
    services: MedicalConditionServices;
    symptoms : [];
    synonyms : [];
    _id: string;
    description?: string;
}

export interface MedicalConditionServices {
    preventive: [];
    stage1 : MedicalConditionStage1[];
    unDiagnosed : [];
    showInList: boolean;
}

export interface MedicalConditionStage1 {
    title: string
}