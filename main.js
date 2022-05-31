/* 
        Asynchronous JavaScript
    
    Topic to cover
    -Timeouts and intervals
    -Callbacks
    -Promises
    -async await
    -Event loop
*/

//javascript is a synchronous, blocking, single-threaded language

/*
    Synchronous 
        if we have two functions which log messages to the console, code executes top down,
        with only one line executing at any given time
     Blocking
        -No matter how long a previous process takes, the subsequent processes wont kick of until the former is completed.
        -If function A had to execute an intensive chunk of code, Javascript has to finish that moving on to function B.
            Even  if that code takes 10 seconds or 1 minute.
        -Wep app runs in a browser and it executes an intensive chunk of code without returning control to the browser,
            the browser can appear to be FROZEN.
     Single-threaded
        -A thread is simply a process that your javascript program can use to run a task
        -Each thread can only do  one task at a time
        -Javascript has just the one thread called the main thread for executing any code
*/

function A(){
    console.log('A');
}

function B(){
    console.log('B');
}

A();
B();
//logs A and then B

/* 
    Problem with synchronous, blocking, single-threaded model of javascript
*/
    let response = fetchDataFromDB('endpoint');
    displayDataFromDB(response);
/* 
    -fetchDataFromDB('endpoint') could take 1 second or even more
    -During that time, we cant run any further code
    -Javascript, if it simply proceeds to the next line without waiting, we have an error because data is not what we expect it to be
    -We need a way to have asynchronous behavior with javascript
*/


/*
    Async JavaScript - How ?
        -Just JavaScript is not enough
        -We need new pieces which are outside of Javascript to help us write asynchronous code which is where web browsers come into play
        -Web browsers define functions and APIs that allow us to register functions that should not be executed synchronously, and should
            instead be invoked asynchronously when some kind of events occurs
        -For example that could be passage of time (setTimeout or setInterval), the users interaction with mouse (addEventListener),
            or the arrival of data over the network (callbacks, Promises, async-await)
        -You can let your code do several things at the same time without stopping or blocking your main thread.
*/
 


/* 
                         Timeouts && Intervals
    The traditional methods  JavaScript has available for running code asynchronously -
        -after a set time period elapsed or
        -at regular intervals of time
        -setTimeout() 
        -setIntervals()
    setTimeout
        -The setTimeout() function executes a particular block of code once after a specified time has elapsed
         setTimeout(function,duration,param1,param2,...)
        -The first parameter is a function to run, or a reference to a function defined elsewhere
        -The second parameter is a number representing the duration in milliseconds to wait before executing the code
        -After the second parameter, you can pass in zero or more values that represent any parameters you want to pass the function when it is run
*/
function greet(){
    console.log('hello');
}
setTimeout(greet,2000);
//->logs 'Hello' to the console after 2 seconds
function greet(name){
    console.log(`Hello ${name} darling`);
}
setTimeout(greet, 2000,'Lara');
//->logs 'Hello Lara Darling' to the console after 2 seconds
 
/*
    setTimeout()
        -To clear timeout, you can use the clearTimeout() methods passing in the identifier returned by setTimeout as a parameter

*/
function greet2(){
    console.log('Hello');
}
const timeoutId = setTimeout(greet2,2000);
clearTimeout(timeoutId);
// ->Nothing is logged to the console
//      -A more practical scenario is clearing timeouts when the components is unmounting to free up the resources and also prevent
//          code from incorrectly executing on an unmounted component. 


/*
    setInterval()
        -The setInterval() function repeatedly runs the same code over and over again at regular intervals
            setInterval(function,duration,param1,param2,...)
        -The first parameter is the code execute
        -The second parameter is the duration in milliseconds
        -After the second parameter, you can pass in zero or more values that represent any parameters you want to pass to the function when it is run

*/
function greet3(){
    console.log('Hello');
}
setInterval(greet3,2000);
//->Logs 'Hello' to every 2 seconds

/*
        -Intervals keep running a task forever so you should clear the interval when appropriate
*/
function greet4(){
    console.log('Hello');
}
const intervalId = setInterval(greet4,2000);
clearInterval(intervalId);

/*
            Noteworthy points
    1-Timers and Intervals are not part of javascript itself.They are implemented by the browser and setTimeout and setInterval are
        basically names given to that functionality in javascript.
    2-Duration parameter is the minimum delay, not guaranteed delay.
    3-It is possible to achieve the same effect as setInterval with a recursive setTimeout.
*/

setTimeout(function run(){
    console.log('Hello');
    setTimeout(run,50);
},100);

/*
   a-Duration is guaranteed between executions. Irrespective of how long the code takes to run, the interval remain the same.
        if Code can take longer to run than the time interval itself. choose Recursive setTimeout rather than setInterval.
   b-You can calculate a different delay before running each iteration.
*/

setInterval(function run(){
    console.log('Hello');
},100);
/*
    c-The duration interval includes the time taken execute the code you want to run.
        The code takes 40 ms to run, the interval is 60 ms.
        The code takes 50 ms to run, the interval is 50 ms.
    d-setInterval is always a fixed interval duration.
*/





/*                  CALLBACKS
    In Javascript, functions are first class objects
        -Just like an object, function can be passed as an argument to a function
        -A function can also be returned as values from other functions
        -Any function that is passed as an argument to another function is called CALLBACK FUNCTION in javascript
        -The function which accepts a function as an argument  or returns a function is called HIGHER ORDER FUNCTION.

*/

function greet5(name){
    console.log(`Hello ${name}`);
}
function greetLara(greetFn){
    const name = 'Lara';
    greetFn(name);
}

greetLara(greet5);

function higherOrderFunction(callback){
    const name = 'Lara';
    callback(name);
}
higherOrderFunction(greet5);

/*
        Wyh callbacks
    Synchronous vs Asynchronous
        Synchronous callbacks
            -A callback which is executed immediately is called a synchronous callback

*/
function greet6(name){
    console.log('Hello ${name}');
}
function higherOrderFunction2(callback){
    const  name = 'Lara';
    callback(name);
}
higherOrderFunction2(greet6);

let numbers = [1,2,4,7,3,5,6];
numbers.sort((a,b) => a-b);
numbers.map(n => n*2);
numbers.filter(n => n%2===0);
console.log(numbers);

/*
     
        Asynchronous callbacks
            -An asynchronous callback is a callback that is often used to continue or resume code execution after an asynchronous operation has completed
            -Callbacks are used to delay the execution of a function until particular time or event has occurred
            -Data fetching takes time and we can only run the function we want to after the data has been fetched and not immediately


*/

function greet7(name){
    console.log('Hello ${name}');
}
setTimeout(greet7,2000,'Lara');

function callback(){
    document.getElementById("txt").innerHTML = "Hello Lara Darling";
}
document.getElementById("btn").addEventListener("click",callback);

$.get('https://www.google.com/:',function(data){
    $('.result').html(data);
    alert('Load was performed');
});

/*
    Problems with the callback pattern
        -if you have multiple callback functions where each level depends on the result obtained from the previous level,
            the nesting of functions becomes so deep that the code becomes difficult to read and maintain.
*/

fetchCurrentUser(`api/user`,function(result){
    fetchFollowersByUserId(`api/followers/${result.userId}`,function (result){
        fetchFollowerInterests(`api/interests/${result.followerId}`,function(result){
            fetchInterestTag(`api/tags/${result.interestId}`,function(result){
                fetchTagDescription(`api/description/${result.tagId}`,function(result){
                    //Finally display the data
                    console.log('Display the data',result);
                })
            })
        })
    })
})



/*
        Callbacks summary
    -Callbacks are functions passed as arguments to other functions
    -They can be synchronous if they execute immediately or they can be asynchronous where they get executed after some time passed,
        some event has occurred or some data has been fetched
    -Callbacks where the go to pattern for asynchronously running code after fetching some data
    -As more and more requests had to be made based on the data obtained from previous requests, developer started to encounter
        what is known as the callback hell
    -Callback hell makes the code difficult the reason about.
    -An alternative and the recommended approach now is to use promises
*/






/*  
                        PROMISE

    Promise in layman terms - Dinner Scenario
        -Consider a scenario where you and your room mate want to have dinner at home
        -You want to prepare special soup
        -At the same time, You feel like having tacos from the food truck nearby
        -You ask your room mate "hey can you go down to the food truck and get us some tacos?"
        -When he is about leave, you tell him
            -"There is no point in me waiting till you are back to prepare the soup. So I will start the soup now but
                when you reach the place, can you PROMISE that you will text me so i can start setting up the dinning table?"
            -"Also let me know if something goes wrong. if you cant find the truck or if they are out of tacos fir the night.
                Let me know that you cant get the tacos and i will start cooking some pasta instead"
        -Your friend says "Sure i PROMISE. i will head out now and text you in some time."
        -Now, you go about preparing your soup but the status on tacos? We can say that it is currently PENDING till
            you receive that message from your friend.
        -When you get back a text message saying that he is getting the tacos, your desire to eat tacos has been FULFILLED.
            You can then proceed to set up table.
        -If the text message says that he cant bring back tacos, your desire to have tacos have been REJECTED
            and you now to cook some pasta instead.

           Dinner Scenario                                                      JavaScript
        1.Your friend                                                   1.Promise
        2.While your friend is on his way to the food truck,            2.Asynchronous operation in javascript (fetchTacos)
            you know that it could take a while and you dont want
            to sit idle. So you start preparing soup in meantime
        3.When your friend texts you with "Can get tacos/               3.Promise return value
            Cant get tacos", it answers your question on whether
            he is getting tacos or not
        4.Can get tacos                                                 4.Promise is said to be FULFILLED
        5.Can not get tacos                                             5.Promise is said to be REJECTED
        6.Set up the table                                              6.Success callback
        7.Cook pasta                                                    7.Failure callback

            Promise - MDN definition
        A promise is a proxy for a value not necessarily known when the promise is created. It allows you to associate
            handlers with an asynchronous action's eventual success value or failure reason.

        A promise is a proxy for a  value                       | Can or can not get tacos

        Not necessarily known when the promise created          | You dont know if he can/cant get tacos when he made his promise
       
        Allows you to associate handlers with an asynchronous   | Decide ahead of time what has to be done  
            action's eventual success value or failure reason   |     when the promise is eventually fulfilled or rejected.
                                                                |     That is, either setting up the table or cooking pasta
        What?
            A Promise is simply an object in javascript

        A promise is always in one of the three states
            -pending:which is initial state,neither fulfilled nor rejected
            -fulfilled:meaning  that operation completed successfully
            -rejected:meaning that operation failed
        
        Why?
            Promises help us deal with asynchronous code in a far more simpler way compared to callbacks
            Callback hell can be avoided with promises.
        
        How to work with Promises?

            Dinner Scenario                                                 JavaScript
        1.Your friend                                                   1.Promise
        2.Can get tacos/Can not get tacos                               2.Promise value
        3.Can get tacos                                                 4.FULFILL Promise
        4.Can not get tacos                                             5.REJECT Promise
        5.Set up the table                                              6.Success callback
        6.Cook pasta                                                    7.Failure callback

        1.How to create a Promise?
        2.How to fulfill or reject Promise?
        3.How to execute callback functions based on whether the Promise is fulfilled or rejected?

*/

/*
        1.How to create a Promise?
*/
const promise = new Promise();

/*
        2.How to fulfill or reject Promise?
*/

const promise2 = new Promise(()=>{

});

const promise3 = new Promise((resolve,reject)=>{
    
});

const promise4 = new Promise((resolve,reject)=>{
    //Change status from 'pending' to 'fulfilled'
    resolve();
});

const promise5 = new Promise((resolve,reject)=>{
    //Change status from 'pending' to 'rejected'
    reject();
});

const promise6 = new Promise((resolve,reject)=>{
  
    setTimeout(() => {
        //Food truck found
        //Change status from 'pending' to 'fulfilled'
        resolve();
    }, 5000);
});

const promise7 = new Promise((resolve,reject)=>{
    setTimeout(() => {
         //Food truck not found
        //Change status from 'pending' to 'rejected'
        reject();
    }, 5000);   
});

/*
    3.How to execute callback functions based on whether the Promise is fulfilled or rejected?
*/

//Success and failure callbacks
const onFulfillment = () =>{
    //resolve was called
    console.log('set up the table to eat tacos');
};
const onRejection = () =>{
    //Reject was called
    console.log('Start cooking pasta');
};

const promiseFulfilled = new Promise((resolve,reject)=>{
  
    setTimeout(() => {
        //Food truck found
        //Change status from 'pending' to 'fulfilled'
        resolve();
    }, 5000);
});

const promiseRejected = new Promise((resolve,reject)=>{
    setTimeout(() => {
         //Food truck not found
        //Change status from 'pending' to 'rejected'
        reject();
    }, 5000);   
});

/*
    -Promise status:pending to fulfilled? then() is executed
    -Promise status:pending to rejected? catch() is executed
 */
promiseFulfilled.then(onFulfillment);
promiseFulfilled.catch(onRejection);
promiseRejected.then(onFulfillment);
promiseRejected.catch(onRejection);

//Success and failure callbacks
const onFulfillment2 = (result) =>{
    //resolve was called
    console.log(result);
    console.log('Set up the table to eat tacos');
};
const onRejection2 = (result) =>{
    //Reject was called
    console.log(result);
    console.log('Start cooking pasta');
};

const promiseFulfilled2 = new Promise((resolve,reject)=>{
  
    setTimeout(() => {
        //Food truck found
        //Change status from 'pending' to 'fulfilled'
        resolve('Bringing tacos');
    }, 5000);
});

const promiseRejected2 = new Promise((resolve,reject)=>{
    setTimeout(() => {
         //Food truck not found
        //Change status from 'pending' to 'rejected'
        reject('Not  bringing tacos');
    }, 5000);   
});

promiseFulfilled2.then(onFulfillment2);
promiseFulfilled2.catch(onRejection2);
promiseRejected2.then(onFulfillment2);
promiseRejected2.catch(onRejection2);

/*  //Result
    Bringing tacos
    Set up the table to eat tacos
    -----------------------------
    Not  bringing tacos
    Start cooking pasta
*/


//----------------------------------------------

/*
                PROMISE - PART 2
*/

/*
        1.then() function
*/

//Success and failure callbacks
const onFulfillment3 = () =>{
    //resolve was called
    console.log('set up the table to eat tacos');
};
const onRejection3 = () =>{
    //Reject was called
    console.log('Start cooking pasta');
};

const promise8 = new Promise((resolve,reject)=>{
    //resolve() or reject()
});

/*
    -Encouraged approach
    -Even if your onFulfillment callback throws an exception,it is caught and then you can handle that exception gracefully
*/
promise8.then(onFulfillment3);
promise8.catch(onRejection3);

/*
    -onRejection callback handles error from only the Promise
    -If your callback function itself throws an error or exception, there is no code to handle that
*/
promise8.then(onFulfillment3,onRejection3);

/*
      2.Chaining Promises
    -Both then and catch methods return promises
    -then() and catch() methods can be chained in javascript.
*/

const promise9 = new Promise((resolve,reject)=>{
    //resolve() or reject()
});

promise9.then(onFulfillment3);
promise9.catch(onRejection3);

// ---chaining...
promise9.then(onFulfillment3).catch(onRejection3);

/*
    Callback Hell
*/
fetchCurrentUser(`api/user`,function(result){
    fetchFollowersByUserId(`api/followers/${result.userId}`,function (result){
        fetchFollowerInterests(`api/interests/${result.followerId}`,function(result){
            fetchInterestTag(`api/tags/${result.interestId}`,function(result){
                fetchTagDescription(`api/description/${result.tagId}`,function(result){
                    //Finally display the data
                })
            })
        })
    })
})

/*
    Rewritten using Promise
*/
const promise10 = fetchCurrentUser(`api/user`);
promise10
    .then(result => fetchFollowersByUserId(`api/followers/${result.userId}`))
    .then(result => fetchFollowerInterests(`api/interests/${result.followerId}`))
    .then(result => fetchInterestTag(`api/tags/${result.interestId}`))
    .then(result => fetchTagDescription(`api/description/${result.tagId}`))
    .then(result => console.log('Display the data',result));



/*
        3.Promise = Static Methods
*/

/*
        3.1.Promise.all()
    Query multiple APIs and perform some actions but only after all the APIs have finished loading.
        -The Promise.all() method takes an iterable of promises as an input and returns a single Promise that resolves to array of results of the input promises
        -Returned promise will resolve when all of the input's promises have resolved, or if the input iterable contains no promises
        -It rejects immediately if any of the input promises reject or the non-promises throw and error, and will reject with this first rejection message/error
*/

const promise11 = new Promise.resolve(3);
const promise12 = 42;
const promise13 = new Promise((resolve,reject)=>{
    setTimeout(resolve,100,'foo');
});

Promise.all([promise11,promise12,promise13]).then((values)=>{
    console.log(values);
});
//expected output [3,42,'foo']

/*
        3.2.Promise.allSettled()
    Promise.allSettled() waits for all input promises to complete regardless of whether or not one of them is rejected
*/

const promise14 = new Promise.resolve(3);
const promise15 = 42;
const promise16 = new Promise((resolve,reject)=>{
    setTimeout(resolve,100,'foo');
});

Promise.allSettled([promise14,promise15,promise16]).then((values)=>{
    console.log(values);
});
//expected output [3,42,'foo']

/*
        3.3.Promise.race()
    The Promise.race() methods returns a promise that fulfills or rejects as soon as one of the input promises fulfills or rejects,
    with the value  or reason from that promise.
*/

const promise17 = new Promise((resolve,reject)=>{
    setTimeout(resolve,500,'one');
});
const promise18 = new Promise((resolve,reject)=>{
    setTimeout(resolve,100,'two');
    //Both resolve, but promise18 is faster
});

Promise.race([promise17,promise18]).then((values)=>{
    console.log(values);
});
//expected output ['two']

/*
            ASYNC - AWAIT
    Promises Recap
        -Basic syntax
        -How to add success and failure callbacks
        -How chaining Promise solves the problem we had with callback hell.
        -There is a way to improve it even further.
        -By using async/await keywords introduced in ES2017
        -The async/await keywords allow us to write completely synchronous-looking code while performing asynchronous tasks behind the scenes

*/

/*
    Async
        -The async keyword is used to declare async functions
        -Async functions are functions that are instances of the AsyncFunction constructor
        -Unlike normal functions, async functions always return a promise
*/

//Normal function

function greet8(){
    return "Hello";
}
greet8();
/*
    Result to Browser Console
    'Hello'
*/

//Async function

async function greet9(){
    return 'Hello';
}
greet9();
/*
    Result to Browser Console
    Promise{<fulfilled>:"Hello"}
*/

async function greet10(){
    return Promise.resolve('Hello');
}
greet10()
    .then(value => console.log(value));
/*
    Result to Browser Console
    "Hello"
*/

/*
    Await
        -await keyword can be put in front of any async promise based function to 
            pause your code until that promise settles ans return its result.
        -await only works inside async functions. Cannot use await in normal functions

*/

async function greet11(){
    let promise = new Promise((resolve,reject)=>{
        setTimeout(() => {
            resolve('Hello')
        }, 1000);
    });
    let result = await promise; //wait until promise resolves(*)
    console.log(result);//'Hello'
}
greet11();

/*
    Chaining Promises vs async-await
*/
const promise19 = fetchCurrentUser(`api/user`);
promise19
    .then(result => fetchFollowersByUserId(`api/followers/${result.userId}`))
    .then(result => fetchFollowerInterests(`api/interests/${result.followerId}`))
    .then(result => fetchInterestTag(`api/tags/${result.interestId}`))
    .then(result => fetchTagDescription(`api/description/${result.tagId}`))
    .then(result => console.log('Display the data',result));


async function fetchData() {
    const user = await fetchCurrentUser(`api/user`);
    const followers = await fetchFollowersByUserId(`api/followers/${user.userId}`);
    const interests = await fetchFollowerInterests(`api/interests/${followers.followerId}`);
    const tags = await fetchInterestTags(`api/tags/${interests.interestId}`);
    const description = await fetchTagDescription(`api/description/${tags.tagId}`);
    console.log('Display the data',tags);
}
async function fetchData() {
    try{
        const user = await fetchCurrentUser(`api/user`);
        const followers = await fetchFollowersByUserId(`api/followers/${user.userId}`);
        const interests = await fetchFollowerInterests(`api/interests/${followers.followerId}`);
        const tags = await fetchInterestTags(`api/tags/${interests.interestId}`);
        const description = await fetchTagDescription(`api/description/${tags.tagId}`);
        console.log('Display the data',tags);
    }
    catch(e){
        console.log('Error',e)
    }  
}

/*
 Sequential vs Concurrent vs Parallel execution
*/

function resolveHello(){
    return new Promise(resolve => {
        setTimeout(function(){
            resolve('Hello');
        },2000)
    });
}

function resolveWorld(){
    return new Promise(resolve => {
        setTimeout(function(){
            resolve('World');
        },1000);
    });
}

/*  
    Sequential execution
*/

async function sequentialStart(){
    const hello = await resolveHello();
    console.log(hello); //logs after 2 seconds

    const world = await resolveWorld();
    console.log(world); //logs after 2 + 1 = 3 seconds
}
sequentialStart(); //Logs 'Hello' 'World' Total time taken = 3 seconds

/*
    Concurrent execution
*/
async function concurrentStart(){
    const hello = resolveHello();
    const world = resolveWorld();

    console.log(await hello); //logs after 2 seconds
    console.log(await world); //logs after 2 seconds
}
concurrentStart(); //Logs 'Hello' 'World' Total time taken = 2 seconds

/*
    Parallel execution
*/

function parallelStart(){
    Promise.all([
        (async () => {console.log(await resolveHello())}),  //logs after 2 seconds
        (async () => {console.log(await resolveWorld())})   //logs after 1 second
    ]);
}
parallelStart(); //logs 'World' 'Hello' Total time taken = 2 seconds

async function parallelStart(){
    await Promise.all([
        (async () => console.log(await resolveHello())),//logs after 2 seconds
        (async () => console.log(await resolveWorld())) //logs after 1 second
    ]);
    console.log('Finally'); //logged after Hello
}
parallelStart();  // logs 'World' 'Hello' 'Finally'

/*
    Summary async - await
        -The async and await keywords enable asynchronous, promise-based
            behavior to be written in a cleaner style, avoiding the need to explicitly 
            configure promise chains
        -async-await introduced in ES2017
        -async keyword returns a Promise
        -await keyword pause execution till Promise resolved or rejected
        -Sequential vs concurrent vs parallel
*/