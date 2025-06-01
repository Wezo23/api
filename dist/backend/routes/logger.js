import express from 'express';
import { resolvePlantByIMEI } from '../lib/imeiResolver.js';
import { saveLoggerData } from '../utils/saveLoggerData.js';
const router = express.Router();
router.post('/', async (req, res) => {
    try {
        const raw = req.body;
        console.log("raw,", raw);
        let messages = [];
        if (typeof raw === 'string') {
            try {
                messages = [JSON.parse(raw)];
            }
            catch {
                const parts = raw.replace(/}\s*{/g, '}\n{').split('\n');
                messages = parts.map(str => JSON.parse(str));
            }
        }
        else {
            messages = [raw];
        }
        for (const msg of messages) {
            const imei = msg?.imei ||
                msg?.data?.imei ||
                msg?.response?.imei ||
                msg?.response?.data?.imei;
            if (!imei)
                continue;
            const plantName = await resolvePlantByIMEI(imei);
            if (plantName) {
                await saveLoggerData(plantName, msg);
            }
            else {
                console.warn(`⚠️ IMEI ${imei} not mapped to any plant`);
            }
        }
        res.status(200).send('Logger data processed');
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ success: false, error: 'Server error' });
    }
});
export default router;
