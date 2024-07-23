document.addEventListener("deviceready", function() {
    loadContacts();

    document.getElementById("add").addEventListener('click', function() {

        createContact();
    });

    document.getElementById("delete").addEventListener('click', function() {
        const name = document.getElementById("deleteName").value; // Assurez-vous que cet élément existe dans votre HTML
        deleteContact(name);
    });

    document.getElementById("update").addEventListener('click', function(e) {
        e.preventDefault(); // Prevent form submission
        editContact();
    });
}, false);

// Load all contacts
function loadContacts() {
    let options = new ContactFindOptions();
    options.multiple = true;
    options.hasPhoneNumber = true;

    let fields = ['*'];

    navigator.contacts.find(fields, showContacts, onContactError, options);
}

// Show contacts
function showContacts(contacts) {
    let htmlCode = '';

    for (let contact of contacts) {
        htmlCode += `
            <li>
                <a href="#detail" onclick="showContactDetails('${contact.id}')">
                    <img src="img/1.png" alt="">
                    <h2>${contact.displayName || 'Unknown'}</h2>
                    <p>${contact.phoneNumbers ? contact.phoneNumbers[0].value : 'N/A'}</p>
                </a>
            </li>
        `;
    }
    const contactList = document.getElementById('contactList');
    contactList.innerHTML = htmlCode;
    $(contactList).listview('refresh');
}

// Show contact details
function showContactDetails(id) {
    navigator.contacts.find(['id'], function(contacts) {
        let contact = contacts[0];
        let contactDetails = `
            <h3>${contact.displayName || 'Unknown'}</h3>
            <p><strong>Prénom:</strong> ${contact.name.givenName || 'N/A'}</p>
            <p><strong>Nom:</strong> ${contact.name.familyName || 'N/A'}</p>
            <p><strong>Téléphone:</strong> ${contact.phoneNumbers ? contact.phoneNumbers[0].value : 'N/A'}</p>
            <p><strong>Email:</strong> ${contact.emails ? contact.emails[0].value : 'N/A'}</p>
        `;
        document.getElementById('contactDetails').innerHTML = contactDetails;
        document.getElementById('editContactId').value = contact.id;
    }, onContactError, { filter: id });
}

// Error handler for contacts
function onContactError(error) {
    alert("Erreur: " + error.message);
}

// Create a contact
function createContact() {
    let contact = navigator.contacts.create({
        "displayName": document.getElementById("nom").value,
        "name": {
            "givenName": document.getElementById("prenom").value,
            "familyName": document.getElementById("nom").value
        },
        "phoneNumbers": [{
            "type": "mobile",
            "value": document.getElementById("telephone").value,
            "pref": true
        }],
        "emails": [{
            "type": "home",
            "value": document.getElementById("email").value,
            "pref": true
        }]
    });

    contact.save(function() {
        alert("Contact ajouté avec succès");
        loadContacts();
    }, onContactError);
}

// Delete a contact
function deleteContact(name) {
    if (!name) {
        alert("Veuillez fournir le nom du contact à supprimer.");
        return;
    }

    let options = new ContactFindOptions();
    options.filter = name;
    options.multiple = false;
    let fields = ["displayName"];

    navigator.contacts.find(fields, function(contacts) {
        if (contacts.length > 0) {
            let contact = contacts[0];
            contact.remove(function() {
                alert("Contact supprimé avec succès");
                loadContacts();
            }, function(error) {
                alert('Échec de la suppression du contact: ' + error.message);
            });
        } else {
            alert("Aucun contact trouvé avec le nom: " + name);
        }
    }, function(error) {
        alert('Erreur lors de la recherche du contact: ' + error.message);
    }, options);
}

// Edit a contact
function editContact() {
    let id = document.getElementById("editContactId").value;
    navigator.contacts.find(['id'], function(contacts) {
        let contact = contacts[0];
        contact.displayName = document.getElementById("editNom").value;
        contact.name.givenName = document.getElementById("editPrenom").value;
        contact.name.familyName = document.getElementById("editNom").value;
        contact.phoneNumbers[0].value = document.getElementById("editTelephone").value;
        contact.emails[0].value = document.getElementById("editEmail").value;

        contact.save(function() {
            alert("Contact modifié avec succès");
            loadContacts();
        }, onContactError);
    }, onContactError, { filter: id });
}
