import LoggerUtils from '../../utils/logger.utils';
import { FileCodeSpotify } from './enum.spotify';
import {
    FollowSP,
    IdentifiersSP,
    InferencesSP,
    ItemSP,
    PlaylistSP,
    PlaylistsSP,
    StreamingHistorySP,
    StreamingSP,
    TrackSP,
    UserdataSP,
    YourLibrarySP,
} from './model.spotify';
import { ValidatorObject } from '../../validator';

/**
 * Class used to parse most important files into the directory returned by Spotify in JSON format.
 * All the files are given in input as Buffer, parsed back to JSON and then mapped into a specific interface model.
 * All functions return the relevant information (if there are any) as a promised model if the parsing is successful, undefined otherwise.
 */
export class ServiceSpotify {
    private static readonly logger = new LoggerUtils('Spotify Service');

    /**
     * Abstraction to parse a Spotify file regardless its respective parsing function
     * @param fileCode - code of the file to parse
     * @param data - file to parse as Buffer
     */
    static async parseFile(fileCode: FileCodeSpotify, data: Buffer) {
        //TODO: add parsing fucntion for FileCodeSpotify.PAYMENTS
        switch (fileCode) {
            case FileCodeSpotify.FOLLOW:
                return this.parseFollow(data);
            case FileCodeSpotify.IDENTIFIERS:
                return this.parseIdentifiers(data);
            case FileCodeSpotify.INFERENCES:
                return this.parseInferences(data);
            case FileCodeSpotify.PLAYLIST:
                return this.parsePlaylists(data);
            case FileCodeSpotify.STREAMING_HISTORY:
                return this.parseStreamingHistory(data);
            case FileCodeSpotify.USERDATA:
                return this.parseUserdata(data);
            case FileCodeSpotify.YOUR_LIBRARY:
                return this.parseYourLibrary(data);
            default:
                return undefined;
        }
    }

    /**
     * @param data - FileCodeSpotify.FOLLOW file in input as Buffer
     */
    static async parseFollow(data: Buffer) {
        try {
            const document = JSON.parse(data.toString());
            if (document) {
                const model: FollowSP = {};
                document.followerCount !== undefined &&
                    (model.followerCount = document.followerCount);
                document.followingUsersCount !== undefined &&
                    (model.followingUsersCount = document.followingUsersCount);
                document.dismissingUsersCount !== undefined &&
                    (model.dismissingUsersCount =
                        document.dismissingUsersCount);
                return !ValidatorObject.objectIsEmpty(model)
                    ? model
                    : undefined;
            }
        } catch (error) {
            this.logger.log('error', `${error}`, 'parseFollow');
        }
        return undefined;
    }

    /**
     * @param data - FileCodeSpotify.IDENTIFIERS file in input as Buffer
     */
    static async parseIdentifiers(data: Buffer) {
        try {
            const document = JSON.parse(data.toString());
            if (document) {
                const model: IdentifiersSP = {};
                document.identifierType &&
                    (model.identifierType = document.identifierType);
                document.identifierValue &&
                    (model.identifierValue = document.identifierValue);
                return !ValidatorObject.objectIsEmpty(model)
                    ? model
                    : undefined;
            }
        } catch (error) {
            this.logger.log('error', `${error}`, 'parseIdentifiers');
        }
        return undefined;
    }

    /**
     * @param data - FileCodeSpotify.INFERENCES file in input as Buffer
     */
    static async parseInferences(data: Buffer) {
        try {
            const document = JSON.parse(data.toString());
            if (document && document.inferences) {
                const model: InferencesSP = { list: document.inferences };
                return model.list.length > 0 ? model : undefined;
            }
        } catch (error) {
            this.logger.log('error', `${error}`, 'parseInferences');
        }
        return undefined;
    }

    /**
     * @param data - FileCodeSpotify.PLAYLISTS file in input as Buffer
     */
    static async parsePlaylists(data: Buffer) {
        try {
            const document = JSON.parse(data.toString());
            if (document && document.playlists) {
                const model: PlaylistsSP = {
                    list: document.playlists.map((playlist: any) => {
                        const subModel: PlaylistSP = {};
                        playlist.name && (subModel.name = playlist.name);
                        if (playlist.lastModifiedDate) {
                            const match =
                                playlist.lastModifiedDate.match(
                                    /(\d+)-(\d+)-(\d+)/,
                                );
                            match &&
                                (subModel.lastModifiedDate = new Date(
                                    match[1],
                                    match[2],
                                    match[3],
                                ));
                        }
                        playlist.description &&
                            (subModel.description = playlist.description);
                        playlist.numberOfFollowers !== undefined &&
                            (subModel.numberOfFollowers =
                                playlist.numberOfFollowers);
                        if (playlist.items) {
                            subModel.items = playlist.items.map((item: any) => {
                                const itemModel: ItemSP = {};
                                item.episode &&
                                    (itemModel.episode = item.episode);
                                item.localTrack &&
                                    (itemModel.localTrack = item.localTrack);
                                if (item.addedDate) {
                                    const match =
                                        item.addedDate.match(
                                            /(\d+)-(\d+)-(\d+)/,
                                        );
                                    match &&
                                        (itemModel.addedDate = new Date(
                                            match[1],
                                            match[2],
                                            match[3],
                                        ));
                                }
                                if (item.track) {
                                    const trackModel: TrackSP = {};
                                    item.track.trackName &&
                                        (trackModel.trackName =
                                            item.track.trackName);
                                    item.track.artistName &&
                                        (trackModel.artistName =
                                            item.track.artistName);
                                    item.track.albumName &&
                                        (trackModel.albumName =
                                            item.track.albumName);
                                    item.track.trackUri &&
                                        (trackModel.trackUri =
                                            item.track.trackUri);
                                    !ValidatorObject.objectIsEmpty(
                                        trackModel,
                                    ) && (itemModel.track = trackModel);
                                }
                                return itemModel;
                            });
                        }
                        return subModel;
                    }),
                };
                return model.list.length > 0 ? model : undefined;
            }
        } catch (error) {
            this.logger.log('error', `${error}`, 'parsePlaylists');
        }
        return undefined;
    }

    /**
     * @param data - FileCodeSpotify.STREAMING_HISTORY file in input as Buffer
     */
    static async parseStreamingHistory(data: Buffer) {
        try {
            const document = JSON.parse(data.toString());
            if (document) {
                const model: StreamingHistorySP = {
                    list: document.map((streaming: any) => {
                        const subModel: StreamingSP = {};
                        if (streaming.endTime) {
                            const match = streaming.endTime.match(
                                /(\d+)-(\d+)-(\d+) (\d+):(\d+)/,
                            );
                            match &&
                                (subModel.endTime = new Date(
                                    match[1],
                                    match[2],
                                    match[3],
                                    match[4],
                                    match[5],
                                ));
                        }
                        streaming.artistName &&
                            (subModel.artistName = streaming.artistName);
                        streaming.trackName &&
                            (subModel.trackName = streaming.trackName);
                        streaming.msPlayed !== undefined &&
                            (subModel.msPlayed = streaming.msPlayed);
                        return subModel;
                    }),
                };
                return model.list.length > 0 ? model : undefined;
            }
        } catch (error) {
            this.logger.log('error', `${error}`, 'parseStreamingHistory');
        }
        return undefined;
    }

    /**
     * @param data - FileCodeSpotify.USERDATA file in input as Buffer
     */
    static async parseUserdata(data: Buffer) {
        try {
            const document = JSON.parse(data.toString());
            if (document) {
                const model: UserdataSP = {};
                document.username && (model.username = document.username);
                document.email && (model.email = document.email);
                document.createdFromFacebook !== undefined &&
                    (model.createdFromFacebook = document.createdFromFacebook);
                document.facebookUid &&
                    (model.facebookUid = document.facebookUid);
                if (document.birthdate) {
                    const match = document.birthdate.match(/(\d+)-(\d+)-(\d+)/);
                    match &&
                        (model.birthdate = new Date(
                            match[1],
                            match[2],
                            match[3],
                        ));
                }
                document.gender && (model.gender = document.gender);
                document.mobileNumber &&
                    (model.mobileNumber = document.mobileNumber);
                document.mobileOperator &&
                    (model.mobileOperator = document.mobileOperator);
                document.mobileBrand &&
                    (model.mobileBrand = document.mobileBrand);
                if (document.creationTime) {
                    const match =
                        document.creationTime.match(/(\d+)-(\d+)-(\d+)/);
                    match &&
                        (model.creationTime = new Date(
                            match[1],
                            match[2],
                            match[3],
                        ));
                }
                return !ValidatorObject.objectIsEmpty(model)
                    ? model
                    : undefined;
            }
        } catch (error) {
            this.logger.log('error', `${error}`, 'parseUserdata');
        }
        return undefined;
    }

    /**
     * @param data - FileCodeSpotify.YOUR_LIBRARY file in input as Buffer
     */
    static async parseYourLibrary(data: Buffer) {
        try {
            const document = JSON.parse(data.toString());
            if (document && document.tracks) {
                const model: YourLibrarySP = {
                    list: document.tracks.map((track: any) => {
                        const subModel: TrackSP = {};
                        track.artist && (subModel.artistName = track.artist);
                        track.album && (subModel.albumName = track.album);
                        track.track && (subModel.trackName = track.track);
                        track.uri && (subModel.trackUri = track.uri);
                        return subModel;
                    }),
                };
                return model.list.length > 0 ? model : undefined;
            }
        } catch (error) {
            this.logger.log('error', `${error}`, 'parseYourLibrary');
        }
        return undefined;
    }
}
