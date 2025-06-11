let users = [];

async function fetchUsers() {
    const response = await fetch('https://684905e245f4c0f5ee6fb988.mockapi.io/api/V1/UserData');
    const data = await response.json();
    users = data;
    console.log(users.map(u => u.Name));
    const container = document.querySelector('.items-container');
    container.innerHTML = ''; // Clear previous content
    users.forEach(user => {
        const markup = `
            <div class="item-container">
                <div class="img-wrapper">
                    <img src="${user.Image}" alt="Avatar">
                </div>
                <h3>${user.Name}</h3>
                <p>${user.Email}</p>
                <p>${user.Message}</p>
                <button class="delete-btn">X</button>
            </div>
        `;
        container.insertAdjacentHTML('beforeend', markup);
    });

    container.addEventListener('click', function(e) {
        if (e.target.classList.contains('delete-btn')) {
            const card = e.target.closest('.item-container');
            card.remove();
        }
    });
}
fetchUsers();

function AddData() {
    const name = prompt('Enter your name:');
    const email = prompt('Enter your email:');
    const message = prompt('Enter your message:');
    const image = prompt('Enter image URL:');
    if (name && email && message && image) {
        const newUser = {
            Name: name,
            Email: email,
            Message: message,
            Image: image
        };
        fetch('https://684905e245f4c0f5ee6fb988.mockapi.io/api/V1/UserData', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newUser)
        }).then(() => fetchUsers());
    } else {
        alert('Please fill in all fields');
    }
}