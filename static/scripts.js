document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('add-hobby').addEventListener('click', function() {
        const newHobbyInput = document.getElementById('new-hobby');
        const newHobby = newHobbyInput.value.trim();

        if (newHobby) {
            fetch('/add_hobby', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body: `hobby=${newHobby}`
            })
            .then(response => response.json())
            .then(data => {
                const hobbyList = document.getElementById('hobby-list');
                const li = document.createElement('li');
                li.innerHTML = `${newHobby} <button class="remove-hobby" data-hobby="${newHobby}">x</button>`;
                hobbyList.appendChild(li);
                newHobbyInput.value = '';
                addRemoveHobbyEventListeners();
            });
        }
    });

    function addRemoveHobbyEventListeners() {
        document.querySelectorAll('.remove-hobby').forEach(button => {
            button.removeEventListener('click', removeHobby);
            button.addEventListener('click', removeHobby);
        });
    }

    function removeHobby(event) {
        const hobby = event.target.getAttribute('data-hobby');

        fetch('/remove_hobby', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: `hobby=${hobby}`
        })
        .then(response => response.json())
        .then(data => {
            event.target.parentElement.remove();
        });
    }

    addRemoveHobbyEventListeners();
});
