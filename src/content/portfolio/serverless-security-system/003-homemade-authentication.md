---
id: 3
title: oAuth Who? 🕵️
slug: authentication
date: April 16, 2023
img: 'feature-images/IMG_0087.png'
tags: 
  - Complex
  - Cloud
  - UI/UX
---

Authentication is incredibly important in any application that involves authorization. That's why I spent much time internally debating how I'd implement authentication.

[oAuth2](https://oauth.net/2/) is an industry-standard authentication tool. It's a tool I've leveraged before. [Amazon Cognito](https://aws.amazon.com/cognito/) is another highly-praised tool packaged as an AWS service. Both are incredible options that would incorporate nicely within the system.

So which one did I use? \
Neither. **I built my own.**

<!--more-->

Moving forward, I'll refer to my homemade authentication system as "oAuthWho."

### Why re-invent the wheel?
Creating an authentication system is comparable to re-inventing the wheel. However, I wanted to avoid adding complexity to the already-complicated architecture. That's why I decided to create what might be **the simplest authentication system** for the Security System.

### How does it work?
oAuthWho is a minimal authentication system. The system is built into the [serverless API](/portfolio/serverless-security-system/serverless-api) that connects the serverless cloud-based system to the user-facing [frontend](/portfolio/serverless-security-system/frontend).

We'll look at the two primary components of oAuthWho: tokens and the API integration.


## Tokens
Many authentication systems leverage tokens. Instead of sending sensitive data, such as the password, in all API calls, access tokens can be used to identify a user. As its name suggests, access tokens can indicate what a user can or cannot access. In some authentication systems, these tokens are [JWT (JSON Web Tokens)](https://jwt.io), meaning they can be parsed and their data read. However, tokens are treated as nothing more than random identifiers in oAuthWho.
<!--In most authentication systems, tokens include small pieces of data since they leverage tools like [JSON Web Tokens](https://jwt.io). -->
oAuthWho treats tokens as "secret" identifiers. Once logged into the system, users are provided an access token that can be leveraged for accessing various resources. Instead of sending my username and password each time I need to access footage, I can send only my token. \
Below is a screenshot of an example `User` DynamoDB table.

![Picture of user DynamoDB table](/blog-images/serverless-security-system/users-dynamo-table-example.png)
This table stores the information for each user, including authentication data.

## API Integration
Let's look at how the authentication system is built into the serverless API via the `/auth` API calls. \
We'll look only at valid API calls. The API will handle invalid authentication attempts appropriately.

### Logging in
When a user logs in, the following API call is made. Included are example payload and response objects.

#### POST `/auth/login`
##### Payload
```json
{
  "name": "John",
  "pin": "123abc"
}
```

##### Response
```json
{
  "token": "27d999aa78b942bb80a420e1d4ca5949",
  "token_expiration": 1678874780.078592
}
```

If the login is valid, the API generates a new `token` and includes it with its expiration time, within the response. This updated `token` is stored within the User table. \
Once the frontend has a `token`, the token is leveraged to make other API requests, such as accessing security footage.
<!--
The token is included in API requests as a custom `access-token` HTTP header.
-->

### Refreshing tokens
In [oAuth2](https://oauth.net/2/), access tokens are accompanied by a "Refresh Token." Refresh Tokens remain valid longer than access tokens. Their purpose is to allow users to generate a *fresh* 😎 Access Token when the previous token has expired. \
Refresh tokens are not directly utilized by oAuthWho. Instead, users can refresh (regenerate) their existing access token with the below API call.

#### POST `/auth/refresh`
##### Payload
There is no payload (body) needed for this API call. All that is necessary is the `access-token` header.

##### Response
```json
{
  "token": "2404003dbb4d4e589ff1a459c827efc5",
  "token_expiration": 1679253426.53232
}
```

### Logging out
Users can log out of the system and invalidate their access token by clicking the "Logout" button on the frontend. This action leverages the below API call.

#### POST `/auth/logout`
##### Payload
There is no payload (body) needed for this API call. All that is necessary is the `access-token` header.

##### Response
Given the logout succeeded, a `200` (success) status code response is returned.


### Inviting a user
Admin users can create invitations that a new user can use to *create an account*.


#### POST `/auth/invitations`
##### Payload
There is no payload (body) needed for this API call. All that is necessary is the `access-token` header of the admin.

##### Response
```json
{
  "token": "a98f5b7543a1446493de4c2ac3a12170",
  "token_expiration": 1679254145.124134
}
```

### Accepting an invite

#### PUT `/auth/invitations`
##### Payload
```json
{
  "name": "John",
  "pin": "123abc"
}
```

##### Response
```json
{
  "name": "John",
  "admin": "false",
  "token": "85cb241d25ed4204a637f8a40cc9127e",
  "token_expiration": 1681676565.1257918
}
```
Returns the newly created user and a new access token.


## Concerns
#### 1. Concern: Is this secure?
Yes. Sensitive data is encrypted while being sent to/from the API.

#### 2. Concern: How long are access tokens valid?
By default, access tokens are valid for four weeks. However, this can be changed by admin users.

#### 3: Concern: Doesn't this mean a user can have only one session at a time?
One *flaw* one might find with oAuthWho is that users can only have one valid access token at a time. Users can only be logged into an account on one device at any given point.

However, **I don't care.** Most users will only log into the system on one device, so this is not much of an issue. For users that will leverage multiple devices, there are two simple solutions to this:
1. Log in each time you switch devices, or
1. Create a different user for each device

Both of these are simple solutions and require little effort from the user. This "flaw" could be completely resolved if the token distribution system were reworked. However, oAuthWho is sufficient for most user needs.

---

## Resources
  - [Authentication API (source code)](https://github.com/cal-overflow/serverless-security-system/blob/main/cloud/lambda/api/auth.py)
  - [Serverless API (post)](/portfolio/serverless-security-system/serverless-api)
  - [Overview of the Cloud Architecture (post)](/portfolio/serverless-security-system/cloud-architecture)

