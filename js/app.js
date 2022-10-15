const selectTag = document.querySelectorAll('select'),
    inputText = document.querySelector('.input-text'),
    outputText = document.querySelector('.output-text'),
    exchangeBtn = document.querySelector('.exchange'),
    translateBtn = document.querySelector('button'),
    icons = document.querySelectorAll('.controls i')


selectTag.forEach((elem, id) => {
    for (let country_code in countries) {
        let selected;
        let newOption;
        if (id == 0 && country_code == 'en-GB') {
            selected = "selected"
            newOption = `<option value="${country_code}" ${selected}>${countries[country_code]}</optio4n>`;
        } else if (id == 1 && country_code == 'kn-IN') {
            selected = "selected"
            newOption = `<option value="${country_code}" ${selected}>${countries[country_code]}</option>`;

        } else {
            newOption = `<option value="${country_code}">${countries[country_code]}</option>`;
        }
        elem.insertAdjacentHTML("beforeend", newOption)
    }
})


exchangeBtn.addEventListener("click", () => {
    let temp = inputText.value
    inputText.value = outputText.value
    outputText.value = temp
    let tempSelect = selectTag[0].selectedIndex
    selectTag[0].selectedIndex = selectTag[1].selectedIndex
    selectTag[1].selectedIndex = tempSelect
})

translateBtn.addEventListener("click", () => {
    let toTranslate = inputText.value
    let fromLang = selectTag[0].value
    let toLang = selectTag[1].value
    let api = `https://api.mymemory.translated.net/get?q=${toTranslate}!&langpair=${fromLang}|${toLang}`
    fetch(api).then(res => res.json()).then(data =>
        // console.log(data)
        outputText.value = data.responseData.translatedText
    )
})


icons.forEach(icons => {
    icons.addEventListener('click', ({ target }) => {
        if (target.classList.contains('fa-copy')) {
            if (target.classList.contains('from-txt')) {
                navigator.clipboard.writeText(inputText.value)
            } else {
                navigator.clipboard.writeText(outputText.value)
            }
        } else {
            let utterance;
            if (target.classList.contains('from-txt')) {
                utterance = new SpeechSynthesisUtterance(inputText.value)
                utterance.lang = selectTag[0].value
            } else {
                utterance = new SpeechSynthesisUtterance(outputText.value)
                utterance.lang = selectTag[1].value
            }
            speechSynthesis.speak(utterance)
        }
    })
})