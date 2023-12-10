const userId = 'manager@backoffice.it'

const endpoint = 'https://striveschool-api.herokuapp.com/api/product/'
const apiKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTc0NjFlYzJjNmEwZDAwMTg0OTVkZTgiLCJpYXQiOjE3MDIxMjYwNjEsImV4cCI6MTcwMzMzNTY2MX0.RtkO9MZ_ppkv_2h-PtTBq3rv4nEmxk88bgMvb4sy6Mk'

function addProduct() {
    const productName = document.getElementById('productName').value
    const productDescription = document.getElementById('productDescription').value
    const productImage = document.getElementById('productImage').value
    const productBrand = document.getElementById('productBrand').value
    const productPrice = parseFloat(document.getElementById('productPrice').value)

    const newProduct = {
        name: productName,
        description: productDescription,
        imageUrl: productImage,
        brand: productBrand,
        price: productPrice,
        userId: userId,
    };

    sendPostRequest(newProduct);
    document.getElementById('productForm').reset()
}

function resetFormWithConfirmation() {

    const confirmation = confirm('Sei sicuro di voler resettare il form? Tutti i dati inseriti verranno persi.')

    if (confirmation) {
        document.getElementById('productForm').reset();
    }
}

const sendPostRequest = async (newProduct) => {
    try {
        const response = await fetch(endpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`
            },
            body: JSON.stringify(newProduct)
        })

        const data = await response.json();
        if (data) {
            console.log('Dato inviato con successo:', data);
            fetchProduct()
            alert('Prodotto aggiunto correttamente')
            
        } else {
            console.log('La risposta non contiene dati validi.')
        }
    } catch (error) {
        console.error('Si è verificato un errore durante l\'invio dei dati:', error)
    }
}

const productContainer = document.querySelector('#productTableBody')

const fetchProduct = async () => {
    try {
        const response = await fetch(endpoint, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`
            },
        })

        const data = await response.json();
        console.log('Dati ricevuti con successo:', data);
    
        const productContainer = document.querySelector('#productTableBody')

        while (productContainer.firstChild) {
            productContainer.removeChild(productContainer.firstChild);
        }

        data.forEach(item => {
            const card = createCard(item)
            productContainer.innerHTML += card
        })

    } catch (error) {
        console.error('Si è verificato un errore durante la richiesta dei dati:', error)
    }
}

function createCard(item) {
    return `
        <tr>
            <td class='bg-warning'>${item.name}</td>
            <td class='descriptionCol'>${item.description}</td>
            <td class='bg-warning'>${item.brand}</td>
            <td>${item.price}€</td>
            <td class='bg-warning'><a href="edit.html?id=${item._id}" class="btn btn-success">Modifica</a></td>
        </tr>
    `
}

fetchProduct()

