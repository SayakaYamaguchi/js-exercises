
const regex = /^(a|aa)+$/;
const inputString = 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa!'
if (regex.test(inputString)){
    console.log("マッチ");
}else{
    console.log("アンマッチ")
}
