const express = require('express');
const cron = require('node-cron');
const server = express();
const { functionTest, responseGet, } = require('./helpers/helper');
const { countriesGetAsync, countryModel } = require('./countries/countries');

const serverPort = 3000;
let cronCount = 0;

const rapidapi = {
    countries: {
        key: 'f4c4ef100amsh086847d03df0fb1p14499bjsnab8ac20e25cb',
        host: 'rest-countries10.p.rapidapi.com',
        url: 'https://rest-countries10.p.rapidapi.com',
        controller: '/countries',
    },
};

server?.get('/', (req, res) => {
    console?.log(`Server online on port: ${serverPort}`);
    res?.send('Ok');
});

server?.listen(serverPort, () => {
    console?.log(`Server is running on port: ${serverPort}`);
});

//execute on 5 seconds
const task = cron?.schedule('*/5 * * * * *', async () => {
    let response = responseGet();
    const currentMethod = 'Index / Cron / schedule';
    try {
        response = functionTest({
            param1: 'cron test',
            param2: cronCount++,
        });

        if (!response?.isSucess || response?.isWarning) {
            console?.error(response?.result);
        } else {
            console?.log(response?.result);
        }

        if (cronCount == 1) {
            response = await countriesGetAsync({
                key: rapidapi?.countries?.key,
                url: rapidapi?.countries?.url,
                //host: rapidapi?.countries?.host,
                controller: rapidapi?.countries?.controller,
                subMethod: currentMethod,
            });

            if (!response?.isSucess || response?.isWarning) {
                console?.error(response);
            } else {
                let countries = [countryModel];
                countries = response.result;
                console?.log(countries);
            }
        }

        //#region old code
        // taskStop({
        //     flag: 3,
        //     subMethod: currentMethod,
        // });
        //#endregion old code
    } catch (ex) {
        console?.error(ex);
    }
}, { scheduled: true },);

//task?.start();
//task.stop();

//#region old code
// const taskStop = ({
//     flag = -1,
//     subMethod = ''
// }) =>{
//     let response = responseGet();
//     const currentMethod = 'taskStop';
//     try {
//         if(cronCount === flag){
//             task.stop();
//         }
//     } catch (ex) {
//         response.msgType = -1;
//         response.isSucess = false;
//         response.msgText = `Method: ${currentMethod}\n`;
//         response.msgText += `Sub method: ${subMethod}\n`;
//         response.msgText += `Error: ${ex?.message}`;
//         console?.error(response);
//     }
// }
//#endregion old code