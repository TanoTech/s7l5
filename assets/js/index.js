const endpoint = 'https://striveschool-api.herokuapp.com/api/product/'
const apiKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTc0NjFlYzJjNmEwZDAwMTg0OTVkZTgiLCJpYXQiOjE3MDIxMjYwNjEsImV4cCI6MTcwMzMzNTY2MX0.RtkO9MZ_ppkv_2h-PtTBq3rv4nEmxk88bgMvb4sy6Mk'

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

        const productContainer = document.querySelector('#productContainer')

        data.forEach(item => {
            const card = createCard(item)
            productContainer.innerHTML += card
        })

    } catch (error) {
        console.error('Si è verificato un errore durante la richiesta dei dati:', error);
    }
}

function createCard(item) {
    return `
    <div class="col"> <div class="card" style="width: 18rem;">
      
      <div class="card-body">
        <h5 class="card-title">${item.name}</h5>
        <img src="${item.imageUrl}" class="card-img-top img-fluid" alt="foto prodotto">
        <p class="card-text">${item.brand}</p>
        <p class="card-text">${item.price}€/KG</p>
        <a href="javascript:void(0)" class="btn btn-primary" onclick="openModal('${item._id}')">Scopri di più</a>
        <a href="edit.html?id=${item._id}" class="btn btn-secondary">Modifica</a>
      </div>
    </div> </div>
  `
}

async function openModal(productId) {
    document.getElementById('backDrop').style.display = 'block'
    const modal = document.getElementById('myModal');
    if (modal) {
        modal.style.display = 'block';
        const infoContainer = document.getElementById('infoContainer')
        if (infoContainer) {
            try {
                const response = await fetch(`${endpoint}${productId}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${apiKey}`
                    },
                })

                const item = await response.json();
                infoContainer.innerHTML = `
                    <h1>${item.name}</h1>
                    <img class='img-fluid' src="${item.imageUrl}" alt="Immagine del prodotto">
                    <p>${item.brand}</p>
                    <p>${item.description}</p>
                    <p>${item.price}€</p>
                    `
            } catch (error) {
                console.error('Errore durante il recupero dei dettagli del prodotto:', error)
            }
        }
    }
}

function closeModal() {
    document.getElementById('myModal').style.display = 'none'
    document.getElementById('backDrop').style.display = 'none'
}

fetchProduct()