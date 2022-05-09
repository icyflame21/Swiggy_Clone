# Swiggy - (Clone)

Swiggy is an Indian online food ordering and delivery platform. Founded in July 2014, Swiggy is based in Bangalore, and operates in 500 Indian cities, as of September 2021. 

Solo construct week Project executed in 7 days.


![Logo](https://upload.wikimedia.org/wikipedia/en/thumb/1/12/Swiggy_logo.svg/1200px-Swiggy_logo.svg.png)


## Demo 🎥

- Deployed Link:- [Enjoy the Experience](https://swiggy-foodlovers.netlify.app/) 

## How to get Started 🚀

**There are two methods for getting started with this repo.**


#### Familiar with Git ?

```
> git clone https://github.com/icyflame21/Swiggy_Clone.git
> cd Swiggy_Clone
> npm install
> npm start
```

#### Not Familiar with Git ?
download the .zip file.  Extract the contents of the zip file, then open your terminal, change to the project directory, and:

```
> cd Swiggy_Clone
> npm install
> npm start
```


## Tech Stack 💻

- React
- Redux
- Material UI
- Font Awesome Icons 
- Styled Components
- React-Map-Gl
- uuid (v4)
- Firebase (OTP Authentication)
- RazorPay Integration 

## API USED ✅

- OpenWeatherMap - To fetch current location status of the user


## Features ✨

- In Landing Page user can fetch its current location and search bar is enabled with debouncing effect to show city names according to query.
- Login / Register Page is enabled with conditional rendering , OTP authentication is implemented via Firebase. If user is not authenticated still the user can visit the restaurants page.
- All pages are been conditionally rendered and all its states are  been managed through local Storage and Redux. 
- If user gets logged in then the Drawer won't open and if the cart value is zero , it can't move to the payments page.
- In restaurants page , all data are been manually created , no API integration or third-party web scrapper for this is been used.
- User can sort according to its demand like according to cost, rating etc, and also select the food items from multiple filter section. 
- In Food details page , user can select food items from different categories , can also search different food items and can also sort them via VEG and NON-VEG.
- Cart summary page is conditionally controlled using stateHooks 
- Whole Payment Page is conditionally controlled using stateHooks and its data is been managed using LocalStorage,  if user is already Logged in , then it can directly add address , and place its payment,
else the user first have to logged in then it payment can be done. 
- Address Drawer show current location of the user in a customized map implemented using React-Map-Gl.
- For Payment , Razorpay integration gateway is been used.

## Responsibilities 💪

- Creating Pixel Perfect pure css Animations without using css library, and pixel perfect layouts for evey page.
- Creation of Mannual Data for restaurants , cities .
- The pages are designed in such way that if the user is not logged in then he/she can create a account at every page visit but for food-payment the user have to  get logged in. 
- All the functionality which are been implemented are in working conditions. 
- Optimization of all page layouts with its raw css files and its libraries, for the user to have a smoother UI.

## Snap Shots 📷

**Landing Page**

![Logo](https://images2.imgbox.com/d6/35/dapHztFi_o.jpg)

**Register / Log In Drawer controlled via Conditional Rendering**

![Logo](https://images2.imgbox.com/d3/7e/IRjy3CQ5_o.jpg)

**Restaurants Page**

![Logo](https://images2.imgbox.com/89/31/jigAIxM6_o.jpg)

**Multi Filter Section Drawer**

![Logo](https://images2.imgbox.com/7f/9f/mz0doOdW_o.jpg)

**Food Details Page**

![Logo](https://images2.imgbox.com/72/e5/bawhJbvf_o.jpg)

**Payment Page**

![Logo](https://images2.imgbox.com/28/2c/NrF6G6p7_o.jpg)


## References ⏩

* Icons are used from  material UI  
    https://material-ui.com/components/material-icons/

* Components are used from  material UI  
    https://mui.com/components/

* Current Location status are fetched using OpenWeatherMap API
    https://openweathermap.org/api

* To have interactive and customised maps along with searching ability  
    https://github.com/visgl/react-map-Gl


## Creator  😇

- 👤 [Biswaranjan](https://www.github.com/icyflame21)
