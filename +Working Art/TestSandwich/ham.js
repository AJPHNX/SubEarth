document.addEventListener('click',(e)=>{
    element = e.srcElement.id
    console.log(element)
})
const provDivs = ['provoloneSlice1','provoloneSlice2','provoloneSlice3']
const hamDivs = ['hamSlice1','hamSlice2','hamSlice3']
const turkeyDivs = ['turkeySlice1','turkeySlice2','turkeySlice3']



function slice(objs){
    let currentSlice
    
    objs.forEach(slice => {
        setInterval(()=>{
        currentSlice = document.getElementById(`${slice}`)
        currentSlice.style.visibility ='visible'
        // console.log(slice)
    })}
    ,1000)
}
function breadfinish(){
    let breadTop = document.getElementById('breadTop')
    breadTop.style.visibility ='visible'
}
slice(provDivs)
slice(hamDivs)
slice(turkeyDivs)
breadfinish()



