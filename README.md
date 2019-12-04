Summary
=======

* [About](*about)
* [Database Schema](#database-schema)
    * [Item](#item)
    * [Item_in_cart](#item_in_cart)
    * [Cart](#cart)
    * [User](#user)
* [To-Do](#to-do)
    

About
=======
This Project is my answer to the ["Carrinho de Compras"](https://github.com/jusbrasil/careers/blob/master/challenges/02-carrinho-de-compras.md) challenge of Jusbrasil carrers.

Currently under work. 

Database Schema
=======

There are four tables in the DB.

![Database](images/database.png)

## Item

This is the base list of selling items. Here is registered all items on sale. Their name, image, price and quantity.

## Item_in_cart

This is a table to make the system more robust. When an item is selected to be bought, a backup is made with the original items information, and the quantity that is been bought added. The reason for this is that if the original item is altered the sale will remain with the same information as before.

## Cart

The cart is the connection between a user and the items he bought(a date in sold_at) or the items on his cart at the moment(no value in sold_at).

## User

Basic information about a user.

How To Use (Current Version)
=======
After starting go to http://localhost:8100/graphql

Sign in using any of the created users with this sintax:
```
mutation {
  signIn(login: "user1", password: "123123123") {
    token
  }
}
```
You will receave a token that you can place in the headers seaction like this:
```
{
  "x-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJ0ZXN0ZTFAZW1haWwuY29tIiwidXNlcm5hbWUiOiJ0ZXN0ZTEiLCJpYXQiOjE1Njk4ODY5MzMsImV4cCI6MTU2OTg4ODczM30.Qpw-P9oyEgeradduibPbcotPH_HQJY7JbO6UUK8ds5A"
}
```
With the token in place you can query yourself:
```
query{
  me{
    username
    id
  }
}
```
To-Do
=======

## Requirements
## Installation
## How to use

