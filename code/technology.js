function loadTechnologies() {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', 'data.json', true);

    xhr.onload = function() {
        if(this.status === 200) {
            // Create nav buttons
            let outputNav = '';
            const data = JSON.parse(this.responseText);
            const technologies = data.technology;
            const technologiesNavList = document.getElementById('tech-nav-list');
            for (let i = 0; i < technologies.length; i++) {
                outputNav += `<li class="tech-nav-item">${i+1}</li>`;
                technologiesNavList.innerHTML = outputNav;
            }
            technologiesNavList.children[0].classList.add('active-tech');

            // select data
            let outputContent = '';
            let outputImage = '';
            const techContentContainer = document.getElementById('tech-content');
            const techImageContainer = document.getElementById('tech-image');

            for (let i = 0; i < technologies.length; i++) {
                if (window.innerWidth < 800) {
                    outputImage += `<img src="${technologies[i].images.landscape}" alt="image" class="content-hidden">`;
                }
                if (window.innerWidth > 800) {
                    outputImage += `<img src="${technologies[i].images.portrait}" alt="image" class="content-hidden">`;
                }
                outputContent += `
                    <div class="content-hidden">
                        <h6 class="sub-heading-2">The terminology...</h6>
                        <h3>${technologies[i].name}</h3>
                        <p>${technologies[i].description}</p>
                    </div>
                `;

                techContentContainer.innerHTML = outputContent;
                techContentContainer.children[0].classList.add('content-visible');
                techContentContainer.children[0].classList.remove('content-hidden');

                techImageContainer.innerHTML = outputImage;
                techImageContainer.children[0].classList.add('content-visible');
                techImageContainer.children[0].classList.remove('content-hidden');

                const technologiesNavListChildren = Array.from(technologiesNavList.children);
                technologiesNavListChildren[i].addEventListener('click', function() {
                    const containersArray = Array.from(techContentContainer.children);
                    const imagesContainersArray = Array.from(techImageContainer.children);

                    console.log(containersArray);
                    
                    technologiesNavListChildren.forEach(listItem => {
                        listItem.classList.remove('active-tech');
                    });
                    technologiesNavListChildren[i].classList.add('active-tech');

                    containersArray.forEach(container => {
                        container.classList.remove('content-visible');
                        container.classList.add('content-hidden');
                    });

                    imagesContainersArray.forEach(imageContainer => {
                        imageContainer.classList.remove('content-visible');
                        imageContainer.classList.add('content-hidden');
                    });

                    techContentContainer.children[i].classList.add('content-visible');
                    techImageContainer.children[i].classList.add('content-visible');
                });

            }
        }
    }
    xhr.send();
}

loadTechnologies();