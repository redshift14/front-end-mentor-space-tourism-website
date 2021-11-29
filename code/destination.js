function loadAllDestinations() {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', 'data.json', true);

    xhr.onload = function() {
        if(this.status === 200) {
            // creating list items of the navigation from json file
            let outputNav = '';
            const data = JSON.parse(this.responseText);
            const destinations = data.destinations;
            const destinationList = document.getElementById('destination-nav-list');
            destinations.forEach(destination => {
                outputNav += `<li class="dest-nav-item">${destination.name}</li>`;
                destinationList.innerHTML = outputNav;
            });
            destinationList.children[0].classList.add('active-dest');

            // Get the names of list items
            const listChildrenArry = Array.from(destinationList.children);
            const navListNames = listChildrenArry.map( name => name.innerHTML);
            
            // Select the data for each list name from json file
            let outputContent = '';
            let outputImage = '';
            const destinationContentContainer = document.getElementById('destination-content');
            const destinationImage = document.getElementById('destination-image');
            for(let i = 0; i < navListNames.length; i++) {
                // Append html 
                outputImage += `<img src="./assets/destination/image-${destinations[i].name}.webp" alt="image" class="content-hidden">`;
                outputContent += `
                    <div class="content-hidden">
                        <h2 class="dest-title">${destinations[i].name}</h2>
                        <p>${destinations[i].description}</p>
                        <div class="dest-info-container">
                            <div class="left-col">
                                <h6 class="sub-heading-2">Avg. distance</h6>
                                <h6 class="sub-heading-1">${destinations[i].distance}</h6>
                            </div>
                            <div class="right-col">
                                <h6 class="sub-heading-2">Est. travel time</h6>
                                <h6 class="sub-heading-1">${destinations[i].travel}</h6>
                            </div>
                        </div>
                    </div>
                `;
                // The first container with its image are visible when first entering the page
                destinationImage.innerHTML = outputImage;
                destinationImage.children[0].classList.add('content-visible');
                destinationImage.children[0].classList.remove('content-hidden');

                destinationContentContainer.innerHTML = outputContent;
                destinationContentContainer.children[0].classList.add('content-visible');
                destinationContentContainer.children[0].classList.remove('content-hidden');

                // Event for each link in destinations nav
                listChildrenArry[i].addEventListener('click', function() {
                    const containersArray = Array.from(destinationContentContainer.children);
                    const imagesContainersArray = Array.from(destinationImage.children);

                    // active state for each of the nav items
                    listChildrenArry.forEach(listItem => {
                        listItem.classList.remove('active-dest');
                    });
                    listChildrenArry[i].classList.add('active-dest');

                    // To display and show the desired content container
                    containersArray.forEach(container => {
                        // remove the visibily class and add non-visibility class for all containers
                        container.classList.remove('content-visible');
                        container.classList.add('content-hidden');
                    });
                    // applying the same to images array
                    imagesContainersArray.forEach(imageContainer => {
                        imageContainer.classList.remove('content-visible');
                        imageContainer.classList.add('content-hidden');
                    });
                    // add the visiiblity class for the desired container and image container
                    destinationContentContainer.children[i].classList.add('content-visible');
                    destinationImage.children[i].classList.add('content-visible');
                });
            }
        }
    }
    xhr.send();
}
loadAllDestinations();
