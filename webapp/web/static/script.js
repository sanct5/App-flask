function getUsers() {
    fetch('/api/users')
        .then(response => response.json())
        .then(data => {
            // Handle data
            console.log(data);

            // Get table body
            var userListBody = document.querySelector('#user-list tbody');
            userListBody.innerHTML = ''; // Clear previous data

            // Loop through users and populate table rows
            data.forEach(user => {
                var row = document.createElement('tr');

                // Name
                var nameCell = document.createElement('td');
                nameCell.textContent = user.name;
                row.appendChild(nameCell);

                // Email
                var emailCell = document.createElement('td');
                emailCell.textContent = user.email;
                row.appendChild(emailCell);

                // Username
                var usernameCell = document.createElement('td');
                usernameCell.textContent = user.username;
                row.appendChild(usernameCell);

                // Actions
                var actionsCell = document.createElement('td');

                // Edit link
                var editLink = document.createElement('a');
                editLink.href = `/edit/${user.id}`;
	        //editLink.href = `edit.html?id=${user.id}`;
                editLink.textContent = 'Edit';
                editLink.className = 'btn btn-primary mr-2';
                actionsCell.appendChild(editLink);

                // Delete link
                var deleteLink = document.createElement('a');
                deleteLink.href = '#';
                deleteLink.textContent = 'Delete';
                deleteLink.className = 'btn btn-danger';
                deleteLink.addEventListener('click', function() {
                    deleteUser(user.id);
                });
                actionsCell.appendChild(deleteLink);

                row.appendChild(actionsCell);

                userListBody.appendChild(row);
            });
        })
        .catch(error => console.error('Error:', error));
}

function createUser() {
    var data = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        username: document.getElementById('username').value,
        password: document.getElementById('password').value
    };

    fetch('/api/users', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        // Handle success
        console.log(data);
    })
    .catch(error => {
        // Handle error
        console.error('Error:', error);
    });
}

function updateUser() {
    var userId = document.getElementById('user-id').value;
    var data = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        username: document.getElementById('username').value,
        password: document.getElementById('password').value
    };

    fetch(`/api/users/${userId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        // Handle success
        console.log(data);
        // Optionally, redirect to another page or show a success message
    })
    .catch(error => {
        // Handle error
        console.error('Error:', error);
    });
}



function deleteUser(userId) {
    console.log('Deleting user with ID:', userId);
    if (confirm('Are you sure you want to delete this user?')) {
        fetch(`/api/users/${userId}`, {
            method: 'DELETE',
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            // Handle success
            console.log('User deleted successfully:', data);
            // Reload the user list
            getUsers();
        })
        .catch(error => {
            // Handle error
            console.error('Error:', error);
        });
    }
}

// Login function

function loginUser() {
    var data = {
        username: document.getElementById('username').value,
        password: document.getElementById('password').value
    };

    fetch('/api/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        if (data.message === 'Login successful') {
            window.location.href = `/mycomputers/${data.user_id}`; // Redirect to mycomputers page with user ID
        } else {
            alert('Login failed');
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

// Computer functions

function getUserComputers(userId) {
    fetch(`/api/computers/users/${userId}`)
        .then(response => response.json())
        .then(data => {
            // Handle data
            console.log(data);

            // Get table body
            var computerListBody = document.querySelector('#computer-list tbody');
            computerListBody.innerHTML = ''; // Clear previous data

            // Loop through computers and populate table rows
            data.forEach(computer => {
                var row = document.createElement('tr');

                // Reference
                var refCell = document.createElement('td');
                refCell.textContent = computer.ref;
                row.appendChild(refCell);

                // User ID
                var userIdCell = document.createElement('td');
                userIdCell.textContent = computer.user_id;
                row.appendChild(userIdCell);

                // GPU
                var gpuCell = document.createElement('td');
                gpuCell.textContent = computer.gpu;
                row.appendChild(gpuCell);

                // CPU
                var cpuCell = document.createElement('td');
                cpuCell.textContent = computer.cpu;
                row.appendChild(cpuCell);

                // RAM
                var ramCell = document.createElement('td');
                ramCell.textContent = computer.ram;
                row.appendChild(ramCell);

                // Actions
                var actionsCell = document.createElement('td');

                // Edit link
                var editLink = document.createElement('a');
                editLink.href = `/editcomputer/${computer.ref}`;
                editLink.textContent = 'Edit';
                editLink.className = 'btn btn-primary mr-2';
                actionsCell.appendChild(editLink);

                // Delete link
                var deleteLink = document.createElement('a');
                deleteLink.href = '#';
                deleteLink.textContent = 'Delete';
                deleteLink.className = 'btn btn-danger';
                deleteLink.addEventListener('click', function() {
                    deleteComputer(computer.ref);
                });
                actionsCell.appendChild(deleteLink);

                row.appendChild(actionsCell);

                computerListBody.appendChild(row);
            });
        })
        .catch(error => console.error('Error:', error));
}

function createComputer(userId) {
    var data = {
        ref: document.getElementById('ref').value,
        user_id: userId,  // Añadir el user_id automáticamente
        gpu: document.getElementById('gpu').value,
        cpu: document.getElementById('cpu').value,
        ram: document.getElementById('ram').value
    };

    fetch('/api/computers', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        // Handle success
        console.log(data);
        // Optionally, reload the computer list
        getUserComputers(userId);
    })
    .catch(error => {
        // Handle error
        console.error('Error:', error);
    });
}

function deleteComputer(ref) {
    console.log('Deleting computer with reference:', ref);
    if (confirm('Are you sure you want to delete this computer?')) {
        fetch(`/api/computers/${ref}`, {
            method: 'DELETE',
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            // Handle success
            console.log('Computer deleted successfully:', data);
            // Reload the computer list
            getComputers();
        })
        .catch(error => {
            // Handle error
            console.error('Error:', error);
        });
    }
}

function updateComputer() {
    var computerRef = document.getElementById('computer-ref').value;
    var data = {
        gpu: document.getElementById('gpu').value,
        cpu: document.getElementById('cpu').value,
        ram: document.getElementById('ram').value
    };

    fetch(`/api/computers/${computerRef}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        // Handle success
        console.log(data);
        // Optionally, redirect to another page or show a success message
    })
    .catch(error => {
        // Handle error
        console.error('Error:', error);
    });
}