import { galleryItems } from './gallery-items.js';
// Change code below this line

function markupGallery(arrImages) {
    return arrImages
        .map(
            ({ preview, original, description }) => `<li class="gallery__item">
  <a class="gallery__link" href="${original}">
    <img
      class="gallery__image"
      src="${preview}"
      data-source="${original}"
      alt="${description}"
    />
  </a>
</li>`
        )
        .join('');
}

const galleryList = document.querySelector('.js-gallery');
galleryList.insertAdjacentHTML('beforeend', markupGallery(galleryItems));
galleryList.addEventListener('click', onClick);

//------- Var 1 ---------

function onClick(e) {
    e.preventDefault();

    const isImages = e.target.classList.contains('gallery__image');
    if (!isImages) {
        return;
    }

    const items = `<img src="${e.target.dataset.source}" width="1280" alt="${e.target.dataset.description}">`;

    const instance = basicLightbox.create(items, {
        onShow: instance => {
            window.addEventListener('keydown', onEscPress);
        },
        onClose: instance => {
            window.removeEventListener('keydown', onEscPress);
        },
    });

    instance.show();

    function onEscPress(e) {
        if (e.key !== 'Escape') {
            return;
        }
        instance.close();
    }
}
