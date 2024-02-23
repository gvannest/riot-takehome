# riot-takehome

## 1. Description

This is a proposed implementation for the [riot-takehome assignment](https://github.com/tryriot/take-home).

## 2. Prerequesite

- Pull the repository onto your local machine :

  ```console

    ~$ git clone git@github.com:gvannest/riot-takehome.git

    ```

## 3. How to run the app

- Go to the root of the repository : `cd riot-takehome`

### 3.1. Using Docker

- Run the following command to build the image : `./rt build`

- Run the following command to run the container : `./rt run`

  The app will be available on `http://localhost:3000`.

- Run the following command to run the tests : `./rt tests`

### 3.2. Using Node.js

- Make sure you have node.js version 21 or above installed on your machine, as well as the yarn package manager.

- Run the following command to install the dependencies : `yarn install`
  
- Run the following command to run the app : `yarn start`

  The app will be available on `http://localhost:3000`.

- Run the following command to run the tests : `yarn test`
