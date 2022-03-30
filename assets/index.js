/**************************** 
 *  +Background
 * ------------------------------------
    Backstory:
        -A robot crash lands on earth and has to efficiently make sandwiches to survive
            Why:Efficiency powers its core
    Goal: 
        -Get throughh the lunch rush (sandwich cue) with the best time possible

    Objectives:
        -slice sandwiches with similar components at the same time
        for optimal efficiency 

     Obstacles:
        - You only have space to pre-load 8 sandwiches into your cue 
        - Switching between tasks (i.e. slicing like meats and cheeses) adds to time
        - You cam only fetch 2 loaves of bread per trip
        - Customers can have orders of random length causing you to have to re-ask 
        if it falls out of the temporary cue (for too long?)
            -if re-asked the the 

     Technique:
    
     Restrictions:

     *Additional language:
        'Cue' for sandwiches
        'Line'  for customers
****************************/
document.addEventListener('DOMContentLoaded', function () {
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
 *   +Sandwich Components
****************************/
    const cheese = ['provolone','swiss','american']
    const meat = ['turkey','ham','cappicola','prosciuttini','salami','pepperoni']
/**************************** 
 *  +Sandwich Constructs
****************************/
    const veggie = [cheese[0],cheese[1]]
    const turkey = [cheese[0],meat[0]]
    const ham = [cheese[0],meat[1]]
    const club = [cheese[0],meat[0],meat[1]]
    const slamma = [cheese[0],meat[1],meat[2],meat[3]]
    const italian = [cheese[0],meat[1],meat[2],meat[3],meat[4],meat[5]]
    //const sandwichArray = ['veggie','turkey','ham','club','slamma','italian']
    const sandwichArray = [veggie,turkey,ham,club,slamma,italian]

    let sandwiches =[
        {name:'veggie',
        contents: [cheese[0],cheese[1]]},
        {name:'turkey',
        contents: [cheese[0],meat[0]]},
        {name:'ham',
        contents: [cheese[0],meat[1]]},
        {name:'club',
        contents: [cheese[0],meat[0],meat[1]]},
        {name:'slamma',
        contents: [cheese[0],meat[1],meat[2],meat[3]]},
        {name:'italian',
        contents: [cheese[0],meat[1],meat[2],meat[3],meat[4],meat[5]]}
    ]

    let sandwichCue = []//Full cue
    let cueLength = 16
    let cuePosition = 0
    let tempCue = []
    const preLoadMax = 8
    const orderMax = 5
    let workingCue = []
    
/**************************** 
 *  +Customer Class
****************************/
    class Customer{
        constructor(ease,orderPosition){
            this.itemAmt = Math.floor(Math.random() * orderMax)+1//Items in order
            this.order = sandwichGenerator(this.itemAmt)
            this.orderDone = true
            this.orderNumber = 0
            this.orderPosition = orderPosition
            this.ease = ease
            this.askTime = (sliceInc * 2) * this.itemAmt            
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
                    askCustomer()
                break;
                case 'm':
                    printMasterCue()
                break;
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
                sandwichNum = Math.floor(Math.random() * 5) 
                order[i] = sandwichArray[sandwichNum]
                //console.log (sandwich+sandwichCue[i])
            }
            return order
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
            let newCustomer = new Customer(0,cuePosition) 
            console.log('Customer Asked!')
            if (!newCustomer.orderDone){
                console.log(`Order#: 000${cuePosition}`)
                console.log(newCustomer.order)
            }else{
                cuePosition ++
                console.log(`Order#: 000${cuePosition}`)
                console.log(newCustomer.order)
            }
            sandwichCue.push(newCustomer.order)
        }

        function printMasterCue(){
            console.log(sandwichCue)
        }
        function checkIfOrderDone(customerOrder,mastercue){
           // return
        }
/**************************** 
 *  +Ceate Customer Object 
 * ------------------------------------
 *      -takes sandwiches form master cue and assigns them to array 
 *      in customer object 
 *              customer={orderNumber: ######, order: ['','',''], ease:}
 *    
****************************/
    console.table(sandwiches)
})