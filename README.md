# Nourish.Me

<br>

## Description

Nourish.Me is a mobile-targeted web app allows you to always be on track of your diet. Simply search and add food everyday to track and control your nutrition intake and achieve your fitness goal with Nourish.Me.

## User Stories

- **404:** As an anon/user I can see a 404 page if I try to reach a page that does not exist so that I know it's my fault
- **Signup:** As an anon I can sign up in the platform so that I can create an account to store all my information
- **Login:** As a user I can login to the platform so that I can start start using the features of this app
- **Logout:** As a user I can logout from the platform so no one else can modify my information
- **New user quesionnaire** As a new user I can be guided step by step to enter my basic information and goals, and get a diet plan that suits me
- **Daily diary** As a user I can see my diet macro nutrition goals for the current day and how much I've accomplished, and the record of every meal of that day
- **Search food** As a user I can search any food through the API and see the nutrition facts of that food
- **Add food to a meal** As a user I can add any food with a specific amount to any meal among breakfast/ lunch/ dinner/ snack
- **Edit food in a meal** As a user I can edit the amount of any food that I have added in any meal
- **Delete food and update meal** As a user I can delete any food from any meal on the current day
- **Profile** As a user I can see all my basic information and goals in my profile page
- **Edit Profile** As a user I can edit any item in my profile to update my diet plan

## Backlog

Barcode scanning:

- activate the device camera to capture the barcode on the food package and fetch food information through API

User history tracking:

- see the meals, weight and nutrition records of the past days

# Client / Frontend

## Routes

- / - Homepage
- /signup - Signup Page
- /login - Login form
- /daily-diary - <PrivateRoute/> Daily Diary Page
- /food-details/:barcode" - <PrivateRoute/> Food Details page
- /profile - <PrivateRoute/> Profile Page
- /progress-questionnaire - <PrivateRoute/> Progress Questionnaire
- /\* - 404 Page

## Pages

- Home Page (public) - Introduction, hero picture and signup button
- Signup Page (anon only) - Signup form
- Login Page (anon only) - Login form
- Daily Diary Page (user only) - Diet macro nutrition goals, nutrition intake progress, record of every meal, edit and delete food, food search bar, food search results list
- Food Details page (user only) - Picture and detailed nutrition facts of a food, amount slider and add-food button
- Profile Page (user only) - All the basic information, body specs, and diet goals of the user
- Progress Questionnaire (user only) - Progress quesions to ask a user to input basic information, body specs, and diet goals
- 404 Page (public)

## Components

- DailyDiary components
  - DailyMacros
  - FoodDiary
  - FoodSearchBar
  - FoodSearchResults
- FoodDetails components
