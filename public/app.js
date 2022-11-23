document.addEventListener('click', (event) => {
    if(event.target.dataset.type === 'remove') {
        const id = event.target.dataset.id

        remove(id).then(() => {
            event.target.closest('li').remove()
        })
    }
})

document.addEventListener('click', (event) => {
    if(event.target.dataset.type === 'edit') {
        const id = event.target.dataset.id
        const noteTitle = document.querySelector(`[data-title="${id}"]`).innerText

        event.target.closest('li').innerHTML = (
            `<input type="text" data-input="${id}" name="newTitle" value="${noteTitle}" required/>
                <div>
                    <button class="btn btn-success" data-type="save" data-id="${id}">Save</button>
                    <button class="btn btn-danger" data-type="cancel" data-id="${id}">Cancel</button>
                </div>
            `
        )
    }
})

document.addEventListener('click', (event) => {
    const id = event.target.dataset.id
    if(event.target.dataset.type === 'save') {
        const editInput = document.querySelector(`[data-input="${id}"]`)
        edit(id, editInput.value).then(() => {

            event.target.closest('li').innerHTML = (
                `<span data-title="${id}">${editInput.value}</span> 
                <div>
                    <button class="btn btn-primary" data-type="edit" data-id="${id}">Edit</button>
                    <button class="btn btn-danger" data-type="remove" data-id="${id}">&times;</button>
                </div>
                `
            )
        })
    }
})

document.addEventListener('click', (event) => {
    if(event.target.dataset.type === 'cancel') {
        const id = event.target.dataset.id
        const noteTitle = document.querySelector(`[data-input="${id}"]`).value
        event.target.closest('li').innerHTML = (
            `
                <span data-title="${id}">${noteTitle}</span>
                <div>
                    <button class="btn btn-primary" data-type="edit" data-id="${id}">Edit</button>
                    <button class="btn btn-danger" data-type="remove" data-id="${id}">&times;</button>
                </div>
            `
        )
    }
})

async function remove(id) {
    await fetch(`/${id}`, {
        method: 'DELETE'
    })
}

async function edit(id, data) {
    await fetch(`/${id}/${data}`, {
        method: "PUT"
    })
}