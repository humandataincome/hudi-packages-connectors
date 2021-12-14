
export interface PersonalInformation {
    firstName?: string;
    middleName?: string;
    lastName?: string;
    emails?: Array<string>;
    birthdate?: DateLongFormat;
    gender?: string;
    currentCity?: string;
    homeTown?: string;
    relationship?: Relationship;
    educationExperiences?: Array<EducationExperience>;
    workExperience?: Array<WorkExperience>;
    languages?: Array<string>;
    interestedIn?: Array<string>; //interest in other genders
    politicalView?: View;
    religiousView?: View;
    bloodInfo?: string;
    websites?: Array<string>;
    address?: Location;
    phoneNumbers?: Array<string>;
    placesLived?: Array<PlaceLived>;
    pagesInterests?: Array<Pages>;
    registrationTimestamp?: Date;
    profileUri?: string;
}

export interface Relationship {
    status: string,
    anniversary: DateLongFormat,
    timestamp: Date
}
export interface Location {
    street?: string;
    city?: string;
    zipcode?: number;
    neighborhood?: string;
    country?: string;
    country_code?: string;
    region?: string;
}

export interface EducationExperience {
    name?: string;
    start_timestamp?: Date;
    end_timestamp?: Date;
    graduated?: boolean;
    description?: string;
    concentrations?: Array<string>;
    degree?: string;
    school_type?: string;
    timestamp?: Date;
}

export interface WorkExperience {
    employer?: string;
    title?: string;
    location?: string;
    description?: string;
    start_timestamp?: Date;
    end_timestamp?: Date;
    timestamp?: Date;
}

export interface PlaceLived {
    place?: string;
    start_timestamp?: Date;
    timestamp?: Date;
}

export interface Pages {
    category?: string;
    pages?: Array<string>;
}

export interface DateLongFormat {
    year: number;
    month: number;
    day: number;
}

export interface View {
    name?: string;
    description?: string;
    timestamp?: Date;
}