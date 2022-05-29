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

// A();
// B();
//logs A and then B

/* 
    Problem with synchronous, blocking, single-threaded model of javascript
    let response = fetchDataFromDB('endpoint');
    displayDataFromDB(response);
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

// setTimeout(greet,2000);
//->logs 'Hello' to the console after 2 seconds

function greet(name){
    console.log(`Hello ${name} darling`);
}

// setTimeout(greet, 2000,'Lara');
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
// setInterval(greet3,2000);
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

// setTimeout(function run(){
//     console.log('Hello');
//     setTimeout(run,50);
// },100);

/*
   a-Duration is guaranteed between executions. Irrespective of how long the code takes to run, the interval remain the same.
        if Code can take longer to run than the time interval itself. choose Recursive setTimeout rather than setInterval.
   b-You can calculate a different delay before running each iteration.
*/

// setInterval(function run(){
//     console.log('Hello');
// },100);

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

// greetLara(greet5);

function higherOrderFunction(callback){
    const name = 'Lara';
    callback(name);
}
// higherOrderFunction(greet5);

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
// higherOrderFunction2(greet6);

let numbers = [1,2,4,7,3,5,6];
numbers.sort((a,b) => a-b);
numbers.map(n => n*2);
numbers.filter(n => n%2===0);
// console.log(numbers);

/*
     
        Asynchronous callbacks
            -An asynchronous callback is a callback that is often used to continue or resume code execution after an asynchronous operation has completed
            -Callbacks are used to delay the execution of a function until particular time or event has occurred
            -Data fetching takes time and we can only run the function we want to after the data has been fetched and not immediately


*/

function greet7(name){
    console.log('Hello ${name}');
}
// setTimeout(greet7,2000,'Lara');

function callback(){
    document.getElementById("txt").innerHTML = "Hello Lara Darling";
}
// document.getElementById("btn").addEventListener("click",callback);

// $.get('https://www.google.com/:',function(data){
//     $('.result').html(data);
//     alert('Load was performed');
// });

/*
    Problems with the callback pattern
        -if you have multiple callback functions where each level depends on the result obtained from the previous level,
            the nesting of functions becomes so deep that the code becomes difficult to read and maintain.


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

*/

