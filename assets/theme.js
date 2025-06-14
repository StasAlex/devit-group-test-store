document.addEventListener('DOMContentLoaded', () => {
    initLookbookModal();
});
 function initLookbookModal() {
    const modal = document.getElementById('LookbookModal');
    if (!modal) return;

    setupModalOpen(modal);
    setupOutsideClickClose(modal);
    setupVariantSelection();
    setupAddToCart();
}

function setupModalOpen(modal) {
    document.querySelectorAll('.lookbook-trigger').forEach(btn => {
        btn.addEventListener('click', () => modal.showModal());
    });
}

function setupOutsideClickClose(modal) {
    modal.addEventListener('click', event => {
        const inner = modal.querySelector('.lookbook-modal__inner');
        if (!inner) return;

        const rect = inner.getBoundingClientRect();
        const clickedOutside =
            event.clientX < rect.left ||
            event.clientX > rect.right ||
            event.clientY < rect.top ||
            event.clientY > rect.bottom;

        if (clickedOutside) modal.close();
    });
}

function setupVariantSelection() {
    document.querySelectorAll('.lookbook-product').forEach(productCard => {
        const productId = productCard.dataset.productId;
        const optionInputs = productCard.querySelectorAll('[data-option-index]');
        const variantInput = productCard.querySelector('.lookbook-product__variant-id');
        const addButton = productCard.querySelector('.lookbook-product__add');

        if (!optionInputs.length || !variantInput || !addButton) return;

        const product = window.lookbookProducts?.find(p => p.id == productId);
        if (!product) return;

        function updateVariant() {
            const selectedOptions = [...optionInputs].map(input => input.value);
            const matchedVariant = product.variants.find(v =>
                selectedOptions.every((opt, i) => v.options[i] === opt)
            );

            if (matchedVariant) {
                variantInput.value = matchedVariant.id;
                addButton.dataset.variantId = matchedVariant.id;
            }
        }

        optionInputs.forEach(input => {
            input.removeEventListener('change', updateVariant);
            input.addEventListener('change', updateVariant);
        });

        updateVariant();
    });
}

function setupAddToCart() {
    let isAdding = false;

    document.addEventListener('click', event => {
        if (!event.target.matches('.lookbook-product__add') || isAdding) return;

        const button = event.target;
        const variantId = button.dataset.variantId;
        if (!variantId) return;

        isAdding = true;

        fetch('/cart/add.js', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id: variantId, quantity: 1 })
        })
            .then(res => res.json())
            .then(() => {
                button.textContent = '✓ Added';
                setTimeout(() => {
                    button.textContent = 'Add to bag';
                    isAdding = false;
                }, 1500);

                updateCartBubble();
                openCartDrawer();
                updateCartSection();
            })
            .catch(err => {
                console.error(err);
                alert('Failed to add product.');
                isAdding = false;
            });
    });
}

function updateCartBubble() {
    fetch('/cart.js')
        .then(res => res.json())
        .then(cart => {
            const count = cart.item_count;
            const countEl = document.querySelector('.cart-bubble__text-count');
            if (countEl) countEl.textContent = count;

            const hiddenEl = document.querySelector('.cart-bubble .visually-hidden');
            if (hiddenEl) hiddenEl.textContent = `Total items in cart: ${count}`;

            const bubble = document.querySelector('[ref="cartBubble"]');
            if (bubble) bubble.classList.remove('visually-hidden');
        });
}

function openCartDrawer() {
    const drawerDialog = document.querySelector('.cart-drawer__dialog');
    if (drawerDialog?.showModal) {
        drawerDialog.showModal();
    }
}

function updateCartSection() {
    const sectionComponent = document.querySelector('cart-items-component');
    const sectionId = sectionComponent?.dataset.sectionId;
    if (!sectionId) return;

    fetch(`/?sections=${sectionId}`)
        .then(res => res.json())
        .then(data => {
            const html = data[sectionId];
            if (!html) return;

            const parser = new DOMParser();
            const doc = parser.parseFromString(html, 'text/html');
            const newContent = doc.querySelector('cart-items-component');
            const oldContent = document.querySelector('cart-items-component');

            if (newContent && oldContent) {
                oldContent.innerHTML = newContent.innerHTML;
            }

            const drawerDialog = document.querySelector('.cart-drawer__dialog');
            if (drawerDialog?.classList.contains('cart-drawer--empty')) {
                drawerDialog.classList.remove('cart-drawer--empty');
            }
        });
}
//# sourceMappingURL=theme.js.map
