import { genericRequest } from "./generic.js"
import * as constants from "../constants.js"
import * as utils from "../utils.js"

export function getRewards(type, instance, params, callback, options, secret) {
    genericRequest("getRewards", {
        chk: `${utils.rs(5)}${utils.base64Encode(utils.xor(utils.getRandomNumber(10000, 1000000).toString(), constants.KEYS.CHEST_REWARDS))}`,
        rewardType: type,
        r1: utils.getRandomNumber(100, 99999),
        r2: utils.getRandomNumber(100, 99999),
        udid: instance.account.udid,
        uuid: instance.account.uuid,
        accountID: instance.account.accountID,
        gjp2: utils.gjp2(instance.account.password)
    }, function(data) {
        if (data == -1) throw new Error(-1)
        let segments = data.split("|")
        let infoRaw = segments[0].slice(5)
        let info = utils.xor(utils.base64Decode(infoRaw), constants.KEYS.CHEST_REWARDS).split(":")
        let startString = segments[0].slice(0, 5)
        let small = info[6].split(",")
        let big = info[9].split(",")
        let hash = segments[1]
        console.log(utils.xor(utils.base64Decode(infoRaw), constants.KEYS.CHEST_REWARDS))
        callback({
            randomString1: startString,
            randomString2: info[0],
            playerID: Number(info[1]),
            chkNumber: Number(info[2]),
            udid: info[3],
            accountID: Number(info[4]),
            smallChestCooldown: Number(info[5]),
            smallChest: {
                orbs: Number(small[0]),
                diamonds: Number(small[1]),
                item1: Number(small[2]),
                item2: Number(small[3])
            },
            claimedSmallChests: Number(info[7]),
            largeChestCooldown: Number(info[8]),
            largeChest: {
                orbs: Number(big[0]),
                diamonds: Number(big[1]),
                item1: Number(big[2]),
                item2: Number(big[3])
            },
            claimedLargeChests: Number(info[10]),
            rewardType: Number(info[11]),
            hash,
            isHashValid: utils.sha1(`${infoRaw}${constants.SALTS.REWARDS}`) == hash
        })
    }, instance, params, options, secret)
}

export function getChallenges(type, instance, params, callback, options, secret) {
    genericRequest("getChallenges", {
        chk: `${utils.rs(5)}${utils.base64Encode(utils.xor(utils.getRandomNumber(10000, 1000000).toString(), constants.KEYS.CHALLENGES))}`,
        udid: instance.account.udid,
        uuid: instance.account.uuid,
        accountID: instance.account.accountID,
        gjp2: utils.gjp2(instance.account.password)
    }, function(data) {
        if (data == -1) throw new Error(-1)
        let segments = data.split("|")
        let infoRaw = segments[0].slice(5)
        let info = utils.xor(utils.base64Decode(infoRaw), constants.KEYS.CHEST_REWARDS).split(":")
        let startString = segments[0].slice(0, 5)
        let small = info[6].split(",")
        let big = info[9].split(",")
        let hash = segments[1]
        console.log(utils.xor(utils.base64Decode(infoRaw), constants.KEYS.CHEST_REWARDS))
        callback({
            randomString1: startString,
            randomString2: info[0],
            playerID: Number(info[1]),
            chkNumber: Number(info[2]),
            udid: info[3],
            accountID: Number(info[4]),
            smallChestCooldown: Number(info[5]),
            smallChest: {
                orbs: Number(small[0]),
                diamonds: Number(small[1]),
                item1: Number(small[2]),
                item2: Number(small[3])
            },
            claimedSmallChests: Number(info[7]),
            largeChestCooldown: Number(info[8]),
            largeChest: {
                orbs: Number(big[0]),
                diamonds: Number(big[1]),
                item1: Number(big[2]),
                item2: Number(big[3])
            },
            claimedLargeChests: Number(info[10]),
            rewardType: Number(info[11]),
            hash,
            isHashValid: utils.sha1(`${infoRaw}${constants.SALTS.REWARDS}`) == hash
        })
    }, instance, params, options, secret)
}