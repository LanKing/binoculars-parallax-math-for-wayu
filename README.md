[Русская версия](https://github.com/LanKing/binoculars-parallax-math-for-wayu/blob/master/README-RUS.md "Русская версия")

# I had recently solved a strange task for boosting up my inner mathematican 🤓

> My strange friend asked me to create a new crazy project for him:
> 
> Imagine the web page with multiple horizontal containers each having text or image content. Content height is bigger than the container height, so the user only see a part of the content. The content in the containers scrolls up while the web page is scrolled down and vice versa. My friend called that the "binoculars effect". 😊
> 
> I didn't know, why he needed this insane solution 🤷‍♂️, but it was really funny to create it and train myself in math.

## Please, see this crazy demo: 
- In browser window: https://lanking.github.io/binoculars-parallax-math-for-wayu/window.html
- In separate div: https://lanking.github.io/binoculars-parallax-math-for-wayu/div.html

## Challenge points that I choosed for myself:
1. Solve this task with pure math (Don't use logical conditions in main math model. Of course, some logic used for configuration and objects initialization, but main model is a hardcore pure math 🤘).

2. User must see every pixel of content in each cntainer during scrolling web page from start to end. Content scroll must started when its first pixel was shown during page scroll and also it must stop scrolling when the last pixel was scrolled out. 
  > It doesn't matter if current area is located at the top, at middle or at the bottom of the page. For example: for areas that located at the first screen content started scrolling immidiately. For areas on second screen content is not scrolling until web page will be scrolled enough to see first pixel of container. Also for the last areas of the page content must stop scrolling only when page scrolled completely. So, each area has different scroll tempo.

3. Minimize browser load by choosing good algorithm (no dummy operations). As a result: got simple program code.

*Working with DOM elements on pure JS was not challenge for me: I used JQuery to make easy access to DOM elements.*


## Math magic explained step by step: 💫

**1. Create numerical sequence, that describes occurence position of each container relying on browser window height.**
- As a result top containers will have negative values. 
- Then negative values must be removed — this is implemented by converting them to zeroes: (x + Math.abs(x)) / 2
> Taking absolute value of negative variable converts it to positive). For example, if x = -5, (x + Math.abs(x)) will transformed to -5 + 5 = 0
> Division to 2 is a correction for positive values: (5+5)\2 = 5

**2. Create numerical sequence that describes position of scroll finish for each element relying on window height.**
- As a result: numerical sequence with mostly negative values and positive values at the end (last containers in window are not scrolling out). 
- Using hack from step 1 positive values was removed.

**3. Scroll containers content to percent depending to difference between two steps.**
