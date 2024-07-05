export type ConnectorErrorEnum =
    | ValidationErrorEnum
    | ProcessorErrorEnums
    | DescriptorErrorEnum;

export enum ValidationErrorEnum {
    LANGUAGE_ERROR = 'CON-001',
    MISSING_FILE_ERROR = 'CON-002',
    FILE_EXTENSION_ERROR = 'CON-003',
    ZIPPING_FILE_ERROR = 'CON-004',
    NOT_VALID_FILES_ERROR = 'CON-009',
    NO_USEFUL_FILES_ERROR = 'CON-010',
    VALIDATED_FILES_TOO_BIG = 'CON-011',
}

export enum DescriptorErrorEnum {
    SOURCE_NAME_ERROR = 'CON-101',
    SOURCE_PROCEDURE_ERROR = 'CON-103',
    SOURCE_LANGUAGES_ERROR = 'CON-104',
    SOURCE_PROCEDURES_ERROR = 'CON-105',
    SOURCE_FILES_DESCRIPTION = 'CON-108',
}

export enum ProcessorErrorEnums { //start from CON-201
    NOT_RELEVANT_INFO_AGGREGATED = 'CON-201',
}
