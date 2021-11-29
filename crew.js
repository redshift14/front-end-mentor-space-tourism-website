function loadCrews() {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', 'data.json', true);

    xhr.onload = function() {
        if (this.status === 200) {
            // create nav points, nav points == length of crew 
            let outputNav = '';
            const crewList = document.getElementById('crew-list');
            const data = JSON.parse(this.responseText);
            const crews = data.crew;
            for (let i = 0; i < crews.length; i++) {               
                outputNav += `<li class="crew-nav-item"></li>`;
                crewList.innerHTML = outputNav;
            }
            crewList.children[0].classList.add('active-crew');

            // select all data
            let outputContent = '';
            let outputImage = '';
            const crewContentContainer = document.getElementById('crew-content-text');
            const crewImage = document.getElementById('crew-image');

            for (let i = 0; i < crews.length; i++) {
                outputImage += `<img src="${crews[i].images.webp}" alt="image" class="content-hidden">`;
                outputContent += `
                    <div class="content-hidden">
                        <div class="text-container">
                            <h4>${crews[i].role}</h4>
                            <h3>${crews[i].name}</h3>
                            <p>${crews[i].bio}</p>
                        </div>
                    </div>
                `;
                crewContentContainer.innerHTML = outputContent;
                crewContentContainer.children[0].classList.add('content-visible');
                crewContentContainer.children[0].classList.remove('content-hidden');

                crewImage.innerHTML = outputImage;
                crewImage.children[0].classList.add('content-visible');
                crewImage.children[0].classList.remove('content-hidden');

                const listChildrenArray = Array.from(crewList.children);
                listChildrenArray[i].addEventListener('click', function() {
                    const containersArray = Array.from(crewContentContainer.children);
                    const imagesContainersArray = Array.from(crewImage.children);
                    
                    listChildrenArray.forEach(listItem => {
                        listItem.classList.remove('active-crew');
                    });
                    listChildrenArray[i].classList.add('active-crew');

                    containersArray.forEach(container => {
                        container.classList.remove('content-visible');
                        container.classList.add('content-hidden');
                    });

                    imagesContainersArray.forEach(imageContainer => {
                        imageContainer.classList.remove('content-visible');
                        imageContainer.classList.add('content-hidden');
                    });

                    crewContentContainer.children[i].classList.add('content-visible');
                    crewImage.children[i].classList.add('content-visible');
                });
            }
        }
    }
    xhr.send();
}

loadCrews();