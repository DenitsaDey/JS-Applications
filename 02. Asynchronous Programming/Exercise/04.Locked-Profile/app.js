async function lockedProfile() {
    const url = 'http://localhost:3030/jsonstore/advanced/profiles';
    const response = await fetch(url);
    const data = await response.json();
    console.log(Object.values(data), Object.keys(data));

    const mainEl = document.getElementById('main');
    const profileEl = document.querySelector('.profile');
    
    profileEl.remove();

    Object.keys(data).forEach((key, i) => {
        let profile = data[key];
        let newProfile = createProfile(i+1, profile.username, profile.email, profile.age);
        mainEl.appendChild(newProfile);
        
    });

    function createProfile(userIndex, username, email, age) {
        let profileDiv = document.createElement('div');
        profileDiv.classList.add('profile');

        let profileImg = document.createElement('img');
        profileImg.src = './iconProfile2.png';
        profileImg.classList.add('userIcon');

        let lockLabel = document.createElement('label');
        lockLabel.textContent = 'Lock';

        let lockRadio = document.createElement('input');
        lockRadio.type = 'radio';
        lockRadio.name = `user${userIndex}Locked`;
        lockRadio.value = 'lock';
        lockRadio.checked = true;

        let unlockLabel = document.createElement('label');
        unlockLabel.textContent = 'Unlock';

        let unlockRadio = document.createElement('input');
        unlockRadio.type = 'radio';
        unlockRadio.name = `user${userIndex}Locked`;
        unlockRadio.value = 'unlock';

        let br = document.createElement('br');
        let hr = document.createElement('hr');

        let usernameLabel = document.createElement('label');
        usernameLabel.textContent = 'Username';
        
        let usernameInput = document.createElement('input');
        usernameInput.name = `user${userIndex}Username`;
        usernameInput.value = username;
        usernameInput.readOnly = true;
        usernameInput.disabled = true;

        let hiddenFieldsDiv = document.createElement('div');
        hiddenFieldsDiv.id = `user${userIndex}HiddenFields`;

        let hiddenFieldHr = document.createElement('hr');

        let emailLabel = document.createElement('label');
        emailLabel.textContent = 'Email:';

        let emailInput = document.createElement('input');
        emailInput.type = 'email';
        emailInput.name = `user${userIndex}Email`;
        emailInput.value = email;
        emailInput.readOnly = true;
        emailInput.disabled = true;

        let ageLabel = document.createElement('label');
        ageLabel.textContent = 'Age';
        let ageInput = document.createElement('input');
        ageInput.type = 'email';
        ageInput.name = `user${userIndex}Age`;
        ageInput.value = age;
        ageInput.readOnly = true;
        ageInput.disabled = true;

        hiddenFieldsDiv.appendChild(hiddenFieldHr);
        hiddenFieldsDiv.appendChild(emailLabel);
        hiddenFieldsDiv.appendChild(emailInput);
        hiddenFieldsDiv.appendChild(ageLabel);
        hiddenFieldsDiv.appendChild(ageInput);

        let showMoreBtn = document.createElement('button');
        showMoreBtn.textContent = 'Show more';
        showMoreBtn.addEventListener('click', showHiddenInfo);

        profileDiv.appendChild(profileImg);
        profileDiv.appendChild(lockLabel);
        profileDiv.appendChild(lockRadio);
        profileDiv.appendChild(unlockLabel);
        profileDiv.appendChild(unlockRadio);
        profileDiv.appendChild(br);
        profileDiv.appendChild(hr);
        profileDiv.appendChild(usernameLabel);
        profileDiv.appendChild(usernameInput);
        profileDiv.appendChild(hiddenFieldsDiv);
        profileDiv.appendChild(showMoreBtn);

        return profileDiv;
      
    }

    function showHiddenInfo(e){
        let currentProfile = e.target.parentElement;
        let showMoreBtn = e.target;
        let hiddenFields = e.target.previousElementSibling;
        console.log(hiddenFields);
        let radioBtn = currentProfile.querySelector('input[type="radio"]:checked');

        if(radioBtn.value !== 'unlock'){
            return;
        }

        showMoreBtn.textContent = showMoreBtn.textContent === 'Show more'
            ? 'Hide it'
            : 'Show more';
        
        hiddenFields.style.display = hiddenFields.style.display === 'block'
        ? 'none'
        : 'block';
    }
}