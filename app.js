const loadData = async(searchText,dataLimit) =>{
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
    const res = await fetch(url)
    const data = await res.json();
    displayData(data.data,dataLimit);
}

const displayData = (phones,dataLimit) =>{
    const phoneContainer = document.getElementById('phones-container');
    
    phoneContainer.innerText = '';
    
    // show all phone 
    const showAll = document.getElementById('btn-show-all');
    if(dataLimit===10 && phones.length>10){
        phones= phones.slice(0,10);
        showAll.classList.remove('d-none');
    }
    else{
        showAll.classList.add('d-none');
    }

    // phone not found
    const noPhone = document.getElementById('not-found-message'); 
    if(phones.length === 0){
        noPhone.classList.remove('d-none');
    }
    else{
        noPhone.classList.add('d-none');
    }

    phones.forEach(phone => {
        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML = `<div class="card mb-3" style="max-width: 540px;">
        <div class="row g-0">
          <div class="col-md-4">
            <img src="${phone.image}" class="img-fluid rounded-start" alt="...">
          </div>
          <div class="col-md-8">
            <div class="card-body">
              <h5 class="card-title">Name : ${phone.phone_name}</h5>
              <p class="card-text">Brand : ${phone.brand}</p>
              <p class="card-text">Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae neque reiciendis amet voluptates iure a minus nam!</p>
              <button  onclick="loadPhoneDetails('${phone.slug}')" class="btn btn-dark" data-bs-toggle="modal" data-bs-target="#phoneDetailModal">Show Details</button>
            </div>
          </div>
        </div>
      </div>`
        phoneContainer.appendChild(div);
    });
    toggleSpinner(false);
}

const processSearch = (dataLimit) =>{
    toggleSpinner(true);
    const searchText = document.getElementById('searchPhone').value;
    loadData(searchText,dataLimit);
}

document.getElementById('btn-search').addEventListener('click',function(){
    processSearch(10);
})

document.getElementById('searchPhone').addEventListener('keypress',function(e){
    if(e.key=== 'Enter'){
    processSearch(10);
    }
})

const toggleSpinner = isLoading =>{
    const loader = document.getElementById('spinner');
    if(isLoading)
    {
        loader.classList.remove('d-none');
    }
    else{
        loader.classList.add('d-none');
    }
}

document.getElementById('show-all').addEventListener('click',function(){
    processSearch();
})

const loadPhoneDetails = async(slug)=>{
    const url = `https://openapi.programming-hero.com/api/phone/${slug}`;
    const res = await fetch(url)
    const data = await res.json();
    displayPhoneDetails(data.data);
}
const displayPhoneDetails = phone =>{
    const modalTitle = document.getElementById('phoneDetailModalLabel');
    modalTitle.innerText = phone.name;
    const phoneDetails = document.getElementById('modal-details')
    phoneDetails.innerHTML=`
        <div class="d-flex justify-content-center mb-3"><image src="${phone.image}" width="150px"></div>
        <p><span style="font-weight: bold;"> Release Date:</span> ${phone.releaseDate ? phone.releaseDate : "No releaseDate Found."}</p>
        <p><span style="font-weight: bold;"> Storage:</span> ${phone.mainFeatures.storage}</p>
        <p><span style="font-weight: bold;"> Display Size:</span> ${phone.mainFeatures.displaySize}</p>
        <p><span style="font-weight: bold;"> ChipSet:</span> ${phone.mainFeatures.chipSet}</p>
    `
}

loadData(10)