/**************************** 
 *  +Background
 * ------------------------------------
    Backstory:
        -A robot crash lands on earth and has to efficiently make sandwiches to survive
            Why:
                Efficiency powers its core
    Goal: 
        -Get throughh the lunch rush (sandwich cue) with the best time possible

    Objectives:
        -slice sandwiches with similar components at the same time
        for optimal efficiency 

     Obstacles:
        - You only have space to pre-load 8 sandwiches into your cue 
        - Switching between tasks (i.e. slicing like meats and cheeses) adds to time
        - Customers can have orders of random length causing you to have to re-ask 
        if it falls out of the temporary cue (for too long?)
            -if re-asked the the customer iritability raises and after a certain point you have 
            to reask the remainder of the order, effacting your time.

     Technique:
    
     Restrictions:

     *Additional language:
        'Cue' for sandwiches
        'Line'  for customers
****************************/
document.addEventListener('DOMContentLoaded', function () {
  //let breadToggle =
  let currentSlcObj
  let frameArray =[]
  const orderModalDiv = document.getElementById('orderModal')
    function eventElements(element){
    
        switch(element){
            case 'customer': 
                if(tempCue.length < sliceCueMax){
                    askCustomer()
                }else{
                    customerHold = true
                    console.log(`Please Hold for cue space`)
                } 
            break;
            case 'sliceButtonImg': 
            //needs to change to every sandwich with its index having matching content 
                // tempCue.forEach(slice(currentSlcObj))
                slice()
            break;
            // case 'provolone': 
            // break;
        }
    }
    document.addEventListener('click',(e)=>{
        element = e.target

        if (element.classList.contains('fridgeButton')){
            // if (element != currentSlcObj){
                // element.style.setProperty("-webkit-filter", "drop-shadow(0px 0px 0px #000)")
            // }else{
                element.style.setProperty("-webkit-filter", "drop-shadow(5px 5px 5px #222)")//}
            let id = element.id.split('B')
            let button = id[0]
            currentSlcObj = button
            eventElements(button)
            console.log (`###### Fridge Selection: ${button} ######`)
        }else{eventElements(element.id)} 
        // console.log(element.class)
        
    })
/**************************** 
 *   +Color Declarations
****************************/
    const provColor = '#fcfcfc'
    const turkeyColor = '#f7eee4'
    const hamColor = '#f07878'
    const cappColor = '#f2b4a2'
    const prosColor = '#ff8080'
    const salamColor = '#db8fb1'
    const pepColor = '#d41737'
/**************************** 
 *   +Time Declarations
****************************/
    const sliceInc = 500  //millisec
    const meatSliceTime = sliceInc
    const cheeseSliceTime = sliceInc * 1.1
    const breadSliceTime = sliceInc * 2
    const m_c_SwapTime = sliceInc * 1.5//time it takes to swap a meat or cheese (one way(include ))
    const breadGrabTIme = sliceInc * 1.7//time it takes to grab bread from the rack
//*******Customer Related Factors*******//
    let randCustFrustration = Math.floor(Math.random() * 3)//frustrational slowdown
/**************************** 
 *  +Slice Div Arrays
****************************/
const provoloneDivs = ['provoloneSlice1','provoloneSlice2','provoloneSlice3']
const swissDivs = ['swissSlice1','swissSlice2','swissSlice3']
const turkeyDivs = ['turkeySlice1','turkeySlice2','turkeySlice3']
const turkey2Divs = ['turkeySlice4','turkeySlice5','turkeySlice6']
const hamDivs = ['hamSlice1','hamSlice2','hamSlice3']
const ham2Divs = ['hamSlice4','hamSlice5','hamSlice6']
const prosciuttiniDivs = ['proscSlice1','proscSlice2','proscSlice3']
const cappicolaDivs = ['cappSlice1','cappSlice2','cappSlice3']
const salamiDivs = ['salamiSlice1','salamiSlice2','salamiSlice3']
const pepperoniDivs = ['pepperoniSlice1','pepperoniSlice2','pepperoniSlice3']
const breadTopDiv = ['breadTop']
/***** */

const contentDivs = {
    provolone: provoloneDivs,
    swiss: swissDivs,
    turkey: turkeyDivs,
    turkey2: turkey2Divs,
    ham: hamDivs,
    ham2: ham2Divs,
    prosciuttini:prosciuttiniDivs,
    cappicola: cappicolaDivs,
    salami:salamiDivs,                                                    
    pepperoni: pepperoniDivs
}
/************* */
/**************************** 
 *   +Sandwich Components
****************************/



    const cheese = [
        {'provolone': provoloneDivs},
        {'swiss':swissDivs},
        {'american':null}]
    const meat = [
        {'turkey':turkeyDivs},
        {'ham':hamDivs},
        {'ham2':ham2Divs},
        {'cappicola':cappicolaDivs},
        {'prosciuttini':prosciuttiniDivs},
        {'salami':salamiDivs},
        {'pepperoni':pepperoniDivs}]

    // const cheese = [provolone,'swiss','american']
    // const meat = ['turkey','ham','ham2','cappicola','prosciuttini','salami','pepperoni']
/**************************** 
 *  +Sandwich Constructs
****************************/
    const veggie = [cheese[0],cheese[1]]
    const turkey = [cheese[0],meat[0],meat[0]]
    const ham = [cheese[0],meat[1],meat[2]]
    const club = [cheese[0],meat[0],meat[1]]
    const slamma = [cheese[0],meat[1],meat[3],meat[4]]
    const italian = [cheese[0],meat[1],meat[3],meat[4],meat[5],meat[6]]
    //const sandwichArray = ['veggie','turkey','ham','club','slamma','italian']
    const sandwichArray = [veggie,turkey,ham,club,slamma,italian]

    // let sandwiches =[
    //     {name:'veggie',
    //     contents: veggie},
    //     {name:'turkey',
    //     contents: turkey},
    //     {name:'ham',
    //     contents: ham},
    //     {name:'club',
    //     contents: club},
    //     {name:'slamma',
    //     contents: slamma},
    //     {name:'italian',
    //     contents: italian}
    // ]
    const menuConstruct ={
        'veggie': veggie,
        'turkey':turkey,
        'ham':ham,
        'club': club,
        'slamma': slamma,
        'italian': italian
    }



/*************************** */
    let masterSandwichCue = []//Full cue
    let customerLine = []
    let cueLength = 16
    let linePosition = 0
    let tempCue = []
    const sliceCueMax = 8
    const orderMax = 5
    let customerHold = false
    let workingCue = []
    let outlierNum =0
    let singleNum =0
/**************************** 
 *   +Order Control
****************************/
    function orderControl(randInc,randMax){
        let counter = customerLine.length
        let flip = Math.random()
        flip = flip.toFixed(1)
        console.log(`Flip: ${flip}`)
        if (flip > 0.5){
            if ((counter % randInc)===0){
                controledOrder = Math.floor(Math.random() * randMax)+1//Items in order
                console.log("********Order Control Outier*********")
                outlierNum++
                console.log(`Outlier count:${outlierNum}`)
            }
        }else{
            controledOrder = 1
            console.log("{-----Single Order-----}")
            singleNum++
            console.log(`single count:${singleNum}`)
        } 
        return controledOrder
    }
    
/**************************** 
 *  +Customer Class
****************************/
    class Customer{
        constructor(ease,orderPosition){
            this.itemAmt = orderControl(5,orderMax)//Math.floor(Math.random() * orderMax)+1//Items in order
            this.order = sandwichGenerator(this.itemAmt)
            this.orderDone = true
            this.orderNumber = 0
            this.orderPosition = orderPosition //how far along in slicing order
            this.ease = ease
            this.askTime = (sliceInc * 2) * this.itemAmt   
            this.active = null         
       
        }   
    }
/**************************** 
 *  +Cue Sandwich Object
 * element passes frame
****************************/
    class Sandwich{
        constructor(type,slcIndex,frameId){
            let url = `./assets/Sandwiches/${type}.html`//Figure out var it needs
            this.type = type
            this.content = menuConstruct[type]
            this.url = url
            this.slcIndex = slcIndex//Increments after each layer is complete
            this.frameId = frameId
            this.active = true  
            this.complete = false  
            this.customerNumber 
        }   
    }
/**************************** 
 *  +Key-listening function
 * ------------------------------------
 *    
****************************/
        window.addEventListener('keydown', logKey);
        function logKey(e) {
            switch(e.key){
                case 'a':
                    /***** Create object full of ask methods *******/
                    if(tempCue.length < sliceCueMax){
                        askCustomer()
            
                    }else{
                        customerHold = true
                        console.log(`Please Hold for cue space`)
                    } 
                break;
                case 'm':
                    printMasterCue()
                    console.log(customerLine)
                break;
                case 's':
                    slice()
                break;
                case 'c':
                    // pushToCue()
                break;
                case 'f':
                    fetchSandwichHtml(ham)
                break;
                case 't':
                    console.log(tempCue)
                break;
            }
        }
/**************************** 
 *  +Sleep Function
 * ------------------------------------
 *    
****************************/
        function sleep(time){
            return new Promise(resolve => {
                setTimeout(resolve, time)
            })  
        }
/**************************** 
 *  +Slice Inedx Increminter
 * ------------------------------------
 *    
****************************/
        function slcIndexInc(SandwichObjArray,sliced){

            SandwichObjArray.forEach(sandwich=>{
                sandwich.slcIndex++
            })
        }
/**************************** 
 *  +Generates and returns randomly selected sandwich order
 * ------------------------------------
 *    
****************************/
        function sandwichGenerator(e){
            let sandwichNum = 0
            let order =[]
            
                for (let i = 0;i<e; i++){
                    customerHold = false
                    sandwichNum = Math.floor(Math.random() * 5) //Random number Sandwich by number:array index
                    // order[i] = sandwichArray[sandwichNum]//Array elements = array element(sandwich name) = array of sandwich elemnts by name
                    // order[i] = menuConstruct.get(sandwichNum)
                    order[i] = Object.keys(menuConstruct)[sandwichNum]
                    
                    let sandwich = new Sandwich(order[i],0,tempCue.indexOf)//,element)
                    console.log(`---[generating ${sandwich.type} object]---`)
                    tempCue.push(sandwich)
                    generateSandwichCue(tempCue)
                }
            return order
        }
/**************************** 
 *  +Generates Sandwich Cue
 *    
****************************/
        function generateSandwichCue(cue){
            let builderPos = sliceCueMax
            // let frames = document.querySelectorAll('iframe')
            // let frames = document.getElementsByClassName('cueFrame')
            cue.forEach(sandwich=>{
                let url=`./assets/Sandwiches/${sandwich.type}.html`
                sandwich.frameId = `frame${builderPos}`
                let currentFrame = document.getElementById(`frame${builderPos}`)
                currentFrame.src  = url
                frameArray.push(currentFrame)
                console.log(`***current frame***[${currentFrame.id}]******`)
                // let currentFrame=frames[builderPos]
                // currentFrame.src=url
                console.log('*****generating cue*****')
                console.log(frameArray[builderPos])
                // console.log(sandwich)
                builderPos--
            })

        }
/**************************** 
 *  +Ask for customer order
 * ------------------------------------
 *      -takes the randomly generated length of the custoemr order
 *      -Loads to temporary cue (until cues max)
 *          -if order excedes temp cue(...)
 * How: 
 *  on getkey 'a'
 *     
****************************/
        function askCustomer(){
            let newCustomer = new Customer(0,linePosition) 
            console.log('Customer Asked!')
            if (newCustomer.orderDone == false){
                console.log(`Order#: 000${linePosition}`)
                console.log(newCustomer.order)
                sandwichGenerator(newCustomer.order)
                generateSandwichCue(tempCue)
                pushToCue(newCustomer.order,masterSandwichCue)
                
                pushToCue(newCustomer.order,tempCue)
               
                // slice(newCustomer.order)
            }else{
                linePosition ++
                console.log(`Order#: 000${linePosition}`)
                console.log(newCustomer.order)
            }
            //newCustomer.order.forEach(e => masterSandwichCue.push)
            //Push each order item to the master cue
            // console.log(
            // orderModalDiv.textContent =`Current Order: ${newCustomer.order}`
            lh =`<u>Current Order:</u>`
            orderModalDiv.style.display = "inline"
            let htmlList= ''
            newCustomer.order.forEach(sandwich=>{
               htmlList += (`<li>${sandwich}</li>`)
            //    console.log(htmlList) 
            })
            htmlList = `
            <h4>${lh}</h4>
            <ul>${htmlList}</ul>
            `

            orderModalDiv.innerHTML = htmlList
            document.getElementById('timeText').style.justifyContent="center"
            document.getElementById('orderModal').style.display="inline"
            document.getElementById('orderModal').style.flexDirection="column"
            document.getElementById('orderModal').style.position="absolute"
            document.getElementById('orderModal').style.top="0px"
            document.getElementById('orderModal').style.left="140px"
            // console.log(orderModalDiv.textContent)

            pushToCue(newCustomer.order,masterSandwichCue)
                // )
            // console.log(`Master Cue Length: ${masterSandwichCue}`)
            //customerLine.push(newCustomer)
        }

        function printMasterCue(){
            console.log(masterSandwichCue)
            console.log(`Single:${singleNum}/Outlier:${outlierNum}`)
        }
/********************
 *    +Checks if order is completed
 * -------------------------------------
 *      -Returns a Boolean value after taking in Customer.order array and customer.itemAmt
 * **********************/
        function checkIfOrderDone(customerOrder,AmountItems){
           
            // return
        }
    // async function getId(id){
    //     const currentSlice = await document.getElementById('provoloneSlice1')
    //     currentSlice.style.visibility ='visible'
    //     return currentSlice
    // }
    async function layerSlice(objs){
        // let currentSlice
        // var iframe = document.getElementById('iframeId');
        // var innerDoc = iframe.contentDocument || iframe.contentWindow.document;
        let passedDivs = objs// console.log(objs)
        const promises = objs.map(async (slice,index) => {
        // for (i = 0; i < objs.length;i++){
            // setTimeout(()=>{
                // let id = objs[i]
                
               
                console.log(`[[[[[[-----slicing------]]]]]]`)
                // console.log(slice)
                frameArray.forEach(frame=>{
                    
                    var innerDoc = frame.contentDocument || frame.contentWindow.document;
                    console.log(`+++++++frame: ${innerDoc}+++++++`)
                    passedDivs.forEach(div=>{
                    div.forEach(actualDiv=>{
                        console.log(`+++++++Actual Div: ${actualDiv}+++++++`)
                        let currentSlice = innerDoc.getElementById(actualDiv)
                        // getId(actualDiv)
                        // const currentSlice = await document.getElementById('provoloneSlice1')//.style.visibility ='visible'
                        // document.getElementById(currentSlice).style.visibility ='visible'
                         sleep(700+(index*300))
                        console.log(`Current Slice: ${currentSlice.style.visibility}`)
                        currentSlice.style.visibility ='visible'
                    })
                    // generateSandwichCue(tempCue)
                    console.log(`[[[[[[sliced]]]]]]`)
                    
                    })
                })
                // console.log(slice)
        })
            await Promise.all(promises)
            
        }
/**************************** 
 *  +Slice
 * ------------------------------------
 *      -
 *          tempCue.forEach(sandwich=>{
                let url=`./assets/Sandwiches/${sandwich.type}.html`
                sandwich.cuePos = `frame${builderPos}`
                let currentFrame = document.getElementById(`frame${builderPos}`)
                currentFrame.src  = url
****************************/
        async function slice(){
            // let divIds = contentDivs[currentSlcObj]
            // console.log(divIds)
            let divArray 
            tempCue.forEach(sandwich=>{
                sandwich.content.forEach(layer=>{
                
                    let currentSlcIndex= sandwich.slcIndex
                    let layerFixins =  Object.keys(layer)[currentSlcIndex]
                    console.log(`layer Fixins:`)
                    console.log(layerFixins)
                    
                    console.log(`Intial Slice Index: ${currentSlcIndex}`)
                    if(layerFixins == currentSlcObj){
                        
                        console.log(`Totally able to slice [${layerFixins}] with [${currentSlcObj}]!`)
                        // layer.forEach(slice=>{
                        console.log(`Activating: ${layerFixins}`)
                        tempCue.forEach(sandwich=>{
                            //Need to send sandwich
                            console.log(`Hopefully the div array at the [${sandwich.slcIndex}] index`)
                            divArray = Object.values(sandwich.content[sandwich.slcIndex])
                            console.log(divArray)
                            console.log(sandwich.content[sandwich.slcIndex])
                            // if(sandwich.content[sandwich.slcIndex] == currentSlcObj){
                            layerSlice(divArray)//,currentSlcIndex)
                                
                            // }

                        })
                        slcIndexInc(tempCue)
                        /******************** */
                        
                        // })
                        
                    }else{console.log(`NOT able to slice! [${layerFixins}] with [${currentSlcObj}]`)}
                    
                    console.log(`New Slice Index: ${this.slcIndex}`)
                })
                // console.log(`New Slice Test: ${sandwich.content}`)
                // if (sandwich){
                // for (){

                // }
                // }
            })
             }
        function breadfinish(){
            let breadTop = document.getElementById('breadTop')
            breadTop.style.visibility ='visible'
        }     
/**************************** 
 *  +Add to tempCue
 * ------------------------------------
 *      -take th
****************************/
        function pushToCue(fromArray,toArray){
            fromArray.forEach(e =>{
                toArray.push(e)
            })
            console.log(`Add to temp Cue!`)
            return toArray
        }
    // console.table(sandwiches)
    
})