 /*
  1.输入字符串s输出s中包含所有整数的最小和，
  说明：1字符串s只包含a~z,A~Z,+,-，
  2.合法的整数包括正整数，一个或者多个0-9组成，如：0,2,3,002,102
  3.负整数，负号开头，数字部分由一个或者多个0-9组成，如-2,-012,-23,-00023
  输入描述：包含数字的字符串
  输出描述：所有整数的最小和
  示例：
    输入：
      bb1234aa
  　输出
      10
  　输入：
      bb12-34aa
  　输出：
      -31
  说明：1+2-(34)=-31
   */


handle('bb12-34aa')

function handle(string){
    const chars = string.split('');      // ['b','b','1','2','-','3','4','a','a']
    let sum = 0;

    for (let i = 0; i < chars.length; i++) {
      let c = chars[i];
      if (c == '-') {
        i++;
        let start = i;
        while (i < chars.length && typeof !isNaN(chars[i])) {
          i++;
        }
        let substring = string.substring(start, i);
        if (substring.length > 0) {
          sum -= parseInt(substring);
        }
        i--;
        continue;
      }

      if (!isNaN(c)) {
        sum += Number(c);
      }
    }
    console.log(sum)
}