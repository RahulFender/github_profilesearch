function searchProfile() {
    const username = document.getElementById('usernameInput').value;
    const profileInfo = document.getElementById('profileInfo');

    if (username === '') {
        profileInfo.innerHTML = '<p>Please enter a GitHub username.</p>';
        return;
    }

    const url = `https://api.github.com/users/${username}`;

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('User not found');
            }
            return response.json();
        })
        .then(data => {
            const { avatar_url, login, name, bio, public_repos, followers, following, html_url } = data;
            profileInfo.innerHTML = `
                <img src="${avatar_url}" alt="${login}" width="150">
                <h2>${name} (${login})</h2>
                <p>${bio}</p>
                <p>Public Repositories: ${public_repos}</p>
                <p>Followers: ${followers}</p>
                <p>Following: ${following}</p>
                <a href="${html_url}" target="_blank">View Profile on GitHub</a>
            `;
        })
        .catch(error => {
            profileInfo.innerHTML = `<p>${error.message}</p>`;
        });
}


