const form = document.getElementById("offerForm");


form.addEventListener('submit', async (e) => {
    e.preventDefault(); // Prevent default submission

    const formData = new FormData(form);

    // const formData = {
    //     title: document.getElementById('title').value,
    //     price: document.getElementById('price').value,
    //     description: document.getElementById('description').value,
    //   };
    
      try {
        const response = await fetch('/upload', {
          method: 'POST',
          body: formData,
        });
    
        if (response.ok) {
          alert('offer submitted and data saved successfully!');
          form.reset();
          loadOffers();// reload offers
        } else {
          alert('Failed to save data.');
        }
      } catch (error) {
        console.error('Error submitting form:', error);
        alert('An error occurred while submitting the offer.');
      }
  });
  

  // Fetch and display all offers
async function loadOffers() {
    try {
      const response = await fetch('/offers');
      if (!response.ok) {
        throw new Error('Failed to fetch offers');
      }
  
      const offers = await response.json();
      const container = document.getElementById('offersContainer');
  
      // Clear existing offers
      container.innerHTML = '';
  
      // Render each offer
      // offers.forEach((offer) => {
      //   const offerDiv = document.createElement('div');
      //   offerDiv.className = 'offerDiv';
  
      //   // Title
      //   const titleElement = document.createElement('p');
      //   titleElement.textContent = `Title: ${offer.title}`;
      //   offerDiv.appendChild(titleElement);
  
      //   // Description
      //   const descriptionElement = document.createElement('p');
      //   descriptionElement.textContent = `Description: ${offer.description}`;
      //   offerDiv.appendChild(descriptionElement);
  
      //   // Price
      //   const priceElement = document.createElement('p');
      //   priceElement.textContent = `Price: $${offer.price}`;
      //   offerDiv.appendChild(priceElement);
  
      //   // Image
      //   if (offer.imagePath) {
      //     const imageElement = document.createElement('img');
      //     imageElement.src = offer.imagePath;
      //     imageElement.alt = offer.title;
      //     imageElement.style.maxWidth = '200px';
      //     offerDiv.appendChild(imageElement);
      //   }
  
      //   container.appendChild(offerDiv);
      // });
      offers.forEach((offer) => {
        const offerDiv = document.createElement("div");
        offerDiv.className = "col s12 m6 l4"; 
  
        const card = document.createElement("div");
        card.className = "card hoverable"; 
  
        
        if (offer.imagePath) {
          const cardImage = document.createElement("div");
          cardImage.className = "card-image";
          const img = document.createElement("img");
          img.className = "responsive-img";
          img.src = offer.imagePath;
          img.alt = offer.title;
          cardImage.appendChild(img);
          card.appendChild(cardImage);
        }
  
        
        const cardContent = document.createElement("div");
        cardContent.className = "card-content";
  
        const titleSpan = document.createElement("span");
        titleSpan.className = "card-title";
        titleSpan.textContent = offer.title;
        cardContent.appendChild(titleSpan);
  
        const descriptionP = document.createElement("p");
        descriptionP.textContent = offer.description;
        cardContent.appendChild(descriptionP);
  
        const priceP = document.createElement("p");
        priceP.textContent = `Price: €${offer.price}`;
        cardContent.appendChild(priceP);
  
        card.appendChild(cardContent);
        offerDiv.appendChild(card);
        container.appendChild(offerDiv);
      });
    } catch (error) {
      console.error('Error loading offers:', error);
    }
  }




  
  // Load offers when the page is loaded
  document.addEventListener('DOMContentLoaded', loadOffers);
  