---
trigger: always_on
---

# About Smart Menu
This app is called smart menu, it does a pretty straight forward task which is a restaurent owner will input the food items with price and other details and the app will create a food menu which will be linked to a QR code and customers will scan the QR code to access the menu. 

This is a subscription model business idea, when restaurents are onboarded they will subscribe to a package and will pay the subscription.

This app will mainly have 1 web app with 2 different ui for super admin and restaurent user, with following features.

## Features

1. app will have 2 main user types, super admin users(who manages the app) and restaurent users(who manages the respective restaurent and the menu).
2. adimn features are,
    1. manage restaurants and its users 
    2. manage payments/subscriptions
    3. view detailed data and stats
    4. onboard restaurent 
    5. onboard restaurent owner profiles
    6. manage food menu templates
3. restaurent user features are,
    1. manage food menu.
    2. manage resturent info.
    3. manage user profile.


## Additional info

Admin will configure or add different menu templates into the template pool. Restaurent owner will choose a menu template which suites the restaurent and add the food item to it. Once the restaurent publish the menu, it a dedicated url(subdomain) will be linked to the QR code. for example 
* if the app url - www.smart-menu.com
* the menu url - www.restaurent.smart-menu.com 

when customers scan the QR, the menu should be shown in HTML format. because in future im planing to add more features to the menu, for now it will be simple menu template. 

a restaurent can have any number of menus and can publish XX number of menues menu. the published menus will be linked to the QR code. the XX will vary depend on the menu the restaurent have subscribed.

the menu will be stored in the DB as a json or html string or any other recommended way(considering the char limits), and will be linked to a url(the respective subdomain). when the customer scans the QR the respective menu will be fetched and rendered as HTML. the menu url/subdomain will be configured by the super admin in the host provider(AWS).