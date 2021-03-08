

# ImageList - Coding Challange

We will be building this infrastructure.

![infrastructure](https://order-message-queue.s3.eu-central-1.amazonaws.com/crewfire.png)

Tools used: 
1. AWS Cloud Development Kit - Cloud infrastructure using Javascript
2. API Gateway - Managed by AWS
3. Lambda - Cloud functions
4. ReactJs
5. Material UI

The whole application is implemented by the principle "Infrastructure as Code", so you just need an Amazon account to run these commands and the whole application would be hosted in your cloud:

1. Add to env your amazon access keys
2. Go to folder aws
3. run `npm install`  
4. `npm run deploy`
You are done :)

## Cloud Formation Stack
To implement the solution as Infrastructure as Code I used only 1 stack:
1. `FlickrStack` 
 
**Stack: `FlickrStack`**
- Deploys ApiGateway with route `/posts` and method `GET`
- Deploys 1 lambda: 
	- `getFlickrPosts` => ApiGateway will redirect the request here, it will see if there is a search parameter or not, and query the Flicker's service for the posts. It is used as a mapper too, so we don't waste user resources in the front end.

- Lambda is complied using Webpack because of the tree-shaking (small size=> small cold start), for more check the webpack config file.

## Postman Collection
I already hosted the app in my AWS account, you can find postman collection in [here](https://github.com/reni11111/codingChallenge/blob/master/aws/flicker_search_collection.json).


## Automation tests:
We want to make sure that we don't break the system when we edit code, so it's time for automation testing.
I have used [mocha](https://www.npmjs.com/package/mocha) framework, tests can be found [here](https://github.com/reni11111/codingChallange/blob/master/aws/test/Test.js).

To run the tests:
1. go to aws folder
2. run `npm install`
3. run `npm run test`
Enjoy

Tests are done only for the API, if u want to know how I would test the Front-End... see you at the meeting.


## Front-End
First I started with the [prototype](https://xd.adobe.com/view/12a60fe4-f1c7-4656-b2ea-854a508f5575-47f5/), then I made some changes as I saw fit (as can be seen at git commits).

I used the most mature UI library [Material UI](https://material-ui.com/), the bones are from there, It seems you can't build a working organism by only using bones, so I added the muscles and everything (lol) and now it's LIVE:  https://imagelist.web.app/.

Even why this is a test project I took care to implement all flows of it. (loading... errors... empty results...)



## Extra
The requirements were a little too easy, so it was hard to stand out... then I read:

*"For extra points, structure the backend as the API endpoint needed as part of a much larger application that required more organization than a one file express app would",* 

I decided to go out of the box and not use the "Old Express"... so I went with the latest Serverless Technologies that can scale to infinity without any DevOps.

*// for more performance a caching layer can be added to API Gateway so it won't need to hit Flickr's system on every call + the response would be in a few milliseconds*
