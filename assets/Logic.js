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
        -Load sandwich cue with as many sandwiches as possible to key is
        -select the item you wish to slice from the fridge
        -Cick the 'slice' button or press the 's' key and each sandwich
            will be topped with the object being sliced(in the sandwiches
            ingredient list)
        -You have to remember the order(to plan accordingly)of you re-ask,
            you run the risk of aggitating the customer


     Restrictions:
        -Sandwichs get sliced in the order gotten
        -All toppings must go in menue order
        -customers come before internet orders

     *Additional language:
        'Cue' for sandwiches
        'Line'  for customers
    Keys:
    'm' - log master cue
    's' - slice sandwich cue
    't' - log temporary working sandwich cue
****************************/
/* Sandwiches */

// This could be replaced by pulling from a database later.
// In this case, you'd do a query for the id and it would return all rows of that id

const sandwichesDb = [
    {
        'id': 1,
        'title': 'Ham',
        'ingredients': ['8', '4'],
    },
    {
        'id': 2,
        'title': 'Club',
        'ingredients': ['8', '4', '9']
    },
    {
        'id': 3,
        'title': 'The Italian',
        'ingredients': ['8', '4', '5', '2', '6', '4']
    },
    {
        'id': 4,
        'title': 'The Slamma',
        'ingredients': ['8', '4', '5', '2']
    },
    {
        'id': 5,
        'title': 'Turkey',
        'ingredients': ['8', '9']
    },
    {
        'id': 6,
        'title': 'Veggie',
        'ingredients': ['8', '7']
    }
]

let sandwiches = {}
sandwichesDb.forEach( sandwich => {
    sandwiches[sandwich.id] = sandwich
})

// recreate the return from the database
const ingredientsDb = [
    {
        'id': 1,
        'title': 'American',
        'slug': 'american',
        'type': 'cheese',
        'image': 'AmericanSlice.png'
    },
    {
        'id': 2,
        'title': 'Cappicola',
        'slug': 'cappicola',
        'type': 'meat',
        'image': 'CappicolaSlice.png'
    },
    {
        'id': 3,
        'title': 'Ham', // Need solution for alt ham
        'slug': 'ham',
        'type': 'meat',
        'image': 'HamSlice.png'
    },
    {
        'id': 4,
        'title': 'Pepperoni',
        'slug': 'pepperoni',
        'type': 'meat',
        'image': 'PepperoniSlice.png'
    },
    {
        'id': 5,
        'title': 'Prosciuttini',
        'slug': 'prosciuttini',
        'type': 'meat',
        'image': 'ProsciuttiniSlice.png'
    },
    {
        'id': 6,
        'title': 'Salami',
        'slug': 'salami',
        'type': 'meat',
        'image': 'SalamiSlice.png'
    },
    {
        'id': 7,
        'title': 'Swiss',
        'slug': 'swiss',
        'type': 'cheese',
        'image': 'SwissSlice.png'
    },
    {
        'id': 8,
        'title': 'Provolone',
        'slug': 'provolone',
        'type': 'cheese',
        'image': 'ProvoloneSlice.png'
    },
    {
        'id': 9,
        'title': 'Turkey',
        'slug': 'turkey',
        'type': 'meat',
        'image': 'TurkeySlice.png'
    }
]

const createIngredient = ingredientObj => {
    const ingredient = document.createElement('div')
    ingredient.classList.add('ingredient', `ingredient-${ingredientObj.slug}`, `ingredient-${ingredientObj.type}`)
    let i = 0
    do {
        const ingredientImage = document.createElement('img')
        ingredientImage.src = `./assets/Sandwiches/images/${ingredientObj.image}`
        ingredient.append(ingredientImage)
      i++;
    }
    while (i < 3);
    return ingredient
}

// create ingredients object
let ingredients = {}
ingredientsDb.forEach( ingredient => {
    ingredients[ingredient.id] = ingredient
    // create ingredient layer div to be put onto sandwiches
    ingredients[ingredient.id].element = createIngredient(ingredient)
})

// set this to switch when clicking on an ingredient
let activeIngredient = undefined
let userScore = {
    points: 0,
    sandwiches: 0,
    customerSatisfaction: '???'
}

const breadBase = document.createElement('img')
breadBase.classList.add('bread-base')
breadBase.src = './assets/Sandwiches/images/BreadBase.png'

const breadTop = document.createElement('img')
breadTop.classList.add('bread-top')
breadTop.src = './assets/Sandwiches/images/BreadTop.png'

const breadBasket = document.getElementById('breadBasketImg')

let currentSandwich = []

document.addEventListener('DOMContentLoaded', function () {

    // NOTE: You'll need to switch things out or find the next cue down the line.
    let currentCue = document.getElementById('frame8')

    // Create Menu
    const menuBoard = document.getElementById('menuBoard')
    Object.keys(sandwiches).forEach( sandwichId => {
        const menuCol = document.createElement('div')
        const menuTitle = document.createElement('h3')
        menuTitle.innerHTML = sandwiches[sandwichId].title
        const menuList = document.createElement('ul')
        sandwiches[sandwichId].ingredients.forEach( ingredientId => {
            const menuItem = document.createElement('li')
            menuItem.innerHTML = ingredients[ingredientId].title
            menuList.append(menuItem)
        })
        menuCol.append(menuTitle)
        menuCol.append(menuList)
        menuBoard.append(menuCol)
    })

    // Create Ingredients
    const fridgeCheeses = document.getElementById('fridgeCheeses')
    const fridgeMeats = document.getElementById('fridgeMeats')

    Object.keys(ingredients).forEach( ingredientId => {
        const ingredient = ingredients[ingredientId]
        const fridgeItem = document.createElement('div')
        fridgeItem.classList.add('fridgeButton')
        fridgeItem.setAttribute('ing-id', ingredientId)
        const fridgeItemLabel = document.createElement('h4')
        fridgeItemLabel.innerHTML = ingredient.title
        const fridgeItemImage = document.createElement('img')
        fridgeItemImage.src = `./assets/Sandwiches/images/${ingredient.image}`
        fridgeItem.append(fridgeItemLabel)
        fridgeItem.append(fridgeItemImage)
        switch (ingredient.type) {
            case 'cheese':
                fridgeCheeses.append(fridgeItem)
            break;
            case 'meat':
                fridgeMeats.append(fridgeItem)
            break;
            default:

        }
    })

  //let breadToggle =
  let currentSlcObj
  let frameArray = []
  const orderModalDiv = document.getElementById('orderModal')

    function eventElements(element){
        console.log(element)
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
            case 'breadBasketImg':
                currentCue.append(breadTop)
                // NOTE: sandwich concluded! Find the score
                calculateScore()
            break;
            // case 'provolone':
            // break;
        }
    }

    const calculateScore = () => {
        // compare currentSandwich array to tempCue array at index of currently completed sandwich
        console.group('SCORE THE SANDWICH')
        console.log(tempCue)
        console.log(currentSandwich)
        console.groupEnd();
        // NOTE: the other way we could do this would be to build an array of objects
        // with the same number of sandwiches as are in the temp cue.
        // Then, when the bread top is added to the last sandwich (order complete),
        // we compare all USER sandwiches with TEMP CUE sandwiches
    }

    document.addEventListener('click',(e)=>{
        element = e.target
        console.log(element)
        if (element.classList.contains('fridgeButton')){
            // if (element != currentSlcObj){
                // element.style.setProperty("-webkit-filter", "drop-shadow(0px 0px 0px #000)")
            // }else{
            element.style.setProperty("-webkit-filter", "drop-shadow(5px 5px 5px #222)")//}
            // let id = element.id.split('B')
            // let button = id[0]
            activeIngredient = element.getAttribute('ing-id')
            // currentSlcObj = button
            //eventElements(button)
            console.log (`###### Fridge Selection: ${ingredients[activeIngredient].title} ######`)
            document.getElementById('showclickedFrideItem').innerHTML = `${ingredients[activeIngredient].title}`
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
    const turkeyDivs = ['turkeySlice1','turkeySlice2','turkeySlice3','turkeySlice4','turkeySlice5','turkeySlice6']
    //const turkey2Divs = ['turkeySlice4','turkeySlice5','turkeySlice6']
    const hamDivs = ['hamSlice1','hamSlice2','hamSlice3','hamSlice4','hamSlice5','hamSlice6']
    // const ham2Divs = ['hamSlice4','hamSlice5','hamSlice6']
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
        // turkey2: turkey2Divs,
        ham: hamDivs,
        // ham2: ham2Divs,
        prosciuttini:prosciuttiniDivs,
        cappicola: cappicolaDivs,
        salami:salamiDivs,
        pepperoni: pepperoniDivs
    }
    /************* */
    /****************************
     *   +Sandwich Components
    ****************************/
    const shortHam = hamDivs.splice(0,3)
    const shortTurk = turkeyDivs.splice(0,3)

    const cheese = [
        {'provolone': provoloneDivs},
        {'swiss':swissDivs},
        {'american':null}]
    const meat = [
        {'turkey':turkeyDivs},//Just turkey
        {'turkey2':shortTurk},//Turkey for other sandwiches
        {'ham':hamDivs},//Just ham
        {'ham2':shortHam},//Ham for other sandwiches
        {'prosciuttini':prosciuttiniDivs},
        {'cappicola':cappicolaDivs},
        {'salami':salamiDivs},
        {'pepperoni':pepperoniDivs}]

    // const cheese = [provolone,'swiss','american']
    // const meat = ['turkey','ham','ham2','cappicola','prosciuttini','salami','pepperoni']
/****************************
 *  +Sandwich Constructs
****************************/


    const veggie = [cheese[0],cheese[1]]
    const turkey = [cheese[0],meat[0]]
    const ham = [cheese[0],meat[2]]//,meat[2]]
    const club = [cheese[0],meat[3],meat[1]]
    const slamma = [cheese[0],meat[3],meat[4],meat[5]]
    const italian = [cheese[0],meat[3],meat[4],meat[5],meat[6],meat[7]]
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
    const cueFrameArray = []
    let masterSandwichCue = []//Full cue
    let customerLine = []
    let cueLength = 16
    let linePosition = 0
    let tempCue = []
    const sliceCueMax = 8
    const orderMax = 5
    let customerHold = false
    let workingCue = []
    let outlierNum = 0
    let singleNum = 0
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
            this.orderPosition = orderPosition //how far along in slicing of order
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
        constructor(type,slcIndex,frameId,sandwichId){
            let url = `./assets/Sandwiches/${type}.html`//Figure out var it needs
            this.type = type
            this.content = menuConstruct[type]
            this.url = url
            this.slcIndex = slcIndex//Increments after each layer is complete
            this.frameId = frameId
            this.active = true
            this.complete = false//()=>{
            //         // breadFinish(this)
            //         breadSlice(breadTopDiv)
            // }
            // //false
            this.customerNumber
            // addEventListener('click',breadSlice(breadTopDiv))

         const breadFinish = () => {
            let breadTop = document.getElementById('breadTop')
            breadTop.style.visibility ='visible'
        }
        }
    }
/****************************
 *  +Cue Frame Object
 * element passes frame
****************************/
    class Frame{
        constructor(sandwich,slcIndex,arrayPos){
            this.content = sandwich
            this.slcIndex = slcIndex//Increments after each layer is complete
            this.frameId = frameId
            this.pos = arrayPos
            this.active = true
            this.complete = ()=>{layerSlice(breadTopDiv)}
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
                    // fetchSandwichHtml(ham)
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
                // setAnimationFrame instread for event loop purposes
            })
        }
/****************************
 *  +Slice Inedx Increminter
 * ------------------------------------
 *
****************************/
        function slcIndexInc(sandwichObj,sliced){
            sandwichObj.slcIndex++
            if (sandwichObj.slcIndex >= sandwichObj.length){
                breadSlice(sandwichObj)
            }

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
            cue = cue.reverse()
            const cueSlots = document.querySelectorAll('.cueFrame')
            console.log(cueSlots)
            cueSlots.forEach( cueFrame => {
                cueFrame.innerHTML = ''
            })
            cue.forEach(sandwich=>{
                // let url=`./assets/Sandwiches/${sandwich.type}.html`
                // sandwich.frameId = `frame${builderPos}`
                let currentFrame = document.getElementById(`frame${builderPos}`)
                currentFrame.append(breadBase.cloneNode(true))
                // currentFrame.src  = url
                // frameArray.push(currentFrame)
                console.log(`***current frame***[${currentFrame.id}]******`)
                console.log('*****generating cue*****')
                console.log(builderPos)

                builderPos--
            })
            console.log(frameArray)
            cue = cue.reverse()
            // slcIndex = 0

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
                customerLine.push(newCustomer)
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
               htmlList += (`${sandwich}</br>`)
            //    console.log(htmlList)
            })
            htmlList = `<div id='htmlList'>
            <h4>${lh}</h4>
            <p>${htmlList}</p>
            </div>
            `

            orderModalDiv.innerHTML = htmlList
            document.getElementById('timeText').style.justifyContent="center"
            document.getElementById('timeText').style.textContent="new time"
            document.getElementById('orderModal').style.justifyContent="center"
            document.getElementById('orderModal').style.display="inline"
            document.getElementById('orderModal').style.flexDirection="column"
            document.getElementById('orderModal').style.position="absolute"
            document.getElementById('orderModal').style.top="0px"
            document.getElementById('orderModal').style.left="140px"
            document.getElementById('htmlList').style.justifyContent="center"
            document.getElementById('htmlList').style.alignContent="center"
            document.getElementById('htmlList').style.textAlign="center"
            document.getElementById('htmlList').style.left="0px"
            document.getElementById('htmlList').style.top="0px"
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


    // function breadSlice(divSet){
    //     divSet.forEach(async (actualDiv,index)=>{
    //         console.log(`+++++++Bread Top Div: ${actualDiv}+++++++`)
    //         let currentSlice = innerDoc.getElementById(actualDiv)
    //         // getId(actualDiv)
    //         // const currentSlice = await document.getElementById('provoloneSlice1')//.style.visibility ='visible'
    //         // document.getElementById(currentSlice).style.visibility ='visible'
    //         await sleep(700+(index*300))
    //         console.log(`Current Slice: ${currentSlice.style.visibility}`)
    //         currentSlice.style.visibility ='visible'
    //     })
    // }

     function breadSlice(objs){

        // let passedDivs = objs// console.log(objs)
        if(objs.complete){
            // const promises = objs.map(async (slice) => {
                console.log(`[[[[[[-----Bread slicing------]]]]]]`)
                frameArray.forEach(frame=>{
                var innerDoc = frame.contentDocument || frame.contentWindow.document;
                console.log(`+++++++frame: ${innerDoc}+++++++`)
                // passedDivs.forEach( divSet=>{
                //     divSet.forEach(async (actualDiv,index)=>{
                //         console.log(`+++++++Actual Div: ${actualDiv}+++++++`)
                        // let currentSlice = innerDoc.getElementById(actualDiv)
                        let currentSlice = innerDoc.getElementById('breadTop')
                        // await sleep(500+(index*300))
                        console.log(`Bread Topping?:`)
                        console.log(currentSlice)
                        currentSlice.style.visibility ='visible'
                    // })
                console.log(`[[[[[[bread sliced]]]]]]`)

                })


            // })
            // await Promise.all(promises)
        }
        }
/****************************
 *  +LayerSlice
 * ------------------------------------
 *      -Slices an array by toggling style visibility
 *
 *
****************************/

    async function layerSlice(objs,i){

        let passedDivs = objs// console.log(objs)
        const promises = objs.map(async (slice) => {
            console.log(`[[[[[[-----Slicing------]]]]]]${i}`)
            console.log(objs)
            frameArray.forEach(frame => {
                var innerDoc = frame.contentDocument || frame.contentWindow.document;
                console.log(`+++++++Frame Title: ${innerDoc.title} +++++++`)
                passedDivs.forEach( divSet => {
                    // divSet = obj.content[obj.slcIndex]
                    //if(Object.keys(objs)[sandwich.slcIndex])
                    divSet.forEach(async (actualDiv,index)=>{
                        console.log(`+++++++Div Name: ${actualDiv}+++++++`)
                        let currentSlice = innerDoc.getElementById(actualDiv)
                        await sleep(500+(index*300))
                        // console.log(currentSlice.style.visibility)
                        currentSlice.style.visibility ='visible'
                    })
                console.log(`[[[[[[Sliced]]]]]]`)

                })
            })
        })
            await Promise.all(promises)

        }
        let layerFixinType =[]
        let layerFixins=[]
/****************************
 *  +Slice
 * ------------------------------------
 *      -
 *
****************************/
        async function slice () {

            // Add the users selected ingredient to the current sandwich array. Once they finish the sandwich, we can look at that array, assess their score and then clear it for the next sandwich
            currentSandwich.push(activeIngredient)

            currentCue.append(ingredients[activeIngredient].element.cloneNode(true))
            // let divIds = contentDivs[currentSlcObj]
            // console.log(divIds)
            // let divArray
            // let i=0
            // tempCue.forEach(sandwich=>{
            //     console.log(`sandwich.content:`)
            //     console.log(sandwich.content)
            //     sandwich.content.forEach(layer=>{
            //        console.log(`Layer Name (key/type):`)
            //        console.log( Object.keys(layer))
            //
            //         // let currentSlcIndex= sandwich.slcIndex
            //
            //         layerFixinType =  Object.keys(layer)//[sandwich.slcIndex]
            //         layerFixins = Object.values(layer)//[sandwich.slcIndex]
            //
            //         console.log(`layer Fixins: ${layerFixins} for Sandwich:${tempCue[i].type}`)
            //         console.log(`Slice Index: ${sandwich.slcIndex}`)
            //
            //         if( layerFixinType == currentSlcObj || layerFixinType == 'ham2' && currentSlcObj == 'ham' || layerFixinType == 'turkey2' && currentSlcObj == 'turkey' ){
            //
            //             console.log(`Totally able to slice [${layerFixins}] with [${currentSlcObj}]!`)
            //             console.log(`Activating: ${layerFixins}`)
            //
            //             tempCue.forEach(sandwich=>{
            //                 console.log(`Hopefully the div array at the [${sandwich.slcIndex}] index`)
            //                 divArray = Object.values(sandwich.content[sandwich.slcIndex])
            //                 console.log(Object.values(sandwich.content[sandwich.slcIndex]))
            //                 console.log(`Arrray of divs to be sliced: ${divArray}`)
            //                 console.log(sandwich.content[sandwich.slcIndex])
            //                 layerSlice(divArray,i)
            //                 // slcIndexInc(sandwich)
            //             })
            //             slcIndexInc(sandwich)
            //             console.log(`New sandwich Slice Index: ${sandwich.slcIndex}`)
            //             layerFixinType =  Object.keys(layer)[sandwich.slcIndex]
            //             layerFixins = Object.values(layer)[sandwich.slcIndex]
            //             // layerFixins =  Object.keys(layer)[sandwich.slcIndex]
            //             if(sandwich.slcIndex >= sandwich.content.length){
            //                 // breadfinish(sandwich)
            //                 sandwich.complete = true
            //                 sleep(5000)
            //                 breadSlice(sandwich)
            //                 console.log('Sandwich Done...?')
            //                 removeFromCue(sandwich)
            //                 // tempCue.splice(i, 1);
            //                 // let breadTop = document.getElementById('breadTop')
            //                 // breadTop.style.visibility ='visible'
            //             }
            //         }else{console.log(`NOT able to slice! [${layerFixins}] with [${currentSlcObj}]`)}
            //
            //
            //     })
            //     i++
            //
            // })
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
/****************************
 *  +Remove from tempCue
 * ------------------------------------
 *      -take the
****************************/
        function removeFromCue(fromArray,index){
            fromArray.forEach(e =>{
                toArray.push(e)
            })
            console.log(`Add to temp Cue!`)
            return toArray
        }


})
