# Geschenk und Shopping Ideen App

Test Ionic App in which users can browse different categories and find new interesting products or gifts. This is just a prototype, it hasn't been published to the Play Store.

## Used Technology

The app was programmed in Ionic 3 with Angular 4. The backend is a simple Node JS app hosted on Heroku in combination with a ClearDB MySQL database. The communication is handled via a Restful API. POST operations can only be done with a specific Key.

<strong>The server side app:</strong> <a href="https://github.com/sunilson/Geschenk-und-Shopping-Ideen-App-Server">https://github.com/sunilson/Geschenk-und-Shopping-Ideen-App-Server</a>

## Product List

The product list requests 10 products a time. It implements the Ionic infinite scroll component, therefore if the bottom is reached, the next 10 products are loaded. 

Products are displayed in carts with an image, title and a description. Also it contains the seller name, the price, a button to go to the product page and a button to add the product to the wishlist.

<img src="http://i.imgur.com/rUjQsIQ.png" width="200"></img>

## Side Menu

In the side menu the user can choose the category he/she wants to view.

<img src="http://i.imgur.com/yJaI0aZ.png" width="200"></img>

## Bookmarks

Products can be bookmarked and are then added to the wishlist. The wishlist can be accessed via the side menu.

<img src="http://i.imgur.com/FJsxAd3.png" width="200"></img>

## Filtering

The product page can be filtered by seller, region and gender. The sellers and the regions are retrieved dynamically to guarantee up-to-date data. Sorting choices are stored in the device storage and therefore persisted.

<img src="http://i.imgur.com/X4SzflK.png" width="200"></img>
<img src="http://i.imgur.com/Zghm2jh.png" width="200"></img>

## Language selection

The user can select between German and English in the side menu, which changes the language of the whole app (not product titles/descriptions).

<img src="http://i.imgur.com/YKAhKU9.png" width="200"></img>
