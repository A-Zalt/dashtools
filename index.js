import * as c from "./constants.js"
import * as accounts from "./server/accounts.js"
import * as comments from "./server/comments.js"
import * as levels from "./server/levels.js"
import * as lists from "./server/lists.js"
import * as likes from "./server/like.js"
import * as users from "./server/users.js"
import * as songs from "./server/songs.js"
import * as socials from "./server/socials.js"
import * as u from "./utils.js"
import * as rewards from "./server/rewards.js"
import * as scores from "./server/leaderboards.js"

export const constants = c

export class GDAccount {
    constructor(playerID, accountID, password, username, udid) {
        let digits = "1234567890".split("")

        this.playerID = playerID || 0
        this.accountID = accountID || 0
        this.password = password || ""
        this.udid = udid || `S15${utils.rs(25, digits)}1000`
        this.uuid = playerID || utils.generateRandomUUID()
        this.username = username || "Player"
    }
}

export class GDClient {
    constructor(account, server, endpoints, versions, headers, accountServer, contentServer) {
        this.server = server ? server.replace(/\/$/, "") : c.DEFAULT_SERVER
        this.accountServer = accountServer ? accountServer.replace(/\/$/, "") : this.server
        this.contentServer = contentServer ? contentServer.replace(/\/$/, "") : this.server
        if (this.accountServer == c.DEFAULT_SERVER) this.accountServer = c.DEFAULT_ACCOUNT_URL
        if (this.contentServer == c.DEFAULT_SERVER) this.contentServer = c.DEFAULT_CONTENT_URL
        this.endpoints = endpoints || c.DEFAULT_ENDPOINTS
        this.headers = headers || c.DEFAULT_HEADERS_22
        this.versions = versions || c.VERSIONS
        this.account = account || new GDAccount()
    }
    likeItem(itemID, special, type, like, callback, params, options, secret) {
        likes.likeItem(itemID, special, type, like, this, params, callback, options, secret)
    }
    likeLevel(levelID, like, callback, params, options, secret) {
        likes.likeItem(levelID, 0, 1, like ? 1 : 0, this, params, callback, options, secret)
    }
    likeComment(commentID, levelID, like, callback, params, options, secret) {
        likes.likeItem(commentID, levelID, 2, like ? 1 : 0, this, params, callback, options, secret)
    }
    likeAccountPost(postID, accountID, like, callback, params, options, secret) {
        likes.likeItem(postID, accountID, 3, like ? 1 : 0, this, params, callback, options, secret)
    }
    likeList(listID, like, callback, params, options, secret) {
        likes.likeItem(listID, 0, 4, like ? 1 : 0, this, params, callback, options, secret)
    }
    rateLevel(levelID, stars, callback, params, options, secret) {
        levels.rateLevel(levelID, stars, this, params, callback, options, secret)
    }
    rateDemon(levelID, rating, callback, params, options, secret) {
        levels.rateDemon(levelID, rating, this, params, callback, options, secret)
    }
    getLevelComments(levelID, count, mode, page, callback, params, options, secret) {
        comments.getLevelComments(levelID, count, mode, page, this, params, callback, options, secret)
    }
    getCommentHistory(playerID, count, mode, callback, params, options, secret) {
        comments.getCommentHistory(playerID, count, mode, this, params, callback, options, secret)
    }
    uploadComment(levelID, content, percentage, callback, params, options, secret) {
        comments.uploadComment(levelID, content, percentage, this, params, callback, options, secret)
    }
    deleteComment(levelID, commentID, callback, params, options, secret) {
        comments.deleteComment(levelID, commentID, this, params, callback, options, secret)
    }
    getProfilePosts(accountID, page, total, callback, params, options, secret) {
        comments.getProfilePosts(accountID, page, total, this, params, callback, options, secret)
    }
    uploadProfilePost(content, callback, params, options, secret) {
        comments.uploadProfilePost(content, this, params, callback, options, secret)
    }
    deleteProfilePost(id, accountID, callback, params, options, secret) {
        comments.deleteProfilePost(id, accountID, this, params, callback, options, secret)
    }
    getLevels(opts, callback, params, options, secret) {
        levels.getLevels(opts, this, params, callback, options, secret)
    }
    getLevelLists(opts, callback, params, options, secret) {
        lists.getLevelLists(opts, this, params, callback, options, secret)
    }
    getMostDownloadedLevels(opts, callback, params, options, secret) {
        levels.getLevels({type: 1, ...opts}, this, params, callback, options, secret)
    }
    getMostDownloadedLevelLists(opts, callback, params, options, secret) {
        lists.getLevelLists({type: 1, ...opts}, this, params, callback, options, secret)
    }
    getMostLikedLevels(opts, callback, params, options, secret) {
        levels.getLevels({type: 2, ...opts}, this, params, callback, options, secret)
    }
    getMostLikedLevelLists(opts, callback, params, options, secret) {
        lists.getLevelLists({type: 2, ...opts}, this, params, callback, options, secret)
    }
    getTrendingLevels(opts, callback, params, options, secret) {
        levels.getLevels({type: 3, ...opts}, this, params, callback, options, secret)
    }
    getTrendingLevelLists(opts, callback, params, options, secret) {
        lists.getLevelLists({type: 3, ...opts}, this, params, callback, options, secret)
    }
    getRecentLevels(opts, callback, params, options, secret) {
        levels.getLevels({type: 4, ...opts}, this, params, callback, options, secret)
    }
    getRecentLevelLists(opts, callback, params, options, secret) {
        lists.getLevelLists({type: 4, ...opts}, this, params, callback, options, secret)
    }
    getFeaturedLevels(opts, callback, params, options, secret) {
        levels.getLevels({type: 6, ...opts}, this, params, callback, options, secret)
    }
    getTopLevelLists(opts, callback, params, options, secret) {
        lists.getLevelLists({type: 6, ...opts}, this, params, callback, options, secret)
    }
    getMagicLevels(opts, callback, params, options, secret) {
        levels.getLevels({type: 7, ...opts}, this, params, callback, options, secret)
    }
    getMagicLevelLists(opts, callback, params, options, secret) {
        lists.getLevelLists({type: 7, ...opts}, this, params, callback, options, secret)
    }
    getSentLevelsOld(opts, callback, params, options, secret) {
        levels.getLevels({type: 8, ...opts}, this, params, callback, options, secret)
    }
    getAwardedLevels(opts, callback, params, options, secret) {
        levels.getLevels({type: 11, ...opts}, this, params, callback, options, secret)
    }
    getAwardedLevelLists(callback, params, options, secret) {
        lists.getLevelLists({type: 11, ...opts}, this, params, callback, options, secret)
    }
    getFriendLevels(opts, callback, params, options, secret) {
        levels.getLevels({type: 13, ...opts}, this, params, callback, options, secret)
    }
    getFriendLevelLists(opts, callback, params, options, secret) {
        lists.getLevelLists({type: 13, ...opts}, this, params, callback, options, secret)
    }
    getMostLikedWorldLevels(opts, callback, params, options, secret) {
        levels.getLevels({type: 15, ...opts}, this, params, callback, options, secret)
    }
    getHallOfFameLevels(opts, callback, params, options, secret) {
        levels.getLevels({type: 16, ...opts}, this, params, callback, options, secret)
    }
    getFeaturedWorldLevels(opts, callback, params, options, secret) {
        levels.getLevels({type: 17, ...opts}, this, params, callback, options, secret)
    }
    getOldDailyLevels(opts, callback, params, options, secret) {
        levels.getLevels({type: 21, ...opts}, this, params, callback, options, secret)
    }
    getOldWeeklyLevels(opts, callback, params, options, secret) {
        levels.getLevels({type: 22, ...opts}, this, params, callback, options, secret)
    }
    getOldEventLevels(opts, callback, params, options, secret) {
        levels.getLevels({type: 23, ...opts}, this, params, callback, options, secret)
    }
    getLevelsFromList(listID, opts, callback, params, options, secret) {
        levels.getLevels({type: 25, listID, ...opts}, this, params, callback, options, secret)
    }
    getSentLevels(opts, callback, params, options, secret) {
        levels.getLevels({type: 27, ...opts}, this, params, callback, options, secret)
    }
    getSentLevelLists(callback, params, options, secret) {
        lists.getLevelLists({type: 27, ...opts}, this, params, callback, options, secret)
    }
    getDailyLevel(callback, params, options, secret) {
        levels.getDailyLevel(this, params, callback, options, secret)
    }
    getWeeklyLevel(callback, params, options, secret) {
        levels.getDailyLevel(this, {type: 1, ...params}, callback, options, secret)
    }
    getEventLevel(callback, params, options, secret) {
        levels.getDailyLevel(this, {type: 2, ...params}, callback, options, secret)
    }
    reportLevel(levelID, callback, params, options, secret) {
        levels.reportLevel(levelID, this, params, callback, options, secret)
    }
    searchLevels(query, opts, callback, params, options, secret) {
        levels.getLevels({
            type: 0,
            query,
            ...opts
        }, this, params, callback, options, secret)
    }
    searchLevelLists(query, opts, callback, params, options, secret) {
        lists.getLevelLists({type: 0, query, ...opts}, this, params, callback, options, secret)
    }
    getRatedLevelsByID(levelIDs, opts, callback, params, options, secret) {
        levels.getLevels({
            type: 10,
            levelIDs,
            ...opts
        }, this, params, callback, options, secret)
    }
    getLevelsByAccountIDs(accountIDs, opts, callback, params, options, secret) {
        levels.getLevels({
            type: 12,
            accountIDs,
            ...opts
        }, this, params, callback, options, secret)
    }
    getLevelListsByAccountIDs(accountIDs, opts, callback, params, options, secret) {
        lists.getLevelLists({type: 12, accountIDs, ...opts}, this, params, callback, options, secret)
    }
    getLevelsByPlayerID(playerID, opts, callback, params, options, secret) {
        levels.getLevels({
            type: 5,
            playerID,
            ...opts
        }, this, params, callback, options, secret)
    }
    getLevelListsByAccountID(accountID, opts, callback, params, options, secret) {
        lists.getLevelLists({type: 5, accountID, ...opts}, this, params, callback, options, secret)
    }
    getLevelsByID(levelIDs, opts, callback, params, options, secret) {
        levels.getLevels({
            type: 19,
            levelIDs,
            ...opts
        }, this, params, callback, options, secret)
    }
    getMapPacks(page, callback, params, options, secret) {
        levels.getMapPacks(this, {page, ...params}, callback, options, secret)
    }
    getGauntlets(callback, params, options, secret) {
        levels.getGauntlets(this, {...params}, callback, options, secret)
    }
    downloadLevel(id, callback, params, options, secret) {
        levels.downloadLevel(id, this, {...params}, callback, options, secret)
    }
    downloadDailyLevel(callback, params, options, secret) {
        levels.downloadLevel(-1, this, {...params}, callback, options, secret)
    }
    downloadWeeklyLevel(callback, params, options, secret) {
        levels.downloadLevel(-2, this, {...params}, callback, options, secret)
    }
    downloadEventLevel(callback, params, options, secret) {
        levels.downloadLevel(-3, this, {...params}, callback, options, secret)
    }
    deleteLevel(levelID, callback, params, options, secret) {
        levels.deleteLevel(levelID, this, {...params}, callback, options, secret)
    }
    getSongInfo(songID, callback, params, options, secret) {
        songs.getSongInfo(songID, this, params, callback, options, secret)
    }
    getTopArtists(page, callback, params, options, secret) {
        songs.getTopArtists(page, this, params, callback, options, secret)
    }
    searchUsers(query, callback, params, options, secret) {
        users.searchUsers(query, this, params, callback, options, secret)
    }
    getUserByAccountID(accountID, logout, callback, params, options, secret) {
        users.getUserByAccountID(accountID, logout, this, params, callback, options, secret)
    }
    registerAccount(username, email, password, callback, params, options, secret) {
        accounts.registerAccount(username, email, password, this, params, callback, options, secret)
    }
    loginAccount(username, password, callback, params, options, secret) {
        accounts.loginAccount(username, password, this, params, callback, options, secret)
    }
    getGlobalStarLeaderboards(callback, params, options, secret) {
        scores.getLeaderboards(constants.SCORES.TOP, this, params, callback, options, secret)
    }
    getRelativeLeaderboards(accountID, callback, params, options, secret) {
        scores.getLeaderboards(constants.SCORES.RELATIVE, this, {
            accountID,
            ...params
        }, callback, options, secret)
    }
    getFriendLeaderboards(callback, params, options, secret) {
        scores.getLeaderboards(constants.SCORES.FRIENDS, this, params, callback, options, secret)
    }
    getGlobalCreatorLeaderboards(callback, params, options, secret) {
        scores.getLeaderboards(constants.SCORES.CREATORS, this, params, callback, options, secret)
    }
    /**
     * Updates your account stats.
     *
     * @param {object} opt The options
     * @param {number} opt.stars Your star count
     * @param {number} opt.moons Your moon count
     * @param {number} opt.demons Your demon count. If left out, defaults to the length of the completedDemons array
     * @param {number} opt.diamonds Your diamond count
     * @param {number} opt.secretCoins Your secret coin count
     * @param {number} opt.userCoins Your user coin count
     * @param {number} opt.iconType Your selected icon type
     * @param {number} opt.cubeID Your cube's ID
     * @param {number} opt.shipID Your ship's ID
     * @param {number} opt.ballID Your ball's ID
     * @param {number} opt.ufoID Your UFO's ID
     * @param {number} opt.waveID Your wave's ID
     * @param {number} opt.robotID Your robot's ID
     * @param {number} opt.spiderID Your spider's ID
     * @param {number} opt.swingID Your swing's ID
     * @param {number} opt.jetpackID Your jetpack's ID
     * @param {number} opt.deathEffectID Your death effect ID
     * @param {number} opt.color1 Your primary color
     * @param {number} opt.color2 Your secondary color
     * @param {number} opt.glowColor Your glow color. Will default to secondary if left out
     * @param {boolean} opt.glow Whether glow is enabled
     * @param {Array[number]} opt.completedDemons Array of all the IDs of your completed demons
     * @param {object} opt.classic Amounts of completed classic levels
     * @param {number} opt.classic.auto Amount of completed classic auto levels
     * @param {number} opt.classic.easy Amount of completed classic easy levels
     * @param {number} opt.classic.normal Amount of completed classic normal levels
     * @param {number} opt.classic.hard Amount of completed classic hard levels
     * @param {number} opt.classic.harder Amount of completed classic harder levels
     * @param {number} opt.classic.insane Amount of completed classic insane levels
     * @param {object} opt.platformer Amounts of completed platformer levels
     * @param {number} opt.platformer.auto Amount of completed platformer auto levels
     * @param {number} opt.platformer.easy Amount of completed platformer easy levels
     * @param {number} opt.platformer.normal Amount of completed platformer normal levels
     * @param {number} opt.platformer.hard Amount of completed platformer hard levels
     * @param {number} opt.platformer.harder Amount of completed platformer harder levels
     * @param {number} opt.platformer.insane Amount of completed platformer insane levels
     * @param {number} opt.completedGauntletDemons Amount of completed gauntlet demons
     * @param {number} opt.completedGauntletNonDemons Amount of completed gauntlet non-demons
     * @param {number} opt.completedDailies Amount of completed dailies
     * @param {number} opt.completedWeeklies Amount of completed weeklies
     * @param {function} callback Function callback
     * @param {object} params Extra parameters
     * @param {object} options Axios options
     * @param {string} secret The `secret` parameter (uses the correct one for the GD servers by default)
     * @returns {number}
     */
    updateUserScore(opt, callback, params, options, secret) {
        users.updateUserScore(opt, this, params, callback, options, secret)
    }
    getDailyChests(callback, params, options, secret) {
        rewards.getRewards(0, this, params, callback, options, secret)
    }
    getQuests(callback, params, options, secret) {
        rewards.getChallenges(this, params, callback, options, secret)
    }
    requestModAccess(callback, params, options, secret) {
        accounts.requestModAccess(this, params, callback, options, secret)
    }
    updateDescription(levelID, desc, callback, params, options, secret) {
        levels.updateDescription(levelID, desc, this, params, callback, options, secret)
    }
    uploadLevel(opts, callback, params, options, secret) {
        levels.uploadLevel(opts, this, params, callback, options, secret)
    }
    deleteLevel(levelID, callback, params, options, secret) {
        levels.deleteLevel(levelID, this, params, callback, options, secret)
    }
    getUserList(type, callback, params, options, secret) {
        socials.getUserList(type, this, params, callback, options, secret)
    }
    getFriendsList(callback, params, options, secret) {
        socials.getUserList(0, this, params, callback, options, secret)
    }
    getBlockList(callback, params, options, secret) {
        socials.getUserList(1, this, params, callback, options, secret)
    }
    loadSaveData(callback, params, options, secret) {
        accounts.loadSaveData(this, params, callback, options, secret)
    }
    backupSaveData(gameManager, localLevels, callback, params, options, secret) {
        accounts.backupSaveData(gameManager, localLevels, this, params, callback, options, secret)
    }
    updateAccountSettings(messagePermissions, friendPermissions, commentHistoryPermissions, youtube, twitter, twitch, callback, params, options, secret) {
        users.updateAccountSettings(messagePermissions, friendPermissions, commentHistoryPermissions, youtube, twitter, twitch, this, params, callback, options, secret)
    }
    getMessages(page, type, callback, params, options, secret) {
        socials.getMessages(page, type, this, params, callback, options, secret)
    }
    getIncomingMessages(page, callback, params, options, secret) {
        socials.getMessages(page, 0, this, params, callback, options, secret)
    }
    getOutgoingMessages(page, callback, params, options, secret) {
        socials.getMessages(page, 1, this, params, callback, options, secret)
    }
    readMessage(id, isSender, callback, params, options, secret) {
        socials.readMessage(id, isSender, this, params, callback, options, secret)
    }
    sendMessage(accountID, subject, body, callback, params, options, secret) {
        socials.sendMessage(accountID, subject, body, this, params, callback, options, secret)
    }
    deleteMessage(id, isSender, callback, params, options, secret) {
        socials.deleteMessage(id, isSender, this, params, callback, options, secret)
    }
    blockUser(accountID, callback, params, options, secret) {
        socials.blockUser(accountID, this, params, callback, options, secret)
    }
    unblockUser(accountID, callback, params, options, secret) {
        socials.unblockUser(accountID, this, params, callback, options, secret)
    }
    getFriendRequests(page, type, callback, params, options, secret) {
        socials.getFriendRequests(page, type, this, params, callback, options, secret)
    }
    getIncomingFriendRequests(page, callback, params, options, secret) {
        socials.getFriendRequests(page, 0, this, params, callback, options, secret)
    }
    getOutgoingFriendRequests(page, callback, params, options, secret) {
        socials.getFriendRequests(page, 1, this, params, callback, options, secret)
    }
    deleteFriendRequests(accountIDs, isSender, callback, params, options, secret) {
        socials.deleteFriendRequests(accountIDs, isSender, this, params, callback, options, secret)
    }
    sendFriendRequest(accountID, comment, callback, params, options, secret) {
        socials.sendFriendRequest(accountID, comment, this, params, callback, options, secret)
    }
    readFriendRequest(requestID, callback, params, options, secret) {
        socials.readFriendRequest(requestID, this, params, callback, options, secret)
    }
    acceptFriendRequest(targetAccountID, requestID, callback, params, options, secret) {
        socials.acceptFriendRequest(requestID, targetAccountID, this, params, callback, options, secret)
    }
    removeFriend(targetAccountID, callback, params, options, secret) {
        socials.removeFriend(targetAccountID, this, params, callback, options, secret)
    }
    uploadLevelList(opts, callback, params, options, secret) {
        lists.uploadLevelList(opts, this, params, callback, options, secret)
    }
    deleteLevelList(id, callback, params, options, secret) {
        lists.deleteLevelList(id, this, params, callback, options, secret)
    }
    getAccountURL(type, callback, params, options, secret) {
        accounts.getAccountURL(type, this, params, callback, options, secret)
    }
    getBackupAccountURL(callback, params, options, secret) {
        accounts.getAccountURL(1, this, params, callback, options, secret)
    }
    getSyncAccountURL(callback, params, options, secret) {
        accounts.getAccountURL(2, this, params, callback, options, secret)
    }
    getLevelScores(levelID, type, opts, callback, params, options, secret) {
        scores.getLevelScores(levelID, type, opts, this, params, callback, options, secret)
    }
    getPlatformerLevelScores(levelID, type, mode, opts, callback, params, options, secret) {
        scores.getPlatformerLevelScores(levelID, type, mode, opts, this, params, callback, options, secret)
    }
    getContentURL(callback, params, options, secret) {
        songs.getContentURL(this, params, callback, options, secret)
    }
    getMusicLibraryVersion(callback, params, options) {
        songs.getMusicLibraryVersion(this, params, callback, options)
    }
    getOldMusicLibraryVersion(callback, params, options) {
        songs.getOldMusicLibraryVersion(this, params, callback, options)
    }
    getSFXLibraryVersion(callback, params, options) {
        songs.getSFXLibraryVersion(this, params, callback, options)
    }
    getMusicLibrary(callback, params, options) {
        songs.getMusicLibrary(this, params, callback, options)
    }
    getOldMusicLibrary(callback, params, options) {
        songs.getOldMusicLibrary(this, params, callback, options)
    }
    downloadLibrarySong(id, callback, params, options) {
        songs.downloadLibrarySong(id, this, params, callback, options)
    }
    downloadSoundEffect(id, callback, params, options) {
        songs.downloadSoundEffect(id, this, params, callback, options)
    }
    getSFXLibrary(callback, params, options) {
        songs.getSFXLibrary(this, params, callback, options)
    }
    getWraithCode(code, callback, params, options, secret) {
        rewards.getWraithCode(this, code, params, callback, options, secret)
    }
}
export let utils = u
