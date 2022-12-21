export interface BloodAnalysisModel {
    list: TestModel[];
}

export interface TestModel {
    test: string;
    result: string;
    unit: string;
    range: string;
}
