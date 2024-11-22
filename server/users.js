import { genericRequest } from "./generic.js"
import * as constants from "../constants.js"
import * as utils from "../utils.js"

export function searchUsers(username, instance, params, callback, options, secret) {
    genericRequest("getUsers", {str: username}, function(data) {
        let segments = data.split("#")
        let users = segments[0].split("|").map(u => utils.parseUser(u))
        let pages = segments[1].split(":")
        callback({
            users,
            total: Number(pages[0]),
            offset: Number(pages[1]),
            pageSize: Number(pages[2]),
        })
    }, instance, params, options, secret)
}
export function getUserByAccountID(accountID, logout, instance, params, callback, options, secret) {
    let auth = {}
    if (instance.account && !logout) {
        auth.accountID = instance.account.accountID
        auth.gjp2 = utils.gjp2(instance.account.password)
    }
    genericRequest("getUserInfo", {targetAccountID: accountID, ...auth}, function(data) {
        if (data == -1) throw new Error("-1")
        callback(utils.parseUser(data))
    }, instance, params, options, secret)
}
export function updateUserScore(opt, instance, params, callback, options, secret) {
    if (!instance.account && (!params.accountID || !params.gjp2)) throw new Error("Must authenticate with account")
    let demons = opt.demons || opt.completedDemons.length
    let dinfo = opt.completedDemons.join(",")
    let sinfo = `${opt.classic.auto},${opt.classic.easy},${opt.classic.normal},${opt.classic.hard},${opt.classic.harder},${opt.classic.insane},${opt.platformer.auto},${opt.platformer.easy},${opt.platformer.normal},${opt.platformer.hard},${opt.platformer.harder},${opt.platformer.insane}`
    let icon = opt.cubeID
    switch (opt.iconType) {
        case 1:
            icon = opt.shipID
            break
        case 2:
            icon = opt.ballID
            break
        case 3:
            icon = opt.ufoID
            break
        case 4:
            icon = opt.waveID
            break
        case 5:
            icon = opt.robotID
            break
        case 6:
            icon = opt.spiderID
            break
        case 7:
            icon = opt.swingID
            break
        case 8:
            icon = opt.jetpackID
            break
    }
    genericRequest("updateUserScore", {
        accountID: instance.account.accountID,
        gjp2: utils.gjp2(instance.account.password),
        stars: opt.stars,
        demons,
        moons: opt.moons,
        diamonds: opt.diamonds,
        coins: opt.secretCoins,
        userCoins: opt.userCoins,
        icon,
        iconType: opt.iconType,
        accIcon: opt.cubeID,
        accShip: opt.shipID,
        accBall: opt.ballID,
        accBird: opt.ufoID,
        accDart: opt.waveID,
        accRobot: opt.robotID,
        accGlow: Number(opt.glow),
        accSpider: opt.spiderID,
        accExplosion: opt.deathEffectID,
        accSwing: opt.swingID,
        accJetpack: opt.jetpackID,
        color1: opt.color1,
        color2: opt.color2,
        color3: opt.glowColor || -1,
        special: opt.glow ? 2 : 0,
        dinfo,
        dinfow: opt.completedWeeklies,
        dinfog: opt.completedGauntletDemons,
        sinfo,
        sinfod: opt.completedDailies,
        sinfog: opt.completedGauntletNonDemons,
        seed: utils.rs(10),
        // accountID, userCoins, demons, stars, coins, iconType, icon, diamonds, cube, ship, ball, ufo, wave, robot, glow, spider, deathEffect
        seed2: utils.chk([
            instance.account.accountID, 
            opt.userCoins,
            demons,
            opt.stars,
            opt.secretCoins,
            opt.iconType,
            icon,
            opt.diamonds,
            opt.cubeID,
            opt.shipID,
            opt.ballID,
            opt.ufoID,
            opt.waveID,
            opt.robotID,
            Number(opt.glow),
            opt.spiderID,
            opt.deathEffectID,
            dinfo.length,
            opt.completedWeeklies,
            opt.completedGauntletDemons,
            sinfo,
            opt.completedDailies,
            opt.completedGauntletNonDemons
        ], constants.KEYS.STAT_SUBMISSION, constants.SALTS.STAT_SUBMISSION)
    }, function(data) {
        callback(Number(data))
    }, instance, params, options, secret)
}
export function updateAccountSettings(mS, frS, cS, youtube, twitch, twitter, instance, params, callback, options, secret) {
    genericRequest("updateAccountSettings", {
        accountID: instance.account.accountID,
        gjp2: utils.gjp2(instance.account.password),
        mS, frS, cS,
        yt: youtube,
        twitter,
        twitch
    }, function(data) {
        if (data == -1) throw new Error(-1)
        else callback(data)
    }, instance, params, options, secret || constants.SECRETS.ACCOUNT)
}
