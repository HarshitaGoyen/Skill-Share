# Skill Swap Hub - Backend API Documentation

Base URL:

http://localhost:5000


---

# 1. User APIs

## Get All Users

Method:
GET

URL:
http://localhost:5000/api/users

Description:
Returns all registered users.


---

## Search Users by Skill

Method:
GET

URL:
http://localhost:5000/api/users?skill=Java

Description:
Returns users who can teach the specified skill.


---

## Get User by ID

Method:
GET

URL:
http://localhost:5000/api/users/1

Description:
Returns a specific user's profile.


---

## Get Matching Users

Method:
GET

URL:
http://localhost:5000/api/users/1/matches

Description:
Finds users whose teaching/learning skills match the selected user's skills.


---

## Update User Profile

Method:
PUT

URL:
http://localhost:5000/api/users/1

Request Body:

{
    "name": "Maitri",
    "email": "maitri@example.com",
    "bio": "Computer Science student",
    "skillsToTeach": ["Java", "C++"],
    "skillsToLearn": ["React", "Node.js"]
}

Description:
Updates a user's profile information.


---

# 2. Skill APIs

## Get All Skills

Method:
GET

URL:
http://localhost:5000/api/skills

Description:
Returns all available skills.


---

## Get Skill by Name

Method:
GET

URL:
http://localhost:5000/api/skills/Java

Description:
Returns information about a specific skill.


---

## Search Skills

Method:
GET

URL:
http://localhost:5000/api/skills/search?skill=Python

Description:
Searches skills by name.


---

## Filter Skills by Category

Method:
GET

URL:
http://localhost:5000/api/skills/search?category=Programming

Description:
Returns skills belonging to a specific category.


---

## Search + Filter Skills

Method:
GET

URL:
http://localhost:5000/api/skills/search?skill=Java&category=Programming

Description:
Searches skills by both name and category.


---

# 3. Authentication APIs

## Register

Method:
POST

URL:
http://localhost:5000/api/auth/register

Request Body:

{
    "name": "Aman",
    "email": "aman@example.com",
    "password": "123456"
}

Description:
Creates a new user account.


---

## Login

Method:
POST

URL:
http://localhost:5000/api/auth/login

Request Body:

{
    "email": "aman@example.com",
    "password": "123456"
}

Description:
Authenticates a user.


---

# 4. Swap Request APIs

## Get All Swap Requests

Method:
GET

URL:
http://localhost:5000/api/swaps

Description:
Returns all swap requests.


---

## Get Swap Request by ID

Method:
GET

URL:
http://localhost:5000/api/swaps/1

Description:
Returns a specific swap request.


---

## Create Swap Request

Method:
POST

URL:
http://localhost:5000/api/swaps

Request Body:

{
    "sender": 1,
    "receiver": 2,
    "skillOffered": "Java",
    "skillWanted": "React",
    "message": "I can teach you Java."
}

Description:
Creates a new skill swap request.


---

## Accept or Reject Swap Request

Method:
PUT

URL:
http://localhost:5000/api/swaps/1

Request Body:

{
    "status": "accepted"
}

Allowed status values:

accepted
rejected


---

## Cancel Swap Request

Method:
PUT

URL:
http://localhost:5000/api/swaps/1/cancel

Description:
Cancels a pending swap request.


---

## Delete Swap Request

Method:
DELETE

URL:
http://localhost:5000/api/swaps/1

Description:
Deletes a swap request.


---

# 5. General Backend Information

Backend:

Node.js + Express.js

Port:

5000

Base URL:

http://localhost:5000

CORS:

Enabled

Data Storage:

Temporary in-memory arrays

Database:

Not integrated yet


---

# 6. Important Note

The current backend uses temporary in-memory data.

All user, authentication, skill and swap data will be replaced/integrated with the project's database later.

The frontend should use the API endpoints listed above rather than directly accessing backend arrays.