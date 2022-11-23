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
        console.log(event.target.closest('li'))

        event.target.closest('li').innerHTML = (
            `<input type="text" id="edit-input" name="newTitle" required/>
                <div>
                    <button class="btn btn-primary" data-type="save" data-id="${id}">Save</button>
                    <button class="btn btn-danger" data-type="cancel" data-id="${id}">Cancel</button>
                </div>
            `
        )

        // const editInput = document.querySelector('#edit-input')
        // console.log(editInput)
        // edit(id, editInput.value).then(() => {
        //     event.target.closest('li').innerHTML = (
        //         `${editInput.value}
        //             <div>
        //                 <button class="btn btn-primary" data-type="edit" data-id="${id}">Edit</button>
        //                 <button class="btn btn-danger" data-type="remove" data-id="${id}">&times;</button>
        //             </div>`
        //     )
        // }).then(() => {
        //     event.target.closest('li').innerHTML = initHTML
        // })


        // const data = prompt('Print new title')
        //
        // if (data) {
        //     edit(id, data).then(() => {
        //         event.target.closest('li').innerHTML = (
        //             `${data}
        //             <div>
        //                 <button class="btn btn-primary" data-type="edit" data-id="${id}">Edit</button>
        //                 <button class="btn btn-danger" data-type="remove" data-id="${id}">&times;</button>
        //             </div>`
        //         )
        //     })
        // }
    }
})

document.addEventListener('click', (event) => {
    const id = event.target.dataset.id
    if(event.target.dataset.type === 'save') {
        const editInput = document.querySelector('#edit-input')
        edit(id, editInput.value).then(() => {

        })
    }
})

document.addEventListener('click', async (event) => {
    if(event.target.dataset.type === 'cancel') {
        const id = event.target.dataset.id
        const data = await fetch('/', {
            method: 'GET'
        })
        console.log(data)
        event.target.closest('li').innerHTML = (
            `
                    <div>
                        <button class="btn btn-primary" data-type="edit" data-id="${id}">Edit</button>
                        <button class="btn btn-danger" data-type="remove" data-id="${id}">&times;</button>
                    </div>`
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