const userId = 'manager@backoffice.it'

const endpoint = 'https://striveschool-api.herokuapp.com/api/product/'
const apiKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTc0NjFlYzJjNmEwZDAwMTg0OTVkZTgiLCJpYXQiOjE3MDIxMjYwNjEsImV4cCI6MTcwMzMzNTY2MX0.RtkO9MZ_ppkv_2h-PtTBq3rv4nEmxk88bgMvb4sy6Mk'

const productId = new URLSearchParams(window.location.search).get('id')
console.log('ID del prodotto da modificare:', productId)

document.addEventListener("DOMContentLoaded", function () {
    fetchProduct()
})

const fetchProduct = async () => {
    try {

        const response = await fetch(`${endpoint}${productId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`
            },
        })

        if (response.ok) {
            const productData = await response.json()

            if (productData && Object.keys(productData).length > 0) {
                console.log('Dati del prodotto:', productData);
            
                document.getElementById('nome').value = productData.name
                document.getElementById('descrizione').value = productData.description
                document.getElementById('urlImmagine').value = productData.imageUrl
                document.getElementById('marca').value = productData.brand
                document.getElementById('prezzo').value = productData.price
            } else {
                console.log('I dati del prodotto sono incompleti o vuoti.')
            }

        } else {
            console.log('Errore durante il recupero dei dati del prodotto.')
        }
    } catch (error) {
        console.error('Si è verificato un errore durante la richiesta dei dati:', error)
    }
}

const sendPutRequest = async () => {
    try {
        const productId = new URLSearchParams(window.location.search).get('id')
        const productName = document.getElementById('nome').value
        const productDescription = document.getElementById('descrizione').value
        const productImage = document.getElementById('urlImmagine').value
        const productBrand = document.getElementById('marca').value
        const productPrice = parseFloat(document.getElementById('prezzo').value)

        const updatedProduct = {
            name: productName,
            description: productDescription,
            imageUrl: productImage,
            brand: productBrand,
            price: productPrice,
        }

        const userConfirmed = window.confirm('Sei sicuro di voler salvare le modifiche al prodotto?')

        if (userConfirmed) {
            const response = await fetch(`${endpoint}${productId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${apiKey}`
                },
                body: JSON.stringify(updatedProduct)
            });

            if (response.ok) {
                console.log(`Prodotto con ID ${productId} modificato con successo.`)
                window.location.href = 'index.html'
            } else {
                console.log('Errore durante la modifica del prodotto.')
            }
        } else {
            console.log('Modifica annullata dall\'utente.')
        }
    } catch (error) {
        console.error('Si è verificato un errore durante la richiesta di modifica:', error)
    }
}

function resetFormWithConfirmation() {
    const confirmation = confirm('Sei sicuro di voler resettare il form? Tutti i dati inseriti verranno persi.')

    if (confirmation) {
        document.getElementById('editForm').reset()
    }
}

const deleteProduct = async () => {
    try {
        const userConfirmed = window.confirm('Sei sicuro di voler eliminare questo prodotto?')

        if (userConfirmed) {
            const response = await fetch(`${endpoint}${productId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${apiKey}`
                }
            })

            if (response.ok) {
                console.log(`Prodotto con ID ${productId} eliminato con successo.`)
                window.location.href = 'index.html'
            } else {
                console.log('Errore durante l\'eliminazione del prodotto.')
            }
        }
    } catch (error) {
        console.error('Si è verificato un errore durante la richiesta di eliminazione:', error)
    }
}

fetchProduct()