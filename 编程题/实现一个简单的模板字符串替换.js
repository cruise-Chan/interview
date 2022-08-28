var template = '{{name}}很厉害，才{{age}}岁'
var context = {name:'大飞',age:'22'}
function render(template,context){
    var regexp = /{{(.*?)}}/g
    return template.replace(regexp,(macth,key) => {
        return context[key.trim()]
    })
}
var result = render(template,context)
console.log(result,'result')