export const decryptCodes = ({content, passcode = "todoPublic"}:{content:string,passcode?:string}) => {
    let result:number[] = [];
    let str = '';
    const codesArr = JSON.parse(content);
    const passLen = passcode.length;

    codesArr.forEach((item:any,index:number) => {
        const passOffset = index%passLen;
        const calAscii = (item-passcode.charCodeAt(passOffset))
        result = [...result,calAscii] 
    });

    result.forEach(item => {
        const ch = String.fromCharCode(item)
        str += ch
    })
    return str
}



