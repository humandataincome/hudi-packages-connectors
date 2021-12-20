
export interface SearchDataCustomerEngagement {
    listSearches?: Array<Search>;
}

export interface Search {
    'First Search Time (GMT)'?: string;
    'Country ID'?: string;
    'All Department (APS) or Category'?:string;
    'Site Variant'?:string;
    'Application / Browser Name'?:string;
    'Device Model'?:string;
    'Search Type (Keyword,Visual,Browse)'?:string;
    'Session ID'?:string;
    'Query ID'?:string;
    'Prime Customer (Y/N)'?:string;
    'Is From External Link (Y/N)'?:string;
    'Search From External Site (Y/N)'?:string;
    'First Search Query String'?:string;
    'Application Name'?:string;
    'App Version'?:string;
    'Operating System Name'?:string;
    'Operating System Version'?:string;
    'Device Type ID'?:string;
    'Device Category'?:string;
    'Customer IP'?:string;
    'Search Method'?:string;
    'Keywords'?:string;
    'Amazon Business Customer (Y/N)'?:string;
    Language?:string;
    Server?:string;
    'Amazon Fresh Customer (Y/N)'?:string;
    'Music Subscriber (Y/N)'?:string;
    'First Browse Node'?:string;
    'Last search Time (GMT)'?:string;
    'Last Department'?:string;
    'Last Browse Node'?:string;
    'Last Known Customer ID'?:string;
    'First Added Item'?:string;
    'First Purchased Item'?:string;
    'First Consumed Item (Subscription)'?:string;
    'Number of Clicked Items'?:string;
    'Number of Items Added to Cart'?:string;
    'Number of Items Ordered'?:string;
    'Number of Paid Items Ordered'?:string;
    'Number of Free Items Ordered'?:string;
    'Units Ordered'?:string;
    'Paid Units Ordered'?:string;
    'Free Units Ordered'?:string;
    'Maximum Purchase Price'?:string;
    'Clicked Any Item (Y/N)'?:string;
    'Added Any Item (Y/N)'?:string;
    'Purchased Any Item (Y/N)'?:string;
    'Department Count'?:string;
    'Shopping Refinement'?:string;
    'Number of Shopping Refinements'?:string;
    'Highest Number of Shopping Refinements'?:string;
    'Items Consumed (Subscription)'?:string;
    'Shopping Refinement Pickers'?:string;
    'Paid Purchase (Y/N)'?:string;
    'Item Borrowed (Y/N)'?:string;
    'Items Borrowed'?:string;
    'Next Query Group via Click'?:string;
    'Query Abandoned (Y/N)'?:string;
    'Query Reformulated (Y/N)'?:string;
    'Amazon Fresh (Y/N)'?:string;
    'Store Visited'?:string;
    Department?:string;
    'Browse Node'?:string;
    'First Search Domain'?:string;
    'Is First Search From External Ad'?:string;
    'User Agent Info Family'?:string;
    LKCI?:string;
}

export interface AdvertiserAudiences {
    list: Array<string>;
}

export interface AdvertiserClicked {
    list: Array<string>;
}

//AUDIBLE MODELS
export interface AudibleLibrary {
    listAudioBooks?: Array<AudioBook>;
}

export interface AudioBook {
    DateAdded?:string;
    Title?:string;
    Asin?:string;
    IsDownloaded?:string;
    IsDeleted?:string;
    DeleteBy?:string;
    DateDeleted?:string;
    IsPublic?:string;
    IsStreamed?:string;
    IsPreorder?:string;
    Downloads?:string;
    DateFirstDownloaded?:string;
    OrderNumber?:string;
    OriginType?:string;
 }

//PRIME VIDEO MODELS
export interface PrimeVideoWatchlist {
    'listTitles'?: Array<Title>;
}

export interface PrimeVideoWatchlistHistory {
    'listTitles'?:  Array<Title>;
}

export interface PrimeVideoViewingHistory {
    'listActivities'?:  Array<ViewingActivity>;
}

export interface Title {
    'listId'?: string;
    'itemAddedDate'?: Date;
    'itemType'?: string;
    'deleted'?: string;
    'catalogTitle'?: string;
}

export interface ViewingActivity {
    'Playback Hour'?: string;
    'Operating System'?: string;
    'Browser'?: string;
    'Delivery Type'?: string;
    'City'?: string;
    'Country'?: string;
    'ISP'?: string;
    'State'?: string;
    'Content Quality Entitled'?: string;
    'Entitlement Type'?: string;
    'Video Type'?: string;
    'Audio Language'?: string;
    'Title'?: string;
}


