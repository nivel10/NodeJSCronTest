const responseGet = () => {
    return {
        isSucess: true,
        isWarning: false,
        msgType: 0,
        msgText: '',
        result: undefined,
    };
};

const functionTest = ({ param1 = '', param2 = 0, }) => {
    let response = responseGet();
    try {
        //#region old code
        // console?.log({
        //     p1: param1,
        //     p2: param2,
        //     date: new Date()?.toISOString()
        // });
        // //console?.log(param2);
        //#endregion old code
        response.result = {
            p1: param1,
            p2: param2,
            date: new Date()?.toISOString()
        };
    } catch (ex) {
        //#region old code
        // console?.error({
        //     //error: ex?.message
        //     error: ex,
        //     date: new Date()?.toISOString(),
        // });
        //#endregion old code
        response.isSucess = false;
        response.msgType = -1;
        response.result = {
            error: ex,
            date: new Date()?.toISOString(),
        }
    }
    return response;
}

module.exports = {
    responseGet,
    functionTest,
}