import {
    fetch as fetchUndici
} from 'undici';
import FormData from 'form-data';
import fakeUserAgent from 'fake-useragent';
import axios from "axios";
import fs from "fs";
import path from "path";
import querystring from "querystring";
import {
    performance
} from "perf_hooks";

const BING_URL = "https://www.bing.com";

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const generateRandomIP = () => {
    const octet = () => Math.floor(Math.random() * 256);
    return `${octet()}.${octet()}.${octet()}.${octet()}`;
};

const generateRandomUserAgent = () => {
    const androidVersions = ['4.0.3', '4.1.1', '4.2.2', '4.3', '4.4', '5.0.2', '5.1', '6.0', '7.0', '8.0', '9.0', '10.0', '11.0'];
    const deviceModels = ['M2004J19C', 'S2020X3', 'Xiaomi4S', 'RedmiNote9', 'SamsungS21', 'GooglePixel5'];
    const buildVersions = ['RP1A.200720.011', 'RP1A.210505.003', 'RP1A.210812.016', 'QKQ1.200114.002', 'RQ2A.210505.003'];
    const selectedModel = deviceModels[Math.floor(Math.random() * deviceModels.length)];
    const selectedBuild = buildVersions[Math.floor(Math.random() * buildVersions.length)];
    const chromeVersion = `Chrome/${Math.floor(Math.random() * 80) + 1}.${Math.floor(Math.random() * 999) + 1}.${Math.floor(Math.random() * 9999) + 1}`;
    const userAgent = `Mozilla/5.0 (Linux; Android ${androidVersions[Math.floor(Math.random() * androidVersions.length)]}; ${selectedModel} Build/${selectedBuild}) AppleWebKit/537.36 (KHTML, like Gecko) ${chromeVersion} Mobile Safari/537.36 WhatsApp/1.${Math.floor(Math.random() * 9) + 1}.${Math.floor(Math.random() * 9) + 1}`;
    return userAgent;
};

const getValidIPv4 = (ip) => {
    const match = !ip || ip.match(/^((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)(\/([0-9]|[1-2][0-9]|3[0-2]))?$/);
    if (match) {
        if (match[5]) {
            const mask = parseInt(match[5], 10);
            let [a, b, c, d] = ip.split('.').map(x => parseInt(x, 10));
            const max = (1 << (32 - mask)) - 1;
            const rand = Math.floor(Math.random() * max);
            d += rand;
            c += Math.floor(d / 256);
            d %= 256;
            b += Math.floor(c / 256);
            c %= 256;
            a += Math.floor(b / 256);
            b %= 256;
            return `${a}.${b}.${c}.${d}`;
        }
        return ip;
    }
    return undefined;
};

export class BingImageCreator {
    static HEADERS = {
        accept: "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
        "accept-language": "en-US,en;q=0.9",
        "cache-control": "max-age=0",
        "content-type": "application/x-www-form-urlencoded",
