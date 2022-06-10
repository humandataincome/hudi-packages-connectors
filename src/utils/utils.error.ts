export type ConnectorErrorEnum = ValidationErrorEnum | ProcessorErrorEnums | DescriptorErrorEnum;

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
    SOURCE_FORMAT_ERROR = 'CON-102',
    SOURCE_PROCEDURE_ERROR = 'CON-103',
    SOURCE_ALL_PROCEDURES_ERROR = 'CON-104',
    SOURCE_ALL_LANGUAGES_ERROR = 'CON-105',
    SOURCE_DESCRIPTION_ERROR = 'CON-106',
    SOURCE_TEXT_DESCRIPTION_ERROR = 'CON-107',
    SOURCE_FILES_DESCRIPTION = 'CON-108',
}

export enum ProcessorErrorEnums { //start from CON-201
}
