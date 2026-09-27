// ==========================================
// SkillShare - JavaScript
// ==========================================


// ------------------------------------------
// Sample User Data
// ------------------------------------------

let users = [
    {
        name: "Aarav Sharma",
        teaches: "Python",
        wantsToLearn: "UI/UX Design"
    },
    {
        name: "Riya Verma",
        teaches: "Graphic Design",
        wantsToLearn: "Java"
    },
    {
        name: "Kabir Singh",
        teaches: "Java",
        wantsToLearn: "Digital Marketing"
    },
    {
        name: "Ananya Gupta",
        teaches: "Digital Marketing",
        wantsToLearn: "Web Development"
    },
    {
        name: "Dev Mehta",
        teaches: "Web Development",
        wantsToLearn: "Data Analytics"
    },
    {
        name: "Mehak Jain",
        teaches: "Data Analytics",
        wantsToLearn: "Python"
    }
];


// ------------------------------------------
// Display Users
// ------------------------------------------

function displayUsers(userList) {

    const container = document.getElementById("userContainer");

    container.innerHTML = "";

    // If no users are found
    if (userList.length === 0) {

        container.innerHTML = `
            <p class="no-results">
                No skill matches found.
            </p>
        `;

        return;
    }


    // Create a card for every user
    userList.forEach(function(user) {

        const card = document.createElement("div");

        card.className = "user-card";


        // Get first letter of user's name
        const initial = user.name.charAt(0).toUpperCase();


        card.innerHTML = `
            <div class="user-avatar">
                ${initial}
            </div>

            <h3>${user.name}</h3>

            <div class="skill-info">
                <span class="skill-label">
                    Can Teach
                </span>

                <span class="skill-name">
                    ${user.teaches}
                </span>
            </div>

            <div class="skill-info">
                <span class="skill-label">
                    Wants to Learn
                </span>

                <span class="skill-name">
                    ${user.wantsToLearn}
                </span>
            </div>

            <button
                class="connect-button"
                onclick="connectUser('${user.name}')"
            >
                Connect
            </button>
        `;


        container.appendChild(card);

    });
}


// ------------------------------------------
// Search Skills
// ------------------------------------------

function searchSkills() {

    const searchText =
        document.getElementById("searchInput").value
        .toLowerCase()
        .trim();


    // If search box is empty
    if (searchText === "") {

        displayUsers(users);

        return;
    }


    // Find matching users
    const filteredUsers = users.filter(function(user) {

        return (
            user.name.toLowerCase().includes(searchText) ||
            user.teaches.toLowerCase().includes(searchText) ||
            user.wantsToLearn.toLowerCase().includes(searchText)
        );

    });


    displayUsers(filteredUsers);
}


// ------------------------------------------
// Connect Button
// ------------------------------------------

function connectUser(name) {

    alert(
        "Connection request sent to " +
        name +
        "!"
    );
}


// ------------------------------------------
// Scroll to Form
// ------------------------------------------

function scrollToForm() {

    const formSection =
        document.getElementById("share-skill");

    formSection.scrollIntoView({
        behavior: "smooth"
    });
}


// ------------------------------------------
// Add New User
// ------------------------------------------

document
    .getElementById("skillForm")
    .addEventListener("submit", function(event) {

        // Prevent page refresh
        event.preventDefault();


        // Get values from form
        const name =
            document.getElementById("name").value.trim();

        const teaches =
            document.getElementById("teachSkill").value.trim();

        const wantsToLearn =
            document.getElementById("learnSkill").value.trim();


        // Add new user
        const newUser = {

            name: name,

            teaches: teaches,

            wantsToLearn: wantsToLearn

        };


        users.push(newUser);


        // Refresh user cards
        displayUsers(users);


        // Show confirmation
        alert(
            "Your SkillShare profile has been added!"
        );


        // Clear form
        document.getElementById("skillForm").reset();


        // Scroll to skills
        document
            .getElementById("skills")
            .scrollIntoView({
                behavior: "smooth"
            });

    });


// ------------------------------------------
// Load Users When Page Opens
// ------------------------------------------

displayUsers(users);
