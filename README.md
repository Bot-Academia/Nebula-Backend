# Nebula-Backend
<!-- ALL-CONTRIBUTORS-BADGE:START - Do not remove or modify this section -->
[![All Contributors](https://img.shields.io/badge/all_contributors-1-orange.svg?style=flat-square)](#contributors-)
<!-- ALL-CONTRIBUTORS-BADGE:END -->

  ![CodeQL](https://github.com/Bot-Academia/Nebula-Backend/workflows/CodeQL/badge.svg)

## Project Description
Nebula is divided into two repositories. This repository contains the Backend codebase of the project. Checkout the frontend codebase over [here](https://github.com/Bot-Academia/Nebula-Frontend). This project aims to provide universities and communities with a platform which can be utilised to make the working of various clubs systematic. 

## Prerequisite: 

These are the requirement that should be installed locally on your machine.

- Node.js
- MongoDB
- Postman


## How to setup node.js on your machine?

- Move to: [link](https://nodejs.org/en/download/) choose the operating system as per your machine and start downloading and setup by clicking recommended settings in the installation wizard.

## How to setup MongoDB on your machine?

- Move to: [link](https://docs.mongodb.com/manual/administration/install-community/) look at the left sidebar and choose the operating system according to your machine. Then follow the steps recommended in the official docs.

```
Note: You can also use the MongoDB servers like Mlab or MongoDB Cluster server
```

## How to set up this project locally?

- Move to: https://github.com/Bot-Academia/Nebula-Backend
- Fork the repo 
- Clone the repo using: 
```sh
    git clone https://github.com/Bot-Academia/Nebula-Backend.git
```
- Now move to the project directory on your machine.
```
    cd nebula-backend
```
- Install all the dependencies using:
```sh
npm install 
```
- Run the development server using:
```sh
npm run dev
```
- Now the server is running on PORT 5000 or the PORT mentioned in the environment **.env.dev** variables

```
Note: Setup the environment variables as mentioned below
```


## Run unit test
Use the given below command to run all the unit test cases.
```
npm run test
```


## What are the environment variables required to run the project locally on a machine?
- Follow these steps to set the environment variable for development:
- Move to the root directory of the project and open **.env.dev** (for development) or **.env.test** (for testing)
- PORT = 5000
- NODE_ENV = "development"
- JWT_SECRET="<YOUR SECRET KEY>"
- DATABASE_URL="<YOUR DB URL>"





## Allowed HTTPs requests:
<pre>
POST    : To create resource 
PUT   : To Update resource
GET     : Get a resource or list of resources
DELETE  : To delete resource
</pre>

## Description Of Nebula API Server Responses:
<table>	
    <tr>
        <th>Code</th>	
        <th>Name</th>
        <th>Details</th>
    </tr>
    <tr>
        <td><code>200</code></td>
        <td><code>OK</code></td>
        <td>the request was successful.</td>
    </tr>
    <tr>
        <td><code>201</code></td>
        <td><code>Created</code></td>
        <td>the request was successful and a resource was created.</td>
    </tr>
    <tr>
        <td><code>204</code></td>
        <td><code>No Content</code></td>
        <td>the request was successful but there is no representation to return (i.e. the response is empty).</td>
    </tr>
    <tr>
        <td><code>400</code></td>
        <td><code>Bad Request</code></td>
        <td>the request could not be understood or was missing required parameters.</td>
    </tr>
    <tr>
        <td><code>401</code></td>
        <td><code>Unauthorized</code></td>
        <td>authentication failed or user doesn't have permissions for requested operation.</td>
    </tr>
    <tr>
        <td><code>403</code></td>
        <td><code>Forbidden</code></td>
        <td>access denied.</td>
    </tr>
    <tr>
        <td><code>404</code></td>
        <td><code>Not Found</code></td>
        <td>resource was not found.</td>
    </tr>
    <tr>
        <td><code>405</code></td>
        <td><code>Method Not Allowed</code></td>
        <td>requested method is not supported for resource.</td>
    </tr>
    <tr>
        <td><code>409</code></td>
        <td><code>Conflict</code></td>
        <td>resourse with given id already exist.</td>
    </tr>  
    <tr>
        <td><code>429</code></td>
        <td><code>Too many requests</code></td>
        <td>sent too many requests to the server in short span of time</td>
    </tr>    
</table>
<br></br>

## Contributing 💻
We are happy to see you here and we welcome your contributions towards Nebula.
Contributions are not limited to coding only, you can help in many other ways which includes leaving constructive feedback to people's Pull Request threads also.

Nebula also provides an extensive list of issues, some of them includes labels like good-first-issue, help-wanted. You can take a look at good-first-issue issues if you are new here but you are free to choose any issue you would like to work on.

If there's no issue available currently, you can setup the project locally and find out the bugs/new features and open issues for that and discuss the bugs or features with the project maintainers or admins.

After choosing an issue and doing changes in the code regarding that, you can open up a Pull Request (PR) to main branch to get your work reviewed and merged!

We also have a public chat room on Slack. Drop by and say hello in case you wish to contribute!
[![](https://img.shields.io/badge/chat-on_slack-purple.svg?style=for-the-badge&logo=slack)](https://join.slack.com/t/nebulaplatform/shared_invite/zt-jixsfnrq-SdncWSwsWKq9puEXcJgHyQ)

## Contributors ✨

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tr>
    <td align="center"><a href="https://sourcerer.io/codetheorem"><img src="https://avatars3.githubusercontent.com/u/54779517?v=4" width="100px;" alt=""/><br /><sub><b>Hrishikesh Agarwal</b></sub></a><br /><a href="https://github.com/codewithvk/Nebula-Backend/commits?author=codetheorem" title="Code">💻</a></td>
  </tr>
</table>

<!-- markdownlint-enable -->
<!-- prettier-ignore-end -->
<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!