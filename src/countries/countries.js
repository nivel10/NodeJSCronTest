const { responseGet } = require(`../helpers/helper`);
//const https = require('https');

const countryModel = {
    code: {
        aplha2code: '',
        alpha3code: '',
        numericcode: '',
    },
    name: {
        shortname: '',
        shortnamelowercase: '',
        fullname: ''
    },
    flag: {
        officialflag: {
            png: '',
            svg: '',
        }
    },
    independent: false,
    administrativelanguages: [],
    subdivisions: []
};

const countriesGetAsync = async ({
    key = '',
    url = '',
    host = '',
    controller = '',
    subMethod = '',
}) => {
    let response = responseGet();
    const currentMethod = 'countriesGetAsync';
    try {
        //#region old code
        // const options = {
        //     method: 'GET',
        //     hostname: host,
        //     port: null,
        //     path: '/countries',
        //     headers: {
        //         'x-rapidapi-key': key,
        //         'x-rapidapi-host': host
        //     },
        // };


        // const req = https.request(options, function (res) {
        //     const chunks = [];

        //     res?.on('data', function (chunk) {
        //         chunks?.push(chunk);
        //     });

        //     res?.on('error', (ex) => {
        //         console?.error(ex);
        //     });

        //     res?.on('end', () => {
        //         const body = Buffer.concat(chunks);
        //         response.result = JSON?.parse(body?.toString());
        //         //response.result = body?.toJSON()?.data;
        //     });
        // });

        // req?.end();
        //#endregion old code

        const options = {
            method: 'GET',
            headers: {
                'x-rapidapi-key': key,
                'x-rapidapi-host': host
            },
        };

        const result = await fetch(
            `${url}${controller}`,
            options
        );

        if (result?.ok) {
            response.result = await result?.json();
        } else {
            response.msgType = 1;
            response.isWarning = true;
            switch (result.status) {
                case 401:
                    break;
                case 404:
                    break;
                default:
                    response.msgType = -1;
                    response.isSucess = false;
                    break;
            }
            response.msgText = `Method: ${currentMethod}\n`;
            response.msgText += `Sub method: ${subMethod}\n`;
            response.msgText += `Error: ${result?.status} - ${result?.statusText}`;
        }
    } catch (ex) {
        response.msgType = -1;
        response.isSucess = false;
        response.msgText = `Method: ${currentMethod}\n`;
        response.msgText += `Sub method: ${subMethod}\n`;
        response.msgText += `Error: ${ex?.message}`;
    }
    return response;
}

module.exports = {
    countryModel,
    countriesGetAsync,
}