function changeLanguage() {
    const selectedLanguage = document.getElementById('language').value;
    const elementsToTranslate = document.querySelectorAll('[data-lang]');

    elementsToTranslate.forEach(element => {
        const key = element.getAttribute('data-lang');
        if (translations[selectedLanguage][key]) {
            element.textContent = translations[selectedLanguage][key];
        }
    });
}
