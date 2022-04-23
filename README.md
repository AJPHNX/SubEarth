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