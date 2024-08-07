import LoggerUtils from '../../utils/logger.utils';
import {
    AccountGO,
    ActivitiesGO,
    ActivityGO,
    ActivitySegmentGO,
    BillingInstrumentGO,
    BrowserHistoryGO,
    BrowserSearchGO,
    ContactGO,
    DailyActivityMetricGO,
    DailyActivityMetricsGO,
    DetailActivityGO,
    DocGO,
    DocLibraryGO,
    GeoDataGO,
    ImageDataGO,
    LineItemGO,
    LocationActivityGO,
    MapsReviewGO,
    MapsReviewsGO,
    OrderGO,
    OrderHistoryGO,
    PlaceVisitedGO,
    PlayStoreReviewGO,
    PlayStoreReviewsGO,
    PointGO,
    ProbableActivityGO,
    ProbableLocationGO,
    ProfileGO,
    PurchaseGO,
    PurchaseHistoryGO,
    SearchEngineGO,
    SearchEnginesGO,
    SemanticLocationsGO,
    SubtitleActivityGO,
    TransactionGO,
    TransactionsGO,
    TransitPathGO,
    YoutubePlaylistGO,
    YoutubePlaylistsGO,
    YoutubeVideoGO,
} from './model.google';
import { ParserUtils } from '../../utils/parser.utils';
import { DecodingUtils } from '../../utils/decoding.utils';
import { ValidatorObject } from '../../validator/validator.object';
import { FileCodeGoogle } from './enum.google';
import { Months } from '../../enums';

/**
 * Class used to parse most important files into the directory returned by Google in CSV, HTML and JSON formats.
 * All the files are given in input as Buffer, parsed to JSON and then mapped into a specific interface model.
 * All functions return the relevant information (if there are any) as a promised model if the parsing is successful, undefined otherwise.
 */
export class ServiceGoogle {
    private static readonly logger = new LoggerUtils('Google Service');

    /**
     * Abstraction to parse a Google file regardless its respective parsing function
     * @param fileCode - code of the file to parse
     * @param data - file to parse as Buffer
     */
    static async parseFile(fileCode: FileCodeGoogle, data: Buffer) {
        switch (fileCode) {
            case FileCodeGoogle.ACCOUNT_INFO:
                return this.parseGoogleAccount(data);
            case FileCodeGoogle.v2_CHROME_BROWSER_HISTORY:
                return this.parseBrowseHistory(data);
            case FileCodeGoogle.CHROME_SEARCH_ENGINES:
                return this.parseSearchEngines(data);
            case FileCodeGoogle.PAY_TRANSACTIONS:
                return this.parseTransactions(data);
            case FileCodeGoogle.PLAY_STORE_LIBRARY:
                return this.parseDocLibrary(data);
            case FileCodeGoogle.PLAY_STORE_ORDER_HISTORY:
                return this.parseOrderHistory(data);
            case FileCodeGoogle.PLAY_STORE_PURCHASE_HISTORY:
                return this.parsePurchaseHistory(data);
            case FileCodeGoogle.PLAY_STORE_REVIEWS:
                return this.parsePlayStoreReviews(data);
            case FileCodeGoogle.PROFILE:
                return this.parseProfile(data);
            case FileCodeGoogle.LOCATION_HISTORY_SEMANTIC:
                return this.parseSemanticLocations(data);
            case FileCodeGoogle.MAPS_YOUR_PLACES_REVIEWS:
                return this.parseMapsReviews(data);
            case FileCodeGoogle.PHOTO_JSON:
                return this.parseImageData(data);
            case FileCodeGoogle.YOUTUBE_LIKED_VIDEOS:
            case FileCodeGoogle.YOUTUBE_PLAYLIST_UPLOADS:
                return this.parseYoutubePlaylists(data);
            case FileCodeGoogle.FIT_DAILY_ACTIVITIES_METRICS:
                return this.parseDailyActivityMetrics(data);
            case FileCodeGoogle.ACTIVITY_ADS:
            case FileCodeGoogle.ACTIVITY_APPS:
            case FileCodeGoogle.ACTIVITY_ASSISTANT:
            case FileCodeGoogle.ACTIVITY_BOOKS:
            case FileCodeGoogle.ACTIVITY_CHROME:
            case FileCodeGoogle.ACTIVITY_DEVELOPERS:
            case FileCodeGoogle.ACTIVITY_DISCOVER:
            case FileCodeGoogle.ACTIVITY_DRIVE:
            case FileCodeGoogle.ACTIVITY_GMAIL:
            case FileCodeGoogle.ACTIVITY_LENS:
            case FileCodeGoogle.ACTIVITY_PLAY_GAMES:
            case FileCodeGoogle.ACTIVITY_PLAY_MOVIES:
            case FileCodeGoogle.ACTIVITY_PLAY_STORE:
            case FileCodeGoogle.ACTIVITY_TRANSLATE:
            case FileCodeGoogle.ACTIVITY_HELP:
            case FileCodeGoogle.ACTIVITY_IMAGE_SEARCH:
            case FileCodeGoogle.ACTIVITY_MAPS:
            case FileCodeGoogle.ACTIVITY_NEWS:
            case FileCodeGoogle.ACTIVITY_SEARCH:
            case FileCodeGoogle.ACTIVITY_TAKEOUT:
            case FileCodeGoogle.ACTIVITY_SHOPPING:
            case FileCodeGoogle.ACTIVITY_VIDEO_SEARCH:
            case FileCodeGoogle.ACTIVITY_YOUTUBE:
                return this.parseActivity(data);
            default:
                return undefined;
        }
    }

    /**
     * @param data - FileCodeGoogle.PROFILE file in input as Buffer
     */
    static async parseProfile(data: Buffer): Promise<ProfileGO | undefined> {
        const model: ProfileGO = {};
        let match;
        try {
            const document = JSON.parse(data.toString());
            document.name.givenName &&
                (model.givenName = document.name.givenName);
            document.name.familyName &&
                (model.familyName = document.name.familyName);
            document.name.formattedName &&
                (model.formattedName = document.name.formattedName);
            document.displayName && (model.displayName = document.displayName);
            document.emails &&
                (model.emails = document.emails.map(
                    (object: any) => object.value,
                ));
            document.birthday &&
                (match = document.birthday.match(/(\d+)-(\d+)-(\d+)/));
            model.birthdate = new Date(
                Date.UTC(match[1], match[2] - 1, match[3], 0, 0, 0),
            );
            document.gender.type && (model.gender = document.gender.type);
            return !ValidatorObject.objectIsEmpty(model) ? model : undefined;
        } catch (error) {
            this.logger.log('error', `${error}`, 'parseProfile');
            return undefined;
        }
    }

    /**
     * @param data - FileCodeGoogle.CHROME_BROWSER_HISTORY file in input as Buffer
     */
    static async parseBrowseHistory(
        data: Buffer,
    ): Promise<BrowserHistoryGO | undefined> {
        const model: BrowserHistoryGO = { list: [] };
        try {
            const document = JSON.parse(data.toString());
            model.list = document['Browser History'].map((value: any) => {
                const newValue: BrowserSearchGO = {};
                value.title && (newValue.title = value.title);
                value.url && (newValue.url = value.url);
                value.page_transition &&
                    (newValue.pageTransition = value.page_transition);
                value.client_id && (newValue.clientId = value.client_id);
                value.time_usec &&
                    (newValue.time = new Date(
                        parseInt(value.time_usec, 10) / 1000,
                    ));
                value.favicon_url && (newValue.faviconUrl = value.favicon_url);
                return newValue;
            });
            return model.list.length > 0 ? model : undefined;
        } catch (error) {
            this.logger.log('error', `${error}`, 'parseBrowseHistory');
            return undefined;
        }
    }

    /**
     * @param data - FileCodeGoogle.CHROME_SEARCH_ENGINES file in input as Buffer
     */
    static async parseSearchEngines(
        data: Buffer,
    ): Promise<SearchEnginesGO | undefined> {
        const model: SearchEnginesGO = { list: [] };
        try {
            const document = JSON.parse(data.toString());
            model.list = document['Search Engines'].map((value: any) => {
                const newValue: SearchEngineGO = {};
                value.suggestions_url &&
                    (newValue.suggestionsUrl = value.suggestions_url);
                value.favicon_url && (newValue.faviconUrl = value.favicon_url);
                value.safe_for_autoreplace !== undefined &&
                    (newValue.safeForAutoreplace = value.safe_for_autoreplace);
                value.is_active && (newValue.isActive = value.is_active);
                value.date_created &&
                    (newValue.dateCreated =
                        DecodingUtils.convertWebkitTimestamp(
                            parseInt(value.date_created, 10),
                        ));
                value.url && (newValue.url = value.url);
                value.new_tab_url && (newValue.newTabUrl = value.new_tab_url);
                value.originating_url &&
                    (newValue.originatingUrl = value.originating_url);
                value.sync_guid && (newValue.syncGuid = value.sync_guid);
                value.short_name && (newValue.shortName = value.short_name);
                value.keyword && (newValue.keyword = value.keyword);
                value.input_encodings &&
                    (newValue.inputEncodings = value.input_encodings);
                value.prepopulate_id !== undefined &&
                    (newValue.prepopulateId = value.prepopulate_id);
                value.last_modified &&
                    (newValue.lastModified =
                        DecodingUtils.convertWebkitTimestamp(
                            parseInt(value.last_modified, 10),
                        ));
                return newValue;
            });
            return model.list.length > 0 ? model : undefined;
        } catch (error) {
            this.logger.log('error', `${error}`, 'parseSearchEngines');
            return undefined;
        }
    }

    /**
     * @param data - FileCodeGoogle.LOCATION_HISTORY_SEMANTIC file in input as Buffer
     */
    static async parseSemanticLocations(
        data: Buffer,
    ): Promise<SemanticLocationsGO | undefined> {
        const model: SemanticLocationsGO = {
            listVisitedPlaces: [],
            listActivities: [],
        };
        try {
            const document = JSON.parse(data.toString());
            document.timelineObjects.forEach((value: any) => {
                if (value.placeVisit) {
                    value = value.placeVisit;
                    const newValue = this.parsePlaceVisitedRecursive(value);
                    newValue && model.listVisitedPlaces.push(newValue);
                }
                if (value.activitySegment) {
                    const newValue: ActivitySegmentGO = {};
                    if (value.activitySegment.startLocation) {
                        const location: ProbableLocationGO = {};
                        value.activitySegment.startLocation.latitudeE7 &&
                            (location.latitudeE7 =
                                value.activitySegment.startLocation.latitudeE7);
                        value.activitySegment.startLocation.longitudeE7 &&
                            (location.longitudeE7 =
                                value.activitySegment.startLocation.longitudeE7);
                        !ValidatorObject.objectIsEmpty(location) &&
                            (newValue.startLocation = location);
                    }
                    if (value.activitySegment.endLocation) {
                        const location: ProbableLocationGO = {};
                        value.activitySegment.endLocation.latitudeE7 &&
                            (location.latitudeE7 =
                                value.activitySegment.endLocation.latitudeE7);
                        value.activitySegment.endLocation.longitudeE7 &&
                            (location.longitudeE7 =
                                value.activitySegment.endLocation.longitudeE7);
                        !ValidatorObject.objectIsEmpty(location) &&
                            (newValue.endLocation = location);
                    }
                    if (value.activitySegment.duration) {
                        value.activitySegment.duration.startTimestampMs &&
                            (newValue.startDate = new Date(
                                parseInt(
                                    value.activitySegment.duration
                                        .startTimestampMs,
                                    10,
                                ),
                            ));
                        value.activitySegment.duration.endTimestampMs &&
                            (newValue.endDate = new Date(
                                parseInt(
                                    value.activitySegment.duration
                                        .endTimestampMs,
                                    10,
                                ),
                            ));
                    }
                    value.activitySegment.distance &&
                        (newValue.distance = value.activitySegment.distance);
                    value.activitySegment.activityType &&
                        (newValue.activityType =
                            value.activitySegment.activityType);
                    value.activitySegment.confidence &&
                        (newValue.confidence =
                            value.activitySegment.confidence);

                    if (value.activitySegment.activities) {
                        newValue.allActivitiesProbabilities = [];
                        value.activitySegment.activities.forEach(
                            (activity: any) => {
                                const newActivity: ProbableActivityGO = {};
                                activity.activityType &&
                                    (newActivity.activityType =
                                        activity.activityType);
                                activity.probability &&
                                    (newActivity.probability =
                                        activity.probability);
                                !ValidatorObject.objectIsEmpty(newActivity) &&
                                    newValue.allActivitiesProbabilities &&
                                    newValue.allActivitiesProbabilities.push(
                                        newActivity,
                                    );
                            },
                        );
                    }

                    if (value.activitySegment.transitPath) {
                        const newPath: TransitPathGO = {};
                        if (value.activitySegment.transitPath.transitStops) {
                            newPath.transitStops = [];
                            value.activitySegment.transitPath.transitStops.forEach(
                                (transitStop: any) => {
                                    const newLocation: ProbableLocationGO = {};
                                    transitStop.latitudeE7 &&
                                        (newLocation.latitudeE7 =
                                            transitStop.latitudeE7);
                                    transitStop.longitudeE7 &&
                                        (newLocation.longitudeE7 =
                                            transitStop.longitudeE7);
                                    transitStop.placeId &&
                                        (newLocation.placeId =
                                            transitStop.placeId);
                                    transitStop.name &&
                                        (newLocation.name = transitStop.name);
                                    transitStop.address &&
                                        (newLocation.address =
                                            transitStop.address);
                                    !ValidatorObject.objectIsEmpty(
                                        newLocation,
                                    ) &&
                                        newPath.transitStops &&
                                        newPath.transitStops.push(newLocation);
                                },
                            );
                        }
                        value.activitySegment.transitPath.name &&
                            (newPath.name =
                                value.activitySegment.transitPath.name);
                        value.activitySegment.transitPath.hexRgbColor &&
                            (newPath.hexRgbColor =
                                value.activitySegment.transitPath.hexRgbColor);
                        !ValidatorObject.objectIsEmpty(newPath) &&
                            (newValue.transitPath = newPath);
                    }

                    if (value.activitySegment.simplifiedRawPath) {
                        if (value.activitySegment.simplifiedRawPath.points) {
                            newValue.simplifiedRawPath = [];
                            value.activitySegment.simplifiedRawPath.points.forEach(
                                (point: any) => {
                                    const newPoint: PointGO = {};
                                    point.latE7 &&
                                        (newPoint.latitudeE7 = point.latE7);
                                    point.lngE7 &&
                                        (newPoint.longitudeE7 = point.lngE7);
                                    point.timestampMs &&
                                        (newPoint.date = new Date(
                                            parseInt(point.timestampMs, 10),
                                        ));
                                    point.accuracyMeters &&
                                        (newPoint.accuracyMeters =
                                            point.accuracyMeters);
                                    !ValidatorObject.objectIsEmpty(newPoint) &&
                                        newValue.simplifiedRawPath &&
                                        newValue.simplifiedRawPath.push(
                                            newPoint,
                                        );
                                },
                            );
                        }
                    }
                    value.activitySegment.editConfirmationStatus &&
                        (newValue.editConfirmationStatus =
                            value.activitySegment.editConfirmationStatus);
                    model.listActivities.push(newValue);
                }
            });
            return model.listVisitedPlaces.length > 0 ||
                model.listActivities.length > 0
                ? model
                : undefined;
        } catch (error) {
            this.logger.log('error', `${error}`, 'parseSemanticLocations');
            return undefined;
        }
    }

    private static parsePlaceVisitedRecursive(
        value: any,
    ): PlaceVisitedGO | undefined {
        const newValue: PlaceVisitedGO = {};
        if (value.location) {
            const newLocation: ProbableLocationGO = {};
            value.location.latitudeE7 &&
                (newLocation.latitudeE7 = value.location.latitudeE7);
            value.location.longitudeE7 &&
                (newLocation.longitudeE7 = value.location.longitudeE7);
            value.location.placeId &&
                (newLocation.placeId = value.location.placeId);
            value.location.address &&
                (newLocation.address = value.location.address);
            value.location.name && (newLocation.name = value.location.name);
            value.location.locationConfidence &&
                (newLocation.locationConfidence =
                    value.location.locationConfidence);
            value.location.sourceInfo &&
                value.location.sourceInfo.deviceTag &&
                (newLocation.deviceTag = value.location.sourceInfo.deviceTag);
            !ValidatorObject.objectIsEmpty(newLocation) &&
                (newValue.location = newLocation);
        }
        if (value.duration) {
            value.duration.startTimestampMs &&
                (newValue.startDate = new Date(
                    parseInt(value.duration.startTimestampMs, 10),
                ));
            value.duration.endTimestampMs &&
                (newValue.endDate = new Date(
                    parseInt(value.duration.endTimestampMs, 10),
                ));
        }
        value.placeConfidence &&
            (newValue.placeConfidence = value.placeConfidence);
        value.centerLatE7 && (newValue.centerLatE7 = value.centerLatE7);
        value.centerLngE7 && (newValue.centerLngE7 = value.centerLngE7);
        value.visitConfidence !== undefined &&
            (newValue.visitConfidence = value.visitConfidence);

        if (value.otherCandidateLocations) {
            newValue.otherProbableLocations = [];
            value.otherCandidateLocations.forEach((location: any) => {
                const otherLocation: ProbableLocationGO = {};
                location.latitudeE7 &&
                    (otherLocation.latitudeE7 = location.latitudeE7);
                location.longitudeE7 &&
                    (otherLocation.longitudeE7 = location.longitudeE7);
                location.placeId && (otherLocation.placeId = location.placeId);
                location.locationConfidence !== undefined &&
                    (otherLocation.locationConfidence =
                        location.locationConfidence);
                location.name && (otherLocation.name = location.name);
                location.address && (otherLocation.address = location.address);
                !ValidatorObject.objectIsEmpty(otherLocation) &&
                    newValue.otherProbableLocations &&
                    newValue.otherProbableLocations.push(otherLocation);
            });
        }
        if (value.childVisits) {
            newValue.childVisits = value.childVisits.map((childValue: any) =>
                this.parsePlaceVisitedRecursive(childValue),
            );
        }
        return !ValidatorObject.objectIsEmpty(newValue) ? newValue : undefined;
    }

    /**
     * @param data - PHOTO_JSON file in input as Buffer
     */
    static async parseImageData(
        data: Buffer,
    ): Promise<ImageDataGO | undefined> {
        const model: ImageDataGO = {};
        try {
            const document = JSON.parse(data.toString());
            document.suggestions_url &&
                (model.title = document.suggestions_url);
            document.description && (model.description = document.description);
            document.creationTime &&
                document.creationTime.timestamp &&
                (model.creationTime = new Date(
                    1000 * document.creationTime.timestamp,
                ));
            document.photoTakenTime &&
                document.photoTakenTime.timestamp &&
                (model.photoTakenTime = new Date(
                    1000 * document.photoTakenTime.timestamp,
                ));

            const parseGeoData = (value: any) => {
                const newGeo: GeoDataGO = {};
                value.latitude !== undefined &&
                    (newGeo.latitude = value.latitude);
                value.longitude !== undefined &&
                    (newGeo.longitude = value.longitude);
                value.altitude !== undefined &&
                    (newGeo.altitude = value.altitude);
                value.latitudeSpan !== undefined &&
                    (newGeo.latitudeSpan = value.latitudeSpan);
                value.longitudeSpan !== undefined &&
                    (newGeo.longitudeSpan = value.longitudeSpan);
                return newGeo;
            };
            if (document.geoData) {
                const newGeo = parseGeoData(document.geoData);
                !ValidatorObject.objectIsEmpty(newGeo) &&
                    (model.geoData = parseGeoData(document.geoData));
            }
            if (document.geoDataExif) {
                const newGeo = parseGeoData(document.geoDataExif);
                !ValidatorObject.objectIsEmpty(newGeo) &&
                    (model.geoDataExif = parseGeoData(document.geoDataExif));
            }
            document.url && (model.url = document.url);
            document.googlePhotosOrigin &&
                document.googlePhotosOrigin.mobileUpload &&
                document.googlePhotosOrigin.mobileUpload.deviceType &&
                (model.deviceType =
                    document.googlePhotosOrigin.mobileUpload.deviceType);
            document.photoLastModifiedTime &&
                document.photoLastModifiedTime.timestamp &&
                (model.photoLastModifiedTime = new Date(
                    1000 * document.photoLastModifiedTime.timestamp,
                ));

            return !ValidatorObject.objectIsEmpty(model) ? model : undefined;
        } catch (error) {
            this.logger.log('error', `${error}`, 'parseImageData');
            return undefined;
        }
    }

    /**
     * @param data - FileCodeGoogle.PAY_TRANSACTIONS file in input as Buffer
     */
    static async parseTransactions(
        data: Buffer,
    ): Promise<TransactionsGO | undefined> {
        try {
            const document = ParserUtils.parseCSVfromBuffer(data);
            if (document) {
                const model: TransactionsGO = { list: [] };
                document.forEach((value: any) => {
                    const newTs: TransactionGO = {};
                    let match;
                    if (value['Time']) {
                        match = value['Time'].match(
                            /(\d+) (\w+) (\d+), (\d+):(\d+)/,
                        );
                        if (match) {
                            const monthIndex: number = parseInt(
                                Months[match[2].toUpperCase()],
                                10,
                            );
                            newTs.date = new Date(
                                Date.UTC(
                                    parseInt(match[3], 10),
                                    monthIndex - 1,
                                    parseInt(match[1], 10),
                                    parseInt(match[4], 10),
                                    parseInt(match[5], 10),
                                    0,
                                ),
                            );
                        }
                    }
                    value['Transaction ID'] &&
                        (newTs.IDtransaction = value['Transaction ID']);
                    value['Description'] &&
                        (newTs.description = value['Description']);
                    value['Product'] && (newTs.productName = value['Product']);
                    value['Payment method'] &&
                        (newTs.paymentMethod = value['Payment method']);
                    value['Status'] && (newTs.state = value['Status']);
                    match = value['Amount'].match(/(.+) (\w+)/);
                    if (match && match[1] && match[2]) {
                        newTs.amount = match[1];
                        newTs.currency = match[2];
                    }
                    !ValidatorObject.objectIsEmpty(newTs) &&
                        model.list.push(newTs);
                });
                return model.list.length > 0 ? model : undefined;
            }
            return undefined;
        } catch (error) {
            this.logger.log('error', `${error}`, 'parseTransactions');
            return undefined;
        }
    }

    /**
     * @param data - FileCodeGoogle.PLAY_STORE_LIBRARY file in input as Buffer
     */
    static async parseDocLibrary(
        data: Buffer,
    ): Promise<DocLibraryGO | undefined> {
        try {
            const document = JSON.parse(data.toString());
            const model: DocLibraryGO = { list: [] };
            document.forEach((value: any) => {
                const newDoc: DocGO = {};
                if (value.libraryDoc.doc) {
                    value.libraryDoc.doc.documentType &&
                        (newDoc.type = value.libraryDoc.doc.documentType);
                    value.libraryDoc.doc.title &&
                        (newDoc.title = value.libraryDoc.doc.title);
                }
                value.libraryDoc.acquisitionTime &&
                    (newDoc.acquisitionDate = new Date(
                        value.libraryDoc.acquisitionTime,
                    ));
                !ValidatorObject.objectIsEmpty(newDoc) &&
                    model.list.push(newDoc);
            });
            return model.list.length > 0 ? model : undefined;
        } catch (error) {
            this.logger.log('error', `${error}`, 'parseDocLibrary');
            return undefined;
        }
    }

    /**
     * @param data - FileCodeGoogle.PLAY_STORE_PURCHASE_HISTORY file in input as Buffer
     */
    static async parsePurchaseHistory(
        data: Buffer,
    ): Promise<PurchaseHistoryGO | undefined> {
        try {
            const document = JSON.parse(data.toString());
            const model: PurchaseHistoryGO = { list: [] };
            document.forEach((value: any) => {
                const purchase: PurchaseGO = {};
                if (value.purchaseHistory) {
                    value.purchaseHistory.invoicePrice &&
                        (purchase.invoicePrice =
                            value.purchaseHistory.invoicePrice);
                    value.purchaseHistory.paymentMethodTitle &&
                        (purchase.paymentMethod =
                            value.purchaseHistory.paymentMethodTitle);
                    value.purchaseHistory.userLanguageCode &&
                        (purchase.userLanguageCode =
                            value.purchaseHistory.userLanguageCode);
                    value.purchaseHistory.userCountry &&
                        (purchase.userCountry =
                            value.purchaseHistory.userCountry);
                    const newDoc: DocGO = {};
                    if (value.purchaseHistory.doc) {
                        value.purchaseHistory.doc.documentType &&
                            (newDoc.type =
                                value.purchaseHistory.doc.documentType);
                        value.purchaseHistory.doc.title &&
                            (newDoc.title = value.purchaseHistory.doc.title);
                    }
                    value.purchaseHistory.purchaseTime &&
                        (newDoc.acquisitionDate = new Date(
                            value.purchaseHistory.purchaseTime,
                        ));
                    !ValidatorObject.objectIsEmpty(newDoc) &&
                        (purchase.document = newDoc);
                    !ValidatorObject.objectIsEmpty(newDoc) &&
                        model.list.push(purchase);
                }
            });
            return model.list.length > 0 ? model : undefined;
        } catch (error) {
            this.logger.log('error', `${error}`, 'parsePurchaseHistory');
            return undefined;
        }
    }

    /**
     * @param data - FileCodeGoogle.PLAY_STORE_ORDER_HISTORY file in input as Buffer
     */
    static async parseOrderHistory(
        data: Buffer,
    ): Promise<OrderHistoryGO | undefined> {
        try {
            const document = JSON.parse(data.toString());
            const model: OrderHistoryGO = { list: [] };
            document.forEach((value: any) => {
                if (value.orderHistory) {
                    const newOrder: OrderGO = {};
                    value.orderHistory.orderId &&
                        (newOrder.orderId = value.orderHistory.orderId);
                    value.orderHistory.creationTime &&
                        (newOrder.creationTime = new Date(
                            value.orderHistory.creationTime,
                        ));
                    if (value.orderHistory.billingInstrument) {
                        const newBill: BillingInstrumentGO = {};
                        value.orderHistory.billingInstrument.cardClass &&
                            (newBill.cardClass =
                                value.orderHistory.billingInstrument.cardClass);
                        value.orderHistory.billingInstrument.cardType &&
                            (newBill.cardType =
                                value.orderHistory.billingInstrument.cardType);
                        value.orderHistory.billingInstrument.expiration &&
                            (newBill.expiration =
                                value.orderHistory.billingInstrument.expiration);
                        value.orderHistory.billingInstrument.displayName &&
                            (newBill.displayName =
                                value.orderHistory.billingInstrument.displayName);
                        !ValidatorObject.objectIsEmpty(newBill) &&
                            (newOrder.billingInstrument = newBill);
                    }
                    if (value.orderHistory.billingContact) {
                        const newContact: ContactGO =
                            ServiceGoogle.parseContact(
                                value.orderHistory.billingContact,
                            );
                        !ValidatorObject.objectIsEmpty(newContact) &&
                            (newOrder.billingContacts = newContact);
                    }
                    if (value.orderHistory.associatedContact) {
                        newOrder.associatedContacts = [];
                        value.orderHistory.associatedContact.map(
                            (contact: any) => {
                                const newContact: ContactGO =
                                    ServiceGoogle.parseContact(contact);
                                !ValidatorObject.objectIsEmpty(newContact) &&
                                    newOrder.associatedContacts &&
                                    newOrder.associatedContacts.push(
                                        newContact,
                                    );
                            },
                        );
                    }
                    value.orderHistory.ipAddress &&
                        (newOrder.ipAddress = value.orderHistory.ipAddress);
                    value.orderHistory.ipCountry &&
                        (newOrder.ipCountry = value.orderHistory.ipCountry);
                    value.orderHistory.totalPrice &&
                        (newOrder.totalPrice = value.orderHistory.totalPrice);
                    value.orderHistory.tax &&
                        (newOrder.tax = value.orderHistory.tax);
                    value.orderHistory.refundAmount &&
                        (newOrder.refundAmount =
                            value.orderHistory.refundAmount);
                    value.orderHistory.preorder !== undefined &&
                        (newOrder.preorder = value.orderHistory.preorder);

                    if (value.orderHistory.lineItem) {
                        newOrder.lineItems = [];
                        value.orderHistory.lineItem.map((lineItem: any) => {
                            const newLineItem: LineItemGO = {};
                            if (lineItem.doc) {
                                const newDoc: DocGO = {};
                                lineItem.doc.documentType &&
                                    (newDoc.type = lineItem.doc.documentType);
                                lineItem.doc.title &&
                                    (newDoc.title = lineItem.doc.title);
                                !ValidatorObject.objectIsEmpty(newDoc) &&
                                    (newLineItem.doc = newDoc);
                            }
                            lineItem.quantity &&
                                (newLineItem.quantity = parseFloat(
                                    lineItem.quantity,
                                ));
                            !ValidatorObject.objectIsEmpty(newLineItem) &&
                                newOrder.lineItems &&
                                newOrder.lineItems.push(newLineItem);
                        });
                    }

                    !ValidatorObject.objectIsEmpty(newOrder) &&
                        model.list.push(newOrder);
                }
            });
            return model.list.length > 0 ? model : undefined;
        } catch (error) {
            this.logger.log('error', `${error}`, 'parseOrderHistory');
            return undefined;
        }
    }

    private static parseContact(value: any): ContactGO {
        const newContact: ContactGO = {};
        value.name && (newContact.name = value.name);
        value.addressLine && (newContact.addressLine = value.addressLine);
        value.countryCode && (newContact.countryCode = value.countryCode);
        value.city && (newContact.city = value.city);
        value.state && (newContact.state = value.state);
        value.postalCode && (newContact.postalCode = value.postalCode);
        value.phoneNumber &&
            (newContact.phoneNumber = parseFloat(value.phoneNumber));
        return newContact;
    }

    /**
     * @param data - FileCodeGoogle.ACCOUNT_INFO file in input as Buffer
     */
    static async parseGoogleAccount(
        data: Buffer,
    ): Promise<AccountGO | undefined> {
        try {
            const document = data.toString();
            const model: AccountGO = {};

            let regex = /<li>Google Account ID: (\d|\w+)<\/li>/;
            let match = document.match(regex);
            match && match[1] && (model.id = match[1]);

            regex = /<li>Created on: (.*Z)<\/li>/;
            match = document.match(regex);
            match && match[1] && (model.creationDate = new Date(match[1]));

            regex =
                /<li>Contact e-Mail: ((([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}])|(([a-zA-Z\-\d]+\.)+[a-zA-Z]{2,})))<\/li>/;
            match = document.match(regex);
            match && match[1] && (model.contactEmail = match[1]);

            regex =
                /<li>Recovery e-Mail: ((([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}])|(([a-zA-Z\-\d]+\.)+[a-zA-Z]{2,})))<\/li>/;
            match = document.match(regex);
            match && match[1] && (model.recoveryEmail = match[1]);

            regex = /<li>Recovery SMS: (\+.*) \[(.*)]<\/li>/;
            match = document.match(regex);
            match && match[1] && (model.recoverySMS = match[1]);
            match && match[2] && (model.recoverySMSCountryCode = match[2]);
            return !ValidatorObject.objectIsEmpty(model) ? model : undefined;
        } catch (error) {
            this.logger.log('error', `${error}`, 'parseGoogleAccount');
            return undefined;
        }
    }

    /**
     * @param data - FileCodeGoogle.PLAY_STORE_REVIEWS file in input as Buffer
     */
    static async parsePlayStoreReviews(
        data: Buffer,
    ): Promise<PlayStoreReviewsGO | undefined> {
        try {
            const document = JSON.parse(data.toString());
            const model: PlayStoreReviewsGO = { list: [] };
            document.forEach((value: any) => {
                const review: PlayStoreReviewGO = {};
                if (value.review) {
                    value.review.document &&
                        value.review.document.documentType &&
                        (review.documentType =
                            value.review.document.documentType);
                    value.review.document &&
                        value.review.document.title &&
                        (review.title = value.review.document.title);
                    value.review.creationTime &&
                        (review.creationTime = new Date(
                            value.review.creationTime,
                        ));
                    value.review.starRating &&
                        (review.starRating = value.review.starRating);
                    value.review.comment &&
                        (review.comment = value.review.comment);
                    if (value.review.structuredReviewResponse) {
                        review.structuredReviewResponse =
                            value.review.structuredReviewResponse.map(
                                (item: any) => {
                                    return {
                                        question: item.question,
                                        responseOptionType:
                                            item.responseOptionType,
                                    };
                                },
                            );
                    }
                    !ValidatorObject.objectIsEmpty(review) &&
                        model.list.push(review);
                }
            });
            return model.list.length > 0 ? model : undefined;
        } catch (error) {
            this.logger.log('error', `${error}`, 'parsePlayStoreReviews');
            return undefined;
        }
    }

    /**
     * @param data - FileCodeGoogle.MAPS_YOUR_PLACES_REVIEWS file in input as Buffer
     */
    static async parseMapsReviews(
        data: Buffer,
    ): Promise<MapsReviewsGO | undefined> {
        try {
            const document = JSON.parse(data.toString());
            const model: MapsReviewsGO = { list: [] };
            document.features &&
                document.features.length > 0 &&
                document.features.forEach((value: any) => {
                    const review: MapsReviewGO = {};
                    if (value.properties) {
                        value.properties &&
                            value.properties['Google Maps URL'] &&
                            (review.googleMapsURL =
                                value.properties['Google Maps URL']);
                        if (value.properties.Location) {
                            value.properties.Location.Address &&
                                (review.address =
                                    value.properties.Location.Address);
                            value.properties.Location['Business Name'] &&
                                (review.businessName =
                                    value.properties.Location['Business Name']);
                            value.properties.Location['Country Code'] &&
                                (review.countryCode =
                                    value.properties.Location['Country Code']);
                            if (value.properties.Location['Geo Coordinates']) {
                                const geoLocal: GeoDataGO = {};
                                value.properties.Location['Geo Coordinates']
                                    .Latitude &&
                                    (geoLocal.latitude = parseFloat(
                                        value.properties.Location[
                                            'Geo Coordinates'
                                        ].Latitude,
                                    ));
                                value.properties.Location['Geo Coordinates']
                                    .Longitude &&
                                    (geoLocal.longitude = parseFloat(
                                        value.properties.Location[
                                            'Geo Coordinates'
                                        ].Longitude,
                                    ));
                                !ValidatorObject.objectIsEmpty(geoLocal) &&
                                    (review.geoCoordinates = geoLocal);
                            }
                        }
                        value.properties.Published &&
                            (review.published = new Date(
                                value.properties.Published,
                            ));
                        value.properties['Star Rating'] &&
                            (review.starRating =
                                value.properties['Star Rating']);
                    }
                    value.type && (review.type = value.type);
                    !ValidatorObject.objectIsEmpty(review) &&
                        model.list.push(review);
                });
            return model.list.length > 0 ? model : undefined;
        } catch (error) {
            this.logger.log('error', `${error}`, 'parseMapsReviews');
            return undefined;
        }
    }

    /**
     * @param data - FileCodeGoogle.YOUTUBE_LIKED_VIDEOS and FileCodeGoogle.YOUTUBE_PLAYLIST_UPLOADS file in input as Buffer
     */
    static async parseYoutubePlaylists(
        data: Buffer,
    ): Promise<YoutubePlaylistsGO | undefined> {
        try {
            let match;
            const document = ParserUtils.parseCSVfromBuffer(data);
            if (document) {
                const model: YoutubePlaylistsGO = { playlists: [] };
                let modelPlaylist: YoutubePlaylistGO = { list: [] };
                document.forEach((item: any) => {
                    if (item['Playlist ID']) {
                        if (item['Playlist ID'].length > 11) {
                            const newModelPlaylist: YoutubePlaylistGO = {
                                list: [],
                            };
                            item['Playlist ID'] &&
                                (newModelPlaylist.playlistID =
                                    item['Playlist ID']);
                            item['Channel ID'] &&
                                (newModelPlaylist.channelID =
                                    item['Channel ID']);
                            item['Title'] &&
                                (newModelPlaylist.title = item['Title']);
                            if (item['Time Created']) {
                                match = item['Time Created'].match(
                                    /(\d+)-(\d+)-(\d+) (\d+):(\d+):(\d+) UTC/,
                                );
                                newModelPlaylist.creationDate = new Date(
                                    Date.UTC(
                                        parseInt(match[1], 10),
                                        parseInt(match[2], 10) - 1,
                                        parseInt(match[3], 10),
                                        parseInt(match[4], 10),
                                        parseInt(match[5], 10),
                                        parseInt(match[6], 10),
                                    ),
                                );
                            }
                            item['Description'] &&
                                (newModelPlaylist.description =
                                    item['Description']);
                            item['Visibility'] &&
                                (newModelPlaylist.visibility =
                                    item['Visibility']);
                            modelPlaylist.list.length > 0 &&
                                model.playlists.push(modelPlaylist);
                            !ValidatorObject.objectIsEmpty(newModelPlaylist) &&
                                (modelPlaylist = newModelPlaylist);
                        } else if (item['Playlist ID'] !== 'Video ID') {
                            const modelVideo: YoutubeVideoGO = {};
                            item['Playlist ID'] &&
                                (modelVideo.videoID = item['Playlist ID']);
                            if (item['Channel ID']) {
                                match = item['Channel ID'].match(
                                    /(\d+)-(\d+)-(\d+) (\d+):(\d+):(\d+) UTC/,
                                );
                                modelVideo.date = new Date(
                                    Date.UTC(
                                        parseInt(match[1], 10),
                                        parseInt(match[2], 10) - 1,
                                        parseInt(match[3], 10),
                                        parseInt(match[4], 10),
                                        parseInt(match[5], 10),
                                        parseInt(match[6], 10),
                                    ),
                                );
                            }
                            !ValidatorObject.objectIsEmpty(modelVideo) &&
                                modelPlaylist.list.push(modelVideo);
                        }
                    }
                    modelPlaylist.list.length > 0 &&
                        model.playlists.push(modelPlaylist);
                });
                return model.playlists.length > 0 ? model : undefined;
            }
            return undefined;
        } catch (error) {
            this.logger.log('error', `${error}`, 'parseYoutubePlaylists');
            return undefined;
        }
    }

    /**
     * @param data - FileCodeGoogle.FIT_DAILY_ACTIVITIES_METRICS file in input as Buffer
     */
    static async parseDailyActivityMetrics(
        data: Buffer,
    ): Promise<DailyActivityMetricsGO | undefined> {
        try {
            let match;
            const document = ParserUtils.parseCSVfromBuffer(data);
            if (document) {
                const model: DailyActivityMetricsGO = { list: [] };
                document.length > 0 &&
                    document.forEach((item: any) => {
                        const modelActivity: DailyActivityMetricGO = {};
                        if (item['Date']) {
                            match = item['Date'].match(/(\d+)-(\d+)-(\d+)/);
                            modelActivity.date = new Date(
                                Date.UTC(
                                    parseInt(match[1], 10),
                                    parseInt(match[2], 10) - 1,
                                    parseInt(match[3], 10),
                                ),
                            );
                        }
                        item['Move Minutes count'] &&
                            (modelActivity.moveMinutesCount = parseInt(
                                item['Move Minutes count'],
                                10,
                            ));
                        item['Calories (kcal)'] &&
                            (modelActivity.calories = parseFloat(
                                item['Calories (kcal)'],
                            ));
                        item['Distance (m)'] &&
                            (modelActivity.distance = parseFloat(
                                item['Distance (m)'],
                            ));
                        item['Heart Points'] &&
                            (modelActivity.heartPoints = parseFloat(
                                item['Heart Points'],
                            ));
                        item['Heart Minutes'] &&
                            (modelActivity.heartMinutes = parseInt(
                                item['Heart Minutes'],
                                10,
                            ));
                        item['Low latitude (deg)'] &&
                            (modelActivity.lowLatitude = parseFloat(
                                item['Low latitude (deg)'],
                            ));
                        item['Low longitude (deg)'] &&
                            (modelActivity.lowLongitude = parseFloat(
                                item['Low longitude (deg)'],
                            ));
                        item['High latitude (deg)'] &&
                            (modelActivity.highLatitude = parseFloat(
                                item['High latitude (deg)'],
                            ));
                        item['High longitude (deg)'] &&
                            (modelActivity.highLongitude = parseFloat(
                                item['High longitude (deg)'],
                            ));
                        item['Average speed (m/s)'] &&
                            (modelActivity.averageSpeed = parseFloat(
                                item['Average speed (m/s)'],
                            ));
                        item['Max speed (m/s)'] &&
                            (modelActivity.maxSpeed = parseFloat(
                                item['Max speed (m/s)'],
                            ));
                        item['Min speed (m/s)'] &&
                            (modelActivity.minSpeed = parseFloat(
                                item['Min speed (m/s)'],
                            ));
                        item['Step count'] &&
                            (modelActivity.stepCount = parseInt(
                                item['Step count'],
                                10,
                            ));
                        item['Average weight (kg)'] &&
                            (modelActivity.averageWeight = parseFloat(
                                item['Average weight (kg)'],
                            ));
                        item['Max weight (kg)'] &&
                            (modelActivity.maxWeight = parseFloat(
                                item['Max weight (kg)'],
                            ));
                        item['Min weight (kg)'] &&
                            (modelActivity.minWeight = parseFloat(
                                item['Min weight (kg)'],
                            ));
                        item['Inactive duration (ms)'] &&
                            (modelActivity.inactiveDuration = parseInt(
                                item['Inactive duration (ms)'],
                                10,
                            ));
                        item['Walking duration (ms)'] &&
                            (modelActivity.walkingDuration = parseInt(
                                item['Walking duration (ms)'],
                                10,
                            ));
                        item['Running duration (ms)'] &&
                            (modelActivity.runningDuration = parseInt(
                                item['Running duration (ms)'],
                                10,
                            ));
                        item['Calisthenics duration (ms)'] &&
                            (modelActivity.calisthenicsDuration = parseInt(
                                item['Calisthenics duration (ms)'],
                                10,
                            ));
                        !ValidatorObject.objectIsEmpty(modelActivity) &&
                            model.list.push(modelActivity);
                    });
                return model.list.length > 0 ? model : undefined;
            }
        } catch (error) {
            this.logger.log('error', `${error}`, 'parseDailyActivityMetrics');
            return undefined;
        }
    }

    /**
     * @param data - all FileCodeGoogle.ACTIVITY_ files in input as Buffer
     */
    static async parseActivity(
        data: Buffer,
    ): Promise<ActivitiesGO | undefined> {
        try {
            const document = JSON.parse(data.toString());
            if (document) {
                const model: ActivitiesGO = { list: [] };
                document.length > 0 &&
                    document.forEach((item: any) => {
                        const modelActivity: ActivityGO = {
                            header: item.header,
                            title: item.title,
                            date: item.time ? new Date(item.time) : undefined,
                            activityControls: item.activityControls,
                            products: item.products,
                        };
                        if (item.subtitles) {
                            const subModelList: SubtitleActivityGO[] = [];
                            item.subtitles.forEach(
                                (subItem: SubtitleActivityGO) => {
                                    const subModelItem: SubtitleActivityGO = {
                                        url: subItem.url,
                                        name: subItem.name,
                                    };
                                    !ValidatorObject.objectIsEmpty(
                                        subModelItem,
                                    ) && subModelList.push(subModelItem);
                                },
                            );
                            subModelList.length > 0 &&
                                (modelActivity.subtitles = subModelList);
                        }
                        if (item.details) {
                            const subModelList: DetailActivityGO[] = [];
                            item.details.forEach(
                                (subItem: DetailActivityGO) => {
                                    const subModelItem: DetailActivityGO = {
                                        name: subItem.name,
                                    };
                                    !ValidatorObject.objectIsEmpty(
                                        subModelItem,
                                    ) && subModelList.push(subModelItem);
                                },
                            );
                            subModelList.length > 0 &&
                                (modelActivity.details = subModelList);
                        }
                        if (item.locationInfos) {
                            const subModelList: LocationActivityGO[] = [];
                            item.locationInfos.forEach(
                                (subItem: LocationActivityGO) => {
                                    const subModelItem: LocationActivityGO = {
                                        name: subItem.name,
                                        url: subItem.url,
                                        source: subItem.source,
                                        sourceUrl: subItem.sourceUrl,
                                    };
                                    !ValidatorObject.objectIsEmpty(
                                        subModelItem,
                                    ) && subModelList.push(subModelItem);
                                },
                            );
                            subModelList.length > 0 &&
                                (modelActivity.locationInfos = subModelList);
                        }
                        !ValidatorObject.objectIsEmpty(modelActivity) &&
                            model.list.push(modelActivity);
                    });
                return model.list.length > 0 ? model : undefined;
            }
        } catch (error) {
            this.logger.log('error', `${error}`, 'parseActivity');
            return undefined;
        }
    }
}
