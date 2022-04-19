document.addEventListener('click',(e)=>{
    element = e.srcElement.id
    console.log(element)
})
const provDivs = ['provoloneSlice1','provoloneSlice2','provoloneSlice3']
const swissDivs = ['swissSlice1','swissSlice2','swissSlice3']
const hamDivs = ['hamSlice1','hamSlice2','hamSlice3']
const ham2Divs = ['hamSlice4','hamSlice5','hamSlice6']
const breadTopDiv = ['breadTop']
// async function sleep(time){
//     await setTimeout(()=>{},
//     )
// }
function sleep(time){
    return new Promise(resolve => {
        setTimeout(resolve, time)
    })  
}


async function slice(objs){
    // let currentSlice
    console.log(objs)
    const promises = objs.map(async (slice,index) => {
    // for (i = 0; i < objs.length;i++){
        // setTimeout(()=>{
            // let id = objs[i]
            
            await sleep(700+(index*300))
            console.log(slice)
            let currentSlice = document.getElementById(slice)
            currentSlice.style.visibility ='visible'
            
            // console.log(slice)
    })
        await Promise.all(promises)
    }
    // })
    

function breadfinish(){
    let breadTop = document.getElementById('breadTop')
    breadTop.style.visibility ='visible'
}
async function demoSandwich(){
    await slice(provDivs)
    await slice(swissDivs)
    await slice(breadTopDiv)
}
demoSandwich()



