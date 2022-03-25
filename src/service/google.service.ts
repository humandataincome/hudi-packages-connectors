import Logger from "../utils/logger";
import {
    ActivitySegment,
    BillingInstrument,
    BrowserHistory,
    BrowserSearch,
    Contact,
    Doc,
    DocLibrary,
    GeoData,
    ImageData,
    LineItem,
    Order,
    OrderHistory,
    PlaceVisited,
    Point,
    ProbableActivity,
    ProbableLocation,
    Profile,
    Purchase,
    PurchaseHistory,
    SearchEngine,
    SearchEngines,
    SemanticLocations,
    Transaction,
    Transactions,
    TransitPath,
} from "../model/google.model";
import {Parser} from "../utils/parser";
import {Months} from "../utils/utils.enum";
import {LanguageCode} from "../descriptor";
import {Validator} from "../validator";
import {ConfigGoogle} from "../config/config.google";

/**
 * Class used to parse most important files into the directory returned by Google in CSV and JSON formats.
 * All the files are given in input as Buffer, parsed to JSON and then mapped into a specific interface model.
 * All functions return the relevant information (if there are any) as a promised model if the parsing is successful, undefined otherwise.
 */
export class GoogleService {
    private static readonly logger = new Logger("Google Service");
    public static prefixLanguage: LanguageCode = LanguageCode.ITALIAN;

    /**
     * @param data - file 'Takeout/Profile/Profile.json' in input as Buffer
     */
    static async parseProfile(data: Buffer): Promise<Profile | undefined> {
        let model: Profile = {}, match;
        try {
            let document = JSON.parse(data.toString());
            (document.name.givenName) && (model.givenName = document.name.givenName);
            (document.name.familyName) && (model.familyName = document.name.familyName);
            (document.name.formattedName) && (model.formattedName = document.name.formattedName);
            (document.displayName) && (model.displayName = document.displayName);
            (document.emails) && (model.emails = document.emails.map((object: any) => object.value));
            (document.birthday) && (match = document.birthday.match(/(\d+)-(\d+)-(\d+)/));
            model.birthdate = new Date(Date.UTC(match[1], match[2] - 1, match[3], 0, 0, 0));
            (document.gender.type) && (model.gender = document.gender.type);
            return !Validator.objectIsEmpty(model) ? model : undefined;
        } catch (error) {
            this.logger.log('error', `${error}`, 'parseProfile');
            return undefined;
        }
    }

    /**
     * @param data - file 'Takeout/Chrome/BrowserHistory.json' in input as Buffer
     */
    static async parseBrowseHistory(data: Buffer): Promise<BrowserHistory | undefined> {
        let model: BrowserHistory = {list: []};
        try {
            let document = JSON.parse(data.toString());
            model.list = document["Browser History"].map((value: any) => {
                let newValue: BrowserSearch = {};
                (value.title) && (newValue.title = value.title);
                (value.url) && (newValue.url = value.url);
                (value.page_transition) && (newValue.pageTransition = value.page_transition);
                (value.client_id) && (newValue.clientId = value.client_id);
                (value.time_usec) && (newValue.time = new Date(parseInt(value.time_usec) / 1000));
                (value.favicon_url) && (newValue.faviconUrl = value.favicon_url);
                return newValue;
            });
            return model.list.length > 0 ? model : undefined;
        } catch (error) {
            this.logger.log('error', `${error}`, 'parseBrowseHistory');
            return undefined;
        }
    }

    /**
     * @param data - file 'Takeout/Chrome/SearchEngines.json' in input as Buffer
     */
    static async parseSearchEngines(data: Buffer): Promise<SearchEngines | undefined> {
        let model: SearchEngines = {list: []};
        try {
            let document = JSON.parse(data.toString());
            model.list = document["Search Engines"].map((value: any) => {
                let newValue: SearchEngine = {};
                (value.suggestions_url) && (newValue.suggestionsUrl = value.suggestions_url);
                (value.favicon_url) && (newValue.faviconUrl = value.favicon_url);
                (value.safe_for_autoreplace != undefined) && (newValue.safeForAutoreplace = value.safe_for_autoreplace);
                (value.is_active) && (newValue.isActive = value.is_active);
                (value.date_created) && (newValue.dateCreated = Validator.convertWebkitTimestamp(parseInt(value.date_created)));
                (value.url) && (newValue.url = value.url);
                (value.new_tab_url) && (newValue.newTabUrl = value.new_tab_url);
                (value.originating_url) && (newValue.originatingUrl = value.originating_url);
                (value.sync_guid) && (newValue.syncGuid = value.sync_guid);
                (value.short_name) && (newValue.shortName = value.short_name);
                (value.keyword) && (newValue.keyword = value.keyword);
                (value.input_encodings) && (newValue.inputEncodings = value.input_encodings);
                (value.prepopulate_id != undefined) && (newValue.prepopulateId = value.prepopulate_id);
                (value.last_modified) && (newValue.lastModified = Validator.convertWebkitTimestamp(parseInt(value.last_modified)));
                return newValue;
            });
            return model.list.length > 0 ? model : undefined;
        } catch (error) {
            this.logger.log('error', `${error}`, 'parseSearchEngines');
            return undefined;
        }
    }

    /**
     * @param data - file 'Takeout/LocationHistory/SemanticLocationHistory/2017/2017_APRIL.json' in input as Buffer
     */
    static async parseSemanticLocations(data: Buffer): Promise<SemanticLocations | undefined> {
        let model: SemanticLocations = {listVisitedPlaces: [], listActivities: []};
        try {
            let document = JSON.parse(data.toString());
            document.timelineObjects.forEach((value: any) => {
                if (value.placeVisit) {
                    value = value.placeVisit;
                    let newValue = this.parsePlaceVisitedRecursive(value);
                    (newValue) && (model.listVisitedPlaces.push(newValue));
                }
                if (value.activitySegment) {
                    let newValue: ActivitySegment = {};
                    if (value.activitySegment.startLocation) {
                        let location: ProbableLocation = {};
                        (value.activitySegment.startLocation.latitudeE7) && (location.latitudeE7 = value.activitySegment.startLocation.latitudeE7);
                        (value.activitySegment.startLocation.longitudeE7) && (location.longitudeE7 = value.activitySegment.startLocation.longitudeE7);
                        (!Validator.objectIsEmpty(location)) && (newValue.startLocation = location);
                    }
                    if (value.activitySegment.endLocation) {
                        let location: ProbableLocation = {};
                        (value.activitySegment.endLocation.latitudeE7) && (location.latitudeE7 = value.activitySegment.endLocation.latitudeE7);
                        (value.activitySegment.endLocation.longitudeE7) && (location.longitudeE7 = value.activitySegment.endLocation.longitudeE7);
                        (!Validator.objectIsEmpty(location)) && (newValue.endLocation = location);
                    }
                    if (value.activitySegment.duration) {
                        (value.activitySegment.duration.startTimestampMs) && (newValue.startDate = new Date(parseInt(value.activitySegment.duration.startTimestampMs)));
                        (value.activitySegment.duration.endTimestampMs) && (newValue.endDate = new Date(parseInt(value.activitySegment.duration.endTimestampMs)));
                    }
                    (value.activitySegment.distance) && (newValue.distance = value.activitySegment.distance);
                    (value.activitySegment.activityType) && (newValue.activityType = value.activitySegment.activityType);
                    (value.activitySegment.confidence) && (newValue.confidence = value.activitySegment.confidence);

                    if (value.activitySegment.activities) {
                        newValue.allActivitiesProbabilities = [];
                        value.activitySegment.activities.forEach((activity: any) => {
                            let newActivity: ProbableActivity = {};
                            (activity.activityType) && (newActivity.activityType = activity.activityType);
                            (activity.probability) && (newActivity.probability = activity.probability);
                            (!Validator.objectIsEmpty(newActivity) && newValue.allActivitiesProbabilities) && (newValue.allActivitiesProbabilities.push(newActivity));
                        });
                    }

                    if (value.activitySegment.transitPath) {
                        let newPath: TransitPath = {};
                        if (value.activitySegment.transitPath.transitStops) {
                            newPath.transitStops = [];
                            value.activitySegment.transitPath.transitStops.forEach((transitStop: any) => {
                                let newLocation: ProbableLocation = {};
                                (transitStop.latitudeE7) && (newLocation.latitudeE7 = transitStop.latitudeE7);
                                (transitStop.longitudeE7) && (newLocation.longitudeE7 = transitStop.longitudeE7);
                                (transitStop.placeId) && (newLocation.placeId = transitStop.placeId);
                                (transitStop.name) && (newLocation.name = transitStop.name);
                                (transitStop.address) && (newLocation.address = transitStop.address);
                                (!Validator.objectIsEmpty(newLocation) && newPath.transitStops) && (newPath.transitStops.push(newLocation));
                            });
                        }
                        (value.activitySegment.transitPath.name) && (newPath.name = value.activitySegment.transitPath.name);
                        (value.activitySegment.transitPath.hexRgbColor) && (newPath.hexRgbColor = value.activitySegment.transitPath.hexRgbColor);
                        (!Validator.objectIsEmpty(newPath)) && (newValue.transitPath = newPath);
                    }

                    if (value.activitySegment.simplifiedRawPath) {
                        if (value.activitySegment.simplifiedRawPath.points) {
                            newValue.simplifiedRawPath = [];
                            value.activitySegment.simplifiedRawPath.points.forEach((point: any) => {
                                let newPoint: Point = {};
                                (point.latE7) && (newPoint.latitudeE7 = point.latE7);
                                (point.lngE7) && (newPoint.longitudeE7 = point.lngE7);
                                (point.timestampMs) && (newPoint.date = new Date(parseInt(point.timestampMs)));
                                (point.accuracyMeters) && (newPoint.accuracyMeters = point.accuracyMeters);
                                (!Validator.objectIsEmpty(newPoint) && newValue.simplifiedRawPath) && (newValue.simplifiedRawPath.push(newPoint));
                            });
                        }
                    }
                    (value.activitySegment.editConfirmationStatus) && (newValue.editConfirmationStatus = value.activitySegment.editConfirmationStatus);
                    model.listActivities.push(newValue);
                }
            });
            return (model.listVisitedPlaces.length > 0 || model.listActivities.length > 0) ? model : undefined;
        } catch (error) {
            this.logger.log('error', `${error}`, 'parseSemanticLocations');
            return undefined;
        }
    }

    private static parsePlaceVisitedRecursive(value: any): PlaceVisited | undefined {
        let newValue: PlaceVisited = {};
        if (value.location) {
            let newLocation: ProbableLocation = {};
            (value.location.latitudeE7) && (newLocation.latitudeE7 = value.location.latitudeE7);
            (value.location.longitudeE7) && (newLocation.longitudeE7 = value.location.longitudeE7);
            (value.location.placeId) && (newLocation.placeId = value.location.placeId);
            (value.location.address) && (newLocation.address = value.location.address);
            (value.location.name) && (newLocation.name = value.location.name);
            (value.location.locationConfidence) && (newLocation.locationConfidence = value.location.locationConfidence);
            (value.location.sourceInfo && value.location.sourceInfo.deviceTag) && (newLocation.deviceTag = value.location.sourceInfo.deviceTag);
            !Validator.objectIsEmpty(newLocation) && (newValue.location = newLocation);
        }
        if (value.duration) {
            (value.duration.startTimestampMs) && (newValue.startDate = new Date(parseInt(value.duration.startTimestampMs)));
            (value.duration.endTimestampMs) && (newValue.endDate = new Date(parseInt(value.duration.endTimestampMs)));
        }
        (value.placeConfidence) && (newValue.placeConfidence = value.placeConfidence);
        (value.centerLatE7) && (newValue.centerLatE7 = value.centerLatE7);
        (value.centerLngE7) && (newValue.centerLngE7 = value.centerLngE7);
        (value.visitConfidence != undefined) && (newValue.visitConfidence = value.visitConfidence);

        if (value.otherCandidateLocations) {
            newValue.otherProbableLocations = [];
            value.otherCandidateLocations.forEach((location: any) => {
                let otherLocation: ProbableLocation = {};
                (location.latitudeE7) && (otherLocation.latitudeE7 = location.latitudeE7);
                (location.longitudeE7) && (otherLocation.longitudeE7 = location.longitudeE7);
                (location.placeId) && (otherLocation.placeId = location.placeId);
                (location.locationConfidence != undefined) && (otherLocation.locationConfidence = location.locationConfidence);
                (location.name) && (otherLocation.name = location.name);
                (location.address) && (otherLocation.address = location.address);
                (!Validator.objectIsEmpty(otherLocation) && newValue.otherProbableLocations) && (newValue.otherProbableLocations.push(otherLocation));
            });
        }
        if (value.childVisits) {
            newValue.childVisits = value.childVisits.map((childValue: any) => this.parsePlaceVisitedRecursive(childValue));
        }
        return (!Validator.objectIsEmpty(newValue)) ? newValue : undefined;
    }

    /**
     * @param data - file 'Takeout/GooglePhoto/PhotosFrom2019/photo.mp4.json' in input as Buffer
     */
    static async parseImageData(data: Buffer): Promise<ImageData | undefined> {
        let model: ImageData = {};
        try {
            let document = JSON.parse(data.toString());
            (document.suggestions_url) && (model.title = document.suggestions_url);
            (document.description) && (model.description = document.description);
            (document.creationTime && document.creationTime.timestamp) && (model.creationTime = new Date(1000 * document.creationTime.timestamp));
            (document.photoTakenTime && document.photoTakenTime.timestamp) && (model.photoTakenTime = new Date(1000 * document.photoTakenTime.timestamp));

            const parseGeoData = (value: any) => {
                let newGeo: GeoData = {};
                (value.latitude != undefined) && (newGeo.latitude = value.latitude);
                (value.longitude != undefined) && (newGeo.longitude = value.longitude);
                (value.altitude != undefined) && (newGeo.altitude = value.altitude);
                (value.latitudeSpan != undefined) && (newGeo.latitudeSpan = value.latitudeSpan);
                (value.longitudeSpan != undefined) && (newGeo.longitudeSpan = value.longitudeSpan);
                return newGeo;
            }
            if (document.geoData) {
                let newGeo = parseGeoData(document.geoData);
                !Validator.objectIsEmpty(newGeo) && (model.geoData = parseGeoData(document.geoData));
            }
            if (document.geoDataExif) {
                let newGeo = parseGeoData(document.geoDataExif);
                !Validator.objectIsEmpty(newGeo) && (model.geoDataExif = parseGeoData(document.geoDataExif));
            }
            (document.url) && (model.url = document.url);
            (document.googlePhotosOrigin && document.googlePhotosOrigin.mobileUpload && document.googlePhotosOrigin.mobileUpload.deviceType)
            && (model.deviceType = document.googlePhotosOrigin.mobileUpload.deviceType);
            (document.photoLastModifiedTime && document.photoLastModifiedTime.timestamp) && (model.photoLastModifiedTime = new Date(1000 * document.photoLastModifiedTime.timestamp));

            return !Validator.objectIsEmpty(model) ? model : undefined;
        } catch (error) {
            this.logger.log('error', `${error}`, 'parseImageData');
            return undefined;
        }
    }

    /**
     * @param data - file 'Takeout/GooglePay/GoogleTransactions/transactions_123456.csv' in input as Buffer
     */
    static async parseTransactions(data: Buffer): Promise<Transactions | undefined> {
        try {
            let document: Array<any> = <Array<object>>Parser.parseCSVfromBuffer(data);
            if (document) {
                let model: Transactions = {list: []};
                document.forEach((value: any) => {
                    let newTs: Transaction = {}, match, parameterName;
                    parameterName = ConfigGoogle.keysValues[`${this.prefixLanguage}-DateAndHour`];
                    if (value[parameterName]) {
                        match = value[parameterName].match(/(\d+) (\w+) (\d+), (\d+):(\d+)/);
                        let monthENG: any = ConfigGoogle.keysValues[`${this.prefixLanguage}-${match[2]}`];
                        let monthIndex: number = parseInt(Months[monthENG]);
                        newTs.date = new Date(Date.UTC(parseInt(match[3]), monthIndex - 1, parseInt(match[1]), parseInt(match[4]), parseInt(match[5]), 0));
                    }
                    parameterName = ConfigGoogle.keysValues[`${this.prefixLanguage}-IDtransaction`];
                    (value[parameterName]) && (newTs.IDtransaction = value[parameterName]);
                    parameterName = ConfigGoogle.keysValues[`${this.prefixLanguage}-description`];
                    (value[parameterName]) && (newTs.description = value[parameterName]);
                    parameterName = ConfigGoogle.keysValues[`${this.prefixLanguage}-product`];
                    (value[parameterName]) && (newTs.productName = value[parameterName]);
                    parameterName = ConfigGoogle.keysValues[`${this.prefixLanguage}-payment`];
                    (value[parameterName]) && (newTs.paymentMethod = value[parameterName]);
                    parameterName = ConfigGoogle.keysValues[`${this.prefixLanguage}-state`];
                    (value[parameterName]) && (newTs.state = value[parameterName]);
                    parameterName = ConfigGoogle.keysValues[`${this.prefixLanguage}-amount`];
                    match = value[parameterName].match(/(.+) (\w+)/);
                    if (match) {
                        newTs.amount = match[1];
                        newTs.currency = match[2];
                    }
                    !Validator.objectIsEmpty(newTs) && (model.list.push(newTs));
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
     * @param data - file 'Takeout/GooglePlayStore/Library.json' in input as Buffer
     */
    static async parseDocLibrary(data: Buffer): Promise<DocLibrary | undefined> {
        try {
            let document = JSON.parse(data.toString());
            let model: DocLibrary = {list: []};
            document.forEach((value: any) => {
                let newDoc: Doc = {};
                if (value.libraryDoc.doc) {
                    (value.libraryDoc.doc.documentType) && (newDoc.type = value.libraryDoc.doc.documentType);
                    (value.libraryDoc.doc.title) && (newDoc.title = value.libraryDoc.doc.title);
                }
                (value.libraryDoc.acquisitionTime) && (newDoc.acquisitionDate = new Date(value.libraryDoc.acquisitionTime));
                !Validator.objectIsEmpty(newDoc) && (model.list.push(newDoc));
            });
            return model.list.length > 0 ? model : undefined;
        } catch (error) {
            this.logger.log('error', `${error}`, 'parseDocLibrary');
            return undefined;
        }
    }


    /**
     * @param data - file 'Takeout/GooglePlayStore/PurchaseHistory.json' in input as Buffer
     */
    static async parsePurchaseHistory(data: Buffer): Promise<PurchaseHistory | undefined> {
        try {
            let document = JSON.parse(data.toString());
            let model: PurchaseHistory = {list: []};
            document.forEach((value: any) => {
                let purchase: Purchase = {};
                if (value.purchaseHistory) {
                    (value.purchaseHistory.invoicePrice) && (purchase.invoicePrice = value.purchaseHistory.invoicePrice);
                    (value.purchaseHistory.paymentMethodTitle) && (purchase.paymentMethod = value.purchaseHistory.paymentMethodTitle);
                    (value.purchaseHistory.userLanguageCode) && (purchase.userLanguageCode = value.purchaseHistory.userLanguageCode);
                    (value.purchaseHistory.userCountry) && (purchase.userCountry = value.purchaseHistory.userCountry);
                    let newDoc: Doc = {};
                    if (value.purchaseHistory.doc) {
                        (value.purchaseHistory.doc.documentType) && (newDoc.type = value.purchaseHistory.doc.documentType);
                        (value.purchaseHistory.doc.title) && (newDoc.title = value.purchaseHistory.doc.title);
                    }
                    (value.purchaseHistory.purchaseTime) && (newDoc.acquisitionDate = new Date(value.purchaseHistory.purchaseTime));
                    !Validator.objectIsEmpty(newDoc) && (purchase.document = newDoc);
                    !Validator.objectIsEmpty(newDoc) && (model.list.push(purchase));
                }
            });
            return model.list.length > 0 ? model : undefined;
        } catch (error) {
            this.logger.log('error', `${error}`, 'parsePurchaseHistory');
            return undefined;
        }
    }

    /**
     * @param data - file 'Takeout/GooglePlayStore/OrderHistory.json' in input as Buffer
     */
    static async parseOrderHistory(data: Buffer): Promise<OrderHistory | undefined> {
        try {
            let document = JSON.parse(data.toString());
            let model: OrderHistory = {list: []};
            document.forEach((value: any) => {
                if (value.orderHistory) {
                    let newOrder: Order = {};
                    (value.orderHistory.orderId) && (newOrder.orderId = value.orderHistory.orderId);
                    (value.orderHistory.creationTime) && (newOrder.creationTime = new Date(value.orderHistory.creationTime));
                    if (value.orderHistory.billingInstrument) {
                        let newBill: BillingInstrument = {};
                        (value.orderHistory.billingInstrument.cardClass) && (newBill.cardClass = value.orderHistory.billingInstrument.cardClass);
                        (value.orderHistory.billingInstrument.cardType) && (newBill.cardType = value.orderHistory.billingInstrument.cardType);
                        (value.orderHistory.billingInstrument.expiration) && (newBill.expiration = value.orderHistory.billingInstrument.expiration);
                        (value.orderHistory.billingInstrument.displayName) && (newBill.displayName = value.orderHistory.billingInstrument.displayName);
                        !Validator.objectIsEmpty(newBill) && (newOrder.billingInstrument = newBill);
                    }
                    if (value.orderHistory.billingContact) {
                        let newContact: Contact = GoogleService.parseContact(value.orderHistory.billingContact);
                        !Validator.objectIsEmpty(newContact) && (newOrder.billingContacts = newContact);
                    }
                    if (value.orderHistory.associatedContact) {
                        newOrder.associatedContacts = [];
                        value.orderHistory.associatedContact.map((contact: any) => {
                            let newContact: Contact = GoogleService.parseContact(contact);
                            (!Validator.objectIsEmpty(newContact) && newOrder.associatedContacts) && (newOrder.associatedContacts.push(newContact));
                        });
                    }
                    (value.orderHistory.ipAddress) && (newOrder.ipAddress = value.orderHistory.ipAddress);
                    (value.orderHistory.ipCountry) && (newOrder.ipCountry = value.orderHistory.ipCountry);
                    (value.orderHistory.totalPrice) && (newOrder.totalPrice = value.orderHistory.totalPrice);
                    (value.orderHistory.tax) && (newOrder.tax = value.orderHistory.tax);
                    (value.orderHistory.refundAmount) && (newOrder.refundAmount = value.orderHistory.refundAmount);
                    (value.orderHistory.preorder != undefined) && (newOrder.preorder = value.orderHistory.preorder);

                    if (value.orderHistory.lineItem) {
                        newOrder.lineItems = [];
                        value.orderHistory.lineItem.map((lineItem: any) => {
                            let newLineItem: LineItem = {};
                            if (lineItem.doc) {
                                let newDoc: Doc = {};
                                (lineItem.doc.documentType) && (newDoc.type = lineItem.doc.documentType);
                                (lineItem.doc.title) && (newDoc.title = lineItem.doc.title);
                                !Validator.objectIsEmpty(newDoc) && (newLineItem.doc = newDoc);
                            }
                            (lineItem.quantity) && (newLineItem.quantity = parseFloat(lineItem.quantity));
                            (!Validator.objectIsEmpty(newLineItem) && newOrder.lineItems) && (newOrder.lineItems.push(newLineItem));
                        });
                    }

                    !Validator.objectIsEmpty(newOrder) && (model.list.push(newOrder));
                }
            });
            return model.list.length > 0 ? model : undefined;
        } catch (error) {
            this.logger.log('error', `${error}`, 'parseOrderHistory');
            return undefined;
        }
    }

    private static parseContact(value: any): Contact {
        let newContact: Contact = {};
        (value.name) && (newContact.name = value.name);
        (value.addressLine) && (newContact.addressLine = value.addressLine);
        (value.countryCode) && (newContact.countryCode = value.countryCode);
        (value.city) && (newContact.city = value.city);
        (value.state) && (newContact.state = value.state);
        (value.postalCode) && (newContact.postalCode = value.postalCode);
        (value.phoneNumber) && (newContact.phoneNumber = parseFloat(value.phoneNumber));
        return newContact;
    }
}
